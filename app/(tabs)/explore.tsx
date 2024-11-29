import { Pressable, TextInput, View } from "react-native";
import { deleteString } from "@/hooks/deleteStringValue";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getStringValue } from "@/hooks/getStringValue";
import { Link, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";

export const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  country: z.string(),
  city: z.string(),
});
export default function TabTwoScreen() {
  const [profile, setProfile] = useState({ username: '', _id: '', token: '' });
  const [userData,setUserData] = useState({ username: '', _id: '', token: '' ,country:'',city:'',email:''})
  const router = useRouter();
  


  useEffect(() => {
    AsyncStorage.getItem('details')
      .then((res) => {
        if (res) {
          const parsedRes = JSON.parse(res);
          setProfile(parsedRes); // Store the parsed profile in the state
        } else {
          console.log('No profile data found');
        }
      })
      .catch((e) => {
        console.log('Error fetching data from AsyncStorage:', e);
      });
  }, []);
  console.log("id",profile._id)
  const { control, handleSubmit, reset, formState:{errors} , getValues } = useForm({
    defaultValues: {
      role: "user",
      username: "",
      email: "",
      country: "",
      city: "",
      // test: 0,
    },
    mode: "onBlur"
  });
  useEffect(()=>{
    if (profile?._id) {
      axios
        .get(`http://192.168.45.131:8000/api/user/${profile._id}`)
        .then((response) => {
          const data = response.data;
          setUserData(data); // Update state with user data
          reset({ // Dynamically set the form values
            role: "user",
            username: data.username,
            email: data.email,
            country: data.country,
            city: data.city,
          });
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }

  },[profile,reset])
  console.log("dsdasfdsdfsdkhkjsdfhkljsdfhglkjsdfhgklsdjfhg",userData.username)

  return (
    <SafeAreaView className="flex-1 p-6 bg-[#EFE2CF]">
      <Text className="text-3xl rounded-lg p-4 bg-[#FFE0B5] text-center font-semibold text-gray-800 mb-2">User Profile</Text>

     <View className="bg-[#EFE2CF] shadow-md rounded-lg p-2 m-4">
      <View className="">
      <View className="p-2 space-y-3">
  <View className=" rounded-lg p-2">
    <Text className="text-lg font-semibold text-gray-700">Username</Text>
    <Text className="text-gray-500">{userData.username}</Text>
  </View>

  <View className=" rounded-lg p-2">
    <Text className="text-lg font-semibold text-gray-700">Email</Text>
    <Text className="text-gray-500">{userData.email}</Text>
  </View>

  <View className=" rounded-lg p-2">
    <Text className="text-lg font-semibold text-gray-700">Country</Text>
    <Text className="text-gray-500">{userData.country}</Text>
  </View>

  <View className=" rounded-lg p-2">
    <Text className="text-lg font-semibold text-gray-700">City</Text>
    <Text className="text-gray-500">{userData.city}</Text>
  </View>
</View>
</View>
    </View>
    <View className="space-y-2">

  
      
  {/* Change User Details Option */}
  <Pressable
        onPress={() => router.push("/questions")}
      >
        <Text className="text-white text-lg font-semibold p-2 text-center rounded-lg bg-black">
          Change Your Details
        </Text>
      </Pressable>
      <Pressable
        onPress={async () => {
          await deleteString("details");
          router.replace(`/editProfile/${profile._id}`);
        }}
      >
        <Text className="text-white text-lg font-semibold p-2 text-center rounded-lg bg-black">
          Edit your profile
        </Text>
      </Pressable>
      {/* Logout Option */}
      <Pressable
        onPress={async () => {
          await deleteString("details");
          router.replace("/login");
        }}
      >
        <Text className="text-white text-lg font-semibold p-2 text-center rounded-lg bg-black">
          Logout
        </Text>
      </Pressable>   
      </View>  
    </SafeAreaView>
  );
}
