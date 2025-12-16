import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import { CURRENT_USER } from "@/mockData";
import { User } from "@/types/types";
import {
  Award,
  Calendar,
  Camera,
  Edit2,
  GraduationCap,
  Mail,
  Phone,
  Save,
  Settings,
  Target,
  UserIcon,
  Zap,
} from "lucide-react-native";
import React, { useState } from "react";
import { Image, View } from "react-native";
import { useUniwind } from "uniwind";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User>(CURRENT_USER);
  const { theme } = useUniwind();

  const handleSave = () => {
    setIsEditing(false);
  };

  const StatBadge = ({ icon: Icon, label, value, colorClass }: any) => (
    <View className="flex flex-col items-center justify-center p-4 w-[33.3%] border-r last:border-0 border-border">
      <View className={`p-2 rounded-lg ${colorClass} bg-opacity-10 mb-2`}>
        <Icon
          className={`w-5 h-5 ${colorClass.replace("bg-", "text-")}`}
          color="#ffff"
        />
      </View>
      <Text className="font-bold text-xl">{value}</Text>
      <Text className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
        {label}
      </Text>
    </View>
  );

  return (
    <View className="gap-6 animate-fade-in pb-20">
      {/* Header / Banner - Solid */}
      <View className="relative">
        <View className="h-48 bg-primary rounded-2xl"></View>
        <View className="absolute top-4 right-4">
          <Button
            variant="ghost"
            className="bg-white/10 border-white/20 border text-white hover:bg-white/20"
            onPress={() => {}}
          >
            <Settings className="mr-2" color={"#ffff"} size={16} />
            <Text className="text-white ">Settings</Text>
          </Button>
        </View>
      </View>

      {/* Main Profile Info */}
      <View className="px-4 -mt-20 mb-8 relative z-10">
        <Card className="pt-0 pb-0 px-0 border-0 shadow-lg overflow-visible">
          <View className="flex flex-col items-center -mt-16 pb-8 px-6">
            <View className="relative">
              <Image
                source={{ uri: user.avatarUrl }}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white object-cover"
              />
              {isEditing && (
                <Button className="absolute bottom-1 right-1 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </View>

            <View className="mt-4 text-center w-full relative">
              <View className="absolute top-0 right-0 z-50">
                {isEditing ? (
                  <Button size="sm" onPress={handleSave} className=" z-50">
                    <Save
                      className="mr-2"
                      color={theme === "dark" ? "#ffff" : "#000"}
                      size={16}
                    />
                    <Text>Save</Text>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="ghost"
                    onPress={() => setIsEditing(true)}
                    className="z-50"
                  >
                    <Edit2
                      className="mr-2"
                      color={theme === "dark" ? "#ffff" : "#000"}
                      size={16}
                    />
                    <Text>Edit</Text>
                  </Button>
                )}
              </View>

              {isEditing ? (
                <View className="max-w-xs mx-auto mb-2">
                  <Input
                    value={user.name}
                    onChangeText={(e) => setUser({ ...user, name: e })}
                    className="text-2xl font-bold text-center w-full"
                  />
                </View>
              ) : (
                <Text className="text-2xl font-bold text-center">
                  {user.name}
                </Text>
              )}

              <Text className="text-slate-500 font-medium dark:text-slate-400 text-center">
                {user.grade} • {user.age || 0} Years Old
              </Text>
            </View>
          </View>

          {/* Stats Summary */}
          <View className="flex flex-row justify-around border-t border-border bg-slate-50/50 dark:bg-slate-800/50 rounded-b-2xl">
            <StatBadge
              icon={Zap}
              value={user.streakDays}
              label="Streak"
              colorClass="bg-orange-500"
            />
            <StatBadge
              icon={Target}
              value={user.goalsCompleted}
              label="Goals"
              colorClass="bg-indigo-600"
            />
            <StatBadge
              icon={Award}
              value={user.totalPoints}
              label="Points"
              colorClass="bg-teal-600"
            />
          </View>
        </Card>
      </View>

      {/* Details Grid */}
      <View className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Info */}
        <Card className="mad:h-full p-6">
          <Text className="font-bold mb-6 flex items-center text-lg">
            <UserIcon
              className="mr-3"
              color={theme === "dark" ? "#6941C6" : "#9E77ED"}
              size={20}
            />{" "}
            Personal Information
          </Text>
          <View className="gap-5">
            {isEditing ? (
              <>
                <Label>Email</Label>
                <Input
                  value={user.email || ""}
                  onChangeText={(e) => setUser({ ...user, email: e })}
                />
                <Label>Phone</Label>
                <Input
                  value={user.phone || ""}
                  placeholder="+1 (555) 000-0000"
                  onChangeText={(e) => setUser({ ...user, phone: e })}
                />
                <Label>Age</Label>
                <Input
                  value={(user.age || "")?.toString() || ""}
                  onChangeText={(e) => setUser({ ...user, age: parseInt(e) })}
                />
              </>
            ) : (
              <View className="space-y-4">
                <View className="group ">
                  <Text className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Email Address
                  </Text>
                  <View className="flex flex-row items-center font-medium bg-muted p-3 rounded-lg border border-border">
                    <Mail className="mr-3 " color={"#90a1b9"} size={16} />
                    <Text>{user.email}</Text>
                  </View>
                </View>
                <View className="group">
                  <Text className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Phone Number
                  </Text>
                  <View className="flex flex-row items-center font-medium bg-muted p-3 rounded-lg border border-border">
                    <Phone className="mr-3 " color={"#90a1b9"} size={16} />
                    <Text>{user.phone || "Not set"}</Text>
                  </View>
                </View>
                <View className="group">
                  <Text className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Age
                  </Text>
                  <View className="flex flex-row items-center font-medium bg-muted p-3 rounded-lg border border-border">
                    <Calendar className="mr-3 " color={"#90a1b9"} size={16} />
                    <Text>{user.age} Years Old</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </Card>

        {/* Academic Info & Bio */}
        <View className="space-y-8">
          <Card className="p-6">
            <Text className="font-bold mb-6 flex items-center text-lg">
              <GraduationCap className="w-5 h-5 mr-3 text-teal-600" /> Academic
              Profile
            </Text>
            {isEditing ? (
              <View className="gap-4">
                <Label>Grade / Level</Label>
                <Input
                  value={user.grade || ""}
                  onChangeText={(e) => setUser({ ...user, grade: e })}
                />
                <View className="w-full">
                  <Label className="block text-sm font-semibold mb-1.5">
                    Academic Bio
                  </Label>
                  <Textarea
                    className="w-full p-3 rounded-xl h-32 resize-none"
                    value={user.bio || ""}
                    onChangeText={(e) => setUser({ ...user, bio: e })}
                  />
                </View>
              </View>
            ) : (
              <View className="space-y-6">
                <View>
                  <Text className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Current Level
                  </Text>
                  <Text className=" font-medium text-lg">{user.grade}</Text>
                </View>
                <View>
                  <Text className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
                    Bio / Goal
                  </Text>
                  <Text className="leading-relaxed bg-muted p-4 rounded-xl border border-border">
                    "{user.bio}"
                  </Text>
                </View>
              </View>
            )}
          </Card>

          <Card className="border-border bg-muted/50 cursor-pointer p-6">
            <View className="flex flex-row justify-between items-center">
              <View>
                <Text className="font-bold text-indigo-50 text-lg">
                  Learning Goals
                </Text>
                <Text className="text-indigo-700/80 dark:text-indigo-100 text-sm">
                  Manage your targets and deadlines
                </Text>
              </View>
              <View className="bg-white p-3 rounded-full shadow-sm text-indigo-600">
                <Target color={"#4f39f6"} size={24} />
              </View>
            </View>
          </Card>
        </View>
      </View>
    </View>
  );
};

export default Profile;
