import { StyleSheet,Text, View, TouchableOpacity } from "react-native";

export default function Home({navigation}) {
    return (
        <View style={{flex:1, justifyContent:"center"}}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Gps")}>
                    <Text style={styles.text}>스팟 조회</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Dictionary")}>
                    <Text style={styles.text}>도감</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Camera")}>
                    <Text style={styles.text}>카메라</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Feed")}>
                    <Text style={styles.text}>피드</Text>
                </TouchableOpacity>      
                
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ModalTest")}>
                    <Text style={styles.text}>ModalTest</Text>
                </TouchableOpacity>      
                 
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container : {
        flex:0.6,
        justifyContent : "space-between",
        alignItems : "center",
        paddingVertical : 100,
        // height : "50%"

    },
    button : {
        borderRadius : 30,
        backgroundColor : "grey",
        paddingHorizontal : 20,
        paddingVertical : 20,
        width : "80%",
        justifyContent : "center",
        alignItems: "center"
    },
    text : {
        color : "white",
        fontSize : 30,
        fontWeight : "500"
    }
})