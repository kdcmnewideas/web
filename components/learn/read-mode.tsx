import { Topic } from "@/types/types";
import { Sparkles, Volume2 } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { useUniwind } from "uniwind";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

interface LearnReadModeProps {
  topic: Topic;
  onReadAloud: () => void;
}

export const ReadMode = ({ topic, onReadAloud }: LearnReadModeProps) => {
  const { theme } = useUniwind();
  return (
    <View className="animate-fade-in flex flex-col grow">
      <View className="mb-6">
        <Text className="text-2xl md:text-3xl font-bold mb-4">
          {topic?.title}
        </Text>
        <View className="flex-row flex-wrap gap-3">
          <Button onPress={onReadAloud} variant={"secondary"}>
            <Volume2
              className=" mr-2"
              color={theme === "dark" ? "#fff" : "#000"}
            />
            <Text>Read Aloud</Text>
          </Button>
          <Button variant={"secondary"}>
            <Sparkles
              className=" mr-2"
              color={theme === "dark" ? "#6941C6" : "#9E77ED"}
            />
            <Text>Regenerate with AI</Text>
          </Button>
        </View>
      </View>

      <View className="prose prose-slate prose-lg max-w-none grow leading-relaxed">
        {topic?.content.split("\n").map((line, i) => {
          const trimmed = line.trim();
          if (trimmed.startsWith("###"))
            return (
              <Text key={i} className="text-xl font-bold mt-8 mb-3 ">
                {trimmed.replace("###", "")}
              </Text>
            );
          if (trimmed.startsWith("**"))
            return (
              <Text
                key={i}
                className="my-4 font-semibold bg-muted p-3 rounded-lg border-l-4 border-indigo-600"
              >
                {trimmed.replace(/\*\*/g, "")}
              </Text>
            );
          if (trimmed === "") return <View key={i} className="h-2"></View>;

          const parts = line.split(/(\*\*.*?\*\*)/g);
          return (
            <Text key={i} className="mb-4">
              {parts.map((part, j) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return <Text key={j}>{part.replace(/\*\*/g, "")}</Text>;
                }
                return part;
              })}
            </Text>
          );
        })}
      </View>
    </View>
  );
};
