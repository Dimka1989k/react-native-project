import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import uuid from "react-uuid";

import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.userBox}>
        <Image source={require("../images/ava.png")} style={styles.Ava} />
        <View style={styles.userData}>
          <Text style={styles.userName}>login</Text>
          <Text style={styles.userEmail}>email</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item, index) => (index.toString = uuid())}
        renderItem={({ item }) => (
          <View style={styles.postBox}>
            <Image source={{ uri: item.photo }} style={styles.postPhotoBox} />
            <Text style={styles.postTextBox}>{item.name}</Text>
            <View style={styles.postDataBox}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("CommentsScreen", {
                    photo: item.photo,
                    postId: item.id,
                    userId: item.userId,
                  })
                }
                style={{ flexDirection: "row" }}
              >
                <FontAwesome
                  name="comment"
                  size={18}
                  color="#FF6C00"
                  style={{ marginRight: 9 }}
                />
                <Text style={styles.postComments}>Soon..</Text>
              </TouchableOpacity>
              <Feather
                name="thumbs-up"
                size={18}
                color="#FF6C00"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.postLikes}>Soon..</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ flexDirection: "row", marginLeft: "auto" }}
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
              >
                <View style={styles.postLocation}>
                  <EvilIcons name="location" size={24} color="#BDBDBD" />
                  <Text style={styles.postLocationItem}>
                    {item.locationName}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userBox: {
    marginTop: 32,
    marginLeft: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  Ava: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userData: {
    marginLeft: 8,
  },
  userName: {
    fontFamily: "bold",

    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "normal",

    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8);",
  },
  postBox: {
    marginBottom: 32,
    marginHorizontal: 16,
  },
  postPhotoBox: {
    height: 240,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  postDataBox: {
    flexDirection: "row",
    height: 24,
  },
  postTextBox: {
    marginTop: 8,
    color: "#212121",
    fontFamily: "medium",

    fontSize: 16,
    lineHeight: 19,
    marginBottom: 8,
  },
  postComments: {
    marginRight: 24,
    color: "#212121",
    fontFamily: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
  },
  postLikes: {
    marginRight: 24,
    color: "#212121",
    fontFamily: "normal",
    fontWeight: 400,
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
});
export default Home;
