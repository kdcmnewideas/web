import { RECENT_LESSONS, SUBJECTS } from "@/mockData";
import { Play } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Text } from "./ui/text";

const RecentLearn = () => {
  return (
    <Card className=" rounded-3xl px-3">
      {RECENT_LESSONS.map((lesson) => (
        <Button
          variant="ghost"
          key={lesson.id}
          className="p-2 md:p-5 flex flex-col sm:flex-row md:items-center justify-between items-start gap-4 group h-auto! rounded-2xl"
        >
          <View className="flex items-center gap-5 flex-row">
            <View className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
              <Play className="w-5 h-5 ml-1" fill="#90a1b9" color={"#90a1b9"}/>
            </View>
            <View>
              <Text className="font-bold text-lg">
                {lesson.title}
              </Text>
              <View className="flex flex-row items-center gap-2 text-sm text-slate-500 font-medium mt-0.5">
                <Text>
                  {SUBJECTS.find((s) => s.id === lesson.subjectId)?.title}
                </Text>
                <Text className="w-1 h-1 rounded-full bg-slate-300"></Text>
                <Text>{lesson.durationMinutes} min left</Text>
              </View>
            </View>
          </View>
          <View className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 hidden md:block">
            <Button
              variant="outline"
              size="sm"
            >
              <Text>Resume</Text>
            </Button>
          </View>
        </Button>
      ))}
    </Card>
  );
};

export default RecentLearn;
