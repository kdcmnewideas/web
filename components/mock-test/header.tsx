import { Clock } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Text } from "../ui/text";

interface TestHeaderProps {
  currentIdx: number;
  totalQuestions: number;
  timeLeft: number;
}

export const TestHeader: React.FC<TestHeaderProps> = ({
  currentIdx,
  totalQuestions,
  timeLeft,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progress = Math.round(((currentIdx + 1) / totalQuestions) * 100);

  return (
    <View className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-card p-6 rounded-xl border border-border shadow-sm">
      <View className="grow w-full md:w-auto">
        <View className="flex-row items-center justify-between mb-3 px-1">
          <Text className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Question {currentIdx + 1} of {totalQuestions}
          </Text>
          <Text className="text-xs font-black text-indigo-600 uppercase tracking-widest">
            {progress}% Progress
          </Text>
        </View>
        <View className="w-full bg-muted h-3 rounded-full overflow-hidden">
          <View
            className="bg-indigo-600 h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </View>
      </View>
      <View
        className={`flex-row items-center gap-4 px-6 py-4 rounded-3xl border-2 transition-all ${timeLeft < 60 ? "bg-rose-50 border-rose-200  animate-pulse" : "bg-card border-border shadow-sm"}`}
      >
        <Clock
         size={24}
          color={timeLeft < 60?"#ec003f":"#4f39f6"}
        />
        <Text className={`text-2xl font-black font-mono tracking-tight ${timeLeft < 60 ? "text-rose-600" : "text-indigo-600"}`}>
          {formatTime(timeLeft)}
        </Text>
      </View>
    </View>
  );
};
