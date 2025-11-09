import { Clock } from "lucide-react-native";
import { View } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Text } from "./ui/text";

const revisionData = [
  { topic: "Photosynthesis", subject: "Science", lastVisited: "2 days ago" },
  {
    topic: "Quadratic Equations",
    subject: "Mathematics",
    lastVisited: "4 days ago",
  },
  { topic: "World War II", subject: "History", lastVisited: "5 days ago" },
  { topic: "Verb Conjugation", subject: "English", lastVisited: "1 week ago" },
  { topic: "Cell Division", subject: "Science", lastVisited: "1 week ago" },
];

const RevisionTopics = () => {
  return (
    <Card className="sticky top-20 shadow-lg border-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Text>
          <Clock className="w-5 h-5 text-primary" />
          Revision Topics</Text>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {revisionData.map((item, index) => (
          <View
            key={index}
            className="p-3 rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 hover:from-primary/10 hover:to-primary/5 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20"
          >
            <View>
              <Text className="font-semibold text-sm text-foreground mb-1">
                {item.topic}
              </Text>
            </View>
            <View className="flex items-center justify-between flex-row">
              <Text className="text-primary font-medium text-xs ">
                {item.subject}
              </Text>
              <Text className="text-muted-foreground text-xs ">
                {item.lastVisited}
              </Text>
            </View>
          </View>
        ))}
      </CardContent>
    </Card>
  );
};

export default RevisionTopics;
