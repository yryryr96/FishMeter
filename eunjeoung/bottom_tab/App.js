import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import DogamScreen from "./screens/DogamScreen";
import DogamGallery from "./screens/dogam/dogamGallery";
import { createStackNavigator } from "@react-navigation/stack";
import StackTab from "./navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="DogamScreen" component={DogamScreen} />
        <Stack.Screen name="DogamGallery" component={DogamGallery} />
      </Stack.Navigator> */}
      <StackTab />
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
