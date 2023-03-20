import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CommentstsScreen() {
  return (
    <View style={styles.container}>
      <Text>CommentstsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
