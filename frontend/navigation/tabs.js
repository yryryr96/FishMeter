import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DogamScreen from "../screens/DogamScreen";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Profile from "../screens/Profile";
import Home from "../Home";
import Camera from "../Camera";

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const IonIcon = ({ name, size, color }) => {
  return <Ionicons name={name} size={size} color={color} />;
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#ffffff",
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          //borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: (props) =>
            TabIcon({
              ...props,
              name: props.focused ? "map-marker" : "map-marker-outline",
              size: 35,
              color: "gray",
            }),
        }}
      />
      <Tab.Screen
        name="Dogam"
        component={DogamScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: (props) =>
            TabIcon({
              ...props,
              name: props.focused ? "fishbowl" : "fishbowl-outline",
              size: 35,
              color: "gray",
            }),
        }}
      />

      <Tab.Screen
        name="Camera"
        component={Camera}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/camera.png")} // 이미지 파일 경로
              style={{
                width: 40,
                height: 40,
                tintColor: focused ? "black" : "gray", // 선택 여부에 따라 색 변경
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "",
          tabBarIcon: (props) =>
            IonIcon({
              ...props,
              name: props.focused ? "ios-person" : "ios-person-outline",
              size: 26,
              color: "gray",
            }),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
