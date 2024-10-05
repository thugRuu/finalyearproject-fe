import { getStringValue } from "@/hooks/getStringValue";
import axiosInterceptor from "@/interceptor/axiosinterceptor";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { string } from "zod";

type ProfileData = {
  _id: string;
  token: string;
  username: string;
};
type QandA = {
  question: string;
  answer: string;
}[];
export default function Profile() {
  const [profileData, setProfileData] = useState<ProfileData>({
    _id: "",
    token: "",
    username: "",
  });
  const [answer, setAnswer] = useState<QandA>([{ question: "", answer: "" }]);
  const [loading, setLoading] = useState<boolean>(true); // To manage loading state
  const [profileLoaded, setProfileLoaded] = useState<boolean>(false); // To manage profile loading
  console.log(answer);

  // Fetch profile data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStringValue("details");
        setProfileData(response!); // Ensure response is not null
        setProfileLoaded(true); // Mark profile as loaded
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData(); // Fetch profile data
  }, []); // Empty dependency array means this will run once on mount

  // Fetch answers after profile data is loaded
  useEffect(() => {
    if (!profileLoaded) return; // Do not fetch answers if profile is not loaded

    const fetchAnswers = async () => {
      try {
        const response = await axiosInterceptor.get(
          `/analysis/answer/` + profileData._id
        );
        setAnswer(response.data);
      } catch (error) {
        console.error("Error fetching answers:", error);
      } finally {
        setLoading(false); // Stop loading spinner when data is fetched
      }
    };

    fetchAnswers(); // Fetch answers
  }, [profileData._id, profileLoaded]); // Run when profileData._id or profileLoaded changes

  return (
    <SafeAreaView>
      <View>
        <Text className="text-rose-600">Hello {profileData.username}</Text>
        {loading ? (
          <Text>Loading...</Text> // Display a loading message while fetching data
        ) : (
          <View>
            {answer.map((ans, i) => (
              <View key={i}>
                <Text>question:{ans.question}</Text>

                <Text>Answer:{ans.answer}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      <View className="flex items-center mt-4 space-y-4">
        <TouchableOpacity className="bg-purple-600 py-3 px-8 rounded-full">
          <Text className="text-white text-lg font-semibold">Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-100 py-3 px-8 rounded-full">
          <Text className="text-gray-800 text-lg font-semibold">
            Log In / Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
