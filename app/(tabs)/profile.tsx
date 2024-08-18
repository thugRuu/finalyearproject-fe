import { getStringValue } from "@/hooks/getStringValue";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type profileData = {
  _id: string;
  token: string;
  username: string;
};
export default function profile() {
  const [profileData, setProfileData] = useState<profileData>({
    _id: "",
    token: "",
    username: "",
  });
  getStringValue("details").then((response) => setProfileData(response!));

  return (
    <SafeAreaView>
      <View>
        <Text>Hello {profileData.username}</Text>
      </View>
    </SafeAreaView>
  );
}
