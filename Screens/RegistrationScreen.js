import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../redux/auth/authOperations";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [state, setState] = useState(initialState);
  const [loginBorderOnFocus, setLoginBorderOnFocus] = useState("#E8E8E8");
  const [emailBorderOnFocus, setEmailBorderOnFocus] = useState("#E8E8E8");
  const [passwordBorderOnFocus, setPasswordBorderOnFocus] = useState("#E8E8E8");

  const dispatch = useDispatch();
  const changePasswordVisible = () => {
    setShowPassword(!showPassword);
  };

  const keyboardHide = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
  };

  const submitData = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
    setState(initialState);
    dispatch(authSignUpUser(state));
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../images/PhotoBG.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.bottomForm}>
              <View
                style={{
                  ...styles.formRegister,
                  paddingBottom: isShowKeyBoard ? 32 : 78,
                }}
              >
                <View style={styles.avatar}>
                  <AntDesign
                    style={styles.avatarIcon}
                    name="pluscircleo"
                    size={25}
                    color="#FF6C00"
                  />
                </View>

                <Text style={styles.title}>Registration</Text>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: loginBorderOnFocus,
                    backgroundColor:
                      loginBorderOnFocus === "#FF6C00" ? "#FFFFFF" : "#F6F6F6",
                  }}
                  placeholder="Login"
                  onFocus={() => {
                    setIsShowKeyBoard(true);
                    setLoginBorderOnFocus("#FF6C00");
                  }}
                  onBlur={() => setLoginBorderOnFocus("#E8E8E8")}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: emailBorderOnFocus,
                    backgroundColor:
                      emailBorderOnFocus === "#FF6C00" ? "#FFFFFF" : "#F6F6F6",
                  }}
                  placeholder="Email"
                  onFocus={() => {
                    setIsShowKeyBoard(true);
                    setEmailBorderOnFocus("#FF6C00");
                  }}
                  onBlur={() => setEmailBorderOnFocus("#E8E8E8")}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />

                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: passwordBorderOnFocus,
                    backgroundColor:
                      passwordBorderOnFocus === "#FF6C00"
                        ? "#FFFFFF"
                        : "#F6F6F6",
                  }}
                  secureTextEntry={showPassword}
                  onFocus={() => {
                    setIsShowKeyBoard(true);
                    setPasswordBorderOnFocus("#FF6C00");
                  }}
                  onBlur={() => setPasswordBorderOnFocus("#E8E8E8")}
                  placeholder="Password"
                  value={state.password}
                  onChangeText={(value) =>
                    setState((presState) => ({ ...presState, password: value }))
                  }
                />
                <TouchableOpacity
                  style={styles.showPassword}
                  activeOpacity={0.8}
                >
                  <Text
                    style={styles.passwordVisible}
                    onPress={changePasswordVisible}
                  >
                    {showPassword ? "Show" : "Hide"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={submitData}>
                  <Text style={styles.btnTitle}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.bottomTitle}>
                    Already have an account?
                    <Text
                      onPress={() => navigation.navigate("Login")}
                      style={styles.btnSingin}
                    >
                      &nbsp;Sign In
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  title: {
    color: "#212121",
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 16,
    marginTop: 32,
    textAlign: "center",
    fontFamily: "medium",
  },

  input: {
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    fontSize: 16,
    lineHeight: 19,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    height: 50,
    borderRadius: 8,
    color: "#212121",
    paddingLeft: 16,
    marginTop: 16,
  },
  btn: {
    height: 51,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 43,
    backgroundColor: "#FF6C00",
  },

  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "normal",
  },

  bottomTitle: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    fontFamily: "normal",
  },
  btnSingin: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    fontFamily: "normal",
  },
  formRegister: {
    marginHorizontal: 16,
  },

  bottomForm: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  avatar: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginTop: -60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  avatarIcon: {
    position: "absolute",
    top: 81,
    left: 107.5,
  },

  showPassword: {
    position: "absolute",
    top: 308,
    right: 16,
    fontFamily: "normal",
  },

  passwordVisible: { color: "#1B4371" },
});
