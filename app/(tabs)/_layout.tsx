import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, router } from "expo-router";
import { Button, Pressable } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "black",
          borderTopColor: "#FFFFFF",
        },
        tabBarActiveTintColor: "#FFFFFF",
      }}
    >
      <Tabs.Screen
        name="clips"
        options={{
          title: "Clips",
          headerTitleAlign: "left",

          headerBackgroundContainerStyle: {
            backgroundColor: "black",
            opacity: 0.1,
            paddingBottom: 110,
          },
          headerTitleStyle: {
            color: "#FFFFFF",
            fontSize: 28,
            fontFamily: "Inter_900Black",
          },
          headerStyle: { backgroundColor: "#000000" },
          headerTransparent: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontFamily: "Inter_900Black",
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="plus" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="radar"
        options={{
          title: "Radar",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontFamily: "Inter_900Black",
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
