import React from "react";
import { View } from "react-native";

import { Provider } from "react-redux";

import Main from "./Screens/Main";
import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <Main />
      </View>
    </Provider>
  );
}
