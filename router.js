import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { authStateChangeUser } from "./redux/auth/authOperations";
import { authSignOutUser } from "./redux/auth/authOperations";

//icon imports:
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

//screen imports:
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import PostScreens from "./screens/main/PostsScreen";
import CreateScreen from "./screens/main/CreatePostsScreen";
import ProfileScreen from "./screens/main/ProfileScreen";

import db from "./firebase/config";

// const auth = getAuth(db);

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
export const useRoute = (isAuth) => {
  // const [isAuth, setIsAuth] = useState(false);
  // onAuthStateChanged(auth, user => {
  //   console.log('whatisit?', user);
  //   if (user) {
  //     setIsAuth(true);
  //     // setCurrentUser(user);
  //     return;
  //   } else {
  //     setIsAuth(false);
  //     // setCurrentUser('');
  //     return;
  //   }
  // });
  // const isAuth = false;
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };

  // console.log('isit?', isAuth);
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Register">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarItemStyle: {
          justifyContent: "center",
          // alignItems: 'center',
          height: 40,
          marginTop: 9,
        },
        tabBarStyle: {
          paddingHorizontal: 40,
          height: 83,
          borderTopWidth: 1,
          borderTopColor: "#C0C0C0",
        },
      }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focuses, size, color }) => (
            <SimpleLineIcons name="grid" size={24} color={color} />
          ),
          headerRight: () => (
            <Ionicons
              style={{ marginRight: 10 }}
              name="exit-outline"
              size={26}
              color="#BDBDBD"
              onPress={signOut}
            />
          ),
        }}
        name="Posts"
        component={PostScreens}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focuses, size, color }) => (
            <View style={styles.addBtn}>
              <AntDesign name="plus" size={20} color="white" />
            </View>
          ),

          headerLeft: () => (
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                left: 16,
              }}
            >
              <AntDesign
                style={{ marginLeft: 16 }}
                name="arrowleft"
                size={24}
                color="#BDBDBD"
                // onPress={() => navigation.navigate('PostsScreen')}
              />
            </TouchableOpacity>
          ),
          // <TouchableOpacity activeOpacity={0.8}>
          //   <AntDesign style={{ marginLeft: 16 }} name="arrowleft" size={10} color="#BDBDBD" />
          // </TouchableOpacity>

          headerBackButtonMenuEnabled: true,
        }}
        name="Create"
        component={CreateScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focuses, size, color }) => (
            <Feather name="user" size={24} color={color} />
          ),
          headerLeft: () => (
            <AntDesign
              style={{ marginLeft: 16 }}
              name="arrowleft"
              size={24}
              color="#BDBDBD"
            />
          ),
          headerShown: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
