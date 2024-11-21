import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, TextInput, Button, Alert, Pressable } from "react-native";
import { z } from "zod";
import { SafeAreaView } from "react-native-safe-area-context";

export const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  country: z.string(),
  city: z.string(),
});

export default function Index() {
  const [profile, setProfile] = useState({
    username: "",
    _id: "",
    token: "",
    password:""
  });

  const route = useRoute();
  const router = useRouter();

  const { id } = route.params as { id: string }; // Ensure `id` exists

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "user",
      username: "",
      email: "",
      country: "",
      city: "",
      password:""
    },
    mode: "onBlur",
  });

  // Fetch user data and update the form
  useEffect(() => {
    if (id) {
      axios
        .get(`https://finalyearproject-be.onrender.com/api/user/${id}`)
        .then((response) => {
          const data = response.data;
          reset({
            role: "user",
            username: data.username || "",
            email: data.email || "",
            country: data.country || "",
            city: data.city || "",
            password:data.password || "",
          });
        })
        .catch((error) => console.error("Error fetching user data:", error));
    } else {
      console.error("Error: Missing user ID");
    }
  }, [id, reset]);

  // Handle form submission
  const onSubmit = (formData: {
    username: string;
    email: string;
    country: string;
    city: string;
  }) => {
    Alert.alert("Success", "User profile updated successfully You will be redirected to login page.");

    axios
      .put(`https://finalyearproject-be.onrender.com/api/user/${id}`, formData)
    .then(()=>{ router.push("/(tabs)")})
      .catch((error) => {
        console.error("Error updating user data:", error);
        Alert.alert("Error", "Failed to update user profile.");
      });
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-[#F6ECC9]">
      <Text className="text-3xl rounded-lg p-4 bg-[#FFE0B5] text-center font-semibold text-gray-800 mb-2">User Profile</Text>

      {/* Username Field */}
      <View className="mb-4">
        <Text className="text-xl font-bold mb-2">Username</Text>
        <Controller
          control={control}
          name="username"
          rules={{ required: "Username is required" }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              autoCapitalize="none"
              className="border border-gray-300 rounded-lg p-3 text-lg"
              placeholder="Enter your username"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
        {errors.username && (
          <Text className="text-red-500 mt-1">{errors.username.message}</Text>
        )}
      </View>

      {/* Email Field */}
      <View className="mb-4">
        <Text className="text-xl font-bold mb-2">Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              className="border border-gray-300 rounded-lg p-3 text-lg"
              placeholder="Enter your email"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && (
          <Text className="text-red-500 mt-1">{errors.email.message}</Text>
        )}
      </View>

      {/* Country Field */}
      <View className="mb-4">
        <Text className="text-xl font-bold mb-2">Country</Text>
        <Controller
          control={control}
          name="country"
          rules={{ required: "Country is required" }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              autoCapitalize="words"
              className="border border-gray-300 rounded-lg p-3 text-lg"
              placeholder="Enter your country"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
        {errors.country && (
          <Text className="text-red-500 mt-1">{errors.country.message}</Text>
        )}
      </View>

      {/* City Field */}
      <View className="mb-4">
        <Text className="text-xl font-bold mb-2">City</Text>
        <Controller
          control={control}
          name="city"
          rules={{ required: "City is required" }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              autoCapitalize="words"
              className="border border-gray-300 rounded-lg p-3 text-lg"
              placeholder="Enter your city"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
        {errors.city && (
          <Text className="text-red-500 mt-1">{errors.city.message}</Text>
        )}
      </View>

      {/* Submit Button */}
      <Pressable className="text-xl font-bold bg-black rounded-2xl text-white py-3 text-center" onPress={handleSubmit(onSubmit)} >
        
        <Text className="text-lg text-white text-center">
          Submit
          </Text>
        </Pressable>
    </SafeAreaView>
  );
}
