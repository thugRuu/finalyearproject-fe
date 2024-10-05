import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { getStringValue } from "@/hooks/getStringValue";

type ProfileData = {
  _id: string;
  token: string;
  username: string;
};

export default function HomeScreen() {
  const [profileData, setProfileData] = useState<ProfileData>({
    _id: "",
    token: "",
    username: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStringValue("details");
        setProfileData(response!); // Ensure response is not null
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    console.log(profileData);

    fetchData(); // Fetch profile data
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-[#a6ccc5]">
      <ScrollView>
        {/* Header Section */}
        <View className="flex py-6 px-4">
          <Text className="text-4xl font-bold">
            Hello {profileData.username}
          </Text>
          <Text className="text-lg text-gray-500 mt-2">
            Track your carbon footprint & make smart choices
          </Text>
        </View>

        {/* CTA Buttons */}

        {/* Feature Overview (Swipeable Cards) */}
        <View className="mt-8">
          <View className="flex flex-row flex-wrap justify-between gap-8 px-4">
            <View className="bg-purple-100 p-4 rounded-lg w-[50%]">
              <Text className="text-lg font-semibold">
                Calculate Your Carbon Footprint
              </Text>
              <Text className="text-sm text-gray-500 mt-2">
                Enter your details to get started.
              </Text>
            </View>

            <View className="bg-green-100 p-4 rounded-lg w-[50%]">
              <Text className="text-lg font-semibold">
                Personalized Suggestions
              </Text>
              <Text className="text-sm text-gray-500 mt-2">
                Get AI-driven advice to reduce impact.
              </Text>
            </View>

            <View className="bg-blue-100 p-4 rounded-lg w-[50%]">
              <Text className="text-lg font-semibold">Track Your Progress</Text>
              <Text className="text-sm text-gray-500 mt-2">
                See how you’ve improved over time.
              </Text>
            </View>
          </View>
        </View>

        {/* Progress Snapshot (If Logged In) */}
        <View className="flex items-center mt-8">
          <Text className="text-lg font-bold">
            Your Last Carbon Footprint: 1.2 Tons CO2
          </Text>
          <TouchableOpacity className="mt-2">
            <Text className="text-purple-600">View Full Report →</Text>
          </TouchableOpacity>
        </View>

        {/* Swipeable Tips */}
        <View className="mt-8">
          <Text className="text-center text-lg font-bold mb-4">
            Sustainability Tips
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row space-x-4 px-4"
          >
            <View className="bg-yellow-100 p-4 rounded-lg w-60">
              <Text className="text-lg font-semibold">Reduce Food Waste</Text>
              <Text className="text-sm text-gray-500 mt-2">
                Meal planning can help!
              </Text>
            </View>
            <View className="bg-pink-100 p-4 rounded-lg w-60">
              <Text className="text-lg font-semibold">
                Use Public Transport
              </Text>
              <Text className="text-sm text-gray-500 mt-2">
                Switch to sustainable transportation.
              </Text>
            </View>
          </ScrollView>
        </View>

        {/* Quick Actions */}
        {/* <View className="mt-8 flex-row justify-center space-x-8">
          <TouchableOpacity className="items-center">
            <HomeIcon className="text-purple-600" />
            <Text className="text-sm">Calculate</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <SuggestionsIcon className="text-green-600" />
            <Text className="text-sm">Suggestions</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <ResultsIcon className="text-blue-600" />
            <Text className="text-sm">Results</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}
