import { Text } from "@/components/ui/text";
import React from "react";
import { View } from "react-native";
import { Circle, Svg } from "react-native-svg";

const CircularProgress = ({
  percentage,
  color,
  size = 60,
  strokeWidth = 5,
}: {
  percentage: number;
  color: string;
  size?: number;
  strokeWidth?: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <View
      className="relative flex flex-row items-center justify-center"
      style={{ width: size, height: size }}
    >
      <Svg className="transform -rotate-90 w-full h-full">
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </Svg>
      <View className="absolute inset-0 flex items-center justify-center">
        <Text className={`text-[10px] font-bold`}>{percentage}%</Text>
      </View>
    </View>
  );
};

export default CircularProgress;
