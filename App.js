import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { StyleSheet } from "react-native";
import { useCallback } from "react";

import { View } from "react-native";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    medium: require("./assets/fonts/robmedium.ttf"),
    normal: require("./assets/fonts/robregular.ttf"),
    bold: require("./assets/fonts/robbold.ttf"),
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
    <View style={styles.container} onLayout={onLayoutRootView}>
      {true ? <RegistrationScreen /> : <LoginScreen />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
