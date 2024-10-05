import axiosInterceptor from "@/interceptor/axiosinterceptor";
import { useEffect, useState } from "react";
import { Text, View, ScrollView, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

type QuestionType = {
  question: string;
  _id: string;
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
    .string()
    .nonempty("Grocery bill estimate is required")
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "Grocery bill must be a numeric value",
    }),
  travelFrequency: z
    .string()
    .nonempty("Travel frequency is required")
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "Travel frequency must be a numeric value",
    }),
  monthlyDistance: z
    .string()
    .nonempty("Monthly driving distance is required")
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "Monthly distance must be a numeric value",
    }),
  wasteBagSize: z
    .string()
    .nonempty("Waste bag size is required")
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "Waste bag size must be a numeric value",
    }),
  wasteBagCount: z
    .string()
    .nonempty("Waste bag count is required")
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "Waste bag count must be a numeric value",
    }),
  tvComputerHours: z
    .string()
    .nonempty("TV/Computer usage hours is required")
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "TV/Computer hours must be a numeric value",
    }),
  newClothesMonthly: z
    .string()
    .nonempty("New clothes monthly estimate is required")
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "New clothes must be a numeric value",
    }),
  internetHours: z
    .string()
    .nonempty("Internet usage hours is required")
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "Internet hours must be a numeric value",
    }),
  energyEfficiency: z
    .string()
    .nonempty("Energy efficiency rating is required")
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "Energy efficiency must be a numeric value",
    }),
});
const onSubmit = (data: any) => {
  console.log(data);
};

