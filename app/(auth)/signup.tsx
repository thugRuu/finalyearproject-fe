// SignUpScreen.js
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import Slider from "@react-native-community/slider";

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Button,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import {  SignUpData } from "@/interceptor/services/userService";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type IUser = {
  email: string;
  username: string;
  password: string;
};

export const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  role: z.string(),
});
const SignUpScreen = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      role: "user",
      username: "",
      password: "",
      // test: 0,
    },
  });
  const [sliderValue, setSliderValue] = useState(0);
  const [message, setMessage] = useState("");
  const onSubmit = (data: z.infer<typeof userSchema>) => {
    SignUpData({ data }).then((r) => setMessage(r.data.message));
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </View>

        {/* <Controller
          control={control}
          name="test"
          render={({ field: { value, onChange } }) => (
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={1}
              maximumValue={100}
              value={sliderValue}
              onValueChange={(newValue) => {
                setSliderValue(newValue);
                onChange(newValue);
              }}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />
          )}
        /> */}
        <View>
          <Text>{message}</Text>
        </View>
        <Controller
          control={control}
          name="username"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              placeholder="username"
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <Controller
          control={control}
          name="role"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              placeholder="email"
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              placeholder="password"
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <Pressable onPress={handleSubmit(onSubmit)}>
          <Text>submit</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f2f2f2",
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
  },
  form: {
    flex: 1,
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  signUpPressable: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    borderRadius: 8,
  },
  footer: {
    alignItems: "center",
    marginBottom: 30,
  },
  footerText: {
    fontSize: 16,
    color: "#666",
  },
  signInLink: {
    color: "#3498db",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
