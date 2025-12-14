import { Goal } from "@/types/types";
import CircularProgress from "@/utils/circular-progress";
import { BookOpen, Clock, Target } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { Card } from "./ui/card";

interface GoalProp {
   goal: Goal,
   index: number
}

const GoalCard = ({ goal, index }: GoalProp) => {
  const percentage = Math.round((goal.current / goal.target) * 100);
  const color =
    percentage >= 100
      ? "text-emerald-500"
      : percentage >= 50
        ? "text-indigo-600"
        : "text-orange-500";

  return (
    <Card className="hover:shadow-2xl flex flex-row items-center justify-between p-4">

     <View className="flex flex-col justify-center">
        <View className="flex flex-row items-center gap-2 mb-2">
          <View
            className={`p-1.5 rounded-lg ${index === 0 ? "bg-indigo-50 text-indigo-600" : index === 1 ? "bg-teal-50 text-teal-600" : "bg-orange-50 text-orange-600"}`}
          >
            {index === 0 ? (
              <Clock className="w-4 h-4" />
            ) : index === 1 ? (
              <BookOpen className="w-4 h-4" />
            ) : (
              <Target className="w-4 h-4" />
            )}
          </View>
          <Text className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Goal
          </Text>
        </View>
        <Text className="font-bold text-slate-900 dark:text-white leading-tight mb-1">
          {goal.title}
        </Text>
        <Text className="text-xs text-slate-400 dark:text-slate-300 font-medium">
          <Text className="text-slate-700 dark:text-slate-200 font-bold">{goal.current}</Text> /{" "}
          {goal.target} {goal.unit}
        </Text>
      </View>

      <View className="shrink-0">
        <CircularProgress
          progressPercent={percentage}
          bgColor={color}
          size={52}
          strokeWidth={4}
          text={`${percentage}%`}
          textColor={color}
          textSize={12}
        />
      </View>
    </Card>
  );
};

export default GoalCard;
