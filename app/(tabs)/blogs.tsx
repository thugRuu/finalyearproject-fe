import { useEffect, useState } from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useRouter } from "expo-router";

type ProfileData = {
  _id: string;
  token: string;
  username: string;
};

type IBlof = {
  _id:string;
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
        const res = await axios.get("http://192.168.45.131:8000/api/blogs");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs data:", error);
      }
    };

    fetchData();
  }, []);

  const router = useRouter();


  return (
    <SafeAreaView className="bg-[#F6ECC9] flex-1 space-y-3 p-6">
    
        <Text className="text-3xl p-4 rounded-lg bg-[#FFE0B5] text-center font-semibold text-gray-800 mb-2">
          Blogs
        </Text>
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
      <View className="space-y-3">
      {blogs.length > 0 ? (
        blogs.map((data) => (
          <View key={data._id} className="mb-6 ">
            <View className="bg-[#EFE2CF] shadow-lg rounded-lg overflow-hidden">
              {data.imageURL && (
                <Image
                  source={{ uri: data.imageURL }}
                  style={{ width: '100%', height: 200, resizeMode: 'cover' }}
                />
              )}
              <View className="p-4">
                <Text className="text-xl font-semibold text-gray-800">{data.title}</Text>
                <Text className="text-sm text-gray-600 my-2">{data.author} | {data.date}</Text>
                
                
                <TouchableOpacity
                    // onPress={() => router.push(`/blog/${data._id}`as any)} 
                    onPress={() => router.push(`/blogs/${data._id}`)} 

                  className="mt-4 bg-black text-white py-2 px-4 rounded-lg"
                >
                  <Text className="text-center text-white">Read</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))
      ) : (
        <Text className="text-center text-gray-600">No blogs available at the moment.</Text>
      )}
    </View>
      </ScrollView>
    </SafeAreaView>
  );
}
