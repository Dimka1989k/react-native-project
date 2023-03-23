import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from "react-native";

export default function CommentsScreen({ route }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  // const [allComment, setAllComment] = useState([]);

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.postBox}>
          <Image source={{ uri: photo }} style={styles.postBox} />
        </View>
        <Text style={styles.textComments}>
          {/* {allComment.length !== 0 ? "Comments:" : "There are no comments yet"} */}
        </Text>
        <FlatList
          // data={allComment.sort((a, b) => (a.date > b.date ? 1 : -1))}
          renderItem={({ item }) => {
            return (
              <View style={styles.comment__box}>
                <View style={styles.commentsWrapFirst}>
                  <View>
                    <Text style={styles.comment}>Comments</Text>
                    <View style={styles.commentDateCard}>
                      <Text style={styles.commentDate}></Text>
                      <View style={styles.commentBorder}></View>
                      <Text style={styles.commentDate}></Text>
                    </View>
                  </View>
                </View>
                <View style={styles.ava}>
                  <Image style={styles.ava} source={{ uri: item.avatar }} />
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.inputComments}>
          <TextInput
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
            placeholder="Comments..."
            placeholderTextColor={"#BDBDBD"}
            style={styles.input}
            onSubmitEditing={keyboardHide}
          />
          <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
            <AntDesign name="arrowup" size={14} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  postBox: {
    marginBottom: 32,
  },
  textComments: {
    color: "#212121",
    fontFamily: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 20,
  },
  postBox: {
    height: 240,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  comment__box: {
    flexDirection: "row",
    marginBottom: 24,
    justifyContent: "space-between",
  },
  commentsWrapFirst: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    marginRight: 16,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    width: 299,
  },
  comment: {
    color: "#212121",
    fontFamily: "normal",
    fontSize: 13,
    lineHeight: 18,
  },
  commentDateCard: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  commentDate: {
    color: "#BDBDBD",
  },
  commentBorder: {
    borderRightColor: "#BDBDBD",
    borderRightWidth: 1,
    height: 11,
    marginLeft: 8,
    marginRight: 8,
  },
  ava: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  inputComments: {
    flexDirection: "row",
    backgroundColor: "#F6F6F6",
    paddingLeft: 16,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    borderWidth: 1,
    marginBottom: 30,
    marginTop: 30,
  },
  input: {
    fontFamily: "medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    flex: 4,
  },
  btn: {
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
});
