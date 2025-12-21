import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { SUBJECTS } from "@/mockData";
import { router } from "expo-router";
import {
  ArrowRight,
  Atom,
  BookOpen,
  Calculator,
  Dna,
  Hourglass,
  Search,
} from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { useUniwind } from "uniwind";

const iconMap: Record<string, React.ElementType> = {
  Calculator,
  Atom,
  BookOpen,
  Hourglass,
  Dna,
};

const subjects = () => {
  const { theme } = useUniwind();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubjects = SUBJECTS.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View className="gap-6 animate-fade-in md:pt-0 pt-10">
      <View className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
        <View>
          <Text className="text-3xl font-bold">All Subjects</Text>
          <Text className="text-slate-500">Explore and master new topics</Text>
        </View>
        <View className="w-full md:w-72">
          <Input
            placeholder="Search subjects..."
            value={searchTerm}
            onChangeText={(e) => setSearchTerm(e)}
          />
        </View>
      </View>

      <View className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => {
          const Icon = iconMap[subject.icon] || BookOpen;
          return (
            <Pressable
              key={subject.id}
              onPress={() =>
                router.navigate(`/subject/${subject.id}`)
              }
            >
              <Card className="group hover:border-primary transition-colors duration-300 p-6">
                <View className="flex flex-row justify-between items-start">
                  <View
                    className={`w-14 h-14 rounded-2xl ${subject.color} flex flex-row items-center justify-center shadow-lg`}
                  >
                    <Icon size={28} color={"#FFFF"} />
                  </View>
                  <Text className="bg-slate-50 px-3 py-1 rounded-full text-xs font-bold text-slate-500">
                    {subject.totalLessons} Lessons
                  </Text>
                </View>

                <Text className="text-xl font-bold group-hover:text-primary transition-colors">
                  {subject.title}
                </Text>

                <Text className="text-slate-500 text-sm mb-3 grow line-clamp-3 dark:text-slate-400">
                  {subject.description ||
                    `Comprehensive ${subject.title} curriculum covering key concepts and advanced topics for students.`}
                </Text>

                <View className="gap-3 mt-auto">
                  <View className="flex flex-row justify-between text-xs text-slate-500 font-medium">
                    <Text>Progress</Text>
                    <Text>{subject.progress}%</Text>
                  </View>
                  <View className="w-full bg-slate-100 rounded-full h-2">
                    <View
                      className={`${subject.color} h-full rounded-full transition-all duration-1000`}
                      style={{ width: `${subject.progress}%` }}
                    />
                  </View>

                  <View className="items-center flex flex-row">
                    <Text className="text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                      View Course
                    </Text>
                    <ArrowRight
                      className="ml-2"
                      color={theme === "dark" ? "#6941C6" : "#9E77ED"}
                    />
                  </View>
                </View>
              </Card>
            </Pressable>
          );
        })}

        {filteredSubjects.length === 0 && (
          <View className="col-span-full py-12 text-center w-full">
            <View className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Search className="w-10 h-10" />
            </View>
            <Text className="text-lg font-semibold text-center">
              No subjects found
            </Text>
            <Text className="text-slate-500 dark:text-slate-400 text-center">
              Try adjusting your search term
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default subjects;
