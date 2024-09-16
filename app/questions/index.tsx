import axiosInterceptor from "@/interceptor/axiosinterceptor";
import { useEffect, useState } from "react";
import { Text, View, TextInput, Button, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStringValue } from "@/hooks/getStringValue";

// Type for the question
type QuestionType = {
  question: string;
  _id: string;
};
type profileData = {
  _id: string;
  token: string;
  username: string;
};
export default function Index() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [profileData, setProfileData] = useState<profileData>({
    _id: "",
    token: "",
    username: "",
  });
  getStringValue("details").then((response) => setProfileData(response!));
  // Fetch questions from the API
  useEffect(() => {
    const getQuestions = async () => {
      const response = await axiosInterceptor.get("/question");
      setQuestions(response.data);
    };
    getQuestions();
  }, []);

  // Create a Zod schema dynamically based on the fetched questions
  const schema = z.object(
    questions.reduce((acc, question) => {
      acc[question._id] = z
        .string()
        .nonempty(`${question.question} is required`);
      return acc;
    }, {} as Record<string, ZodType<any, any, any>>)
  );

  type FormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: questions.reduce((acc, question) => {
      acc[question._id] = "";
      return acc;
    }, {} as Record<string, string>),
  });

  const onSubmit = async (data: FormData) => {
    const arrayData = Object.values(data);
    console.log(arrayData);
    try {
      // Check if the user ID exists
      if (!profileData._id) {
        console.error("User ID not found");
        return;
      }

      // Structure the data to include user ID separately
      const requestData = {
        user: {
          userId: profileData._id,
        },
        analysisData: {
          questions: data,
        },
      };

      // Send the structured data to the server
      console.log(requestData);
      await axiosInterceptor.post("/analysis", requestData);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text>Carbon Footprint Questionnaire</Text>

        {questions.map((question) => (
          <View key={question._id} style={{ marginVertical: 10 }}>
            <Text>{question.question}</Text>
            <Controller
              control={control}
              name={question._id}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{
                    borderWidth: 1,
                    padding: 10,
                    marginVertical: 5,
                    borderColor: errors[question._id] ? "red" : "black",
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors[question._id] && (
              <Text style={{ color: "red" }}>
                {errors[question._id]?.message?.toString()}
              </Text>
            )}
          </View>
        ))}

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </SafeAreaView>
  );
}
