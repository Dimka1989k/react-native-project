import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";

//screens
import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreens = createStackNavigator();
const PostScreens = ({ navigation }) => {
  return (
    <NestedScreens.Navigator initialRouteName="DefaultScreen">
      <NestedScreens.Screen
        options={{ headerShown: false }}
        name="DefaultScreen"
        component={DefaultScreenPosts}
      />
      <NestedScreens.Screen
        options={{ headerShown: false }}
        name="Comments"
        component={CommentsScreen}
      />
      <NestedScreens.Screen
        options={{
          headerShown: false,
          // headerLeft: () => (
          //   <HeaderBackButton
          //     onPress={() => {
          //       navigation.dispatch(CommonActions.goBack());
          //     }}
          // />
          // <HeaderBackButton title="Hello" onPress={() => navigation.navigate('Posts')} />
          // <TouchableOpacity activeOpacity={0.8}>
          //   <AntDesign style={{ marginLeft: 16 }} name="arrowleft" size={10} color="#BDBDBD" />
          // </TouchableOpacity>
          // ),
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
                onPress={() => navigation.navigate("PostsScreen")}
              />
            </TouchableOpacity>
          ),
          headerBackButtonMenuEnabled: true,
        }}
        name="Map"
        component={MapScreen}
      />
    </NestedScreens.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default PostScreens;
