import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const UserScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Text>UserScreen</Text>
      <Button
        title="click here"
        onPress={() => alert("button clicked!")}
      ></Button>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
  },
});
