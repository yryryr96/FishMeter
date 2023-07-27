import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert, Settings} from 'react-native';
import { useEffect, useState, useRef} from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator, createStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Gps from './Gps';
import Home from './Home';
import Dictionary from './Dictionary';
import Feed from './Feed';
import Camera from './Camera';
import ModalTest from './ModalTest';


const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <BottomTab.Screen name="Gps" component={Gps} />
      <BottomTab.Screen name="ModalTest" component={ModalTest} />
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Feed" component={Feed} />
      <BottomTab.Screen name="Dictionary" component={Dictionary} />
    </BottomTab.Navigator>
  );
}


export default function App() {

  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={BottomTabNavigator} />
        <Stack.Screen name="Camera" component={Camera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}