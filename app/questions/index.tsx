import axiosInterceptor from "@/interceptor/axiosinterceptor";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type question = {
  question: string;
  _id: string;
}[];
export default function index() {
  const [question, setQuestion] = useState<question>([
    { question: "", _id: "" },
  ]);
  useEffect(() => {
    const getQuestion = async () => {
      const response = await axiosInterceptor.get("/question");
      setQuestion(response.data);
    };
    getQuestion();
  }, []);
  console.log(question);
  return (
    <SafeAreaView>
      <View>
        {question.map((question) => (
          <Text key={question._id}>{question.question}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
}
