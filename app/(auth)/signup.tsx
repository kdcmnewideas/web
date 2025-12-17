import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import {
  Award,
  BarChart2,
  Globe,
  LayoutGrid,
  PieChart,
  Rocket,
  Star,
  Target,
  Trophy,
  Users,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUniwind } from "uniwind";

export default function Signup() {
  const navigation = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const { theme: colorScheme } = useUniwind();

  // Slides Data
  const slides = [
    {
      id: 0,
      title: "Start your learning journey",
      description:
        "Join over 10,000 students achieving their goals with our interactive lessons and real-time analytics.",
      icons: {
        top: { icon: Star, color: "#ffdf20", bg: "bg-white/10" },
        main: { icon: Rocket, color: "#fff", bg: "bg-white/20" },
        bottom: { icon: Trophy, color: "#ffb86a", bg: "bg-white/10" },
      },
    },
    {
      id: 1,
      title: "Track your progress",
      description:
        "Visualize your improvements with detailed charts and gain insights into your weak spots.",
      icons: {
        top: { icon: PieChart, color: "#5ee9b5", bg: "bg-emerald-500/20" },
        main: { icon: BarChart2, color: "#fff", bg: "bg-emerald-500/30" },
        bottom: { icon: Target, color: "#ffa2a2", bg: "bg-red-500/20" },
      },
    },
    {
      id: 2,
      title: "Connect & Compete",
      description:
        "Challenge friends, join study groups, and climb the global leaderboards to prove your mastery.",
      icons: {
        top: { icon: Globe, color: "#8ec5ff", bg: "bg-blue-500/20" },
        main: { icon: Users, color: "#fff", bg: "bg-blue-500/30" },
        bottom: { icon: Award, color: "#dab2ff", bg: "bg-purple-500/20" },
      },
    },
  ];

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const currentSlide = slides[activeSlide];

  const goToLogin = () => {
    navigation.navigate("/login");
  };

  return (
    <SafeAreaView>
      <View className="min-h-screen animate-fade-in flex-row">
        {/* Left Side - Form */}
        <View className="relative z-10 flex w-full flex-col justify-center p-8 md:p-16 lg:w-1/2">
          {/* Brand */}
          <View className="absolute left-8 top-8 flex-row items-center gap-2 md:left-16">
            <View className="h-8 w-8 flex-row items-center justify-center rounded-lg bg-indigo-600">
              <LayoutGrid height={20} width={20} color={"#FFFFFF"} />
            </View>
            <Text className="text-xl font-bold">StudyMate</Text>
          </View>

          <View className="mx-auto mt-12 w-full max-w-md lg:mt-0">
            <Text className="mb-2 text-3xl font-bold">Create an account</Text>
            <Text className="mb-8 text-slate-500 dark:text-slate-400">
              Start your 30-day free trial.
            </Text>

            <View className="gap-4">
              <View>
                <Label className="mb-1.5 block text-sm font-medium">Name</Label>
                <Input
                  placeholder="Enter your name"
                  value={name}
                  onChangeText={(e) => setName(e)}
                />
              </View>

              <View>
                <Label className="mb-1.5 block text-sm font-medium">
                  Email
                </Label>
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={(e: string) => {
                    setEmail(e);
                  }}
                />
              </View>

              <View>
                <Label className="mb-1.5 block text-sm font-medium">
                  Password
                </Label>
                <Input
                  placeholder="Create a password"
                  value={password}
                  onChangeText={(e) => setPassword(e)}
                  secureTextEntry={true}
                />
                <Text className="mt-1.5 text-xs text-slate-400">
                  Must be at least 8 characters.
                </Text>
              </View>

              <View className="gap-4 pt-2">
                <Button className="h-11">
                  <Text>Get started</Text>
                </Button>

                <Button
                  variant={"outline"}
                  className="flex h-11 w-full items-center justify-center gap-3"
                >
                  <Image
                    className={"size-4"}
                    source={{
                      uri: "https://img.clerk.com/static/google.png?width=160",
                    }}
                  />
                  <Text>Sign up with Google</Text>
                </Button>
              </View>
            </View>
            <View className="mt-8 flex flex-row items-center justify-center gap-1">
              <Text className="text-center text-sm text-slate-600 dark:text-slate-400">
                Already have an account?{" "}
              </Text>
              <Button
                variant={"link"}
                className="p-0 font-semibold"
                onPress={() => {
                  goToLogin();
                }}
              >
                <Text>Log in</Text>
              </Button>
            </View>
          </View>
        </View>

        {/* Right Side - Visual */}
        <View className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-[#7F56D9] transition-colors duration-700 lg:flex lg:flex-row">
          {/* Decorative Background */}
          <View className="absolute inset-0 bg-linear-to-br from-[#7F56D9] to-[#6941C6]"></View>
          <View className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/5 blur-3xl"></View>
          <View className="absolute bottom-0 left-0 h-1/2 w-full bg-linear-to-t from-black/10 to-transparent"></View>

          <View className="relative z-10 w-full max-w-lg px-12 text-center">
            {/* Animated Icon Composition - Horizontal Layout */}
            <View className="relative mb-12 flex h-40 flex-row items-center justify-center">
              <View
                key={`slide-${activeSlide}`}
                className="relative flex animate-fade-in flex-row items-center justify-center"
              >
                {/* Left Icon */}
                <View
                  className={`absolute -left-28 z-0 flex h-24 w-24 -rotate-12 transform flex-row items-center justify-center rounded-3xl border border-white/20 shadow-2xl backdrop-blur-md ${currentSlide.icons.top.bg}`}
                >
                  <currentSlide.icons.top.icon
                    color={currentSlide.icons.top.color}
                    height={40}
                    width={40}
                  />
                </View>

                {/* Main Icon (Center) */}
                <View
                  className={`relative z-20 flex h-32 w-32 rotate-0 transform flex-row items-center justify-center rounded-3xl border border-white/30 shadow-2xl backdrop-blur-md ${currentSlide.icons.main.bg}`}
                >
                  <currentSlide.icons.main.icon
                    height={64}
                    width={64}
                    color={currentSlide.icons.main.color}
                  />
                </View>

                {/* Right Icon */}
                <View
                  className={`absolute -right-28 z-0 flex h-24 w-24 rotate-12 transform flex-row items-center justify-center rounded-3xl border border-white/20 shadow-2xl backdrop-blur-md ${currentSlide.icons.bottom.bg}`}
                >
                  <currentSlide.icons.bottom.icon
                    height={40}
                    width={40}
                    color={currentSlide.icons.bottom.color}
                  />
                </View>
              </View>
            </View>

            {/* Text Content */}
            <View
              key={`text-${activeSlide}`}
              className="min-h-35 animate-fade-in"
            >
              <Text className="mb-4 text-3xl font-bold text-white">
                {currentSlide.title}
              </Text>
              <Text className="text-lg leading-relaxed text-indigo-200">
                {currentSlide.description}
              </Text>
            </View>

            {/* Slide Indicators */}
            <View className="mt-12 flex flex-row justify-center gap-2">
              {slides.map((_, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => setActiveSlide(idx)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    activeSlide === idx
                      ? "w-6 bg-white"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
