import React, { useState,useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";

import * as Location from 'expo-location';



export default function Gps() {

const [ok, setOk] = useState(true);
const [lat,setLat] = useState(37);
const [lon, setLon] = useState(126);
const mapRef = useRef(null);

const [InitialRegion, setInitialRegion] = useState(
  {
    latitude: 37,
    longitude: 128,
    latitudeDelta: 1,
    longitudeDelta: 1,}
  )

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
  setInitialRegion({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 3,
    longitudeDelta: 3,
  })
  // console.log(mapRef.current)

  if (mapRef.current) {
    mapRef.current.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.05, // 예시로 작은 값 사용
      longitudeDelta: 0.05, // 예시로 작은 값 사용
    });
  }
}

  useEffect(()=>{
    getLocation()
    
    // console.log(INITIAL_REGION)
  },[])

  return (
    <View style={styles.container}>
      {/* <Text>hi</Text>
      <TouchableOpacity style={styles.button}>
        <Text>Press Here</Text>
      </TouchableOpacity> */}
      
      <View>
        <MapView ref={mapRef} initialRegion={InitialRegion} style={styles.map}>

          <Marker coordinate={{ latitude: lat, longitude: lon }} />
          <Marker coordinate={{ latitude: lat+0.001, longitude: lon }} />
          <Marker coordinate={{ latitude: lat+0.002, longitude: lon }} />
          <Marker coordinate={{ latitude: lat+0.003, longitude: lon }} />
          <Marker coordinate={{ latitude: lat+0.004, longitude: lon }} />
          <Marker coordinate={{ latitude: lat+0.005, longitude: lon }} />
        </MapView>
        
        <View style={styles.ButtonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={{fontSize:25, fontWeight:"600", color:"white"}}>날짜</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={{fontSize:25, fontWeight:"600", color:"white"}}>어종</Text>
          </TouchableOpacity>

        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'space-between'
    // position : "relative"
  },
  map: {
    width: '100%',
    height: '100%',
  },
  button : {
    marginTop:50,
    marginLeft: 20,
    backgroundColor:"black",
    borderRadius : 10
  },
  ButtonContainer : {
    position : 'absolute',
    flexDirection : "row"
  }
});