import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { ALL_LESSONS, SUBJECTS } from "@/mockData";
import { ScreenName } from "@/types/types";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  PenTool,
  PlayCircle,
} from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { useUniwind } from "uniwind";

const Subject = () => {
  const { theme} = useUniwind()
  const { subjectId } = useLocalSearchParams();
  const subject = SUBJECTS.find((s) => s.id === subjectId) || SUBJECTS[0];
  const lessons = ALL_LESSONS.filter((l) => l.subjectId === subject.id);

  // Helper to map old bg colors to solid hex
  const getSubjectColorHex = (colorClass: string) => {
    if (colorClass.includes("indigo")) return "bg-indigo-600 dark:bg-indigo-400/50";
    if (colorClass.includes("teal")) return "bg-teal-600 dark:bg-teal-400/50";
    if (colorClass.includes("rose")) return "bg-rose-600 dark:bg-rose-400/50";
    if (colorClass.includes("amber")) return "bg-amber-500 dark:bg-amber-400/50";
    if (colorClass.includes("emerald")) return "bg-emerald-600 dark:bg-emerald-400/50";
    return "bg-slate-600 dark:bg-slate-400";
  };

  const bgClass = getSubjectColorHex(subject.color);

  const onNavigate = (screenName: ScreenName, params?: any) => {
    router.navigate(screenName, params);
  };

  return (
    <View className="gap-8 animate-fade-in pb-20">
      <Button
        variant="ghost"
        onPress={() => onNavigate(ScreenName.SUBJECTS)}
        className="w-fit"
      >
        <ArrowLeft className="mr-2" color={theme === 'dark'? "#fff": "#000"}/> <Text>Back to Dashboard</Text>
      </Button>

      {/* Hero Banner - Solid Color, No Gradients/Blobs */}
      <View
        className={`relative overflow-hidden rounded-2xl ${bgClass} text-white p-8 md:p-12 shadow-sm`}
      >
        <View className="relative z-10">
          <View className="flex-row items-center gap-2 mb-4 opacity-90">
            <Text className="uppercase tracking-widest text-xs font-bold border border-border px-2 py-0.5 rounded">
              Subject Focus
            </Text>
          </View>
          <Text className="text-4xl font-bold mb-4 tracking-tight">
            {subject.title}
          </Text>
          <Text className="max-w-2xl text-white/90 mb-8 text-lg leading-relaxed">
            {subject.description}
          </Text>

          <View className="flex-row items-center gap-10 border-t border-border pt-6">
            <View>
              <View className="text-3xl font-bold">{subject.progress}%</View>
              <View className="text-xs font-medium opacity-80 uppercase tracking-wide">
                Completed
              </View>
            </View>
            <View>
              <View className="text-3xl font-bold">{lessons.length}</View>
              <View className="text-xs font-medium opacity-80 uppercase tracking-wide">
                Lessons
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Content Section */}
      <View className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lessons List */}
        <View className="lg:col-span-2 gap-6">
          <Text className="text-xl font-bold">Study Plan</Text>
          {lessons.map((lesson, index) => {
            const isStarted = !lesson.isCompleted && lesson.lastAccessed;
            const progress = lesson.isCompleted ? 100 : isStarted ? 35 : 0;

            return (
              <Card
                key={lesson.id}
                className="group relative overflow-hidden transition-all duration-200 hover:border-primary p-0"
              >
                <View className="p-6">
                  <View className="flex-col md:flex-row md:items-center justify-between gap-5">
                    {/* Lesson Info */}
                    <View className="flex-row items-start gap-4 flex-1">
                      <View className="mt-1 shrink-0">
                        {lesson.isCompleted ? (
                          <CheckCircle size={24} color={"#00bc7d"} fill={"#ecfdf5"}/>
                        ) : isStarted ? (
                          <PlayCircle color={"#4f39f6 "} size={24} fill={"#eef2ff"}/>
                        ) : (
                          <Circle size={"24"} color={"#cad5e2"} />
                        )}
                      </View>

                      <View className="flex-1 min-w-0">
                        <View className="flex-row items-center gap-2 mb-1">
                          <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Lesson {index + 1}
                          </Text>
                        </View>
                        <Text className="text-lg font-bold">
                          {lesson.title}
                        </Text>
                        <View className="flex-row items-center gap-3 mt-2 text-sm text-slate-500 font-medium">
                          <Text
                            className={`px-2 py-0.5 rounded text-xs ${
                              lesson.difficulty === "Beginner"
                                ? "bg-emerald-100 text-emerald-700"
                                : lesson.difficulty === "Intermediate"
                                  ? "bg-sky-100 text-sky-700"
                                  : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {lesson.difficulty}
                          </Text>
                          <Text>{lesson.durationMinutes} min</Text>
                          {isStarted && (
                            <Text className="text-primary">In Progress</Text>
                          )}
                        </View>
                      </View>
                    </View>

                    {/* Actions */}
                    <View className="flex-row items-center gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-border w-full md:w-auto">
                      <Button
                        size="sm"
                        className="flex-1 md:flex-none shadow-none"
                        onPress={()=> router.navigate(`/subject/${subjectId}/learn/${lesson.id}`)}
                      >
                        <Text>{lesson.isCompleted ? "Review" : "Learn"}</Text>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 md:flex-none"
                      >
                        <Text>Revise</Text>
                      </Button>
                      <Button variant="outline" size="sm" className="px-3">
                        <PenTool size={16} color={theme==="dark"? "#fff": "#000"}/>
                      </Button>
                    </View>
                  </View>
                </View>

                {/* Progress Bar (Attached to bottom) */}
                <View className="h-1 w-full bg-slate-50">
                  <View
                    className={`h-full transition-all duration-500 ease-out ${lesson.isCompleted ? "bg-emerald-500" : "bg-indigo-600"}`}
                    style={{
                      width: `${progress}%`,
                      opacity: progress > 0 ? 1 : 0,
                    }}
                  />
                </View>
              </Card>
            );
          })}
        </View>

        {/* Sidebar Info */}
        <View className="gap-6">
          <Card>
            <Text className="font-bold">Your Goals</Text>
            <View className="gap-6">
              <View>
                <View className="flex justify-between text-sm mb-2 font-medium">
                  <Text className="text-slate-600 dark:text-slate-400">Chapter Mastery</Text>
                  <Text className="text-indigo-600">65%</Text>
                </View>
                <View className="w-full bg-slate-100 rounded-full h-2">
                  <View
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: "65%" }}
                  ></View>
                </View>
              </View>
              <View>
                <View className="flex justify-between text-sm mb-2 font-medium">
                  <Text className="text-slate-600 dark:text-slate-400">Test Average</Text>
                  <Text className="text-teal-600">82%</Text>
                </View>
                <View className="w-full bg-slate-100 rounded-full h-2">
                  <View
                    className="bg-teal-600 h-2 rounded-full"
                    style={{ width: "82%" }}
                  ></View>
                </View>
              </View>
            </View>
          </Card>

          <Card className="bg-amber-50 border-amber-100 shadow-none gap-0">
            <Text className="font-bold text-amber-900 mb-2">Pro Tip</Text>
            <Text className="text-sm text-amber-800 leading-relaxed">
              Practice "Derivatives II" again. Your last mock test score was
              lower than average on chain rule questions.
            </Text>
          </Card>
        </View>
      </View>
    </View>
  );
};

export default Subject;
