import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const HomeScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button
        title="click here"
        onPress={() => alert("button clicked!")}
      ></Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
});
