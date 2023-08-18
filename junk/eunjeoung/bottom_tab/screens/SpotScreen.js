import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const SpotScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Text>SettingsScreen</Text>
      <Button
        title="click here"
        onPress={() => alert("button clicked!")}
      ></Button>
    </View>
  );
};

export default SpotScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
});
