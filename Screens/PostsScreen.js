import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import Home from "./Home";

import { StyleSheet } from "react-native";

const PostedScreens = createNativeStackNavigator();

export default function PostScreens({ navigation }) {
  return (
    <PostedScreens.Navigator>
      <PostedScreens.Screen
        options={{ headerShown: false }}
        name="Comments"
        component={CommentsScreen}
      />
      <PostedScreens.Screen
        options={{
          headerShown: false,

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
    </PostedScreens.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
