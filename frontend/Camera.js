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

export default function Camera() {
    const [fishModalVisible, setfishModalVisible] = useState(false);

    const handleButtonPress = () => {
        NativeModules.MyArCoreModule.launchARCoreMeasurement();
    };

    const [receivedData, setReceivedData] = useState({
        category: null,
        length: null,
        imageArray: null,
    });

    const closefishModalVisible = () => {
        setfishModalVisible(false);
    };

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
        <TouchableOpacity>
            <Text style={{fontSize:100}} onPress={handleButtonPress}>카메라</Text>
        </TouchableOpacity>
    </View>
  )
}