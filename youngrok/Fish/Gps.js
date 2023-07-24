import React, { useState,useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";

import * as Location from 'expo-location';

export default function Gps({navigation}) {

  const [ok, setOk] = useState(true);
  const [lat,setLat] = useState(37);
  const [lon, setLon] = useState(126);
  const mapRef = useRef(null);

  const toCalendar = () => {
    navigation.navigate("Calendars")
  }

  const toDictionary = () => {
    navigation.navigate("Dictionary")
  }

  const [InitialRegion, setInitialRegion] = useState(
    {
      latitude: 37,
      longitude: 128,
      latitudeDelta: 1,
      longitudeDelta: 1,
    })

  const getLocation = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
      
    }

    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync();
    
    setLon(longitude)
    setLat(latitude)
    const locate = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false});
    // console.log()
    // console.log(locate)
    console.log(longitude,latitude)
    setInitialRegion((prev) => {
      prev[latitude] = latitude,
      prev[longitude] = longitude
    })
    // console.log(mapRef.current)

    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.07, // 예시로 작은 값 사용
        longitudeDelta: 0.07, // 예시로 작은 값 사용
      });
    }
  }

  useEffect(()=>{
    getLocation()
    
    // console.log(INITIAL_REGION)
  },[])

  const markerCoordinates = [
    { latitude: lat, longitude: lon },
    { latitude: lat + 0.001, longitude: lon },
    { latitude: lat + 0.002, longitude: lon },
    { latitude: lat + 0.003, longitude: lon },
    { latitude: lat + 0.004, longitude: lon },
    { latitude: lat + 0.005, longitude: lon },
  ];

  return (
    <View style={styles.container}>
      {/* <Text>hi</Text>
      <TouchableOpacity style={styles.button}>
        <Text>Press Here</Text>
      </TouchableOpacity> */}
      
      <View>
        <MapView 
          ref={mapRef} 
          initialRegion={InitialRegion} 
          style={styles.map}
          rotateEnabled={false}
          icon={require("./assets/fish.png")}
          >
            {markerCoordinates.map((coordinate, index) => (
              <Marker
                key={index}
                coordinate={coordinate}
                icon={require("./assets/fish.png")}
              />)
            )}
        </MapView>
        
        <View style={styles.ButtonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={toCalendar}
            >
            <Text style={{fontSize:18, fontWeight:"600", color:"black"}}>날짜</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={toDictionary}
            >
            <Text style={{fontSize:18, fontWeight:"600", color:"black"}}>어종</Text>
          </TouchableOpacity>

        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position : "relative"
  },
  map: {
    width: '100%',
    height: '100%',
  },
  button : {
    marginTop:40,
    marginLeft: 5,
    backgroundColor:"white",
    borderRadius : 15,
    padding : 10,
    opacity : 0.7
  },
  ButtonContainer : {
    position : 'absolute',
    flexDirection : "row",
    paddingLeft : 20,
  }
});