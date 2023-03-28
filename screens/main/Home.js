import React from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { CommonActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "../../router";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

//icon imports:
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

const Home = () => {
  // const isAuth = useSelector(state => state.isAuth);
  // const routing = useRoute(isAuth);
  // return <NavigationContainer>{routing}</NavigationContainer>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Home;
