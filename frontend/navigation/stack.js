import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./tabs";
import DogamScreen from "../screens/DogamScreen";
import DogamGallery from "../screens/dogam/dogamGallery";

const Stack = createStackNavigator();

const StackTab = () => {
  return (
    <Stack.Navigator
      screenOptions={
        {
          //headerShown: false
        }
      }
    >
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="DogamScreen" component={DogamScreen} options={{}} />
      <Stack.Screen
        name="DogamGallery"
        component={DogamGallery}
        options={{ headerTitle: " " }}
      />
    </Stack.Navigator>
  );
};

export default StackTab;
