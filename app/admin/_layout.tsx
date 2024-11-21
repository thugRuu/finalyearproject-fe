import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { getStringValue } from "@/hooks/getStringValue";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Redirect, Tabs } from "expo-router";
import { useState } from "react";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    return(

    
<Tabs screenOptions={{
    tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
    headerShown: false,
}}>
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
          name="manage"
          options={{
              title: "Profile",
              tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon
                  name={focused ? "code-slash" : "code-slash-outline"}
                  color={color}
                  />
                ),
            }}
            />
               <Tabs.Screen
          name="halla"
          options={{
              title: "Profile",
              tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon
                  name={focused ? "code-slash" : "code-slash-outline"}
                  color={color}
                  />
                ),
            }}
            />
 
</Tabs>
)
}