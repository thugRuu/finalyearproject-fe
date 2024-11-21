import React, { useEffect, useState } from 'react';
import { Text, View , ScrollView ,BackHandler} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import RenderHtml from 'react-native-render-html';
import axios from 'axios';

type IBlog = {
  "_id":string,
  "title":string,
  "imageURL":string,
  "date":string,
  "content":string,
  "author":string
}

const BlogScreen: React.FC = () => {
  const route = useRoute();
const router = useRouter();
  useEffect(() => {
    const backAction = () => {
      router.replace("/(tabs)/blogs");  // Navigate back to the previous page
      return true;  // Prevent the default behavior (exit app or other actions)
    };

    // Add the back button listener
    BackHandler.addEventListener('hardwareBackPress', backAction);

    // Cleanup the listener when the component unmounts
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);
  // Use the useRoute hook to access the route params
 
  const [blogDetail, setBlogDetails] = useState<IBlog>();
  
  // Access the dynamic 'id' parameter from the route params
  const { id } = route.params as { id: string };

  useEffect(() => {

    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`https://finalyearproject-be.onrender.com/api/blogs/${id}`);
        setBlogDetails(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } 
    };

    fetchAnswers(); // Fetch blog details
  }, [id]);

  const htmlContent = blogDetail?.content || ''; // Fallback to an empty string if content is undefined

  return (
    <SafeAreaView className="flex-1 bg-[#F6ECC9]">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="mb-8">
          {/* Blog Title */}
          <Text className="text-3xl font-bold text-gray-800 mb-4">{blogDetail?.title}</Text>
          
          {/* Author and Date */}
          <Text className="text-sm  mb-2">Author: {blogDetail?.author}</Text>
          <Text className="text-sm  mb-4">Published Date: {blogDetail?.date}</Text>

          {/* Render HTML content */}
          <RenderHtml contentWidth={300} source={{ html: htmlContent }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BlogScreen;
