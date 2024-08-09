import { Redirect, router, Tabs } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Text } from "react-native";
import { getStringValue } from "@/hooks/getStringValue";
import { useState } from "react";
import { deleteString } from "@/hooks/deleteStringValue";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [auth, setAuth] = useState("");

  // getStringValue("token").then((a) => setAuth(a!));
  deleteString("token");

  if (!auth) {
    return <Redirect href="/login" />;
  }
  console.log(!auth);
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "code-slash" : "code-slash-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
