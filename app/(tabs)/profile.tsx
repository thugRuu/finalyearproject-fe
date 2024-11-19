import { getStringValue } from "@/hooks/getStringValue";
import axiosInterceptor from "@/interceptor/axiosinterceptor";
import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { string } from "zod";
import { Image } from 'react-native';
import { Link } from "expo-router";

type ProfileData = {
  _id: string;
  token: string;
  username: string;
};
type QandA = {
  question: string;
  answer: string;
}[];
type INews = {
  title:string,
  description:string,
  urlToImage?:string
}[]
export default function Profile() {
  const [profileData, setProfileData] = useState<ProfileData>({
    _id: "",
    token: "",
    username: "",
  });
  const [answer, setAnswer] = useState<QandA>([{ question: "", answer: "" }]);
  const [loading, setLoading] = useState<boolean>(true); // To manage loading state
  const [profileLoaded, setProfileLoaded] = useState<boolean>(false); // To manage profile loading
  const [newsDetail, setNewsDetail] = useState<INews>([{title:"",description:"", urlToImage:""}]);


  useEffect(() => {
    try{

      const fetchData = async () => {
        try {
          
          axios.get("https://newsapi.org/v2/everything?q=carbon%20footprint&from=2024-11-17&to=2024-11-17&sortBy=popularity&apiKey=c0032902a1694f0fa4a1676908ada906").then(e=> setNewsDetail(e.data.articles)).catch(e => console.log("ubanle to fetch due to high request"))
        } catch (error) {
          console.error("Error fetching  data:", error);
        }
      };
      
      fetchData(); // Fetch profile data
    }catch(e){
     
    }
  }, [newsDetail]);


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

  const articlesWithImage = newsDetail.filter(article => article.urlToImage && article.urlToImage !== "");
  

  return (
    <SafeAreaView className="bg-green-50 flex-1">
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
      <View className="px-4">
        
  
        {loading ? (
          <Text className="text-center text-gray-600">Loading...</Text>
        ) : (
          <View>
            {articlesWithImage.length === 0 ? (
              <View className="p-4 bg-red-100 rounded-lg shadow-md">
                <Text className="text-center text-red-700">
                  Maximum request limit reached for today. Please try again later.
                </Text>
              </View>
            ) : (
              <View>
                <Text className="text-3xl font-semibold text-gray-800 my-3 mb-5">
                  Latest New and Article 
                </Text>
                {articlesWithImage.map((article, index) => (
                  <View
                    key={index}
                    className="mb-6 bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    {/* Article Image */}
                    <Image
                      source={{ uri: article.urlToImage }}
                      style={{ width: '100%', height: 180 }}
                      className="rounded-t-lg"
                    />
  
                    {/* Article Content */}
                    <View className="p-4">
                      <Text className="text-lg font-semibold text-green-800 mb-2">
                        {article.title}
                      </Text>
                      <Text className="text-gray-600 text-sm">
                        {article.description?.substring(0, 100)}...
                      </Text>
                    </View>
  
                    {/* Read More Button */}
                    <View className="p-4 bg-green-100">
                      <Text
                        className="text-green-600 font-medium text-sm"
                        onPress={() => {
                         
                        }}
                      >
                        Read More →
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  </SafeAreaView>
  
  );
}
