import { REVISION_TOPICS, SUBJECTS } from "@/mockData";
import { ScreenName } from "@/types/types";
import { getSubjectColorStyles } from "@/utils/subject-color";
import {
  Atom,
  BookOpen,
  Calculator,
  Clock,
  Dna,
  Hourglass,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Text } from "./ui/text";

const iconMap: Record<string, React.ElementType> = {
  Calculator,
  Atom,
  BookOpen,
  Hourglass,
  Dna,
};

const RevisionWidget = () => {
  const onNavigate = (route: ScreenName, params?: any) => {
    console.log(route);
  };
  return (
    <Card className=" rounded-3xl p-2 shadow-sm pt-6">
      <View className="flex items-center justify-between flex-row">
        <View className="flex items-center gap-3 flex-row">
          <View className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <Clock className="w-5 h-5" />
          </View>
          <Text className="font-bold">Up Next</Text>
        </View>
        <Button variant="ghost">
          <MoreHorizontal className="w-5 h-5 dark:text-white" />
        </Button>
      </View>

      <View className="gap-3">
        {REVISION_TOPICS.slice(0, 4).map((topic) => {
          const subject = SUBJECTS.find((s) => s.title === topic.subject);
          const styles = getSubjectColorStyles(
            subject?.color || "bg-slate-500"
          );
          const Icon = subject ? iconMap[subject.icon] : BookOpen;

          return (
            <Button
                variant={'ghost'}
              key={topic.id}
              className="flex items-start flex-row gap-3 p-3 rounded-2xl group h-auto!"
            >
              <View
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${styles.light} ${styles.text}`}
              >
                <RefreshCw className="w-5 h-5" />
              </View>

              <View className="flex-1 min-w-0">
                <View className="flex justify-between items-start mb-1.5 flex-row">
                  <Text className="font-bold text-sm leading-snug group-hover:text-primary transition-colors">
                    {topic.title}
                  </Text>
                  <Text className="text-[10px] font-bold text-slate-400 whitespace-nowrap ml-2 shrink-0 mt-0.5">
                    {topic.date
                      .replace(" days ago", "d")
                      .replace(" week ago", "w")}
                  </Text>
                </View>
                <View className="flex flex-row items-center gap-2 text-xs font-medium text-slate-500">
                  <Text className={`${styles.text} font-bold`}>
                    {topic.subject}
                  </Text>
                  <Text className="w-1 h-1 rounded-full bg-slate-300"></Text>
                  <Text>15 min</Text>
                </View>
              </View>
            </Button>
          );
        })}
      </View>

      <View className=" pt-5 border-t border-border">
        <Button
          variant="outline"
          onPress={() => onNavigate(ScreenName.CALENDAR)}
          className="rounded-xl"
        >
          <Text>View Full Calendar</Text>
        </Button>
      </View>
    </Card>
  );
};

export default RevisionWidget;
