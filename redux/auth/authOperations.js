import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { authSlice } from "./authReducer";

const { authSignOut, authStateChange, updateUserProfile } = authSlice.actions;

const authSignUpUser = ({ login, email, password }) => async (
  dispatch,
  getState
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, {
      displayName: login,
    });

    const updateUserSuccess = await auth.currentUser;

    dispatch(
      authSlice.actions.updateUserProfile({
        userId: updateUserSuccess.uid,
        login: updateUserSuccess.displayName,
        email: updateUserSuccess.email,
      })
    );
  } catch (error) {
    console.log("error:", error);
    console.log("error.message:", error.message);
  }
};

const authSignInUser = ({ email, password }) => async (dispatch, getState) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);

    return user;
  } catch (error) {
    console.log("error:", error);
    console.log("error.message:", error.message);
  }
};

const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);

  dispatch(authSignOut());
};

const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        userId: user.uid,
        email: user.email,
      };

      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

export { authSignInUser, authSignUpUser, authSignOutUser, authStateChangeUser };
