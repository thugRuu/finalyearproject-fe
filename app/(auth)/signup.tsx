// SignUpScreen.js
import { Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";

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
import axiosInterceptor from "@/interceptor/axiosinterceptor";

export const userSchema = z.object({
  username: z.string(),
  password: z.string(),

  email: z.string().email(),
  country: z.string(),
  city: z.string(),
  role: z.string(),
});

const SignUpScreen = () => {
  const router = useRouter();
  const { control, handleSubmit, reset, formState:{errors} , getValues } = useForm({
    defaultValues: {
      role: "user",
      username: "",
      password: "",
      email: "",
      country: "",
      confirmPassword:"",
      city: "",
      // test: 0,
    },
    mode: "onBlur"
  });
  const [sliderValue, setSliderValue] = useState(0);
  const [message, setMessage] = useState("");
  const onSubmit = (data: z.infer<typeof userSchema>) => {
    console.log("data",data)
    axiosInterceptor.post("/user", data).then((response)=> console.log("UserRegister Response", response.data)).then(()=>reset()).catch((e)=> console.log(e))
   
  };
  return (
    <>
      <SafeAreaView className="flex-1 p-4 bg-[#F6ECC9]">
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
                rules={{ required: "Email is required" }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    autoCapitalize="none"
                    className="bg-transparent focus:bg- border border-solid placeholder:text-xl h-10 rounded-lg px-3"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
               {errors.email && (
    <Text className="text-red-500">{errors.email.message}</Text>
  )}
            </View>
            <View>
              <Text className="text-xl">Username</Text>
              <Controller
                control={control}
                name="username"
                rules={{ required: "Username is required" }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    autoCapitalize="none"
                    className="bg-transparent focus:bg- border border-solid placeholder:text-xl h-10 rounded-lg px-3"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
               {errors.username && (
    <Text className="text-red-500">{errors.username.message}</Text>
  )}
            </View>
            {/* <View>
              
              <Text className="text-xl">Password</Text>
              <Controller
                control={control}
                name="password"
                rules={{ required: "Password is required" }}
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
               {errors.password && (
    <Text className="text-red-500">{errors.password.message}</Text>
  )}
            </View> */}
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
  {errors.password && (
    <Text className="text-red-500">{errors.password.message}</Text>
  )}
</View>

<View>
  <Text className="text-xl">Confirm Password</Text>
  <Controller
    control={control}
    name="confirmPassword"
    rules={{
      required: "Confirm Password is required",
      validate: (value) =>
        value === getValues("password") || "Passwords do not match",
    }}
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
  {errors.confirmPassword && (
    <Text className="text-red-500">{errors.confirmPassword.message}</Text>
  )}
</View>
            
              <View className="">
                <Text className="text-xl">Country</Text>
                <Controller
                  control={control}
                  name="country"
                  rules={{ required: "Country is required" }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextInput
                      className="bg-transparent focus:bg- border border-solid placeholder:text-xl h-10 rounded-lg px-3"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                 {errors.country && (
    <Text className="text-red-500">{errors.country.message}</Text>
  )}
              </View>
              <View className="">
                <Text className="text-xl">City</Text>
                <Controller
                  control={control}
                  name="city"
                  rules={{ required: "City is required" }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextInput
                      className="bg-transparent focus:bg- border border-solid placeholder:text-xl h-10 rounded-lg px-3"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                 {errors.city && (
    <Text className="text-red-500">{errors.city.message}</Text>
  )}
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
            <View className="pt-4">
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
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignUpScreen;
