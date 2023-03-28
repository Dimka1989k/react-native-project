import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useSelector } from "react-redux";

import Main from "./Components/Main";
import { store } from "./redux/store";
// SplashScreen.preventAutoHideAsync();

export default function App() {
  // const isAuth = useSelector(state => state.isAuth);
  // const [fontsLoaded] = useFonts({
  //   Roboto_Regular: require('./assets/fonts/Roboto-Regular.ttf'),
  //   Roboto_Medium: require('./assets/fonts/Roboto-Medium.ttf'),
  //   Roboto_Bold: require('./assets/fonts/Roboto-Bold.ttf'),
  // });

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <Main />
      </View>
    </Provider>
  );
}
