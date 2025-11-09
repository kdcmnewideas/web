
import { useNavigation } from "@react-navigation/native";
import { BookOpen, Brain, FlaskConical } from "lucide-react-native";
import { View } from "react-native";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Text } from "./ui/text";

interface SubjectCardProps {
  subject: string;
  progress: number;
  icon: "book" | "brain" | "flask";
  color: "primary" | "secondary" | "accent";
}

const SubjectCard = ({ subject, progress, icon, color }: SubjectCardProps) => {
  const navigate = useNavigation<any>();
  const icons = {
    book: BookOpen,
    brain: Brain,
    flask: FlaskConical,
  };
  
  const Icon = icons[icon];
  
  const colorClasses = {
    primary: "from-primary/10 to-primary/5 border-primary/20",
    secondary: "from-secondary/10 to-secondary/5 border-secondary/20",
    accent: "from-accent/10 to-accent/5 border-accent/20",
  };
  
  const iconBg = {
    primary: "bg-gradient-to-br from-primary to-primary/80",
    secondary: "bg-gradient-to-br from-secondary to-secondary/80",
    accent: "bg-gradient-to-br from-accent to-accent/80",
  };
  
  const buttonVariant = {
    primary: "default",
    secondary: "secondary",
    accent: "default",
  } as const;

  return (
    <Card className={`bg-gradient-to-br ${colorClasses[color]} border-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] gap-0`}>
      <CardHeader className="pb-3">
        <View className="flex items-center gap-3 mb-2 flex-row">
          <View className={`w-10 h-10 rounded-lg ${iconBg[color]} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </View>
          <CardTitle className="text-xl font-bold">{subject}</CardTitle>
        </View>
        <View className="space-y-2">
          <View className="flex items-center justify-between text-sm flex-row">
            <Text className="text-muted-foreground">Progress</Text>
            <Text className="font-bold text-foreground">{progress}%</Text>
          </View>
          <Progress value={progress} className="h-2" />
        </View>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <Button 
          className="w-full" 
          variant={buttonVariant[color]}
          onPress={() => navigate.navigate(`/subject/${subject.toLowerCase()}`)}
        >
          <Text>Learn</Text>
        </Button>
        <View className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            className="w-full"
            onPress={() => navigate.navigate(`/subject/${subject.toLowerCase()}`)}
          >
            <Text>Revise</Text>
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onPress={() => navigate.navigate(`/subject/${subject.toLowerCase()}`)}
          >
           <Text>Mock Test</Text> 
          </Button>
        </View>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
