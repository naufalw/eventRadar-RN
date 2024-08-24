import { Redirect, router } from "expo-router";
import { View } from "react-native";

export default function Useless() {
  return <Redirect href={"/(tabs)/feed"} />;
}
