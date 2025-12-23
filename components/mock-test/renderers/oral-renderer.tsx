import { Text } from "@/components/ui/text";
import { CheckCircle, Mic, Square } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

interface OralRendererProps {
  isRecording: boolean;
  setIsRecording: (val: boolean) => void;
  recordingTime: number;
  answer: string | undefined;
  setAnswer: (val: string) => void;
}

export const OralRenderer: React.FC<OralRendererProps> = ({
  isRecording,
  setIsRecording,
  recordingTime,
  answer,
  setAnswer,
}) => {
  return (
    <View className="flex flex-col items-center justify-center py-12 space-y-8 text-center">
      <View
        className={`relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-500 ${isRecording ? "bg-rose-50" : "bg-slate-50"}`}
      >
        {isRecording && (
          <>
            <View className="absolute inset-0 bg-rose-400/20 rounded-full animate-ping"></View>
            <View className="absolute inset-4 bg-rose-400/20 rounded-full animate-pulse"></View>
          </>
        )}
        <Pressable
          onPress={() => {
            if (isRecording) setAnswer("recorded_audio");
            setIsRecording(!isRecording);
          }}
          className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all ${isRecording ? "bg-rose-600  scale-110" : "bg-white hover:scale-105"}`}
        >
          {isRecording ? (
            <Square fill={"#fff"} size={32} color={"#fff"}/>
          ) : (
            <Mic size={40} color={"#4f39f6"}/>
          )}
        </Pressable>
      </View>
      <View className="gap-2">
        <Text className="text-2xl font-black text-center">
          {isRecording ? "Recording..." : "Ready to record"}
        </Text>
        <Text className="text-slate-500 dark:text-slate-400 font-medium text-center">
          {isRecording
            ? `Time elapsed: ${recordingTime}s`
            : "Tap to start recording your response."}
        </Text>
      </View>
      {answer && !isRecording && (
        <View className="bg-emerald-50 px-6 py-3 rounded-full border border-emerald-100 flex-row items-center gap-2 font-bold animate-fade-in">
          <CheckCircle size={20} color={"#007a55"} />
          <Text className="text-emerald-700">Recording Saved</Text>
        </View>
      )}
    </View>
  );
};
