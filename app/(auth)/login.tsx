// SignUpScreen.js
import { Link, Redirect, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";

import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { z } from "zod";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { IPutString, putStringValue } from "@/hooks/putStringValue";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStringValue } from "@/hooks/getStringValue";
import axiosInterceptor from "@/interceptor/axiosinterceptor";

export const userSchema = z.object({
  username: z.string(),
  password: z.string(),
});
const SignInScreen = () => {
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      username: "",
      password: "",
      // test: 0,
    },
  });
  const [sliderValue, setSliderValue] = useState(0);
  const [message, setMessage] = useState("");

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    const response = await axiosInterceptor.post("/user/signin", data);
    console.log(response);
    if (!response.data.message) {
      const token = response.data.token;
      await putStringValue(response.data);
      const auth = await getStringValue("details");
      if (auth.token === token) {
        router.replace("/(tabs)");
      }
    }
    reset();
  };

  return (
    <>
      <SafeAreaView className="flex-1 p-4 bg-[#a6ccc5]">
        <ScrollView
          showsVerticalScrollIndicator={false} // Hide vertical scrollbar
          showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
        >
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
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextInput
                      autoCapitalize="none"
                      className="bg-transparent focus:bg- border border-solid placeholder:text-xl h-10 rounded-lg px-3"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
              </View>
              <View>
                <Text className="text-xl">Password</Text>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextInput
                      autoCapitalize="none"
                      className="bg-transparent  border border-solid placeholder:text-xl h-10 rounded-lg px-3"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
              </View>
              <Pressable className="pt-4" onPress={handleSubmit(onSubmit)}>
                <Text
                  className={
                    "text-xl font-bold bg-black rounded-2xl text-white py-3 text-center"
                  }
                >
                  Sign In{" "}
                </Text>
              </Pressable>
              <View>
                <Text>
                  Don't have an Account?{" "}
                  <Link
                    className="text-blue-950 font-bold text-lg"
                    href={"/signup"}
                  >
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     backgroundColor: "#f2f2f2",
//   },
//   header: {
//     marginTop: 60,
//     marginBottom: 40,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   subtitle: {
//     fontSize: 18,
//     color: "#666",
//   },
//   form: {
//     flex: 1,
//   },
//   input: {
//     height: 50,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     borderColor: "#ddd",
//     borderWidth: 1,
//   },
//   signUpPressable: {
//     backgroundColor: "#3498db",
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   footer: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   footerText: {
//     fontSize: 16,
//     color: "#666",
//   },
//   signInLink: {
//     color: "#3498db",
//     fontWeight: "bold",
//   },
// });

export default SignInScreen;
