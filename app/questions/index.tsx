import axiosInterceptor from "@/interceptor/axiosinterceptor";
import { useEffect, useState } from "react";
import { Text, View, ScrollView, Button, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";
import { getStringValue } from "@/hooks/getStringValue";
import axios from "axios";
import Slider from '@react-native-community/slider';
import { router } from "expo-router";



type QuestionType = {
  question: string;
  _id: string;
};
type ProfileData = {
  _id: string;
  token: string;
  username: string;
};

const schema = z.object({
  diet: z
    .string()
    .nonempty("Diet is required")
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "Diet must be a numeric value",
    }),
  showerFrequency: z
    .string()
    .nonempty("Shower frequency is required")
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "Shower frequency must be a numeric value",
    }),
  heatingSource: z
    .string()
    .nonempty("Heating source is required")
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "Heating source must be a numeric value",
    }),
  transportation: z
    .string()
    .nonempty("Transportation method is required")
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "Transportation must be a numeric value",
    }),
  vehicleType: z
    .string()
    .nonempty("Vehicle type is required")
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "Vehicle type must be a numeric value",
    }),
  socialActivity: z
    .string()
    .nonempty("Social activity frequency is required")
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "Social activity must be a numeric value",
    }),
  groceryBill: z
    .number()
    ,
  travelFrequency: z
    .string()
    .nonempty("Travel frequency is required")
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "Travel frequency must be a numeric value",
    }),
  monthlyDistance: z
    .number()
   ,
  wasteBagSize: z
    .string()
    .nonempty("Waste bag size is required")
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "Waste bag size must be a numeric value",
    }),
  wasteBagCount: z
    .number()
   ,
  tvComputerHours: z
    .number()
    ,
  newClothesMonthly: z
    .number(),
  internetHours: z
    .number()
    ,
  energyEfficiency: z
    .string()
    .nonempty("Energy efficiency rating is required")
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "Energy efficiency must be a numeric value",
    }),
});

export default function index() {
  const [profileData, setProfileData] = useState<ProfileData>({
    _id: "",
    token: "",
    username: "",
  });
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStringValue("details");
        setProfileData(response!); // Ensure response is not null
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getQuestions = async () => {
      const response = await axiosInterceptor.get("/question");
      setQuestions(response.data);
    };
    getQuestions();
  }, []);

  const questionArray = questions.map((item) => item.question);
  type FormData = z.infer<typeof schema>;

  const onSubmit = (data: any) => {
    console.log(data)
    const formattedData = {
      answers: data,
      userData: {
        _id: profileData._id,
      },
    };

    axiosInterceptor.post("/prediction", formattedData).then(res => console.log(res.data)).then(  ()=>{

      router.replace("/(tabs)")
    } 
    )

  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      diet: "",
      showerFrequency: "",
      heatingSource: "",
      transportation: "",
      vehicleType: "",
      socialActivity: "",
      groceryBill: 0,
      travelFrequency: "",
      monthlyDistance: 0,
      wasteBagSize: "",
      wasteBagCount: 0,
      tvComputerHours: 0,
      newClothesMonthly: 0,
      internetHours: 0,
      energyEfficiency: "",
    },
  });


  useEffect(() => {
    const deleteData = async () => {
      try{

        if (profileData._id) {
          
          // First DELETE request for suggestion
          const suggestionResponse = await axios.delete(`http://192.168.45.131:8000/api/sugession/${profileData._id}`);
          console.log('Suggestion deleted:', suggestionResponse);
          
          // Second DELETE request for analysis
          const analysisResponse = await axios.delete(`http://192.168.45.131:8000/api/analysis/${profileData._id}`);
          console.log('Analysis deleted:', analysisResponse);
          
        }
      }catch(e){
        console.log(e)
      }
      };

    deleteData(); // Call the async function
  }, [profileData._id]);

  return (
    <SafeAreaView  className="flex-1 bg-[#F6ECC9] p-4">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View>

        <Text className="text-lg text-center text-gray-600 mb-6">
          Please answer the following questions to estimate your carbon footprint.
        </Text>
        <View className="mb-4 bg-[#EFE2CF] p-4 rounded-xl">
  <Text className="text-lg font-semibold text-gray-700 mb-2">{questionArray[0]}</Text>
  <Controller
    control={control}
    name={"diet"}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => onChange(itemValue)}
          className="border-2 border-gray-300 bg-[#EFE2CF] rounded-xl p-2"
        >
          <Picker.Item label="Select your diet" value="" />
          <Picker.Item label="Pescatarian" value="0" />
          <Picker.Item label="Vegetarian" value="1" />
          <Picker.Item label="Omnivore" value="2" />
          <Picker.Item label="Vegan" value="3" />
        </Picker>

        {/* Error message */}
        {error && (
          <Text className="text-red-500 text-sm mt-1">{error.message}</Text>
        )}
      </>
    )}
  />
