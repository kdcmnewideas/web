import "@/global.css";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ScreenName } from "@/types/types";
import { Slot, usePathname, useRouter } from "expo-router";
import {
  BarChart2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
  LayoutDashboard,
  LogOut,
  User,
  Users,
} from "lucide-react-native";
import { useState } from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { useUniwind } from "uniwind";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export default function AppLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const router = useRouter();
  const activeScreen = usePathname();
  const screenHeight = Dimensions.get("window").height;
  const { theme } = useUniwind();

  const navItems = [
    { id: ScreenName.HOME, icon: Home, label: "Home", active: [ScreenName.HOME] },
    { id: ScreenName.SUBJECTS, icon: LayoutDashboard, label: "Subjects", active: [ScreenName.SUBJECTS] },
    { id: ScreenName.CALENDAR, icon: Calendar, label: "Revision", active: [ScreenName.CALENDAR] },
    { id: ScreenName.ANALYTICS, icon: BarChart2, label: "Results", active: [ScreenName.ANALYTICS] },
    { id: ScreenName.LEADERBOARD, icon: Users, label: "Leaderboard", active: [ScreenName.LEADERBOARD] },
    {
      id: ScreenName.PROFILE,
      icon: User,
      label: "Profile",
      active: [ScreenName.PROFILE, ScreenName.GOALS, ScreenName.SETTINGS, ScreenName.CHANGE_PASSWORD],
    },
  ];

  // Mobile nav logic (show Profile instead of Schedule)
  const mobileNavItems = [
    navItems[0], // Home
    navItems[1], // Subjects
    navItems[3], // Results
    navItems[4], // Leaderboard
    navItems[5], // Profile
  ];

  const getActiveScreen = (activeScreens: string[]) => {
    return activeScreens.find((input) => activeScreen.startsWith(input));
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="flex-1">
        <View className="flex bg-background flex-1 min-h-screen">
          {/* Sidebar for Desktop */}
          <View
            className={`hidden flex-col md:flex ${isSidebarCollapsed ? "w-20" : "w-48"} fixed z-10 h-full border-r border-border bg-card transition-all duration-300 ease-in-out`}
          >
            {/* Toggle Button */}
            <Button
              onPress={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="absolute -right-3 top-10 z-20 rounded-full border border-border bg-card p-1! text-slate-400 shadow-sm transition-colors hover:border-indigo-200 hover:text-indigo-600"
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="h-3 w-3" />
              ) : (
                <ChevronLeft className="h-3 w-3" />
              )}
            </Button>

            <View
              className={`flex h-24 flex-row items-center border-b border-border ${isSidebarCollapsed ? "justify-center px-0" : "px-6"}`}
            >
              <View className="flex flex-row items-center gap-3 overflow-hidden">
                <View className="flex h-8 w-8 shrink-0 flex-row items-center justify-center rounded-lg bg-primary transition-all duration-300">
                  <Text className="text-lg font-bold text-white">S</Text>
                </View>
                <Text
                  className={`text-xl font-bold tracking-tight transition-opacity duration-200 ${isSidebarCollapsed ? "w-0 opacity-0" : "opacity-100"}`}
                >
                  StudyMate
                </Text>
              </View>
            </View>

            <View className="flex-1 space-y-1.5 overflow-y-auto overflow-x-hidden p-3">
              {navItems.map((item) => (
                <Button
                  variant={"ghost"}
                  key={item.id}
                  onPress={() => router.push(item.id)}
                  className={`flex w-full items-center ${isSidebarCollapsed ? "justify-center px-0" : "justify-start gap-3 px-3"} group relative rounded-xl py-2.5 font-medium transition-all duration-200 ${
                    getActiveScreen(item.active)
                      ? "bg-indigo-50 text-primary dark:bg-primary dark:hover:bg-primary"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
                  } `}
                >
                  <item.icon
                    className={`shrink-0 ${getActiveScreen(item.active) ? "text-primary dark:text-white" : "text-slate-400"}`}
                    size={20}
                  />
                  <Text
                    className={`whitespace-nowrap text-sm transition-all duration-200 ${isSidebarCollapsed ? "hidden w-0 opacity-0" : "opacity-100"} ${getActiveScreen(item.active)? "text-primary dark:text-white" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"}`}
                  >
                    {item.label}
                  </Text>

                  {/* Tooltip for collapsed state */}
                  {isSidebarCollapsed && (
                    <View className="pointer-events-none absolute left-full z-50 ml-4 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                      <Text>{item.label}</Text>
                    </View>
                  )}
                </Button>
              ))}
            </View>

            <View className="border-t border-border p-4">
              <Button
                variant={"ghost"}
                onPress={() => router.push(ScreenName.LOGIN)}
                className={`flex w-full items-center ${isSidebarCollapsed ? "justify-center px-0" : "gap-3 px-4"} group relative rounded-xl py-3 font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-700! dark:text-slate-400`}
              >
                <LogOut className="h-5 w-5 shrink-0" />
                <Text
                  className={`whitespace-nowrap text-sm transition-all duration-200 ${isSidebarCollapsed ? "hidden w-0 opacity-0" : "opacity-100"} text-slate-600 transition-colors dark:text-slate-400`}
                >
                  Sign Out
                </Text>
                {isSidebarCollapsed && (
                  <View className="pointer-events-none absolute left-full z-50 ml-4 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <Text>Sign Out</Text>
                  </View>
                )}
              </Button>
            </View>
          </View>

          {/* Main Content */}
          <View style={{ flex: 1, height: "auto", maxHeight: screenHeight }}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              nestedScrollEnabled={true}
              scrollEnabled={true}
            >
              <View
                className={`flex-1 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-48"} relative pb-24 transition-all duration-300 ease-in-out md:pb-0`}
              >
                <View className="mx-auto max-w-6xl p-4 md:p-8 flex-1 w-full">
                  <Slot />
                </View>
              </View>
            </ScrollView>
          </View>

          {/* Floating Action Button (Mobile) - Positioned relative to viewport */}
          <View
            className="md:hidden bottom-24 right-6 z-50 fixed items-end"
            style={buttonstyles.screenHeight}
          >
            <Button
              onPress={() => router.push(ScreenName.CALENDAR)}
              className="w-14 h-14 rounded-full flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all"
            >
              <Calendar color={"#ffff"} size={24} />
            </Button>
          </View>

          {/* Bottom Nav for Mobile */}
          <View
            className="safe-area fixed bottom-0 left-0 right-0 z-50 flex flex-row items-center justify-between border-t border-border bg-card py-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden px-3"
            style={styles.screenPadding}
          >
            {mobileNavItems.map((item) => (
              <Button
                variant={"ghost"}
                key={item.id}
                onPress={() => router.push(item.id)}
                className={`flex flex-col items-center space-y-1`}
              >
                <item.icon
                  color={`${getActiveScreen(item.active) ? (theme === "dark" ? "#6941C6" : "#9E77ED") : "#90a1b9"}`}
                  size={24}
                />
                <Text
                  className={`text-[10px] font-medium ${getActiveScreen(item.active) ? "text-primary" : "text-slate-400"}`}
                >
                  {item.label}
                </Text>
              </Button>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  screenPadding: {
    paddingBottom: Platform.OS === "android" ? 50 : 15,
  },
});

const buttonstyles = StyleSheet.create({
  screenHeight: {
    height: Platform.OS === "web" ? "auto" : 0,
  },
});
