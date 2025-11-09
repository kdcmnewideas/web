import { Target } from "lucide-react-native";
import { View } from "react-native";
import { Card, CardContent } from "./ui/card";
import { Text } from "./ui/text";

const UserGoal = () => {
  return (
    <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      <CardContent className="py-2 px-6">
        <View className="flex items-start gap-4 flex-row">
          <View className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-accent-foreground" />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-bold text-foreground mb-1">
              Your Current Goal
            </Text>
            <Text className="text-foreground/80 font-medium">
              Complete Science Chapter 5 by Friday
            </Text>
            <Text className="text-sm text-muted-foreground mt-1">
              You're 3 lessons away from achieving this goal! 🎯
            </Text>
          </View>
        </View>
      </CardContent>
    </Card>
  );
};

export default UserGoal;
