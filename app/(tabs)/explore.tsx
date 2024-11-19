import { Pressable, TouchableOpacity } from "react-native";

import { deleteString } from "@/hooks/deleteStringValue";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getStringValue } from "@/hooks/getStringValue";
import { Link, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";

export default function TabTwoScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 p-4 bg-[#a6ccc5]">
      <Pressable
        onPress={async () => {
          await deleteString("details");
          router.replace("/login");
        }}
      >
        <Text className="text-white flex items-center justify-center h-96">
          Logout
        </Text>
      </Pressable>
      {/* <Pressable
        onPress={async () => {
          router.replace("/questions");
        }}
      >
        <Text className="text-white flex items-center justify-center h-96">
          question
        </Text>
      </Pressable> */}
      <Link href="/blogs/111"> question</Link>
      <TouchableOpacity onPress={() => router.push("/blogs/1111")}>
        <Text className="text-blue-500">Go to Blog 111</Text>
      </TouchableOpacity>
    
      <Link href="/questions"> question</Link>
    </SafeAreaView>
  );
}