export default function index() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    const getQuestions = async () => {
      const response = await axiosInterceptor.get("/question");
      setQuestions(response.data);
    };
    getQuestions();
  }, []);
  const questionArray = questions.map((item) => item.question);
  console.log(questionArray);

  type FormData = z.infer<typeof schema>;

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
      groceryBill: "",
      travelFrequency: "",
      monthlyDistance: "",
      wasteBagSize: "",
      wasteBagCount: "",
      tvComputerHours: "",
      newClothesMonthly: "",
      internetHours: "",
      energyEfficiency: "",
    },
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Question</Text>
          <View>
            <Text>{questionArray[0]}</Text>
            <Controller
              control={control}
              name={"diet"}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)} // Send only the selected value
                >
                  <Picker.Item label="Select your diet" value="" />
                  <Picker.Item label="Pescatarian" value="0" />
                  <Picker.Item label="Vegetarian" value="1" />
                  <Picker.Item label="Omnivore" value="2" />
                  <Picker.Item label="Vegan" value="3" />
                </Picker>
              )}
            />
          </View>
          <View>
            <Text>{questionArray[1]}</Text>
            <Controller
              control={control}
              name={"showerFrequency"}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)} // Send only the selected value
                >
                  <Picker.Item label="Select your diet" value="" />
                  <Picker.Item label="Daily" value="0" />
                  <Picker.Item label="Less frequently" value="1" />
                  <Picker.Item label="More frequently" value="2" />
                  <Picker.Item label="Twice a day" value="3" />
                </Picker>
              )}
            />
          </View>
          <View>
            <Text>{questionArray[2]}</Text>
            <Controller
              control={control}
              name={"heatingSource"}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)} // Send only the selected value
                >
                  <Picker.Item label="Select your diet" value="" />
                  <Picker.Item label="Coal" value="0" />
                  <Picker.Item label="Natural gas" value="1" />
                  <Picker.Item label="Wood" value="2" />
                  <Picker.Item label="Electricity" value="3" />
                </Picker>
              )}
            />
          </View>
          <View>
            <Text>{questionArray[3]}</Text>
            <Controller
              control={control}
              name={"transportation"}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)} // Send only the selected value
                >
                  <Picker.Item label="Select your diet" value="" />
                  <Picker.Item label="Public" value="0" />
                  <Picker.Item label="Walk/Bicycle" value="1" />
                  <Picker.Item label="Private" value="2" />
                </Picker>
              )}
            />
          </View>
          <View>
            <Text>{questionArray[4]}</Text>
            <Controller
              control={control}
              name={"vehicleType"}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)} // Send only the selected value
                >
                  <Picker.Item label="Select your diet" value="" />
                  <Picker.Item label="None" value="0" />
                  <Picker.Item label="Petrol" value="1" />
                  <Picker.Item label="Diesel" value="2" />
                  <Picker.Item label="Hybrid" value="3" />
                  <Picker.Item label="LPG" value="4" />
                  <Picker.Item label="Electric" value="5s" />
                </Picker>
              )}
            />
          </View>
          <View>
            <Text>{questionArray[5]}</Text>
            <Controller
              control={control}
              name={"socialActivity"}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)} // Send only the selected value
                >
                  <Picker.Item label="Select your diet" value="" />
                  <Picker.Item label="Often" value="0" />
                  <Picker.Item label="Never" value="1" />
                  <Picker.Item label="Sometimes" value="2" />
                </Picker>
              )}
            />
          </View>
          <View>
            <Text>{questionArray[6]}</Text>
            <Controller
              control={control}
              name={"groceryBill"}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)} // Send only the selected value
                >
                  <Picker.Item label="Select your diet" value="" />
                  <Picker.Item label="Pescatarian" value="0" />
                  <Picker.Item label="Vegetarian" value="1" />
                  <Picker.Item label="Omnivore" value="2" />
                  <Picker.Item label="Vegan" value="3" />
                </Picker>
              )}
            />
          </View>
          <View>
            <Text>{questionArray[7]}</Text>
            <Controller
              control={control}
              name={"travelFrequency"}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)} // Send only the selected value
                >
                  <Picker.Item label="Select your diet" value="" />
                  <Picker.Item label="Frequently" value="0" />
                  <Picker.Item label="Rarely" value="1" />
                  <Picker.Item label="Never" value="2" />
                  <Picker.Item label="Very Frequently" value="3" />
                </Picker>
              )}
            />
          </View>
          <View>
            <Text>{questionArray[8]}</Text>
            <Controller
              control={control}
              name={"monthlyDistance"}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)} // Send only the selected value
                >
                  <Picker.Item label="Select your diet" value="" />
                  <Picker.Item label="Pescatarian" value="0" />
                  <Picker.Item label="Vegetarian" value="1" />
                  <Picker.Item label="Omnivore" value="2" />
                  <Picker.Item label="Vegan" value="3" />
                </Picker>
              )}
            />
          </View>
          <View>
            <Text>{questionArray[9]}</Text>
            <Controller
              control={control}
              name={"wasteBagSize"}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)} // Send only the selected value
                >
                  <Picker.Item label="Select your diet" value="" />
                  <Picker.Item label="Small" value="0" />
                  <Picker.Item label="Medium" value="1" />
                  <Picker.Item label="Large" value="2" />
                  <Picker.Item label="Extra Large" value="3" />
                </Picker>
              )}
            />
          </View>
          <View>
            <Text>{questionArray[10]}</Text>
            <Controller
              control={control}
              name={"wasteBagCount"}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)} // Send only the selected value
                >
                  <Picker.Item label="Select your diet" value="" />
                  <Picker.Item label="Pescatarian" value="0" />
                  <Picker.Item label="Vegetarian" value="1" />
                  <Picker.Item label="Omnivore" value="2" />
                  <Picker.Item label="Vegan" value="3" />
                </Picker>
              )}
            />
          </View>
          <View>
            <Text>{questionArray[11]}</Text>
            <Controller
              control={control}
              name={"tvComputerHours"}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)} // Send only the selected value
                >
                  <Picker.Item label="Select your diet" value="" />
                  <Picker.Item label="Pescatarian" value="0" />
                  <Picker.Item label="Vegetarian" value="1" />
                  <Picker.Item label="Omnivore" value="2" />
                  <Picker.Item label="Vegan" value="3" />
                </Picker>
              )}
            />
          </View>
          <View>
            <Text>{questionArray[12]}</Text>
            <Controller
              control={control}
              name={"newClothesMonthly"}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)} // Send only the selected value
                >
                  <Picker.Item label="Select your diet" value="" />
                  <Picker.Item label="Pescatarian" value="0" />
                  <Picker.Item label="Vegetarian" value="1" />
                  <Picker.Item label="Omnivore" value="2" />
                  <Picker.Item label="Vegan" value="3" />
                </Picker>
              )}
            />
          </View>
          <View>
            <Text>{questionArray[13]}</Text>
            <Controller
              control={control}
              name={"internetHours"}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)} // Send only the selected value
                >
                  <Picker.Item label="Select your diet" value="" />
                  <Picker.Item label="Pescatarian" value="0" />
                  <Picker.Item label="Vegetarian" value="1" />
                  <Picker.Item label="Omnivore" value="2" />
                  <Picker.Item label="Vegan" value="3" />
                </Picker>
              )}
            />
          </View>
          <View>
            <Text>{questionArray[14]}</Text>
            <Controller
              control={control}
              name={"energyEfficiency"}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)} // Send only the selected value
                >
                  <Picker.Item label="Select your diet" value="" />
                  <Picker.Item label="Yes" value="0" />
                  <Picker.Item label="Sometime" value="1" />
                  <Picker.Item label="No" value="2" />
                </Picker>
              )}
            />
          </View>
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
      <SafeAreaView />
    </SafeAreaView>
  );
}
