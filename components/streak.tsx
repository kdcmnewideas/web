import { User } from "@/types/types";
import { Flame } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Card } from "./ui/card";
import { Text } from "./ui/text";

interface StreakProps {
  user: User;
}

const streak = ({ user }: StreakProps) => {
  return (
      <Card className="rounded-full flex flex-row pl-5 pr-2 py-2 items-center gap-3 justify-around">
        <View className="flex flex-col items-end">
          <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Current Streak
          </Text>
          <Text className="text-lg font-bold leading-none group-hover:text-orange-600 transition-colors ">
            {user.streakDays} Days
          </Text>
        </View>
        <View className="w-10 h-10 rounded-full bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center transition-colors">
          <Flame className="w-5 h-5" fill={"#ff6900"} color={'#ff6900'}/>
        </View>
      </Card>
  );
};

export default streak;
