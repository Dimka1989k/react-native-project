import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";

import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { db } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uuid from "react-uuid";
import { storage } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

const initialState = {
  Name: "",
  Location: "",
};

export default function CreatePostsScreen({ navigation }) {
  const { userId, login } = useSelector((state) => state.auth);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState(null);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("location", location);
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    if (cameraRef && location) {
      const { uri } = await cameraRef.takePictureAsync();

      setPhoto(uri);
      const asset = await MediaLibrary.createAssetAsync(uri);
    }
  };

  async function uploadPhotoToServer() {
    try {
      const response = await fetch(photo);

      const file = await response.blob();

      const uniquePhotoId = uuid();
      const storageRef = ref(storage, `photos/photo_${uniquePhotoId}`);

      await uploadBytes(storageRef, file);

      const photoUrl = await getDownloadURL(storageRef);

      return photoUrl;
    } catch (error) {
      console.log(error.message);
    }
  }

  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhotoToServer();

      const createPost = await addDoc(collection(db, "posts"), {
        photo,
        location,
        name: state.Name,
        locationName: state.Location,
        location,
        userId,
        login,
      });

      console.log("Document written with ID: ", createPost);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const sendPhoto = async () => {
    navigation.navigate("Home", { photo, location, state });
    await uploadPostToServer();
  };

  return (
    <View style={styles.container}>
      {photo === "" ? (
        <>
          <Camera
            style={styles.addImage}
            type={Camera.Constants.Type.back}
            ref={(ref) => {
              setCameraRef(ref);
            }}
          >
            <TouchableOpacity
              style={styles.photoCircle}
              activeOpacity={0.8}
              onPress={takePhoto}
            >
              <MaterialIcons name="photo-camera" size={24} color="#E8E8E8" />
            </TouchableOpacity>
          </Camera>
          <TouchableOpacity activeOpacity={0.8} onPress={takePhoto}>
            <Text style={styles.text}>Upload photo</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View
            style={{
              ...styles.addImage,
              backgroundColor: "transparent",
            }}
          >
            <ImageBackground
              source={{ uri: photo }}
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              imageStyle={{ borderRadius: 8 }}
            >
              <TouchableOpacity
                style={{
                  ...styles.photoCircle,
                }}
                activeOpacity={0.8}
                onPress={() => setPhoto("")}
              >
                <MaterialIcons name="photo-camera" size={24} color="#E8E8E8" />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setPhoto("")}>
            <Text style={styles.text}>Edit photo</Text>
          </TouchableOpacity>
        </>
      )}

      <TextInput
        placeholder="Name..."
        style={styles.input}
        onChangeText={(value) =>
          setState((presState) => ({ ...presState, Name: value }))
        }
        placeholderTextColor={"#BDBDBD"}
      />
      <View>
        <EvilIcons
          style={{ position: "absolute", zIndex: 1, left: 11, top: 15 }}
          name="location"
          size={24}
          color="#BDBDBD"
        />
        <TextInput
          placeholder="Location"
          style={{ ...styles.input, paddingLeft: 20 }}
          placeholderTextColor={"#BDBDBD"}
          onChangeText={(value) =>
            setState((presState) => ({ ...presState, Location: value }))
          }
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.8}
        onPress={sendPhoto}
      >
        <Text style={styles.btnText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  addImage: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,

    height: 240,
    marginHorizontal: 16,
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
    overflow: "hidden",
  },
  photoCircle: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "white",
  },
  text: {
    fontFamily: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginTop: 8,
    marginLeft: 16,
    marginBottom: 32,
  },
  input: {
    height: 50,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    marginBottom: 16,
    color: "#212121",
    fontFamily: "normal",
    fontSize: 16,
    lineHeight: 19,
  },
  btn: {
    height: 51,
    justifyContent: "center",
    borderRadius: 100,
    marginHorizontal: 16,
    marginTop: 43,
    alignItems: "center",
    backgroundColor: "#F6F6F6",
  },
  btnText: {
    fontFamily: "normal",
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
  },
});
