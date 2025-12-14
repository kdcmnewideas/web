import GoalCard from "@/components/goal-card";
import RevisionWidget from "@/components/revision-widget";
import Streak from "@/components/streak";
import SubjectCard from "@/components/subject-card";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
  CURRENT_USER,
  GOALS,
  RECENT_LESSONS,
  SUBJECTS
} from "@/mockData";
import { ScreenName } from "@/types/types";
import {
  ArrowRight,
  Calendar,
  Play,
  Target
} from "lucide-react-native";
import React from "react";
import { View } from "react-native";


const home = () => {
  const onNavigate = (route: ScreenName, params?: any) => {
    console.log(route);
  };

  const user = CURRENT_USER;
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Helper for solid colors based on the previous class names

  return (
    <View className="space-y-8 animate-fade-in pb-20">
      {/* Header & Welcome */}
      <View className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <View>
          <Text className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">
            {today}
          </Text>
          <Text className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Welcome back, {user.name.split(" ")[0]}
          </Text>
        </View>

        {/* Streak Pill */}
        <Streak user={user} />
      </View>

      {/* Main Content Grid */}
      <View className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left Column (Main) */}
        <View className="xl:col-span-3 space-y-10">
          {/* Goals Section - Modern Widget Style */}
          <View>
            <View className="justify-between mb-4">
              <Text className="text-xl font-bold flex items-center gap-2 ">
                <Target className="w-5 h-5 text-indigo-600" /> Weekly Targets
              </Text>
            </View>
            <View className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {GOALS.map((goal, index) => (
                <GoalCard key={goal.id} goal={goal} index={index} />
              ))}
            </View>
          </View>

          {/* Subjects Grid */}
          <View>
            <View className="flex items-center justify-between mb-6 flex-row">
              <Text className="text-xl font-bold ">My Courses</Text>
              <Button
                variant={"link"}
                onPress={() => onNavigate(ScreenName.SUBJECTS)}
                className="text-sm font-bold  items-center gap-1 group"
              >
                <Text className="flex flex-row items-center">
                  View All{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Text>
              </Button>
            </View>
            <View className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SUBJECTS.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} />
              ))}
            </View>
          </View>

          {/* Recent Activity */}
          <View>
            <View className="flex items-center justify-between mb-6">
              <Text className="text-xl font-bold text-slate-900">
                Jump Back In
              </Text>
            </View>
            <View className="bg-white rounded-3xl border border-slate-100 shadow-sm Viewide-y Viewide-slate-50 overflow-hidden">
              {RECENT_LESSONS.map((lesson) => (
                <View
                  key={lesson.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors group cursor-pointer"
                >
                  <View className="flex items-center gap-5">
                    <View className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <Play className="w-5 h-5 ml-1 fill-current" />
                    </View>
                    <View>
                      <Text className="font-bold text-slate-900 text-lg">
                        {lesson.title}
                      </Text>
                      <View className="flex items-center gap-2 text-sm text-slate-500 font-medium mt-0.5">
                        <Text>
                          {
                            SUBJECTS.find((s) => s.id === lesson.subjectId)
                              ?.title
                          }
                        </Text>
                        <Text className="w-1 h-1 rounded-full bg-slate-300"></Text>
                        <Text>{lesson.durationMinutes} min left</Text>
                      </View>
                    </View>
                  </View>
                  <View className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200"
                    >
                      <Text>Resume</Text>
                    </Button>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Right Column (Sidebar) - Fixed Layout */}
        <View className="xl:col-span-1 space-y-6 sticky top-6 self-start h-fit">
          {/* Revision Widget */}
          <RevisionWidget />

          {/* Pro Tip Card */}
          <View className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group shadow-lg">
            <View className="relative z-10">
              <View className="flex items-center gap-2 mb-4">
                <Text className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold uppercase tracking-wider text-indigo-200">
                  Pro Tip
                </Text>
              </View>
              <Text className="text-lg font-medium leading-relaxed mb-6 text-slate-100">
                "Reviewing material 24 hours after learning it increases
                retention by 60%."
              </Text>
              <Button
                variant={'default'}
                onPress={() => onNavigate(ScreenName.REVISION)}
              >
                <Text className="flex items-center">
                  Start Revision <ArrowRight className="w-4 h-4" />
                </Text>
              </Button>
            </View>

            {/* Decorative background elements */}
            <View className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600/30 rounded-full blur-3xl group-hover:bg-indigo-500/40 transition-colors duration-500"></View>
            <View className="absolute top-10 -left-10 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl"></View>
          </View>
        </View>
      </View>

      {/* Floating Action Button (Mobile) - Positioned relative to viewport */}
      <View className="md:hidden fixed bottom-24 right-6 z-50">
        <Button
          onPress={() => onNavigate(ScreenName.CALENDAR)}
          className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-200 flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all"
        >
          <Calendar className="w-6 h-6" />
        </Button>
      </View>
    </View>
  );
};

export default home;
