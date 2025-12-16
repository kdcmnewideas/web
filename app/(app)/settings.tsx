import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { ScreenName } from "@/types/types";
import { router } from "expo-router";
import {
    ArrowLeft,
    Bell,
    ChevronRight,
    Globe,
    LogOut,
    Moon,
    Shield,
    Smartphone,
    Sun,
} from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Uniwind, useUniwind } from "uniwind";

const SectionTitle = ({ children }: { children?: React.ReactNode }) => (
  <Text className="text-sm font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider mb-3 px-1">
    {children}
  </Text>
);

const SettingRow = ({
  icon: Icon,
  label,
  description,
  action,
}: {
  icon: any;
  label: string;
  description?: string;
  action: React.ReactNode;
}) => (
  <View className="flex-row items-center justify-between p-4  hover:bg-muted transition-colors first:rounded-t-xl last:rounded-b-xl border-b border-border last:border-0">
    <View className="flex-row items-center gap-4">
      <View className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
        <Icon size={20} color="#45556c" />
      </View>
      <View>
        <Text className="font-medium ">{label}</Text>
        {description && (
          <Text className="text-xs text-slate-500 dark:text-slate-400">
            {description}
          </Text>
        )}
      </View>
    </View>
    <View>{action}</View>
  </View>
);

const Settings = () => {
  const { theme } = useUniwind();
  const [darkMode, setDarkMode] = useState(theme === "dark");
  const [notifications, setNotifications] = useState({
    studyReminders: true,
    examAlerts: true,
    newContent: false,
    communityUpdates: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <View className="max-w-3xl mx-auto gap-6 animate-fade-in pb-20 w-full">
      <View className="flex-row items-center gap-4 mb-4">
        <Button
          variant="ghost"
          onPress={() => router.navigate(ScreenName.PROFILE)}
          className="-ml-2"
        >
          <ArrowLeft size={20} color={theme === "dark" ? "#fff" : "#000"} />
        </Button>
        <Text className="text-2xl font-bold">Settings</Text>
      </View>

      <View className="gap-6">
        {/* Appearance */}
        <View>
          <SectionTitle>Appearance</SectionTitle>
          <Card className="p-0 shadow-sm gap-0">
            <SettingRow
              icon={darkMode ? Moon : Sun}
              label="Dark Mode"
              description="Adjust the interface for low light"
              action={
                <Switch
                  checked={darkMode}
                  onCheckedChange={() => {
                    setDarkMode(!darkMode);
                    Uniwind.setTheme(!darkMode ? "dark" : "light");
                  }}
                />
              }
            />
          </Card>
        </View>

        {/* Notifications */}
        <View>
          <SectionTitle>Notifications</SectionTitle>
          <Card className="p-0 shadow-sm gap-0">
            <SettingRow
              icon={Bell}
              label="Study Reminders"
              action={
                <Switch
                  checked={notifications.studyReminders}
                  onCheckedChange={() => toggleNotification("studyReminders")}
                />
              }
            />
            <SettingRow
              icon={Smartphone}
              label="Exam Alerts"
              action={
                <Switch
                  checked={notifications.examAlerts}
                  onCheckedChange={() => toggleNotification("examAlerts")}
                />
              }
            />
            <SettingRow
              icon={Globe}
              label="Community Updates"
              action={
                <Switch
                  checked={notifications.communityUpdates}
                  onCheckedChange={() => toggleNotification("communityUpdates")}
                />
              }
            />
          </Card>
        </View>

        {/* Account */}
        <View>
          <SectionTitle>Account</SectionTitle>
          <Card className="p-0 shadow-sm gap-0">
            <Pressable onPress={() => router.navigate(ScreenName.CHANGE_PASSWORD)}>
              <SettingRow
                icon={Shield}
                label="Change Password"
                action={
                  <View>
                    <ChevronRight size={20} color={"#90a1b9"} />
                  </View>
                }
              />
            </Pressable>
          </Card>
        </View>

        {/* Danger Zone */}
        <View className="pt-6">
          <Button
            className="bg-red-50  hover:bg-red-100 hover:text-red-700 shadow-none border-0"
            onPress={() => router.navigate(ScreenName.LOGIN)}
          >
            <LogOut className="mr-2" size={16} color={"#e7000b"} />
            <Text> </Text>
            <Text className="text-red-600">Sign Out</Text>
          </Button>

          <Text className="text-center text-xs text-slate-400 mt-4">
            Version 1.0.0 • StudyMate Inc.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Settings;
