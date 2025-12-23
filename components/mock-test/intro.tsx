import {
    Award,
    CheckCircle2,
    Layers,
    ListFilter,
    Mic,
    Zap,
} from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

export type TestCategory = "MIXED" | "MCQ" | "WRITTEN_ORAL" | "INTERACTIVE";

interface TestIntroProps {
  lessonTitle?: string;
  selectedCategory: TestCategory;
  onSelectCategory: (category: TestCategory) => void;
  onStart: () => void;
  onCancel: () => void;
}

export const TestIntro: React.FC<TestIntroProps> = ({
  lessonTitle,
  selectedCategory,
  onSelectCategory,
  onStart,
  onCancel,
}) => {
  const categories: {
    id: TestCategory;
    label: string;
    desc: string;
    icon: any;
  }[] = [
    {
      id: "MIXED",
      label: "Comprehensive",
      desc: "Mixed questions of all formats",
      icon: Layers,
    },
    {
      id: "MCQ",
      label: "MCQs Only",
      desc: "Multiple choice questions",
      icon: ListFilter,
    },
    {
      id: "WRITTEN_ORAL",
      label: "Expression",
      desc: "Written & Oral submissions",
      icon: Mic,
    },
    {
      id: "INTERACTIVE",
      label: "Interactive",
      desc: "Match, Blanks & T/F",
      icon: Zap,
    },
  ];

  return (
    <View className="max-w-4xl mx-auto py-12 animate-fade-in w-full">
      <View className=" mb-12">
        <View className="w-20 h-20 bg-indigo-600 rounded-3xl flex-row items-center justify-center mx-auto mb-6 shadow-xl rotate-3">
          <Award color={"#fff"} size={40} />
        </View>
        <Text className="text-4xl font-black mb-3 tracking-tight text-center">
          Mock Test: {lessonTitle}
        </Text>
        <Text className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-lg leading-relaxed text-center">
          Choose your preferred assessment mode to begin.
        </Text>
      </View>

      <View className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {categories.map((cat) => (
          <Pressable
            key={cat.id}
            onPress={() => onSelectCategory(cat.id)}
            className={`
               group relative p-6 rounded-4xl border-2 text-left transition-all duration-300
               ${
                 selectedCategory === cat.id
                   ? "border-indigo-600 bg-muted shadow-xl"
                   : "border-border bg-card hover:border-slate-300 hover:bg-secondary"
               }
             `}
          >
            <View className="flex-row items-start gap-5">
              <View
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${selectedCategory === cat.id ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"}`}
              >
                <cat.icon size={28} />
              </View>
              <View className="flex-1">
                <Text
                  className={`text-xl font-black mb-1 ${selectedCategory === cat.id ? "text-indigo-900 dark:text-indigo-500" : ""}`}
                >
                  {cat.label}
                </Text>
                <Text
                  className={`text-sm font-medium ${selectedCategory === cat.id ? "text-indigo-600/70 dark:text-indigo-400/70" : "text-slate-400"}`}
                >
                  {cat.desc}
                </Text>
              </View>
              {selectedCategory === cat.id && (
                <View className="bg-indigo-600 rounded-full p-1 shadow-sm">
                  <CheckCircle2 color={"#fff"} size={20} />
                </View>
              )}
            </View>
          </Pressable>
        ))}
      </View>

      <View className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          className=" px-10 "
          onPress={onCancel}
        >
          <Text className="font-bold">Cancel</Text>
        </Button>
        <Button
          className=" px-12"
          onPress={onStart}
        >
          <Text className="font-bold">Start Assessment</Text>
        </Button>
      </View>
    </View>
  );
};
