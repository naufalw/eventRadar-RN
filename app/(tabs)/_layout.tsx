import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, router } from "expo-router";
import { Button, Pressable } from "react-native";

import { Clapperboard, TicketPlus, Radar } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#121212",
          borderTopColor: "#121212",
          height: 90,
        },
        tabBarActiveTintColor: "#FF8834",
      }}
    >
      <Tabs.Screen
        name="clips"
        options={{
          title: "Clips",
          headerTitleAlign: "left",
          headerTitle: "Nearby Events",
          headerBackgroundContainerStyle: {
            backgroundColor: "black",
            opacity: 0.1,
            paddingBottom: 100,
          },
          headerTitleStyle: {
            color: "#FFFFFF",
            fontSize: 24,
            fontFamily: "Inter_900Black",
          },
          headerStyle: { backgroundColor: "#000000" },
          headerTransparent: true,
          tabBarIcon: ({ color }) => <Clapperboard color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerTitleAlign: "left",
          headerTitle: "Create Event",
          headerBackgroundContainerStyle: {
            backgroundColor: "black",
            opacity: 0.1,
            paddingBottom: 100,
          },
          headerTitleStyle: {
            color: "#FFFFFF",
            fontSize: 24,
            fontFamily: "Inter_900Black",
          },
          headerStyle: { backgroundColor: "#000000" },
          headerTransparent: true,
          tabBarIcon: ({ color }) => <TicketPlus color={color} />,
        }}
      />
      <Tabs.Screen
        name="radar"
        options={{
          title: "Radar",
          headerTitleAlign: "left",
          headerTitle: "Radar",
          headerBackgroundContainerStyle: {
            backgroundColor: "black",
            opacity: 0.1,
            paddingBottom: 100,
          },
          headerTitleStyle: {
            color: "#FFFFFF",
            fontSize: 24,
            fontFamily: "Inter_900Black",
          },
          headerStyle: { backgroundColor: "#000000" },
          headerTransparent: true,
          tabBarIcon: ({ color }) => <Radar color={color} />,
        }}
      />
    </Tabs>
  );
}
