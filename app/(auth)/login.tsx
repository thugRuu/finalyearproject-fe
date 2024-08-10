// SignUpScreen.js
import { Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";

import { SignInData } from "@/interceptor/services/userService";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

export const userSchema = z.object({
  username: z.string(),
  password: z.string(),
});
const SignInScreen = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
      // test: 0,
    },
  });
  const [sliderValue, setSliderValue] = useState(0);
  const [message, setMessage] = useState("");

  const onSubmit = (data: z.infer<typeof userSchema>) => {
    SignInData({ data }).then((response) => console.log(response.data));

    console.log(data);
  };
  return (
    <>
      <SafeAreaView className="flex-1 p-4 bg-[#a6ccc5]">
        <ScrollView
          showsVerticalScrollIndicator={false} // Hide vertical scrollbar
          showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
        >
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
