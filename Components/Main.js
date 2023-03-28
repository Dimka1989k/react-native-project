import React, { useEffect, useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import { View, Text } from "react-native";
import { useRoute } from "../router";
import { authStateChangeUser } from "../redux/auth/authOperations";
SplashScreen.preventAutoHideAsync();
const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const routing = useRoute(stateChange);

  const [isAuth, setIsAuth] = useState(false);

  const dispatch = useDispatch();

  // console.log('stateChange?', stateChange);
  useEffect(() => {
    // console.log('yes?');
    dispatch(authStateChangeUser());
  }, []);

  const [fontsLoaded] = useFonts({
    Roboto_Regular: require("../assets/fonts/Roboto-Regular.ttf"),
    Roboto_Medium: require("../assets/fonts/Roboto-Medium.ttf"),
    Roboto_Bold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>{routing}</NavigationContainer>
    </View>
  );
};

export default Main;
