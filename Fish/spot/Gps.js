import React, { useState,useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";

import * as Location from 'expo-location';
import CalendarModal from './CalendarModal';
import ModalFishCategory from './ModalFishCategory';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { testGpsList } from '../component/recoil/atoms/test';
import ModalArticle from './ModalArticle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { testDefaultGps } from '../component/recoil/selectors/testSelector';

export default function Gps({navigation}) {

  const [lat,setLat] = useState(37);
  const [lon, setLon] = useState(126);

  const [gpsList,setGpsList] = useRecoilState(testGpsList);

  const mapRef = useRef(null);

  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [CategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [ArticleModalVisible, setArticleModalVisible] = useState(false);

  const openCalendarModal = () => {
    setCalendarModalVisible(true)
    setCategoryModalVisible(false)
    setArticleModalVisible(false)
  }

  const openCategoryModal = () => {
    setCategoryModalVisible(true)
    setCalendarModalVisible(false)
    setArticleModalVisible(false)
  }

  const openArticleModal = () => {
    setArticleModalVisible(true)
    setCategoryModalVisible(false)
    setCalendarModalVisible(false)
  }

  const getLocation = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    console.log(granted)

    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync();
    
    if (lon !== longitude && lat !== latitude) {
      setLon(longitude)
      setLat(latitude)
    }
    
    // const locate = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false});

    console.log("llllllllloaaaaaaaarrr",latitude,longitude)

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
  },[lat,lon])

  // 마커 표시된 집합
  const markerCoordinates = [
    { latitude: lat, longitude: lon },
    { latitude: lat + 0.001, longitude: lon },
    { latitude: lat + 0.002, longitude: lon },
    { latitude: lat + 0.003, longitude: lon },
    { latitude: lat + 0.004, longitude: lon },
    { latitude: lat + 0.005, longitude: lon },
    { latitude: lat + 0.005, longitude: lon },
  ];

  testCoordinates = [
     [128.9104394,35.0925174 ],
     [128.9104394, 35.0925174  + 0.001],
     [128.9104394, 35.0925174  + 0.002],
     [128.9104394, 35.0925174  + 0.003],
     [128.9104394, 35.0925174  + 0.004],
     [128.9104394, 35.0925174  + 0.005],
     [128.9104394, 35.0925174  + 0.005],
  ]


  const getFiltered = (gpsInformation) => {
    const temp = []
    const [globalList,setGlobalList] = useRecoilState(testDefaultGps)
    const filtered = gpsInformation.forEach((item) => {
        temp.push(globalList.filter((gps,idx) => gps.latitude===item[1] && gps.longitude===item[0]))
    })
    console.log("temp=",temp)
    return temp
}

  return (
    <SafeAreaProvider style={styles.container}>
      
      {/* 지도 구현   */}
      <View>
        <MapView 
          ref={mapRef}
          initialRegion={{
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.07,
            longitudeDelta: 0.07,
          }} 
          style={styles.map}
          rotateEnabled={false}
          onClusterPress={(cluster,children) => {
            temp = []
            children.map((item) => temp.push(item.geometry.coordinates))
            setGpsList(temp)
            console.log("gpsList",gpsList)
          }}
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

          <TouchableOpacity 
            style={styles.categoryButton}
            onPress={openArticleModal}
            >
            <Text style={styles.categoryButtonText}>게시글</Text>
          </TouchableOpacity>
          <ModalArticle ArticleModalVisible={ArticleModalVisible} setArticleModalVisible={setArticleModalVisible} filterList={getFiltered(gpsList)} />

        </View>
        
      </View>
    </SafeAreaProvider>
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
    width : "30%",
  },
  categoryButtonText : {
    fontSize:18,
    fontWeight:"600", 
    color:"white"
  },

});