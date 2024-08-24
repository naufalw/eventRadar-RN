import { View, TextInput, Text, Button, Pressable } from "react-native";
import { useForm } from "react-hook-form";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native";

import ApiVideoUploader from "@api.video/react-native-video-uploader";
import { Video } from "expo-av";

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
  const [selectedImage, setSelectedImage] = useState("");
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    ApiVideoUploader.uploadWithUploadToken(
      "to13LBTwe2jdHyx0RRED6Y29",
      result.assets![0].uri
    )
      .then((value) => {
        console.log(value);
      })
      .catch((e: any) => {
        console.log(e);
        // Manages error here
      });

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
        Organizer name
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
      />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Pressable
        onPress={handleSubmit((value) => console.log(value))}
        style={{
          backgroundColor: "#FF8834",
          marginTop: 10,
          borderRadius: 18,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text style={{ alignSelf: "center", marginVertical: 20 }}>Heheh</Text>
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
