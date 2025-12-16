import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { CURRENT_USER, LEADERBOARD_DATA } from "@/mockData";
import { getInitials } from "@/utils/get-intitials";
import { ArrowDown, ArrowUp, MapPin, Minus, Users } from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { useUniwind } from "uniwind";

const Leaderboard = () => {
  const { theme } = useUniwind();
  const [filter, setFilter] = useState<"National" | "Local" | "Friends">(
    "National"
  );

  const getDisplayData = () => {
    switch (filter) {
      case "National":
        return LEADERBOARD_DATA.filter(
          (u) =>
            u.location.includes("USA") ||
            u.location.includes("CA") ||
            u.location.includes("New York")
        );
      case "Local":
        return LEADERBOARD_DATA.filter(
          (u) =>
            u.location.includes("Toronto") || u.location.includes("New York")
        );
      case "Friends":
        return LEADERBOARD_DATA.filter((u) =>
          ["u2", "u3", "u1", "u5"].includes(u.id)
        );
      default:
        return LEADERBOARD_DATA;
    }
  };

  const displayData = getDisplayData();

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-100 text-yellow-700";
      case 2:
        return "bg-slate-200 text-slate-700";
      case 3:
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-background border border-border";
    }
  };

  return (
    <View className="gap-8 animate-fade-in pt-10 pb-5">
      {/* Header Section - Solid Color */}
      <View className="bg-primary rounded-2xl p-8 md:p-10 text-white relative overflow-hidden shadow-sm">
        <View className="relative z-10">
          <Text className="text-3xl font-bold mb-2 tracking-tight text-white">
            Leaderboard
          </Text>
          <Text className="dark:text-indigo-200 text-lg mb-8 text-gray-200">
            Compete with students around the world.
          </Text>

          <View className="flex flex-row items-center gap-8 border-t border-white/10 pt-6">
            <View>
              <Text className="text-xs dark:text-indigo-300 font-bold uppercase tracking-wider mb-1 text-gray-300">
                Your Rank
              </Text>
              <Text className="text-4xl font-bold text-white">{CURRENT_USER.rank}</Text>
            </View>
            <View className="w-px h-12 bg-white/10"></View>
            <View>
              <Text className="text-xs dark:text-indigo-300 font-bold uppercase tracking-wider mb-1 text-gray-300">
                Total Points
              </Text>
              <Text className="text-4xl font-bold text-white">
                {CURRENT_USER.totalPoints}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Filters */}
      <View className="flex flex-row gap-2 overflow-x-auto border-b border-border">
        {["National", "Local", "Friends"].map((f) => (
          <Button
            variant="ghost"
            key={f}
            onPress={() => setFilter(f as any)}
            className={`
              px-5 py-2.5 rounded-b-xs font-medium transition-all duration-200 whitespace-nowrap text-sm border-b-2
              ${
                filter === f
                  ? "border-primary bg-card"
                  : "border-transparent  hover:bg-slate-50"
              }
            `}
          >
            {f === "National" && (
              <MapPin
                className="inline mr-2"
                size={16}
                color={
                  filter === f
                    ? theme === "dark"
                      ? "#6941C6"
                      : "#9E77ED"
                    : theme === "dark"
                      ? "#90a1b9"
                      : "#62748e"
                }
              />
            )}
            {f === "Local" && (
              <MapPin
                className="inline mr-2"
                size={16}
                color={
                  filter === f
                    ? theme === "dark"
                      ? "#6941C6"
                      : "#9E77ED"
                    : theme === "dark"
                      ? "#90a1b9"
                      : "#62748e"
                }
              />
            )}
            {f === "Friends" && (
              <Users
                className="inline mr-2"
                size={16}
                color={
                  filter === f
                    ? theme === "dark"
                      ? "#6941C6"
                      : "#9E77ED"
                    : theme === "dark"
                      ? "#90a1b9"
                      : "#62748e"
                }
              />
            )}
            <Text
              className={`${filter === f ? "text-primary font-bold" : "text-slate-500 dark:text-slate-400"}`}
            >
              {f}
            </Text>
          </Button>
        ))}
      </View>

      {/* Leaderboard List */}
      <View className="gap-3">
        {displayData.map((user) => (
          <Card
            key={user.id}
            className={`
              flex flex-row items-center p-4 transition-all duration-200 gap-4 md:gap-6
              ${user.id === CURRENT_USER.id ? "border-primary ring-1 ring-primary shadow-sm z-10" : ""}
            `}
          >
            {/* Rank */}
            <View
              className={`
              md:w-10 md:h-10 text-sm rounded-lg items-center justify-center font-bold md:mr-4 mr-2 shrink-0 w-8 h-8 
              ${getRankStyle(user.rank)}
            `}
            >
              <Text className={`${getRankStyle(user.rank)} border-0`}>
                {user.rank}
              </Text>
            </View>

            <Avatar
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover bg-slate-100 shrink-0"
            >
              <AvatarImage
                source={{
                  uri: user.avatarUrl || "https://via.placeholder.com/150",
                }}
              />
              <AvatarFallback>
                <Text>{getInitials(user.name)}</Text>
              </AvatarFallback>
            </Avatar>

            {/* Info */}
            <View className="flex-1 min-w-0">
              <View className="flex flex-row items-center gap-2">
                <Text
                  className={`font-bold truncate text-sm md:text-lg ${user.id === CURRENT_USER.id ? "text-primary" : ""}`}
                >
                  {user.name} {user.id === CURRENT_USER.id && "(You)"}
                </Text>
              </View>
              <Text className="text-xs text-slate-500 flex items-center truncate mt-0.5">
                <MapPin className="shrink-0 mr-1" size={12} color={"#62748e"} />
                {"  "} {user.location}
              </Text>
            </View>

            {/* Points & Trend */}
            <View className=" shrink-0 md:min-w-20 min-w-15">
              <View className="font-bold">
                <Text className="text-right">
                  {user.points.toLocaleString()}
                </Text>
              </View>
              <View className="flex items-end justify-center  mt-1">
                {user.change === "up" && (
                  <View className="flex-row items-center justify-center gap-1">
                    <ArrowUp className="mr-0.5" size={12} color={"#16a34a"} />
                    <Text className="text-emerald-600 flex items-center text-xs font-medium">
                      12
                    </Text>
                  </View>
                )}
                {user.change === "down" && (
                  <View className="flex-row items-center justify-center gap-1">
                    <ArrowDown className="mr-0.5" size={12} color={"#fb2c36"} />
                    <Text className="text-red-500 flex items-center text-xs font-medium">5</Text>
                  </View>
                )}
                {user.change === "same" && (
                  <View className="flex-row items-center justify-center gap-1">
                    <Minus className="mr-0.5" color={"#90a1b9"} size={12}/>
                    <Text className="text-slate-400 flex items-center text-xs font-medium">0</Text>
                  </View>
                )}
              </View>
            </View>
          </Card>
        ))}
      </View>
    </View>
  );
};

export default Leaderboard;
