import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  FlatList,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const [userPosts, setUserPosts] = useState([]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../images/PhotoBG.png")}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.bottomForm}>
            <View style={styles.avatarBox}>
              <Image source={require("../images/ava.png")} style={styles.ava} />
              <TouchableOpacity activeOpacity={0.8}>
                <AntDesign
                  name="closecircleo"
                  style={styles.avatarBtn}
                  size={24}
                  color="#E8E8E8"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.iconExit}>
              <Ionicons name="exit-outline" size={26} color="#BDBDBD" />
            </TouchableOpacity>
            <Text style={styles.title}>UserName</Text>
            <FlatList
              renderItem={({ item }) => (
                <>
                  <View style={styles.postBox}>
                    <Image
                      source={{ uri: item.photo }}
                      style={styles.pictures}
                    />
                    <Text style={styles.postText}>{item.name}</Text>
                    <View style={styles.postData}>
                      <FontAwesome
                        name="comment"
                        size={18}
                        color="#FF6C00"
                        style={{ marginRight: 9 }}
                      />
                      <Text style={styles.postComments}>Soon..</Text>
                      <Feather
                        name="thumbs-up"
                        size={18}
                        color="#FF6C00"
                        style={{ marginRight: 10 }}
                      />
                      <Text style={styles.postLikes}>soon..</Text>
                      <View style={styles.postLocation}>
                        <EvilIcons name="location" size={24} color="#BDBDBD" />
                        <Text style={styles.postLocationItem}>
                          {item.locationName}
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={{ height: 299 }} />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  image: {
    flex: 1,
    resizeMode: "cover",
  },
  avatarBox: {
    position: "relative",
    width: 120,
    height: 120,
    alignSelf: "center",
    marginTop: -60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  ava: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  postBox: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  pictures: {
    height: 240,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  postText: {
    marginTop: 8,
    color: "#212121",
    fontFamily: "medium",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 8,
  },
  postData: {
    flexDirection: "row",
    height: 24,
  },
  postComments: {
    marginRight: 24,
    color: "#212121",
    fontFamily: "normal",

    fontSize: 16,
    lineHeight: 19,
  },
  postLikes: {
    marginRight: 24,
    color: "#212121",
    fontFamily: "normal",
    fontSize: 16,
    lineHeight: 19,
  },
  postLocation: {
    marginLeft: "auto",
    flexDirection: "row",
  },
  postLocationItem: {
    color: "#212121",
    fontFamily: "normal",

    fontSize: 16,
    lineHeight: 19,
  },
  avatarBtn: {
    position: "absolute",
    top: 81,
    left: 107.5,
    backgroundColor: "white",
    overflow: "hidden",
    borderRadius: 24 / 2,
  },
  iconExit: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  bottomForm: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 147,
    width: "100%",
    height: "100%",
  },
  title: {
    color: "#212121",
    fontFamily: "bold",
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 16,
    marginTop: 32,
    textAlign: "center",
  },

  btnNavigate: {
    fontFamily: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