</View>

<View className="mb-4 bg-[#EFE2CF] p-4 rounded-xl">
  <Text className="text-lg font-semibold text-gray-700 mb-2">{questionArray[1]}</Text>
  <Controller
    control={control}
    name={"showerFrequency"}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => onChange(itemValue)}
          className="border-2 border-gray-300 bg-[#EFE2CF] rounded-xl p-2"
        >
          <Picker.Item label="Select your frequency" value="" />
          <Picker.Item label="Daily" value="0" />
          <Picker.Item label="Less frequently" value="1" />
          <Picker.Item label="More frequently" value="2" />
          <Picker.Item label="Twice a day" value="3" />
        </Picker>

        {/* Error message */}
        {error && <Text className="text-red-500 text-sm mt-1">{error.message}</Text>}
      </>
    )}
  />
</View>
<View className="mb-4 bg-[#EFE2CF] p-4 rounded-xl">
  <Text className="text-lg font-semibold text-gray-700 mb-2">{questionArray[2]}</Text>
  <Controller
    control={control}
    name={"heatingSource"}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => onChange(itemValue)}
          className="border-2 border-gray-300 bg-[#EFE2CF] rounded-xl p-2"
        >
          <Picker.Item label="Select your Heating Source" value="" />
          <Picker.Item label="Coal" value="0" />
          <Picker.Item label="Natural gas" value="1" />
          <Picker.Item label="Wood" value="2" />
          <Picker.Item label="Electricity" value="3" />
        </Picker>

        {/* Error message */}
        {error && <Text className="text-red-500 text-sm mt-1">{error.message}</Text>}
      </>
    )}
  />
</View>
<View className="mb-4 bg-[#EFE2CF] p-4 rounded-xl">
  <Text className="text-lg font-semibold text-gray-700 mb-2">{questionArray[3]}</Text>
  <Controller
    control={control}
    name={"transportation"}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => onChange(itemValue)}
          className="border-2 border-gray-300 bg-[#EFE2CF] rounded-xl p-2"
        >
          <Picker.Item label="Select your Transportation Type" value="" />
          <Picker.Item label="Public" value="0" />
          <Picker.Item label="Walk/Bicycle" value="1" />
          <Picker.Item label="Private" value="2" />
        </Picker>

        {/* Error message */}
        {error && <Text className="text-red-500 text-sm mt-1">{error.message}</Text>}
      </>
    )}
  />
</View>
<View className="mb-4 bg-[#EFE2CF] p-4 rounded-xl">
  <Text className="text-lg font-semibold text-gray-700 mb-2">{questionArray[4]}</Text>
  <Controller
    control={control}
    name={"vehicleType"}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => onChange(itemValue)}
          className="border-2 border-gray-300 bg-[#EFE2CF] rounded-xl p-2"
        >
          <Picker.Item label="Select your Vehicle Type" value="" />
          <Picker.Item label="None" value="0" />
          <Picker.Item label="Petrol" value="1" />
          <Picker.Item label="Diesel" value="2" />
          <Picker.Item label="Hybrid" value="3" />
          <Picker.Item label="LPG" value="4" />
          <Picker.Item label="Electric" value="5" />
        </Picker>

        {/* Error message */}
        {error && <Text className="text-red-500 text-sm mt-1">{error.message}</Text>}
      </>
    )}
  />
