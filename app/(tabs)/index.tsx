import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';

export default function HomePage() {
  const [analysis, setAnalysis] = useState({ carbonFootprint: 0 });
  const [profile, setProfile] = useState({ username: '', _id: '', token: '' });
  const [recommended, setRecommended] = useState({ recommendation: [] });
  const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted
  const router = useRouter();

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
        .get(`http://192.168.1.73:8000/api/analysis/${profile._id}`)
        .then((response) => {
          setAnalysis(response.data); // Set analysis data
        })
        .catch((e) => {
          console.log('Error on get analysis:', e); // Handle errors
        });
    }
  }, [profile]); // This runs when profile changes (after it's loaded)

  // Set isMounted to true once the component has mounted
  useEffect(() => {
    setIsMounted(true); // Set mounted state to true after the component is mounted
  }, []); // This will run once when the component mounts

  // Check analysis after it's loaded and redirect if needed
  useEffect(() => {
    if (isMounted && (analysis.carbonFootprint == null || analysis.carbonFootprint === 1)) {
      router.replace('/questions'); // Redirect to questions if carbonFootprint is 0 or null
    }
  }, [analysis, router, isMounted]); // This runs when analysis changes (after it's updated)

  // Fetch recommended actions after the profile is loaded
  useEffect(() => {
    if (profile._id) {
      axios
        .get(`http://192.168.1.73:8000/api/sugession/${profile._id}`)
        .then((response) => {
          // Check if response.data has the correct structure
          if (Array.isArray(response.data?.recommendation)) {
            setRecommended(response.data); // Set recommended actions data
          } else {
            setRecommended({ recommendation: [] }); // Fallback to empty array if structure is unexpected
          }
        })
        .catch((e) => {
          console.log('Error on get recommendations:', e); // Handle errors
        });
    }
  }, [profile]); // This runs when profile changes (after it's loaded)

  const scrollRef = useRef<ScrollView>(null);
  const [cardWidth, setCardWidth] = useState(0);
  let scrollPosition = 0;

  useEffect(() => {
    // Auto-scroll logic
    if (cardWidth > 0) {
      const interval = setInterval(() => {
        if (scrollRef.current) {
          scrollPosition += cardWidth;
          if (scrollPosition >= recommended.recommendation.length * cardWidth) {
            scrollPosition = 0; // Reset to start
          }
          scrollRef.current.scrollTo({ x: scrollPosition, animated: true });
        }
      }, 3000); // Change every 3 seconds

      return () => clearInterval(interval);
    }
  }, [cardWidth, recommended.recommendation.length]);
  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header Section */}
        <View className="mb-8 ">
          <Text className="text-3xl font-semibold  bg-white p-4">Hello, {profile?.username}</Text>

          {/* Image Section */}
          <View className='bg-white rounded-b-3xl shadow-black shadow-2xl' >
            <Image
            className='-mt-16'
              source={require('../../assets/images/carbon.gif')} // Replace with your image URL or local path
              style={{ width: '100%', height: 300, borderRadius: 90, alignSelf: 'center' }}
            />
          </View>

          <Text className="text-base text-gray-600 mx-6 my-8 text-center">
            Your carbon footprint is {""}
           {
             analysis?.carbonFootprint < 4000 
             ? <Text className="font-bold text-xl text-green-600">{analysis?.carbonFootprint} kg CO₂ </Text>
             : analysis?.carbonFootprint >= 4000 && analysis?.carbonFootprint <= 10000 
               ? <Text className="font-bold text-xl text-yellow-600">{analysis?.carbonFootprint} kg CO₂</Text>
               : <Text className="font-bold text-xl text-red-600">{analysis?.carbonFootprint} kg CO₂</Text>
           }
          </Text>

          <View className='bg-[#fce2e6] p-4 rounded-lg space-y-2 mx-6'>
            <Text className='text-sm ' style={{ color: 'green' }}>
              Low: Below 4,000 kg CO₂/year
            </Text>
            <Text className='text-sm ' >
              Average: 4,000 to 10,000 kg CO₂/year
            </Text>
            <Text className='text-sm '  style={{ color: 'red' }}>
              High: Above 10,000 kg CO₂/year
            </Text>
          </View>
        </View>

        {/* Recommended Actions Section */}
        <View className='bg-[#fce2e6] p-3 rounded-lg mx-4'>
          {recommended.recommendation && recommended.recommendation.length > 0 ? (
           <View >
           <Text className="text-3xl font-bold text-gray-800 text-center py-2 mb-4">Recommended Actions</Text>
           <ScrollView
            
             showsHorizontalScrollIndicator={false}
             
           >
             {recommended.recommendation.map((point, index) => (
              <View
              key={index}
              className="flex flex-row px-3 py-2 gap-x-2 "
            >
              <Text className="text-base text-gray-700">{index+1}.</Text>
              <Text className="text-base text-gray-700">{point}</Text>
            </View>
             ))}
           </ScrollView>
         </View>
          ) : (
            <Text className="text-lg text-gray-600">No recommendations available at the moment.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}