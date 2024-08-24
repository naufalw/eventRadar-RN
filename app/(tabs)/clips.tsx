import {
  View,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  RefreshControl,
  StyleProp,
  ViewStyle,
  TextStyle,
  Linking,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import CountDown from "@/components/CountDown";
import { Heart, Share2, MapPinned } from "lucide-react-native";

export default function Clips() {
  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentViewableItemIndex(viewableItems[0].index ?? 0);
    }
  };

  let x = false;

  const [currentViewableItemIndex, setCurrentViewableItemIndex] = useState(0);
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const videos = [
    "https://res.cloudinary.com/dpjgixhil/video/upload/v1724513861/youtube_qS1vsKZ_Ing_1280x720_h264_gbwyrg.mp4",
    "https://res.cloudinary.com/dpjgixhil/video/upload/v1724514033/qxxcq4zx9zau40cz971y.mp4",
    "https://res.cloudinary.com/dpjgixhil/video/upload/v1724514119/dzbpafk4ycxumvc0wopf.mp4",
    "https://res.cloudinary.com/dpjgixhil/video/upload/v1724514110/qpy7wlizwt9ijnudg06u.mp4",
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        style={{ zIndex: 0 }}
        renderItem={({ item, index }) => (
          <Item item={item} shouldPlay={index === currentViewableItemIndex} />
        )}
        keyExtractor={(item) => item}
        pagingEnabled
        horizontal={false}
        showsVerticalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        refreshControl={
          <RefreshControl
            refreshing={x}
            onRefresh={() =>
              fetch("http://localhost:3000/clips/get").then((response) =>
                console.log(response.body)
              )
            }
          />
        }
      />
    </View>
  );
}

const Block = ({
  children,
  style,
  flex = 1,
  row, // <-- add this
  ...props
}: {
  children: React.ReactNode;
  style: StyleProp<TextStyle>;

  flex: number;
  row: boolean;
}) => {
  const blockStyle = StyleSheet.flatten([
    flex !== undefined && { flex },
    row && { flexDirection: "row" }, // <-- add this
    style,
  ]);

  return (
    <View style={blockStyle} {...props}>
      {children}
    </View>
  );
};

const Item = ({ item, shouldPlay }: { shouldPlay: boolean; item: string }) => {
  const video = React.useRef<Video | null>(null);
  const [status, setStatus] = useState<any>(null);
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation();
  const focused = navigation.isFocused();
  var isLastPlaying = false;

  useEffect(() => {
    if (!video.current || !status) return;

    if (shouldPlay) {
      video.current.playAsync();
    } else {
      video.current.pauseAsync();
    }

    if (!focused && shouldPlay) {
      video.current.pauseAsync();
      isLastPlaying = status.isPlaying;
    }
  }, [shouldPlay, focused]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      isLastPlaying ? video.current?.playAsync() : video.current?.pauseAsync();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Pressable
      onPress={() =>
        status.isPlaying
          ? video.current?.pauseAsync()
          : video.current?.playAsync()
      }
    >
      <View
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
      >
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            top: 0,
            marginTop: 110,
            paddingHorizontal: 20,
            borderRadius: 10,
            overflow: "hidden",
            width: Dimensions.get("window").width,
          }}
        >
          <Block
            row
            style={{ flex: 1, flexDirection: "row", gap: 10, paddingTop: 10 }}
          >
            <Block
              style={{
                flexBasis: 50,
                flexShrink: 1,
                alignItems: "center",
                paddingTop: 10,
                shadowColor: "black",
                shadowOpacity: 0.5,
                shadowOffset: 10,
              }}
            >
              <MapPinned size={35} />
            </Block>
            <Block
              style={{
                flex: 1,
                height: 200,
                overflow: "hidden",
                flexBasis: 300,
                flexShrink: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: "white",
                  shadowColor: "black",
                  shadowOpacity: 0.5,
                  shadowOffset: 10,
                }}
              >
                Faris's Birthday Party 🥳🥳
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  color: "white",
                  shadowColor: "black",
                  shadowOpacity: 0.5,
                  shadowOffset: 10,
                }}
              >
                (2.5 km)
              </Text>
            </Block>
          </Block>
        </View>
        <Video
          ref={video}
          source={{ uri: item }}
          style={styles.video}
          isLooping
          resizeMode={ResizeMode.COVER}
          useNativeControls={false}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            bottom: 0,
            marginBottom: 100,
            paddingHorizontal: 20,
            borderRadius: 10,
            overflow: "hidden",
            width: Dimensions.get("window").width,
          }}
        >
          <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
            <BlurView
              tint="light"
              intensity={50}
              style={{
                flex: 1,
                padding: 20,
                height: 200,
                overflow: "hidden",
                borderRadius: 20,
                flexBasis: 300,
                flexShrink: 1,
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 18 }}>
                Will start at:
              </Text>
              <Block style={{ marginTop: 10 }} row>
                <CountDown duration={Math.floor(Math.random() * 7200)} />
              </Block>
              <Pressable
                style={({ pressed }) => [
                  { backgroundColor: pressed ? "#E85C0D" : "#FF8834" },
                  { borderRadius: 15, padding: 10 },
                ]}
                onPress={() => Linking.openURL("https://maps.app.goo.gl/9jJGvT72cCzJ9fou5")}
              >
                <Text
                  style={{ fontSize: 25, textAlign: "center", fontWeight: 700 }}
                >
                  Join now!
                </Text>
              </Pressable>
            </BlurView>
            <Block
              row={false}
              style={{
                flexBasis: 70,
                flexShrink: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 30,
              }}
            >
              <Pressable
                style={{
                  borderRadius: "100%",
                  padding: 15,
                  backgroundColor: "#121212",
                }}
              >
                <Heart color="white" size={35} strokeWidth={2} />
              </Pressable>
              <Pressable
                style={{
                  borderRadius: "100%",
                  padding: 15,
                  backgroundColor: "#121212",
                }}
              >
                <Share2 color="white" size={35} strokeWidth={2} />
              </Pressable>
            </Block>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {},
  video: {
    width: "100%",
    height: "100%",
  },
});
