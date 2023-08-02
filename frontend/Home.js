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
                    title="아니"
                    description='못하겠다고'
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