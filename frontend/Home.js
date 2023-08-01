import { View, StyleSheet } from 'react-native';
import {Marker} from 'react-native-maps';
import MapView from 'react-native-maps';

export default function Home() {

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
                <Marker
                    coordinate={{
                    latitude: 35.0968275,
                    longitude: 128.8538282,
                }}
                    title="하이"
                    description="테스트"
                    icon={{uri : "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDdfMjU5/MDAxNjIzMDcxOTIzNzEz.6dUa0UQGoXgrAqyPJtkbzU4oMn069zjD6qbNKwSlCsIg.VSexkq13-JCdjvGLbiv-vsawdrcrvG9dCq8_sAvzAOcg.JPEG.bestehno1/IMG_4495.jpg?type=w300"}}
                    
                />
            
            </MapView>
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