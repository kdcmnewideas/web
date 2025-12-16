import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { ScreenName } from "@/types/types";
import { router } from "expo-router";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { useUniwind } from "uniwind";

const ChangePassword = () => {
  const { theme } = useUniwind();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      // Reset form after success
      setTimeout(() => {
        onNavigate(ScreenName.SETTINGS);
      }, 2000);
    }, 1500);
  };

  const onNavigate = (route: ScreenName) => {
    router.navigate(route);
  };

  if (isSuccess) {
    return (
      <View className="max-w-xl mx-auto pt-20 animate-fade-in">
        <View className="w-20 h-20 bg-green-100 rounded-full flex-row items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} color={"#00a63e"} />
        </View>
        <Text className="text-2xl font-bold mb-2 text-center">
          Password Updated!
        </Text>
        <Text className="text-slate-500 dark:text-slate-400 mb-8 text-center">
          Your password has been changed successfully.
        </Text>
        <Button onPress={() => onNavigate(ScreenName.SETTINGS)}>
          <Text>Return to Settings</Text>
        </Button>
      </View>
    );
  }

  return (
    <View className="max-w-2xl mx-auto gap-6 animate-fade-in pb-20 w-full">
      <View className="flex-row items-center gap-4 mb-2">
        <Button
          variant="ghost"
          onPress={() => onNavigate(ScreenName.SETTINGS)}
          className="-ml-2"
        >
          <ArrowLeft size={20} color={theme === "dark" ? "#fff" : "#000"} />
        </Button>
        <Text className="text-2xl font-bold">Change Password</Text>
      </View>

      <Card className="p-8">
        <View className="flex-row items-center gap-4 mb-8 bg-indigo-50 p-4 rounded-xl w-full">
          <View className="p-2 bg-white rounded-lg shadow-sm  flex-auto md:flex-none w-16 justify-center items-center">
            <ShieldCheck
              size={24}
              color={theme === "dark" ? "#6941C6" : "#9E77ED"}
            />
          </View>
          <View className="flex-auto md:flex-none">
            <Text className="font-bold text-sm text-primary">
              Secure your account
            </Text>
            <Text className="opacity-80 text-sm text-primary">
              Choose a strong password with at least 8 characters.
            </Text>
          </View>
        </View>

        <View className="gap-6">
          <View className="gap-2">
            <Label>Current Password</Label>
            <Input
              value={currentPassword}
              onChangeText={(e) => setCurrentPassword(e)}
            />
          </View>
          <View className="h-px bg-border my-2">
            <Text></Text>
          </View>
          <View className="gap-2">
            <Label>New Password</Label>
            <Input
              value={newPassword}
              onChangeText={(e) => setNewPassword(e)}
            />
          </View>
          <View className="gap-2">
            <Label>Confirm New Password</Label>
            <Input
              value={confirmPassword}
              onChangeText={(e) => setConfirmPassword(e)}
            />
            {newPassword &&
              confirmPassword &&
              newPassword !== confirmPassword && (
                <Text className="text-sm text-red-500 mt-2 ml-1">
                  Passwords do not match
                </Text>
              )}
          </View>

          <View className="pt-4 flex-row justify-end gap-3">
            <Button
              variant="secondary"
              onPress={() => onNavigate(ScreenName.SETTINGS)}
            >
              <Text>Cancel</Text>
            </Button>
            <Button
              disabled={
                isLoading || (!!newPassword && newPassword !== confirmPassword)
              }
            >
              <Text>{isLoading ? "Updating..." : "Update Password"}</Text>
            </Button>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default ChangePassword;
