import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { getStringValue } from "@/hooks/getStringValue";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Redirect, Tabs } from "expo-router";
import { useState } from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [auth, setAuth] = useState({ username: '', _id: '', token: '',role:'' });

  getStringValue("details").then((a) => setAuth(a!));

  if (auth === null) {
    return <Redirect href="/login" />;
  }
  if(auth.role === 'admin'){
    return <Redirect href="/admin" />;
  }
 
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
          name="blogs"
          options={{
            title: "Blogs",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "code-slash" : "code-slash-outline"}
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
