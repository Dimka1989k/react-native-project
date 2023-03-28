import React, { useState, useEffect, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  FlatList,
  SafeAreaView,
} from "react-native";

const CommentsScreen = ({ route }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);

  const { login } = useSelector((state) => state.auth);

  const { photo, postId, userId } = route.params;

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const addComment = async () => {
    await addDoc(collection(doc(db, "posts", postId), "comments"), {
      comment,
      login,
      date: new Date().toString(),
      userId,
    });
    // await updateDoc(doc(db, 'posts', postId), {
    //   totalComment: allComment.length + 1,
    // });
    setComment("");
    Keyboard.dismiss();
  };

  const getAllPosts = async () => {
    await onSnapshot(
      collection(doc(db, "posts", postId), "comments"),
      (data) => {
        setAllComment(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            dateComment: doc.data().date,
            time: doc.data().date,
          }))
        );
      }
    );
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  console.log("leng", allComment);
  return (
    <>
      {/* <TouchableWithoutFeedback onPress={keyboardHide}> */}
      {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
      <View style={styles.container}>
        <View style={styles.postBox}>
          <Image source={{ uri: photo }} style={styles.postBox__photo} />
        </View>
        <Text style={styles.textComments}>
          {allComment.length !== 0 ? "Comments:" : "There are no comments yet"}
        </Text>
        <FlatList
          data={allComment.sort((a, b) => (a.date > b.date ? 1 : -1))}
          renderItem={({ item }) => {
            return (
              <View style={styles.comment__box}>
                <View style={styles.commentsWrapFirst}>
                  <View>
                    <Text style={styles.comment__text}>{item.comment}</Text>
                    <View style={styles.commentDateBox}>
                      <Text style={styles.commentDateBox__date}>
                        {/* {item.dateComment} */}
                      </Text>
                      <View style={styles.comment__border}></View>
                      <Text style={styles.commentDateBox__date}>
                        {/* {item.time} */}
                      </Text>
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

        <View style={styles.input__box}>
          <TextInput
            onChangeText={setComment}
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
            value={comment}
            placeholder="Comments..."
            placeholderTextColor={"#BDBDBD"}
            style={styles.input}
            onSubmitEditing={keyboardHide}
          />
          <TouchableOpacity
            onPress={addComment}
            style={styles.btn}
            activeOpacity={0.8}
          >
            <AntDesign name="arrowup" size={14} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
      {/* </KeyboardAvoidingView> */}
      {/* </TouchableWithoutFeedback> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    // alignItems: 'center',
  },
  postBox: {
    marginBottom: 32,
  },
  textComments: {
    color: "#212121",
    fontFamily: "Roboto_Regular",
    
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 20,
  },
  postBox__photo: {
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
  comment__text: {
    color: "#212121",
    fontFamily: "Roboto_Regular",
    fontSize: 13,
    lineHeight: 18,
  },
  commentDateBox: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  commentDateBox__date: {
    color: "#BDBDBD",
  },
  comment__border: {
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
  input__box: {
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
    fontFamily: "Roboto_Medium",
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
export default CommentsScreen;
