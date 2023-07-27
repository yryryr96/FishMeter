import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const PostScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Text>PostScreen</Text>
      <Button
        title="click here"
        onPress={() => alert("button clicked!")}
      ></Button>
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
});
