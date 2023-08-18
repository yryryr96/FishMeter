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
    name: "김싸피",
    email: "kim@ssafy.com",
    nickname: "망나니",
  };
  const password = () => setInfo(false);
  const info = () => setInfo(true);
  const [username, setUsername] = useState(dummy["name"]);
  const [email, setEmail] = useState(dummy["email"]);
  const [nickname, setNickname] = useState(dummy["nickname"]);
  // 새로운 비밀번호 보이게
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  //새로운 비밀번호 확인
  const [showChangePassword, setshowChangePassword] = useState(false);
  const handleToggleChangePasswordVisibility = () => {
    setshowChangePassword((prevShowPassword) => !prevShowPassword);
  };
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
    // 프로필 데이터를 서버에 저장하거나 API 호출을 수행할 수 있습니다.
    console.log("프로필이 업데이트되었습니다!");
    console.log("새로운 사용자 이름:", username);
    console.log("새로운 이메일:", email);
    console.log("새로운 닉네임:", nickname);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage}>
            {image ? ( // image 값이 존재하는 경우 이미지를 표시
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
              // image 값이 null인 경우 디폴트 이미지 표시
              <Image
                source={require("./assets/Group.png")}
                style={styles.profileImage}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
          <Text
            style={{
              color: "#89C4F6",
              fontWeight: "bold",
            }}
          >
            사진 변경
          </Text>
        </View>
        <View style={styles.Hcontainer}>
          <TouchableOpacity style={styles.headbutton} onPress={info}>
            <Text
              style={{
                ...styles.headbuttonText,
                color: myinfo ? "black" : "white",
              }}
            >
              회원정보
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headbutton} onPress={password}>
            <Text
              style={{
                ...styles.headbuttonText,
                color: !myinfo ? "black" : "white",
              }}
            >
              비밀번호 변경
            </Text>
          </TouchableOpacity>
        </View>
        {/* 회원정보 변경 */}
        {myinfo ? (
          <View style={styles.infocontainer}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              style={{
                color: "black",
                backgroundColor: "#D9D9D9",
              }}
              value={username}
              editable={false}
              selectTextOnFocus={false}
              onChangeText={(text) => setUsername(text)}
            />

            <Text style={styles.label}>이메일</Text>
            <TextInput
              style={{ backgroundColor: "white" }}
              mode="outlined"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text style={styles.label}>닉네임</Text>
            <TextInput
              style={{ backgroundColor: "white" }}
              mode="outlined"
              value={email}
              onChangeText={(text) => setNickname(text)}
            />
          </View>
        ) : null}
        {!myinfo ? (
          <View style={styles.infocontainer}>
            <Text style={styles.label}>새로운 비밀번호</Text>
            <TextInput
              style={styles.input}
              mode="outlined"
              value={email}
              secureTextEntry={!showPassword}
              onChangeText={(text) => setEmail(text)}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={handleTogglePasswordVisibility}
                />
              }
            />

            <Text style={styles.label}>비밀번호 확인</Text>
            <TextInput
              style={styles.input}
              mode="outlined"
              value={email}
              secureTextEntry={!showChangePassword}
              onChangeText={(text) => setEmail(text)}
              right={
                <TextInput.Icon
                  icon={showChangePassword ? "eye-off" : "eye"}
                  onPress={handleToggleChangePasswordVisibility}
                />
              }
            />
          </View>
        ) : null}
        <View style={styles.Btncontainer}>
          <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
            <Text style={styles.buttonText}>저장</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    padding: 16,
    backgroundColor: "#B6CEE2",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 8,
    marginBottom: 16,
    backgroundColor: "white",
    elevation: 4,
    width: "100%",
  },
  button: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "30%", // 버튼 크기 조정
    height: undefined, // height를 undefined로 설정하여 가로세로 비율을 유지하도록 함
    aspectRatio: 2, // 가로:세로 비율을 2:1로 설정 (width:height = 2:1)
    resizeMode: "contain",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  headbutton: {
    backgroundColor: "#89C4F6",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexBasis: 100,
    flexGrow: 1,
    width: "100%",
    height: "100%",
  },
  headbuttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  profileImage: {
    width: "40%",
    height: undefined, // height를 undefined로 설정하여 가로세로 비율을 유지하도록 함
    aspectRatio: 1,
    resizeMode: "contain",
    backgroundColor: "#B6CEE2",
    borderRadius: 30,
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: "black",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
    marginVertical: 10,
  },
  Btncontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 0.5,
    marginVertical: 10,
  },
  Hcontainer: {
    flex: 0.5,
    flexDirection: "row",
    marginVertical: 10,
  },
  infocontainer: {
    flex: 3,
    marginVertical: 10,
  },
});

export default Profile;