</View>
<View className="mb-4 bg-[#EFE2CF] p-4 rounded-xl">
  <Text className="text-lg font-semibold text-gray-700 mb-2">{questionArray[5]}</Text>
  <Controller
    control={control}
    name={"socialActivity"}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => onChange(itemValue)}
          className="border-2 border-gray-300 bg-[#EFE2CF] rounded-xl p-2"
        >
          <Picker.Item label="Select your Frequency" value="" />
          <Picker.Item label="Often" value="0" />
          <Picker.Item label="Never" value="1" />
          <Picker.Item label="Sometimes" value="2" />
        </Picker>

        {/* Error message */}
        {error && <Text className="text-red-500 text-sm mt-1">{error.message}</Text>}
      </>
    )}
  />
</View>

<View className="mb-4 bg-[#EFE2CF] p-4 rounded-xl">
  <Text className="text-lg font-semibold text-gray-700 mb-2">{questionArray[6]}</Text>
  <Controller
    control={control}
    name={"groceryBill"}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Slider
          style={{ width: 250, height: 40 }}
          minimumValue={0}
          maximumValue={10000}
          step={1}
          value={value || 0}
          onValueChange={onChange}
          minimumTrackTintColor="#FF6347"
          maximumTrackTintColor="#B0C4DE"
          thumbTintColor="#FFD700"
        />
        <Text>{value}</Text>
      </View>
    )}
  />
</View>
<View className="mb-4 bg-[#EFE2CF] p-4 rounded-xl">
  <Text className="text-lg font-semibold text-gray-700 mb-2">{questionArray[7]}</Text>
  <Controller
    control={control}
    name={"travelFrequency"}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => onChange(itemValue)}
          className="border-2 border-gray-300 bg-[#EFE2CF] rounded-xl p-2"
        >
          <Picker.Item label="Select your Frequency" value="" />
          <Picker.Item label="Frequently" value="0" />
          <Picker.Item label="Rarely" value="1" />
          <Picker.Item label="Never" value="2" />
          <Picker.Item label="Very Frequently" value="3" />
        </Picker>

        {/* Error message */}
        {error && <Text className="text-red-500 text-sm mt-1">{error.message}</Text>}
      </>
    )}
  />
</View>
<View className="mb-4 bg-[#EFE2CF] p-4 rounded-xl">
  <Text className="text-lg font-semibold text-gray-700 mb-2">{questionArray[8]}</Text>
  <Controller
    control={control}
    name={"monthlyDistance"}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Slider
          style={{ width: 250, height: 40 }}
          minimumValue={0}
          maximumValue={1000}
          step={1}
          value={value || 0}
          onValueChange={onChange}
          minimumTrackTintColor="#FF6347"
          maximumTrackTintColor="#B0C4DE"
          thumbTintColor="#FFD700"
        />
        <Text>{value}</Text>
      </View>
    )}
  />
</View>
<View className="mb-4 bg-[#EFE2CF] p-4 rounded-xl">
  <Text className="text-lg font-semibold text-gray-700 mb-2">{questionArray[9]}</Text>
  <Controller
    control={control}
    name={"wasteBagSize"}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => onChange(itemValue)}
          className="border-2 border-gray-300 bg-[#EFE2CF] rounded-xl p-2"
        >
          <Picker.Item label="Select your Waste Bag Size" value="" />
          <Picker.Item label="Small" value="0" />
          <Picker.Item label="Medium" value="1" />
          <Picker.Item label="Large" value="2" />
          <Picker.Item label="Extra Large" value="3" />
        </Picker>

        {/* Error message */}
        {error && <Text className="text-red-500 text-sm mt-1">{error.message}</Text>}
      </>
    )}
  />
