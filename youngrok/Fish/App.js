import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert, Settings} from 'react-native';
import { useEffect, useState, useRef} from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator, createStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Tabs from './navigation/tabs';
import DogamGallery from './screens/dogam/DogamGallery';


const Stack = createNativeStackNavigator();


export default function App() {

  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={Tabs} />
        <Stack.Screen name="DogamGallery" component={DogamGallery} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}