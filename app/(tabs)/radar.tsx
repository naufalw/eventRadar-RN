import { Animated, Image, Pressable, StyleSheet, View } from "react-native";
import { MapPin } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { router } from "expo-router";

export default function Radar() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loopAnimation = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000, // fade in duration
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.6,
          duration: 1000, // fade out duration
          useNativeDriver: true,
        }),
      ]).start(() => loopAnimation()); // Restart after it finishes
    };

    loopAnimation();
  }, [fadeAnim]);

  return (
    <View style={{height:"100%"}}>
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          opacity: fadeAnim,
        }}
      >
        <View
          style={{
            width: "95%",
            aspectRatio: 1,
            backgroundColor: "#0D7C66",
            borderRadius: 99999,
            borderColor: "green",
            borderWidth: 3,
          }}
        >
          <View
            style={{
              width: "60%",
              aspectRatio: 1,
              backgroundColor: "#40A578",
              borderRadius: 99999,
              borderColor: "green",
              borderWidth: 3,
              margin: "auto",
            }}
          >
            <View
              style={{
                width: "10%",
                aspectRatio: 1,
                backgroundColor: "red",
                borderRadius: 99999,
                borderColor: "white",
                borderWidth: 3,
                margin: "auto",
              }}
            ></View>
          </View>
        </View>
      </Animated.View>
      <View style={{backgroundColor:'pink', height:50, width:50, margin:"auto", position:"absolute", top:400, left:50, borderRadius:9999, overflow:"hidden", borderWidth:2, borderColor:"white"}}  >
        <Image source={{uri: "https://res.cloudinary.com/dpjgixhil/image/upload/v1724541559/PHOTO-2024-08-25-09-19-05.jpg"}} style={styles.image} />
      </View>
      <View style={{backgroundColor:'pink', height:50, width:50, margin:"auto", position:"absolute", top:350, left:200, borderRadius:9999, overflow:"hidden", borderWidth:2, borderColor:"white"}}  >
        <Image source={{uri: "https://res.cloudinary.com/dpjgixhil/image/upload/v1724541623/WhatsApp_Image_2024-08-25_at_09.19.05.jpg"}} style={styles.image} />
      </View>
      <View style={{backgroundColor:'pink', height:50, width:50, margin:"auto", position:"absolute", top:500, left:150, borderRadius:9999, overflow:"hidden", borderWidth:2, borderColor:"white"}}  >
        <Image source={{uri: "https://res.cloudinary.com/dpjgixhil/image/upload/v1724541656/WhatsApp_Image_2024-08-25_at_09.19.05_1.jpg"}} style={styles.image} />
      </View>
      <Pressable onPress={()=>router.push("/(tabs)/clips")} style={{backgroundColor:'pink', height:50, width:50, margin:"auto", position:"absolute", top:300, left:150, borderRadius:9999, overflow:"hidden", borderWidth:2, borderColor:"white"}}  >
        <Image source={{uri: "https://res.cloudinary.com/dpjgixhil/image/upload/v1724542289/Screenshot_2024-08-25_at_09.29.57_qgwtjw.png"}} style={styles.image} />
      </Pressable>

    </View>
  );
}

const Avatar = ({ source } : {source:any}) => {  
  return (  
      <View style={[styles.avatar, { width: 50, height: 50 }]}>  
          <Image source={{uri:source}} style={styles.image} />  
      </View>  
  );  
};  

const styles = StyleSheet.create({  
  avatar: {  
      borderRadius: 50, // makes it circular  
      overflow: 'hidden'  
  },  
  image: {  
      width: '100%',  
      height: '100%',  
  },  
});  
