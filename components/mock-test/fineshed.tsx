import React from "react";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

interface TestFinishedProps {
  score: number;
  onRetry: () => void;
  onReturn: () => void;
}

export const TestFinished: React.FC<TestFinishedProps> = ({
  score,
  onRetry,
  onReturn,
}) => {
  return (
    <View className="max-w-2xl mx-auto py-12 text-center animate-fade-in w-full">
      <View
        className={`w-40 h-40 rounded-full flex items-center justify-center mx-auto mb-10 border-12 shadow-2xl ${score >= 70 ? "border-emerald-100 bg-emerald-50 text-emerald-600" : "border-rose-100 bg-rose-50 text-rose-600"}`}
      >
        <View className="text-center">
          <View>
            <Text
              className={`text-5xl text-center font-black ${score >= 70 ? " text-emerald-600" : " text-rose-600"}`}
            >
              {score}%
            </Text>
          </View>
          <View>
            <Text
              className={`text-[10px] text-center font-black uppercase tracking-widest opacity-60  ${score >= 70 ? " text-emerald-600" : " text-rose-600"}`}
            >
              Result Score
            </Text>
          </View>
        </View>
      </View>
      <Text className="text-4xl mb-3 tracking-tight text-center">
        Test Complete!
      </Text>
      <Text className="text-slate-500 dark:text-slate-400 mb-12 text-lg text-center">
        {score >= 70
          ? "Outstanding! You have demonstrated mastery in this category."
          : "Keep practicing! Review the lesson content and try again."}
      </Text>
      <View className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" className="h-14 px-8 " onPress={onReturn}>
          <Text className=" font-bold">Return to Course</Text>
        </Button>
        <Button className="h-14 px-10" onPress={onRetry}>
          <Text>Retry Test</Text>
        </Button>
      </View>
    </View>
  );
};
