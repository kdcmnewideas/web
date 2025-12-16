import { BarChart, DonutChart, LineChart } from "@/components/charts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Text } from "@/components/ui/text";
import { EXAM_HISTORY, PERFORMANCE_STATS, SUBJECTS } from "@/mockData";
import {
  BookOpen,
  Clock,
  Download,
  Share2,
  TrendingUp
} from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { useUniwind } from "uniwind";

const colorMap: Record<string, string> = {
  "text-emerald-500": "#10b981",
  "text-indigo-500": "#6366f1",
  "text-amber-500": "#f59e0b",
  "text-rose-500": "#f43f5e",
  "text-slate-500": "#64748b",
};

const Analytics = () => {
  const { theme } = useUniwind();
  const stats = PERFORMANCE_STATS;
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Prepare data for charts
  const trendData = EXAM_HISTORY.map((e) => e.score).reverse(); // Mock trend data from history
  const timeData = stats.subjectTimeDistribution.map((s) => ({
    label: s.subjectName.substring(0, 3), // Shorten name
    value: s.hours,
    color: s.color,
  }));

  // Map mastery distribution for Donut Chart
  const masteryData = stats.masteryDistribution.map((item) => ({
    value: item.value,
    color: colorMap[item.color] || "#cbd5e1",
  }));

  const renderExamItem = (exam: (typeof EXAM_HISTORY)[0]) => {
    const subject = SUBJECTS.find((s) => s.id === exam.subjectId);
    return (
      <View key={exam.id} className="p-4 flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View
            className={`w-10 h-10 rounded-full flex-row items-center justify-center ${subject?.color || "bg-slate-500"} bg-opacity-10`}
          >
            <Text className={`text-white`}>{subject?.title.charAt(0)}</Text>
          </View>
          <View>
            <Text className="font-medium">{subject?.title}</Text>
            <Text className="text-xs text-slate-500 dark:text-slate-400">
              {exam.date} • {exam.totalQuestions} Questions
            </Text>
          </View>
        </View>
        <View className="text-right">
          <Text
            className={`font-bold block ${exam.score >= 80 ? "text-green-600" : exam.score >= 60 ? "text-yellow-600" : "text-red-600"}`}
          >
            {exam.score}%
          </Text>
          <Text className="text-xs text-slate-400">Score</Text>
        </View>
      </View>
    );
  };

  const modalData = () => {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Full Exam History</DialogTitle>
        </DialogHeader>
        <View className="grid gap-4">{EXAM_HISTORY.map(renderExamItem)}</View>
      </>
    );
  };

  return (
    <>
      <View className="gap-6 animate-fade-in pb-10 md:p-2 -mx-2 md:mx-0 pt-10">
        {/* Header */}
        <View className=" md:flex-row justify-between items-center px-2 md:px-0 gap-6 md:gap-0">
          <View>
            <Text className="text-2xl font-bold text-center md:text-left">Performance Analytics</Text>
            <Text className="text-slate-500 dark:text-slate-400 text-sm text-center md:text-left">
              Track your progress and mastery.
            </Text>
          </View>
          <View className="flex-row gap-2" data-html2canvas-ignore="true">
            <Button variant="default" size="sm">
              <Share2
                className="md:mr-2"
                size={16}
                color={theme === "dark" ? "#fff" : "#000"}
              />
              <Text>Share</Text>
            </Button>
            <Button variant="outline" size="sm">
              <Download
                className="md:mr-2"
                size={16}
                color={theme === "dark" ? "#fff" : "#000"}
              />
              <Text>Export</Text>
            </Button>
          </View>
        </View>

        {/* Key Metrics Grid */}
        <View className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2 md:px-0">
          <Card className="p-4 flex-row items-center gap-4 border-l-4 border-l-primary">
            <View className="p-3 bg-indigo-50 rounded-full">
              <TrendingUp size={24} color={"#4f39f6"} />
            </View>
            <View>
              <Text className="text-sm text-slate-500 dark:text-slate-400">
                Average Score
              </Text>
              <Text className="text-2xl font-bold">{stats.averageScore}%</Text>
            </View>
          </Card>

          <Card className="p-4 flex-row items-center gap-4 border-l-4 border-l-[#009689]">
            <View className="p-3 bg-teal-50 rounded-full">
              <Clock size={24} color={"#009689"} />
            </View>
            <View>
              <Text className="text-sm text-slate-500 dark:text-slate-400">
                Total Study Time
              </Text>
              <Text className="text-2xl font-bold ">
                {stats.totalStudyHours}h
              </Text>
            </View>
          </Card>

          <Card className="p-4 flex-row items-center gap-4 border-l-4 border-l-amber-600">
            <View className="p-3 bg-amber-50 rounded-full">
              <BookOpen size={24} color={"#e17100"} />
            </View>
            <View>
              <Text className="text-sm text-slate-500 dark:text-slate-400">
                Exams Taken
              </Text>
              <Text className="text-2xl font-bold ">{stats.totalExams}</Text>
            </View>
          </Card>
        </View>

        {/* Main Charts Section */}
        <View className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2 md:px-0">
          {/* Score Trend - Span 2 cols */}
          <Card className="lg:col-span-2 p-6">
            <View className="flex-row justify-between items-center mb-6 gap-2">
              <Text className="font-bold">Score Trend (Last 6 Exams)</Text>
              <Text className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full flex items-center">
                <TrendingUp className="mr-1" color={"#009689"} size={12} /> +12%
                vs last month
              </Text>
            </View>
            <View className="h-64 w-full">
              <LineChart data={trendData} color="#4338ca" height={250} />
            </View>
          </Card>

          {/* Mastery Donut Chart */}
          <Card className="p-6 flexflex-row-col items-center justify-center">
            <Text className="font-bold  mb-6 w-full text-left">
              Overall Mastery
            </Text>
            <DonutChart
              data={masteryData}
              centerLabel="78%"
              subLabel="Advanced"
              size={180}
            />
            <View className="w-full mt-6 space-y-2">
              {stats.masteryDistribution.map((item, idx) => (
                <View
                  key={idx}
                  className="flex-row justify-between text-sm items-center"
                >
                  <Text className="text-slate-500 dark:text-slate-400 flex-row items-center">
                    <Text
                      className={`w-2 h-2 rounded-full mr-2 ${item.color.replace("text-", "bg-")}`}
                    ></Text>
                    {item.label}
                  </Text>
                  <Text className={`font-semibold ${item.color}`}>
                    {item.value}%
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        <View className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 md:px-0">
          {/* Time Distribution Bar Chart */}
          <Card className="p-6">
            <Text className="font-bold mb-6">Time Spent by Subject</Text>
            <BarChart data={timeData} height={200} />
          </Card>

          {/* Exam History List */}
          <Card className="p-0 overflow-hidden">
            <View className="p-6 border-b border-border flex-row justify-between items-center">
              <Text className="font-bold">Recent Exams</Text>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"secondary"}>
                  <Text>View All</Text>
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-106.25">{modalData()}</DialogContent>
              </Dialog>
            </View>
            <View className="Viewide-y Viewide-slate-100">
              {EXAM_HISTORY.slice(0, 4).map(renderExamItem)}
            </View>
          </Card>
        </View>
      </View>
    </>
  );
};

export default Analytics;
