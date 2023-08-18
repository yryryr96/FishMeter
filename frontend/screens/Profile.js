import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "react-native-paper";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [myinfo, setInfo] = useState(true);
  const dummy = {
    nickname: "망나니",
  };

  const info = () => setInfo(true);
  
  const [nickname, setNickname] = useState(dummy["nickname"]);
  
  //프로필 이미지 선택 및 수정
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const handleSaveProfile = () => {
    
    console.log("프로필이 업데이트되었습니다!");
    console.log("새로운 닉네임:", nickname);
  };

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage}>
            {image ? ( // image 값이 존재하는 경우 이미지를 표시
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
              // image 값이 null인 경우 디폴트 이미지 표시
              <Image
                source={require("../assets/DefaultProfile.png")}
                style={styles.profileImage}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity onPress={pickImage}>
            <Text
              style={{
                color: "grey",
                fontWeight: "bold",
              }}
            >
              사진 변경
            </Text>
          </TouchableOpacity>
        </View>
        
        {myinfo ? (
          <View style={styles.infocontainer}>
            <Text style={styles.label}>닉네임</Text>
            <View style={{flexDirection : 'row', alignItems:'center', justifyContent:"space-between"}}>
              
              <View style={{width:"70%",justifyContent:'center'}}>
                <TextInput
                  style={{ backgroundColor: "white"}}
                  mode="outlined"
                  value={nickname}
                  onChangeText={(text) => setNickname(text)}
                />
              </View>
              
              <View style={{width:"25%"}}>
                <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
                  <Text style={styles.buttonText}>저장</Text>
                </TouchableOpacity>
              </View>
            </View>
            
          </View>
        ) : null}
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent:'center'
    
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  button: {
    borderWidth:1,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height:48,
    marginTop:6
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileImage: {
    borderWidth:1,
    width: "40%",
    height: undefined, // height를 undefined로 설정하여 가로세로 비율을 유지하도록 함
    aspectRatio: 1,
    resizeMode: "contain",
    backgroundColor: "white",
    borderRadius: 100,
    marginVertical: 10,
    borderColor: "black",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  Btncontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor:'red'
  },
  
  infocontainer: {
    marginVertical: 10,
  },
});

export default Profile;
