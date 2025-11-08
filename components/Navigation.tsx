import { Bell, BookOpen, User } from "lucide-react-native";
import { View } from "react-native";
import { Button } from "./ui/button";
import { Text } from "./ui/text";

const Navigation = () => {
  return (
    <View className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <View className="container mx-auto px-4 py-3 flex items-center justify-between flex-row">
        <View className="flex items-center gap-2 flex-row">
          <View className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </View>
          <Text className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            LearnHub
          </Text>
        </View>
        
        <View className="flex items-center gap-2 flex-row">
          <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
            <Bell className="w-5 h-5" />
            <Text className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></Text>
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <User className="w-5 h-5" />
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Navigation;