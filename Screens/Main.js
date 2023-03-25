import React, { useEffect, useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import { View } from "react-native";
import { useRoute } from "../router";
import { authStateChangeUser } from "../redux/auth/authOperations";
SplashScreen.preventAutoHideAsync();

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const routing = useRoute(stateChange);

  const [isAuth, setIsAuth] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const [fontsLoaded] = useFonts({
    medium: require("../assets/fonts/robmedium.ttf"),
    normal: require("../assets/fonts/robregular.ttf"),
    bold: require("../assets/fonts/robbold.ttf"),
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
