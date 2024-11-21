import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, Redirect, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView ,Animated, TouchableOpacity, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import Collapsible from 'react-native-collapsible';
 type IAnalysis = {
  _id:string,
userId:{
  _id:string,
  username:string
},
analysis:{
  question:{
    _id:string,
    question:string
  },
  answer:string

}[],
carbonFootprint	:string,
message:string
 }


export default function HomePage() {
  const [analysis, setAnalysis] = useState<IAnalysis | null>(null);
  const [profile, setProfile] = useState({ username: '', _id: '', token: '' });
  const [recommended, setRecommended] = useState([]);
  const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted
  const [isCollapsed, setIsCollapsed] = useState(true);
  const router = useRouter();
  const [animation] = useState(new Animated.Value(0));
 
  const toggleExpand = () => {
    Animated.timing(animation, {
        toValue: isCollapsed ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
    }).start();
    setIsCollapsed(!isCollapsed);
};

const heightInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],  // Adjust height for the content
});
  // Fetch the profile from AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem('details')
      .then((res) => {
        if (res) {
          const parsedRes = JSON.parse(res);
          setProfile(parsedRes); // Store the parsed profile in the state
        } else {
          console.log('No profile data found');
        }
      })
      .catch((e) => {
        console.log('Error fetching data from AsyncStorage:', e);
      });
  }, []);

  // Fetch the analysis data after the profile is loaded
  useEffect(() => {
    if (profile._id) {
      axios
        .get(`https://finalyearproject-be.onrender.com/api/analysis/${profile._id}`)
        .then((response) => {
          setAnalysis(response.data); // Set analysis data
        })
        .catch((e) => {
          console.log('Error on get analysis:', e); // Handle errors
        });
    }
  }, [profile]); 
  useEffect(() => {
    if (analysis?.message === 'Analysis not found') {
      router.replace('/questions'); // Redirect to the question page
    }
  }, [analysis, router]);


  // Set isMounted to true once the component has mounted
  useEffect(() => {
    setIsMounted(true); // Set mounted state to true after the component is mounted
  }, []); // This will run once when the component mounts

  // Check analysis after it's loaded and redirect if needed
  // Fetch recommended actions after the profile is loaded
  useEffect(() => {
    if (profile._id) {
      axios
        .get(`https://finalyearproject-be.onrender.com/api/sugession/${profile._id}`).then((res)=> setRecommended(res.data))

          } else {
            setRecommended([]); // Fallback to empty array if structure is unexpected
          }
        },[profile])
      
      
 // This runs when profile changes (after it's loaded)


  const scrollRef = useRef<ScrollView>(null);
  const [cardWidth, setCardWidth] = useState(0);
  let scrollPosition = 0;


  console.log("asdasdasdasdasdasdasdasdasdsadoo000",recommended)
  const carbonFootprint = Number(analysis?.carbonFootprint);
 
  return (
    <SafeAreaView className="flex-1 bg-[#F6ECC9]">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View className='space-y-3'>
      <View className=' rounded-4xl p-2 mx-4 space-y-2'>
        <Text className='text-4xl font-semibold px-4 '>
        Hello, 
        </Text>
        <Text className='text-4xl font-semibold px-4 '>
        {profile?.username}
        </Text>
        
        </View>
        {/* Header Section */}
       
          <View className='bg-[#EFE2CF] rounded-2xl p-5 py-5 space-y-2 mx-4    '>
          <Text className="text-2xl text-justify  px-2">
            Your carbon footprint is {""}
           
           {
          
             carbonFootprint < 4000 
             ? <Text className="font-semibold text-2xl tracking-wide">below average,{" "}<Text className='text-green-600 text-3xl'><Text className='text-black font-normal text-2xl'>at just</Text> {analysis?.carbonFootprint} kg CO₂ </Text></Text>
             : carbonFootprint >= 4000 && carbonFootprint <= 10000 
             ? <Text className="font-semibold text-2xl ">average {""}<Text className='text-yellow-600 text-3xl'><Text className='text-black font-normal text-2xl'>at just</Text>{analysis?.carbonFootprint} kg CO₂</Text></Text>
             : <Text className="font-semibold text-2xl ">Above Average {" "}<Text className='text-red-600 text-3xl'> <Text className='text-black font-normal text-2xl'>at </Text>{analysis?.carbonFootprint} kg CO₂</Text></Text>
            }
            per Year
          </Text>
{/*         
          <Pressable onPress={handlePress}>
      <View className="mx-2 p-3 bg-black w-full rounded-lg">
        <Text className="text-center text-white">Try Again</Text>
      </View>
    </Pressable> */}

 
            </View>
              {/* Image Section */}
          <View>
            <Image
            className='-mt-20'
              source={require('../../assets/images/carbon.gif')} // Replace with your image URL or local path
              style={{ width: 400, height: 400, alignSelf: 'center' }}
            />
          </View> 
        </View>

        {/* Recommended Actions Section */}
        <View className="bg-[#EFE2CF] p-5 py-8 rounded-lg mx-4 shadow-lg">
 
    <View>
      <Text className="text-4xl font-semibold text-gray-800 text-center py-2 mb-4">
        Recommendation
      </Text>
      
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }} // Adds some padding at the bottom
      >
        {recommended.map((point, index) => (
          <View
            key={index}
            className="flex items-start px-2 py-1 mb-1 rounded-lg"
          >
            <Text className="text-base text-center bg-[#E9DAD3] w-full p-3 rounded-2xl text-black overflow-hidden">
              {point}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>

</View>
        

      </ScrollView>
    </SafeAreaView>
  );
}