</View>
<View className="mb-4 bg-[#EFE2CF] p-4 rounded-xl">
  <Text className="text-lg font-semibold text-gray-700 mb-2">{questionArray[10]}</Text>
  <Controller
    control={control}
    name={"wasteBagCount"}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Slider
          style={{ width: 250, height: 40 }}
          minimumValue={0}
          maximumValue={50}
          step={1}
          value={value || 0}
          onValueChange={onChange}
          minimumTrackTintColor="#FF6347"
          maximumTrackTintColor="#B0C4DE"
          thumbTintColor="#FFD700"
        />
        <Text>{value}</Text>
      </View>
    )}
  />
</View>
<View className="mb-4 bg-[#EFE2CF] p-4 rounded-xl">
  <Text className="text-lg font-semibold text-gray-700 mb-2">{questionArray[11]}</Text>
  <Controller
    control={control}
    name={"tvComputerHours"}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Slider
          style={{ width: 250, height: 40 }}
          minimumValue={0}
          maximumValue={24}
          step={1}
          value={value || 0}
          onValueChange={onChange}
          minimumTrackTintColor="#FF6347"
          maximumTrackTintColor="#B0C4DE"
          thumbTintColor="#FFD700"
        />
        <Text>{value}</Text>
      </View>
    )}
  />
</View>
<View className="mb-4 bg-[#EFE2CF] p-4 rounded-xl">
  <Text className="text-lg font-semibold text-gray-700 mb-2">{questionArray[12]}</Text>
  <Controller
    control={control}
    name={"newClothesMonthly"}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Slider
          style={{ width: 250, height: 40 }}
          minimumValue={0}
          maximumValue={20}
          step={1}
          value={value || 0}
          onValueChange={onChange}
          minimumTrackTintColor="#FF6347"
          maximumTrackTintColor="#B0C4DE"
          thumbTintColor="#FFD700"
        />
        <Text>{value}</Text>
      </View>
    )}
  />
</View>
<View className="mb-4 bg-[#EFE2CF] p-4 rounded-xl">
  <Text className="text-lg font-semibold text-gray-700 mb-2">{questionArray[13]}</Text>
  <Controller
    control={control}
    name={"internetHours"}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Slider
          style={{ width: 250, height: 40 }}
          minimumValue={0}
          maximumValue={24}
          step={1}
          value={value || 0}
          onValueChange={onChange}
          minimumTrackTintColor="#FF6347"
          maximumTrackTintColor="#B0C4DE"
          thumbTintColor="#FFD700"
        />
        <Text>{value}</Text>
      </View>
    )}
  />
</View>
<View className="mb-4 bg-[#EFE2CF] p-4 rounded-xl">
  <Text className="text-lg font-semibold text-gray-700 mb-2">{questionArray[14]}</Text>
  <Controller
    control={control}
    name={"energyEfficiency"}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <>
      <Picker
      
        selectedValue={value}
        onValueChange={(itemValue) => onChange(itemValue)}
        className="border-2 border-gray-300 bg-[#EFE2CF] rounded-xl p-2"
        >
        <Picker.Item label="Select Energy Efficiency" value="" />
        <Picker.Item label="High" value="0" />
        <Picker.Item label="Medium" value="1" />
        <Picker.Item label="Low" value="2" />
        
      </Picker>
        {error && <Text className="text-red-500 text-sm mt-1">{error.message}</Text>}
        </>
      
    )}
    
  />
</View>
          <Pressable
          className="bg-black rounded-2xl"
          onPress={handleSubmit(onSubmit)} >
            <Text className="text-white text-center text-lg p-3">Submit</Text>
            </Pressable>
        </View>
      </ScrollView>
      <SafeAreaView />
    </SafeAreaView>
  );
}
