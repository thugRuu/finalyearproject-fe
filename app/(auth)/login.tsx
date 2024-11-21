import { Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { z } from "zod";
import { IPutString, putStringValue } from "@/hooks/putStringValue";
import { getStringValue } from "@/hooks/getStringValue";
import axiosInterceptor from "@/interceptor/axiosinterceptor";

export const userSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const SignInScreen = () => {
  const router = useRouter();
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [message, setMessage] = useState("");

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    try {
      const response = await axiosInterceptor.post("/user/signin", data);
      
      // Check if token is present in the response
      if (response.data.token) {
        const token = response.data.token;
        
        // Save user data to AsyncStorage
        await putStringValue(response.data);  // Store the data
        
        // Retrieve and verify token
        const auth = await getStringValue("details");
        console.log(auth);

        if (auth.token === token) {
          // Redirect based on role
        
            router.replace("/(tabs)");  // Redirect to user dashboard
          
         
        }
      } else {
        setMessage("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during sign in", error);
      setMessage("Something went wrong. Please try again.");
    }
    reset();
  };

  return (
    <>
      <SafeAreaView className="flex-1 p-4 bg-[#F6ECC9]">
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView>
            <View className="h-56 pt-28 flex flex-col justify-center space-y-2 ">
              <Text className="text-5xl font-bold">Sign In</Text>
              <Text className="text-xl">Sign in to get started</Text>
            </View>
            <View className="flex flex-col space-y-8">
              <View className="h-12">
                <Text>{message}</Text>
              </View>
              <View>
                <Text className="text-xl">Username</Text>
                <Controller
                  control={control}
                  name="username"
                  rules={{ required: "Username is required" }}
                  render={({ field: { value, onChange } }) => (
                    <TextInput
                      autoCapitalize="none"
                      className="bg-transparent border border-solid placeholder:text-xl h-10 rounded-lg px-3"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                {errors.username && <Text className="text-red-500">{errors.username.message}</Text>}
              </View>
              <View>
                <Text className="text-xl">Password</Text>
                <Controller
                  control={control}
                  name="password"
                  rules={{ required: "Password is required" }}
                  render={({ field: { value, onChange } }) => (
                    <TextInput
                      autoCapitalize="none"
                      secureTextEntry
                      className="bg-transparent border border-solid placeholder:text-xl h-10 rounded-lg px-3"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
              </View>
              <Pressable className="pt-4" onPress={handleSubmit(onSubmit)}>
                <Text className="text-xl font-bold bg-black rounded-2xl text-white py-3 text-center">
                  Sign In
                </Text>
              </Pressable>
              <View>
                <Text>
                  Don't have an account?{" "}
                  <Link className="text-blue-950 font-bold text-lg" href={"/signup"}>
                    Sign up
                  </Link>
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignInScreen;
