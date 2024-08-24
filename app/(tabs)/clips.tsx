import {
  View,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

export default function Clips() {
  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentViewableItemIndex(viewableItems[0].index ?? 0);
    }
  };

  const [currentViewableItemIndex, setCurrentViewableItemIndex] = useState(0);
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const videos = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
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
      />
    </View>
  );
}

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
            borderRadius: 20,
            overflow: "hidden",
            width: Dimensions.get("window").width,
          }}
        >
          <Pressable style={{}}>
            <BlurView
              tint="light"
              intensity={50}
              style={{
                flex: 1,
                padding: 20,
                height: 200,
                justifyContent: "center",
                overflow: "hidden",
                borderRadius: 20,
              }}
            >
              <Text>Submit</Text>
            </BlurView>
          </Pressable>
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
