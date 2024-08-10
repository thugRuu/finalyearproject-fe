// SignUpScreen.js
import { Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";

import { SignUpData } from "@/interceptor/services/userService";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import { z } from "zod";
import { SafeAreaView } from "react-native-safe-area-context";

export const userSchema = z.object({
  username: z.string(),
  password: z.string(),

  email: z.string().email(),
  country: z.string(),
  city: z.string(),
  role: z.string(),
});
// .superRefine(({ confirmPassword, password }, ctx) => {
//   if (confirmPassword !== password) {
//     ctx.addIssue({
//       code: "custom",
//       message: "The passwords did not match",
//       path: ["confirmPassword"],
//     });
//   }
// });
const SignUpScreen = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      role: "user",
      username: "",
      password: "",

      email: "",
      country: "",
      city: "",
      // test: 0,
    },
  });
  const [sliderValue, setSliderValue] = useState(0);
  const [message, setMessage] = useState("");
  const onSubmit = (data: z.infer<typeof userSchema>) => {
    SignUpData({ data })
      .then((response) => console.log(response.data))
      .catch((e) => console.log(e));
    console.log(data);
  };
  return (
    <>
      <SafeAreaView className="flex-1 p-4 bg-[#a6ccc5]">
        <ScrollView
          showsVerticalScrollIndicator={false} // Hide vertical scrollbar
          showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
        >
          <View className="flex flex-col justify-center space-y-2 mt-4 ">
            <Text className="text-5xl font-bold">Sign Up</Text>
            <Text className="text-xl">Reduce your Carbon</Text>
          </View>
          <View className="flex  space-y-8 pt-8">
            <View>
              <Text className="text-xl">Email</Text>
              <Controller
                control={control}
                name="email"
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
            {/* <View>
              <Text className="text-xl">Confirm Password</Text>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    className="bg-transparent focus:bg- border border-solid placeholder:text-xl h-10 rounded-lg px-3"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </View> */}
            <View className="flex flex-row justify-between">
              <View className="w-44 ">
                <Text className="text-xl">Country</Text>
                <Controller
                  control={control}
                  name="country"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextInput
                      className="bg-transparent focus:bg- border border-solid placeholder:text-xl h-10 rounded-lg px-3"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
              </View>
              <View className="w-44">
                <Text className="text-xl">City</Text>
                <Controller
                  control={control}
                  name="city"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextInput
                      className="bg-transparent focus:bg- border border-solid placeholder:text-xl h-10 rounded-lg px-3"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
              </View>
            </View>
            <Pressable className="pt-4" onPress={handleSubmit(onSubmit)}>
              <Text
                className={
                  "text-xl font-bold bg-black rounded-2xl text-white py-3 text-center"
                }
              >
                Sign Up{" "}
              </Text>
            </Pressable>
            <View>
              <Text>
                Already have an Account?{" "}
                <Link
                  className="text-blue-950 font-bold text-lg"
                  href={"/login"}
                >
                  Log in
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignUpScreen;
