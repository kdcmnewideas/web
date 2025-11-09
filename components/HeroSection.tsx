import { View } from "react-native";
import { Progress } from "./ui/progress";
import { Text } from "./ui/text";

const HeroSection = () => {
  return (
    <View className="rounded-2xl p-6 md:p-8 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 border border-primary/10">
      <View className="space-y-4">
        <View>
          <Text className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            Welcome back, Alex! 🎉
          </Text>
          <Text className="text-muted-foreground">
            You're doing amazing! Keep up the great work.
          </Text>
        </View>
        
        <View className="space-y-2">
          <View className="flex items-center justify-between text-sm flex-row">
            <Text className="font-medium text-foreground">Overall Progress</Text>
            <Text className="font-bold text-primary">68%</Text>
          </View>
          <Progress value={68} className="h-3" />
          <Text className="text-xs text-muted-foreground">
            You've completed 68% of your learning goals this month! 🌟
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HeroSection;
