import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import RevisionTopics from "@/components/RevisionTopics";
import SubjectCard from "@/components/SubjectCard";
import { Text } from "@/components/ui/text";
import UserGoal from "@/components/UserGoal";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import * as React from "react";
import { ScrollView, View } from "react-native";

const SCREEN_OPTIONS = {
  headerShown: false,
};

const subjects = [
  {
    subject: "Mathematics",
    progress: 75,
    icon: "brain" as const,
    color: "primary" as const,
  },
  {
    subject: "Science",
    progress: 62,
    icon: "flask" as const,
    color: "primary" as const,
  },
  {
    subject: "English",
    progress: 80,
    icon: "book" as const,
    color: "primary" as const,
  },
  {
    subject: "History",
    progress: 55,
    icon: "book" as const,
    color: "primary" as const,
  },
];

export default function Screen() {
  const { colorScheme } = useColorScheme();

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <ScrollView className="min-h-screen bg-background">
        <Navigation />

        <View className="container mx-auto px-4 py-6 md:py-8">
          <View className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <View className="lg:col-span-8 space-y-6">
              <HeroSection />
              <UserGoal />

              <View>
                <Text className="text-2xl font-bold mb-4 text-foreground">
                  Your Subjects
                </Text>
                <View className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subjects.map((subject, index) => (
                    <SubjectCard key={index} {...subject} />
                  ))}
                </View>
              </View>
            </View>

            <View className="lg:col-span-4 hidden lg:block">
              <RevisionTopics />
            </View>

            <View className="lg:hidden"> <RevisionTopics /></View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
