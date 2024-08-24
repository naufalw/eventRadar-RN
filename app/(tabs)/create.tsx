import { View, TextInput, Text, Button, Pressable } from "react-native";
import { useForm } from "react-hook-form";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native";
import Snackbar from "react-native-snackbar";
import Toast from "react-native-root-toast";

import ApiVideoUploader from "@api.video/react-native-video-uploader";
import { Video } from "expo-av";
import { ToastService } from "react-native-toastier";

export default function CreateClip() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => console.log(values);

  const [date, setDate] = useState(new Date());
  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());
  const [organizer, setOrganizer] = useState("");
  const [googleMap, setgoogleMap] = useState("");
  const [videoLink, setVideoLink] = useState("");

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate;
    setTimeEnd(currentDate);
  };

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate;
    setTimeStart(currentDate);
  };

  const onChangeGoogleMap = (googlemaplink) => {
    setgoogleMap(googlemaplink);
  };

  const onChangeOrganizer = (organizer) => {
    setOrganizer(organizer);
  };

  const onChangeVideoLink = (organizer) => {
    setVideoLink(organizer);
  };

  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(
    "https://res.cloudinary.com/dpjgixhil/video/upload/v1724514119/dzbpafk4ycxumvc0wopf.mp4"
  );
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    const videos = [
      "https://res.cloudinary.com/dpjgixhil/video/upload/v1724513861/youtube_qS1vsKZ_Ing_1280x720_h264_gbwyrg.mp4",
      "https://res.cloudinary.com/dpjgixhil/video/upload/v1724514033/qxxcq4zx9zau40cz971y.mp4",
      "https://res.cloudinary.com/dpjgixhil/video/upload/v1724514110/qpy7wlizwt9ijnudg06u.mp4",
      "https://res.cloudinary.com/dpjgixhil/video/upload/v1724514119/dzbpafk4ycxumvc0wopf.mp4",
    ];

    setSelectedImage(videos[Math.floor(Math.random() * 4)]);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ paddingHorizontal: 10, paddingTop: 20 }}>
      <Text
        style={{
          color: "#FFFFFF",
          paddingBottom: 10,
          fontFamily: "Inter_600Black",
        }}
      >
        What activity you currently hold?
      </Text>
      <TextInput
        style={{
          height: 50,
          borderColor: "#FFFFFF",
          borderWidth: 2,
          paddingLeft: 8,
          color: "#FFFFFF",
          borderRadius: 8,
        }}
        value={organizer}
        onChangeText={(a) => {
          onChangeOrganizer(a);
        }}
      />
      <Text
        style={{
          color: "#FFFFFF",
          marginTop: 20,
          paddingBottom: 10,
          fontFamily: "Inter_600Black",
        }}
      >
        Date
      </Text>

      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <DateTimePicker
          style={{}}
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChangeDate}
        />

        <DateTimePicker
          testID="dateTimePicker"
          value={timeStart}
          mode="time"
          is24Hour={true}
          onChange={onChangeStart}
        />
        <Text style={{ color: "#FFFFFF", paddingLeft: 8 }}>to</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={timeEnd}
          mode="time"
          is24Hour={true}
          onChange={onChangeEnd}
        />
      </View>
      <Text
        style={{
          color: "#FFFFFF",
          marginBottom: 10,
          marginTop: 12,

          fontFamily: "Inter_600Black",
        }}
      >
        Google Map Link
      </Text>
      <TextInput
        style={{
          height: 50,
          borderColor: "#FFFFFF",
          borderWidth: 2,

          paddingLeft: 8,
          color: "#FFFFFF",
          borderRadius: 8,
        }}
        value={googleMap}
        onChangeText={(text) => {
          onChangeGoogleMap(text);
        }}
      />
      {/* 
      <Button
        title="Hellooo"
        onPress={() =>
          console.log({
            organizer: organizer,
            date: date,
            startAt: timeStart,
            endAt: timeEnd,
            gmaps: googleMap,
          })
        }
      /> */}
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Pressable
        onPress={async () => {
          const form = new FormData();
          form.append("organizer", organizer);
          form.append("date", date.toString());
          form.append("startAt", timeStart.toString());
          form.append("endAt", timeEnd.toString());
          form.append("gmap", googleMap);
          form.append("video", selectedImage);

          fetch("https://eventradar-teal.vercel.app/clips/post", {
            method: "POST",
            body: form,
          });

          let toast = Toast.show("Event upload successful!", {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            containerStyle: {
              borderRadius: 20,
              paddingHorizontal: 6,
              width: 260,
              marginTop: 20,
            },
            backgroundColor: "#379777",
            textColor: "#FFFFFF",
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });

          setTimeout(function () {
            Toast.hide(toast);
          }, 500);
        }}
        style={{
          backgroundColor: "#FF8834",
          marginTop: 10,
          borderRadius: 18,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text style={{ alignSelf: "center", marginVertical: 20 }}>
          Share event!
        </Text>
      </Pressable>
    </View>
  );
}

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "dpjgixhil",
    apiKey: "723219729634661",
    apiSecret: "rgamEhaWPfJ_GrU0VnmTQihjAfo",
  },
});
