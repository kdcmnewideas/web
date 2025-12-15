import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { SCHEDULE_ITEMS, SUBJECTS } from "@/mockData";
import { ScheduleItem } from "@/types/types";
import {
  BookOpen,
  CalendarIcon,
  Clock,
  PenTool,
  RefreshCw
} from "lucide-react-native";
import { View } from "react-native";
import { useUniwind } from "uniwind";

const Revision = () => {
  const [activeTab, setActiveTab] = useState<string>("upcoming");
  const { theme } = useUniwind();

  const now = new Date("2023-10-31"); // Fixed date for mock purposes, simulating "today"

  const filteredItems = SCHEDULE_ITEMS.filter((item) => {
    const itemDate = new Date(item.date);
    if (activeTab === "upcoming") {
      return itemDate >= now || item.status === "upcoming";
    } else {
      return itemDate < now && item.status !== "upcoming";
    }
  }).sort((a, b) => {
    return activeTab === "upcoming"
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Group by date
  const groupedItems: Record<string, ScheduleItem[]> = {};
  filteredItems.forEach((item) => {
    if (!groupedItems[item.date]) {
      groupedItems[item.date] = [];
    }
    groupedItems[item.date].push(item);
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500 bg-green-50";
      case "upcoming":
        return "text-primary bg-indigo-50";
      case "missed":
        return "text-red-500 bg-red-50";
      default:
        return "text-slate-500 bg-slate-50";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "test":
        return <PenTool size={16} color={"#ffff"} />;
      case "revision":
        return <RefreshCw size={16} color={"#ffff"} />;
      default:
        return <BookOpen size={16} color={"#ffff"} />;
    }
  };

  const formatDateHeader = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date("2023-11-01"); // Mock Today

    // Check if Today or Tomorrow
    if (dateStr === "2023-11-01") return "Today";
    if (dateStr === "2023-11-02") return "Tomorrow";

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <View className="max-w-3xl mx-auto space-y-6 animate-fade-in w-full pt-10 pb-2">
      <View className="flex items-start justify-between mb-4">
        <View className="flex items-center gap-4">
          <Text className="text-2xl font-bold">Revision Schdeule</Text>
        </View>
      </View>
      <View className="sticky top-0 py-4 z-10 bg-background">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="upcoming">
              <Text>Upcoming</Text>
            </TabsTrigger>
            <TabsTrigger value="history">
              <Text>History</Text>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </View>

      {/* Timeline */}
      <View className="gap-6">
        {Object.keys(groupedItems).length === 0 ? (
          <View className="text-center py-12">
            <View className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon color={"#cad5e2"} size={40} />
            </View>
            <Text className="text-lg font-semibold text-center">
              No {activeTab} events
            </Text>
            <Text className="text-slate-500 dark:text-slate-400 text-center">
              Your schedule looks clear.
            </Text>
          </View>
        ) : (
          Object.keys(groupedItems).map((date) => (
            <View key={date} className="relative">
              <View className="web:sticky web:top-16 z-10 py-2 mb-4 border-b border-border bg-background">
                <Text className="text-lg font-bold flex items-center flex-row">
                  <CalendarIcon size="20" color={theme === "dark" ? "#6941C6" : "#9E77ED"}/> {" "}
                  {formatDateHeader(date)}
                </Text>
              </View>

              <View className="gap-4 pb-4 relative">
                {groupedItems[date].map((item) => {
                  const subject = SUBJECTS.find((s) => s.id === item.subjectId);
                  return (
                    <Card
                      key={item.id}
                      className="relative group hover:border-primary/50 transition-colors p-6"
                    >
                      <View className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <View className="flex flex-row items-start gap-4">
                          <View
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${subject?.color || "bg-slate-500"} text-white shadow-md`}
                          >
                            {getTypeIcon(item.type)}
                          </View>
                          <View className="flex-1">
                            <Text className="font-bold">
                              {item.title}
                            </Text>
                            <View className="flex flex-row flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500 mt-1">
                              <Text className="flex  flex-row items-center text-primary font-medium">
                                <Clock color={theme === "dark" ? "#6941C6" : "#9E77ED"} size={14}/>{"  "}
                                {item.time}
                              </Text>
                              <Text>•</Text>
                              <Text>{item.duration} min</Text>
                              <Text>•</Text>
                              <Text>{subject?.title}</Text>
                            </View>
                            {item.description && (
                              <Text className="text-sm text-slate-400 mt-2 line-clamp-1 text-wrap">
                                {item.description}
                              </Text>
                            )}
                          </View>
                        </View>

                        <View className="flex flex-row items-center justify-between md:justify-end gap-3 mt-2 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-border">
                          <Text
                            className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(item.status)}`}
                          >
                            {item.status}
                          </Text>

                          {item.status === "upcoming" && (
                            <Button size="sm" onPress={() => {}}>
                              <Text>Start</Text>
                            </Button>
                          )}
                        </View>
                      </View>
                    </Card>
                  );
                })}
              </View>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default Revision;
