import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert, Settings} from 'react-native';
import { useEffect, useState, useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, createStackNavigator } from '@react-navigation/native-stack';

import Gps from './Gps';
import Home from './Home';
import Dictionary from './Dictionary';
import Feed from './Feed';
import Camera from './Camera';
import Calendars from './Calendars';

const Stack = createNativeStackNavigator();

export default function App() {

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Gps" component={Gps} />
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="Dictionary" component={Dictionary} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Calendars" component={Calendars} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}