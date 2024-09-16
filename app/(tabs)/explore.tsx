import { Pressable } from "react-native";

import { deleteString } from "@/hooks/deleteStringValue";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getStringValue } from "@/hooks/getStringValue";
import { Link, useRouter } from "expo-router";

export default function TabTwoScreen() {
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
      <Link href="/questions"> question</Link>
    </SafeAreaView>
  );
}
