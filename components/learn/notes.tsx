import { Mic } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { useUniwind } from "uniwind";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Text } from "../ui/text";
import { Textarea } from "../ui/textarea";

interface LearnNotesProps {
  notes: string;
  onNotesChange: (val: string) => void;
}

const Notes = ({ notes, onNotesChange }: LearnNotesProps) => {
  const { theme } = useUniwind();
  return (
    <Card className="p-6 flex flex-col h-75">
      <View className="flex-row justify-between items-center">
        <Text className="font-bold text-lg">My Notes</Text>
        <Button variant="outline">
          <Mic size={12} color={theme === "dark" ? "#fff" : "#000"} />
          <Text>Record</Text>
        </Button>
      </View>
      <View className="grow ">
        <Textarea
          className="w-full h-full resize-none"
          placeholder="Take notes here..."
          value={notes}
          onChangeText={(e) => onNotesChange(e)}
        />
      </View>
    </Card>
  );
};

export default Notes;
