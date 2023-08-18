import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Touchable,
  NativeModules,
  NativeEventEmitter,
  Modal,
} from "react-native";
import Fishmodal from "./HomeScreen/Fishmodal";
import { useCallback, useRef, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function Camera({navigation}) {
    const [fishModalVisible, setfishModalVisible] = useState(false);
    const [receivedData, setReceivedData] = useState({
        category: null,
        length: null,
        imageArray: null,
    });

    const closefishModalVisible = () => {
        setfishModalVisible(false);
    };

    const handleButtonPress = () => {
        NativeModules.MyArCoreModule.launchARCoreMeasurement();
    };
   

    useFocusEffect(
        useCallback(()=> {
        handleButtonPress()
          return () => {}
        },[navigation])
      )

    useEffect(() => {    
    const eventEmitter = new NativeEventEmitter();
    const subscription = eventEmitter.addListener(
        "ACTION_DATA_RECEIVED",
        (data) => {
          setReceivedData(data);
          setfishModalVisible(true);
        }
    );

    return () => {
        subscription.remove();
    };
  }, []);

  return (
    <View>
        <Fishmodal
            data={receivedData}
            fishModalVisible={fishModalVisible}
            setfishModalVisible={setfishModalVisible}
          />

    </View>
  )
}