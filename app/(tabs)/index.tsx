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
import axiosInterceptor from "@/interceptor/axiosinterceptor";
import { string } from "zod";

type ProfileData = {
  _id: string;
  token: string;
  username: string;
};
type analysisType = {
  _id: string;
  userId: {
    id: string;
    username: string;
  };
  analysis: {
    question: {
      _id: string;
      question: string;
    };
    answer: string;
    _id: string;
  }[];
  carbonFootprint: string;
}[];

export default function HomeScreen() {
  const [profileData, setProfileData] = useState<ProfileData>({
    _id: "",
    token: "",
    username: "",
  });
  const [analysis, setAnalysis] = useState<analysisType>([
    {
      _id: "",
      userId: {
        id: "",
        username: "",
      },
      analysis: [
        {
          question: {
            _id: "",
            question: "",
          },
          answer: "",
          _id: "",
        },
      ],
      carbonFootprint: "",
    },
  ]);
  const [rec, setRec] = useState([""]);
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
  useEffect(() => {
    const analysisData = async () => {
      try {
        const res = await axiosInterceptor.get(`/analysis/` + profileData._id);
        setAnalysis(res.data);
      } catch (e) {
        console.log("e:", e);
      }
    };
    analysisData();
  }, []);

  useEffect(() => {
    const recomendation = async () => {
      try {
        const res = await axiosInterceptor.get(`sugession/` + profileData._id);
        setRec(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    recomendation();
  }, [profileData._id]);
  const carbonFP = analysis[0].carbonFootprint;
  return (
    <SafeAreaView className="flex-1 py-6 px-4 bg-[#a6ccc5]">
      <ScrollView>
        {/* Header Section */}
        <View className="flex ">
          <Text className="text-4xl font-bold">
            Hello {profileData.username}
          </Text>
          <Text className="text-lg text-gray-500 mt-2">
            Track your carbon footprint & make smart choices
          </Text>
        </View>
        <View>
          <Text className="text-4xl font-extrabold">{carbonFP} kg CO₂e</Text>
        </View>

        {/* Swipeable Tips */}
        <View className="mt-8">
          <Text className="text-center text-lg font-bold mb-4">
            Sustainability Tips
          </Text>
          <View className="w-full space-y-6">
            {rec.map((data, i) => (
              <View key={i}>
                <View className="bg-yellow-100 p-4 rounded-lg w-60">
                  <Text className="text-lg font-semibold">{data}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
