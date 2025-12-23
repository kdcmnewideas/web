import { Text } from "@/components/ui/text";
import { MatchingPair } from "@/types/types";
import { Check } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, View } from "react-native";

interface MatchingRendererProps {
  pairs: MatchingPair[];
  answer: Record<string, string> | undefined;
  setAnswer: (val: Record<string, string>) => void;
}

export const MatchingRenderer: React.FC<MatchingRendererProps> = ({
  pairs,
  answer,
  setAnswer,
}) => {
  const userMap = answer || {};
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  const handleMatch = (rightId: string) => {
    if (!selectedLeft) return;
    setAnswer({ ...userMap, [selectedLeft]: rightId });
    setSelectedLeft(null);
  };

  return (
    <View className="grid grid-cols-2 gap-12 relative">
      <View className="gap-4">
        {pairs.map((p) => (
          <Pressable
            key={p.id}
            onPress={() => setSelectedLeft(p.left)}
            className={`w-full p-4 rounded-2xl border transition-all relative ${
              selectedLeft === p.left
                ? "border-indigo-600 bg-indigo-600 text-white"
                : userMap[p.left]
                  ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                  : "border-border bg-secondary hover:border-slate-300"
            }`}
          >
            <Text
              className={` text-left font-bold ${
                selectedLeft === p.left
                  ? " text-white"
                  : userMap[p.left]
                    ? " text-emerald-700"
                    : ""
              }`}
            >
              {p.left}
            </Text>
            {userMap[p.left] && (
              <Check
                className="absolute right-4 top-1/2 -translate-y-1/2"
                size={16}
              />
            )}
          </Pressable>
        ))}
      </View>
      <View className="gap-4">
        {pairs.map((p) => {
          const isMatched = Object.values(userMap).includes(p.right);
          return (
            <Pressable
              key={p.id}
              disabled={!selectedLeft || isMatched}
              onPress={() => handleMatch(p.right)}
              className={`w-full p-4 rounded-2xl border- text-left font-bold transition-all ${
                isMatched
                  ? "border-emerald-100 bg-emerald-50 text-emerald-700 opacity-50"
                  : selectedLeft
                    ? "border-muted-foreground bg-muted hover:border-indigo-600 hover:text-indigo-600"
                    : "border-border bg-secondary text-slate-400"
              }`}
            >
              <Text className={`text-left font-bold transition-all ${
                isMatched
                  ? " text-emerald-700 opacity-50"
                  : selectedLeft
                    ? " hover:text-indigo-600"
                    : " text-slate-400"
              }`}>{p.right}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
