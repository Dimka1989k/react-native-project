import React from "react";
import { useDispatch } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import { authSignOutUser } from "./redux/auth/authOperations";

import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
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
        tabBarActiveTintColor: "#FF6C00",
        tabBarInactiveTintColor: "gray",
        tabBarItemStyle: {
          justifyContent: "center",
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
        style={{ marginLeft: 106 }}
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focuses, size, color }) => (
            <SimpleLineIcons name="grid" size={24} color={color} />
          ),
          headerRight: () => (
            <Ionicons
              style={{ marginRight: 10 }}
              name="ios-exit-outline"
              size={26}
              color="#BDBDBD"
              onPress={signOut}
            />
          ),
        }}
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
                style={{ marginRight: 106 }}
                name="arrowleft"
                size={24}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          ),

          headerBackButtonMenuEnabled: true,
        }}
        name="Create Posts"
        component={CreatePostsScreen}
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

{
  /* <MainTab.Screen name="Comments" component={CommentsScreen} />
      <MainTab.Screen name="Home" component={Home} />
      <MainTab.Screen name="Map" component={MapScreen} /> */
}

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
