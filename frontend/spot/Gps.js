import React, { useState,useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";

import * as Location from 'expo-location';
import CalendarModal from './CalendarModal';
import ModalFishCategory from './ModalFishCategory';

export default function Gps({navigation}) {

  const [ok, setOk] = useState(true);
  const [lat,setLat] = useState(37);
  const [lon, setLon] = useState(126);
  const mapRef = useRef(null);

  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [CategoryModalVisible, setCategoryModalVisible] = useState(false);

  const openCalendarModal = () => {
    setCalendarModalVisible(true)
    setCategoryModalVisible(false)
  }

  const openCategoryModal = () => {
    setCategoryModalVisible(true)
    setCalendarModalVisible(false)
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

    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync().then( console.log("Hi"));
    
    setLon(longitude)
    setLat(latitude)
    const locate = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false});
    // console.log()
    // console.log(locate)
    console.log(longitude,latitude)
    setInitialRegion((prev) => ({
      ...prev,
      latitude : latitude,
      longitude, longitude

    }))
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
  })

  // 마커 표시된 집합
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
      
      {/* 지도 구현   */}
      <View>
        <MapView 
          onClusterPress={(cluster, children) => {
            const geoList = []
            children.map((item)=> geoList.push(item.geometry.coordinates))
            console.log(geoList)
          }}
          ref={mapRef} 
          initialRegion={InitialRegion} 
          style={styles.map}
          rotateEnabled={false}
          // icon={require("./assets/fish.png")}
          >
            {markerCoordinates.map((coordinate, index) => (
              <Marker
                key={index}
                coordinate={coordinate}
                icon={require("../assets/fish.png")}
                onPress={() => {console.log(coordinate.latitude)}}
              />)
            )}
        </MapView>
        
        {/* 버튼  */}
        <View style={styles.ButtonContainer}>
          <TouchableOpacity 
            style={styles.categoryButton}
            onPress={openCalendarModal}
            >
            <Text style={styles.categoryButtonText}>달력</Text>
          </TouchableOpacity>
          <CalendarModal calendarModalVisible={calendarModalVisible} setCalendarModalVisible={setCalendarModalVisible}></CalendarModal>


          <TouchableOpacity 
            style={styles.categoryButton}
            onPress={openCategoryModal}
          >
            <Text style={styles.categoryButtonText}>어종</Text>
          </TouchableOpacity>
          <ModalFishCategory CategoryModalVisible={CategoryModalVisible} setCategoryModalVisible={setCategoryModalVisible}></ModalFishCategory>
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
  ButtonContainer : {
    position : 'absolute',
    flexDirection : "row",
    paddingLeft : 20,
  },
  categoryButton : {
    marginTop:70,
    marginLeft: 10,
    backgroundColor:"#5c7db4",
    borderRadius : 20,
    // borderWidth : 1,
    padding : 10,
    paddingHorizontal:10,
    alignItems : 'center',
    justifyContent : 'center',
    width : "33%",
  },
  categoryButtonText : {
    fontSize:18,
    fontWeight:"600", 
    color:"white"
  },

});