import React, { useState,useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Alert, Image, ScrollView } from 'react-native';
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";

import * as Location from 'expo-location';
import CalendarModal from './CalendarModal';
import ModalFishCategory from './ModalFishCategory';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { testGpsList } from '../component/recoil/atoms/test';
import ModalArticle from './ModalArticle';
import { SafeAreaProvider,SafeAreaView } from 'react-native-safe-area-context';
import { testDefaultGps } from '../component/recoil/selectors/testSelector';

import { MaterialIcons } from '@expo/vector-icons';
import HourlyWeather from './Weathers';

export default function Gps({navigation}) {

  const [lat,setLat] = useState(37);
  const [lon, setLon] = useState(126);
  const [city, setCity] = useState(null);

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

  const getFiltered = (gpsInformation) => {
    const temp = []
    const globalList = useRecoilValue(testDefaultGps)
    const filtered = gpsInformation.forEach((item) => {
        globalList.forEach((gps,idx) => {
          if (gps.latitude===item[1] && gps.longitude===item[0]) {
            temp.push(gps)
          }
        })
    })
    // console.log("temp=",temp)
    return temp
}
  const testCoordinates = useRecoilValue(testDefaultGps)
  
  return (
    <SafeAreaProvider style={styles.container}>
      
      {/* 지도 구현   */}
      <SafeAreaView>
        <MapView 
          ref={mapRef}
          initialRegion={{
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.07,
            longitudeDelta: 0.07,
          }} 
          // zoomEnabled = {false}
          style={styles.map}
          rotateEnabled={false}
          onClusterPress={(cluster,children) => {
            temp = []
            children.map((item) => temp.push(item.geometry.coordinates))
            setGpsList(temp)
            openArticleModal()
          }}
          // icon={require("./assets/fish.png")}
          >
            {testCoordinates.map((coordinate, index) => (
              <Marker
                key={index}
                coordinate={coordinate}
                icon={require("../assets/location.png")}
                // onPress={() => {console.log(coordinate.latitude)}}
              />)
            )}
        </MapView>
        </SafeAreaView>
        
        <View style={{position:'absolute' ,width:"90%",top:"9%", marginLeft : 20,opacity:0.8}}>
          <HourlyWeather latitude={lat} longitude={lon}/>
        </View>

        {/* 버튼  */}
        <View style={styles.ButtonContainer}>
          <View style={styles.categoryBox}>
            <TouchableOpacity 
              style={styles.categoryButton}
              onPress={openCalendarModal}
              >
              <Image source={require("../assets/Gps/calendar.png")} style={{width:25, height:25, marginRight : 10}}/>
              <Text style={{fontSize : 15}}>달력</Text>
            </TouchableOpacity>
          </View>
          

          <View  style={styles.categoryBox}>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={openCategoryModal}
            >
              <Image source={require("../assets/Gps/fishCategory.png")} style={{width:25, height:25, marginRight : 5}}/>
              <Text style={{fontSize:15}}>어종</Text>
            </TouchableOpacity>
          </View>
          
        </View>
        
        <View style={{position:'absolute', right :10, bottom:110}}>
          <TouchableOpacity 
            // style={styles.categoryButton}
            onPress={() =>getLocation()}
            >
              <View style={styles.IconBox}>
                <Image source={require("../assets/gps.png")} style={{width:25, height:25}}/>
              </View>
            
          </TouchableOpacity>  
        </View>

        <CalendarModal calendarModalVisible={calendarModalVisible} setCalendarModalVisible={setCalendarModalVisible}></CalendarModal>
        <ModalFishCategory CategoryModalVisible={CategoryModalVisible} setCategoryModalVisible={setCategoryModalVisible}></ModalFishCategory>
        <ModalArticle ArticleModalVisible={ArticleModalVisible} setArticleModalVisible={setArticleModalVisible} filteredList={getFiltered(gpsList)} city={city} />
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
    flexDirection : 'row',
    position : 'absolute',
    top : "0.5%",
    right : 20
  },
  IconBox : {
    backgroundColor:'white',
    borderRadius : 30,
    width:40,
    height:40, 
    justifyContent:'center', 
    alignItems:'center',
    // marginVertical : 10
  },
  categoryBox : {
    top:'10%',
    backgroundColor:'white',
    borderRadius : 30,
    justifyContent:'center', 
    alignItems:'center',
    marginHorizontal : 5,
    padding : 6
  },

  categoryButton : {
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center'
  }
});