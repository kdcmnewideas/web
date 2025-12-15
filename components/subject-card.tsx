import { ScreenName, Subject } from "@/types/types";
import { getSubjectColorStyles } from "@/utils/subject-color";
import {
  Atom,
  BookOpen,
  Calculator,
  Dna,
  Hourglass,
} from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";
import { Card } from "./ui/card";
import { Text } from "./ui/text";

const iconMap: Record<string, React.ElementType> = {
  Calculator,
  Atom,
  BookOpen,
  Hourglass,
  Dna,
};

interface SubjectCardProps {
  subject: Subject;
}

const SubjectCard = ({ subject }: SubjectCardProps) => {
  const Icon = iconMap[subject.icon] || BookOpen;
  const styles = getSubjectColorStyles(subject.color);

  const onNavigate = (route: ScreenName, params?: any) => {
    console.log(route);
  };

  return (
    <Pressable
      key={subject.id}
      onPress={() =>
      {}
      }
    >
      <Card className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] h-auto!">
        <View className=" flex items-start justify-between flex-row w-full">
          <View
            className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm ${styles.iconBg} transition-transform duration-300 group-hover:scale-110`}
          >
            <Icon size={32} color={"#FFFF"} />
          </View>
          <View className="rounded-full border border-slate-100 bg-slate-50 px-3 py-1 transition-colors group-hover:border-slate-200">
            <Text className="text-xs font-bold text-slate-500">
              {subject.totalLessons} Lessons
            </Text>
          </View>
        </View>

        <Text className=" text-lg font-bold text-left w-full">
          {subject.title}
        </Text>
        <Text className="line-clamp-2 text-sm text-slate-400">
          {subject.description ||
            "Master key concepts and advance your skills."}
        </Text>

        <View className="mt-auto w-full">
          <View className="mb-2 flex justify-between   flex-row w-full">
            <Text className="text-slate-400 text-xs font-semibold">
              Progress
            </Text>
            <Text className="text-slate-400 text-xs font-semibold">
              {subject.progress}%
            </Text>
          </View>
          <View className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <View
              className={`h-full rounded-full ${styles.bar}`}
              style={{ width: `${subject.progress}%` }}
            ></View>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

export default SubjectCard;
