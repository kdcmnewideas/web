import { Text } from "@/components/ui/text";
import { View } from "lucide-react-native";
import React from "react";
import Svg, { Circle } from "react-native-svg";

const CircularProgress = ({ percentage, color, size = 60, strokeWidth = 5 }: { percentage: number; color: string; size?: number; strokeWidth?: number }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <View className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <Svg className="transform -rotate-90 w-full h-full">
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </Svg>
      <View className="absolute inset-0 flex items-center justify-center">
         <Text className={`text-[10px] font-bold ${color}`}>{percentage}%</Text>
      </View>
    </View>
  );
};

export default CircularProgress;