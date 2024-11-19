import { useEffect, useState } from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

type ProfileData = {
  _id: string;
  token: string;
  username: string;
};

type IBlof = {
  title: string;
  date: string;
  content: string;
  author: string;
  imageURL: string;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<IBlof[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://192.168.1.73:8000/api/blogs");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView className="bg-green-50 flex-1">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="px-4 py-6">
          {blogs.length > 0 ? (
            blogs.map((data, i) => (
              <TouchableOpacity key={i} className="mb-6">
                <View className="bg-white shadow-lg rounded-lg overflow-hidden">
                  {data.imageURL && (
                    <Image
                      source={{ uri: data.imageURL }}
                      style={{ width: "100%", height: 200, resizeMode: "cover" }}
                    />
                  )}
                  <View className="p-4">
                    <Text className="text-xl font-semibold text-gray-800">{data.title}</Text>
                    <Text className="text-sm text-gray-600 my-2">{data.author} - {data.date}</Text>
                    <Text className="text-base text-gray-700">{data.content.slice(0, 100)}...</Text>
                    <TouchableOpacity className="mt-4 bg-green-500 text-white py-2 px-4 rounded-full">
                      <Text className="text-center text-white">Read More</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-center text-gray-600">No blogs available at the moment.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
