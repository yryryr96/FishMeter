import { View, StyleSheet, TouchableOpacity,Text,Image } from 'react-native';
import {Marker} from 'react-native-maps';
import MapView from 'react-native-maps';
import { testDefaultGps } from './component/recoil/selectors/testSelector';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import Toast from 'react-native-easy-toast';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home() {
    const [totalMarker, setTotalMarker] = useRecoilState(testDefaultGps)
    const [id, setId] = useState(11);
    const [lat, setLat] = useState(35.0968275 + 0.01);
    const [lon, setLon] = useState(128.8538282 + 0.01);
    const [title,setTitle] = useState('불가사리');
    const [newData, setNewData] = useState([]);


    const toastRef = useRef();
    const showCopyToast = useCallback(() => {
        toastRef.current.show(`유저 ${id}님이 ${title} 을/를 낚았습니다!!`);
      }, [id,title]);
    
      const handleUpdate = () => {
        // 서버로 보낼 데이터 객체를 생성합니다.
        const newData = {
          id : id,
          size : 40,
          title : title,
          latitude : lat,
          longitude : lon,
          src1 : "https://i.pinimg.com/564x/19/02/bf/1902bfda106132319c2d38f9341bcc8b.jpg"
          // 다른 원하는 속성들을 추가할 수 있습니다.
        };
    
        // 서버로 POST 요청을 보냅니다.
        axios.post("http://192.168.166.11:8082/update", newData)
          .then((response) => {
              // console.log("서버 응답:", response.data);
            // console.log('res= ',response.data)
            showCopyToast({id : response.data[response.data.length - 1].id, title: response.data[response.data.length - 1].title})
            
            setTotalMarker(response.data);
            setNewData((prev)=>[...prev,response.data[response.data.length - 1]])
            setId(prevId => prevId + 1);
            setLat(prevLat => prevLat + Math.random()*0.12);
            setLon(prevLon => prevLon - Math.random()*0.12);
          })
          .catch((error) => {
            console.error("데이터 업데이트 오류:", error);
          });
      };
    


    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map}
                initialRegion={{
                    latitude: 35.0968275,
                    longitude: 128.8538282,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                rotateEnabled={false}
                // zoomEnabled={false}

                >
                {totalMarker.map((item,index) => (
                    <Marker
                        key = {index}
                        coordinate={{
                        latitude: item.latitude,
                        longitude: item.longitude
                    }}
                        title={String(item.id)}
                        description={item.title}
                        icon={require("./assets/location.png")}
                    />
                ))}
                
            </MapView>
            
            <View style={{position:'absolute',marginHorizontal:30, marginVertical : 30}}>
                <Toast ref={toastRef}
                    position='top'
                    // positionValue={300}
                    fadeInDuration={200}
                    fadeOutDuration={3000}
                    style={{
                        backgroundColor:'#636363',
                        borderRadius : 20,
                        width : 300,
                        marginLeft:330,
                        marginTop:-20
                    }}
                    opacity={0.8}
                    textStyle={{color:'white', fontSize:17}}
                    />
            </View>
            
            <View style={{position:'absolute', top:50, right:20}}>
                {newData.length !== 0 ?
                    <TouchableOpacity onPress={()=>console.log(newData)}>
                        <Image style={{width:50, height:50}} source={require("./assets/bell.png")}/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={()=>setNewData((prev)=>[...prev,1])}>
                        <Text>add data</Text>
                    </TouchableOpacity>
                }
                
            </View>

            <View style={{position:'absolute', bottom:120, marginHorizontal:30}}>
                <TouchableOpacity onPress={handleUpdate}>
                    <Entypo name="camera" size={50} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
	container:{
      flex:1
    },
  	map:{
	  width: "100%",
  	  height : "100%"
	},
})