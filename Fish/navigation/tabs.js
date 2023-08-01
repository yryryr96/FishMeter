import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import DogamScreen from "../screens/DogamScreen";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Gps from "../spot/Gps";
import Profile from "../screens/Profile";
import WebViewTest from "../WebViewTest";
import WebView from "react-native-webview";
import DogamGallery from "../screens/dogam/DogamGallery";

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const IonIcon = ({ name, size, color }) => {
  return <Ionicons name={name} size={size} color={color} />;
};

const CustomTabBarButton = ({ onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        margin: 10,
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: "#89DAFF",
        justifyContent: "center",
        alignItems: "center", // 중요! 원 안에 내용물을 가운데로 정렬함
      }}
    >
      <IonIcon name="camera-outline" size={50} color="#fff" />
    </View>
  </TouchableOpacity>
);

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          //bottom: 25,
          //left: 20,
          //right: 20,
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
        component={WebViewTest}
        options={{
          tabBarIcon: (props) =>
            IonIcon({
              ...props,
              name: props.focused ? "home" : "home-outline",
              size: 26,
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
              name: props.focused
                ? "book-open-page-variant"
                : "book-open-page-variant-outline",
              size: 30,
              color: "gray",
            }),
        }}
      />
      {/* <Tab.Screen
        name="WebViewTest"
        component={WebViewTest}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      /> */}
      <Tab.Screen
        name="Gps"
        component={Gps}
        options={{
          tabBarLabel: "",
          tabBarIcon: (props) =>
            TabIcon({
              ...props,
              name: props.focused ? "map-marker" : "map-marker-outline",
              size: 30,
              color: "gray",
            }),
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
