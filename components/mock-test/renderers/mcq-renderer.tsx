import { Text } from "@/components/ui/text";
import { CheckCircle } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

interface MCQRendererProps {
  options?: string[];
  answer: number | undefined;
  setAnswer: (val: number) => void;
}

export const MCQRenderer: React.FC<MCQRendererProps> = ({
  options,
  answer,
  setAnswer,
}) => {
  return (
    <View className="gap-3">
      {options?.map((opt, idx) => (
        <Pressable
          key={idx}
          onPress={() => setAnswer(idx)}
          className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex flex-row items-center justify-between group ${
            answer === idx
              ? "border-indigo-600 bg-mutedfont-bold"
              : "border-border bg-background hover:border-slate-300"
          }`}
        >
          <View className="flex-row items-center gap-4 justify-start ">
            <View
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black ${answer === idx ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}
            >
              <Text
                className={`${answer === idx ? "text-white" : "text-slate-500"}`}
              >
                {String.fromCharCode(65 + idx)}
              </Text>
            </View>
            <Text className="text-lg">{opt}</Text>
          </View>
          <View>
          {answer === idx && <CheckCircle className="w-6 h-6" color={"#432dd7"}/>}
          </View>
        </Pressable>
      ))}
    </View>
  );
};
