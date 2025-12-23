import { Flashcard } from "@/types/types";
import { RotateCw } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Text } from "../ui/text";

interface flashCardProps {
  flashcards: Flashcard[];
}

const Flashcards = ({ flashcards }: flashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeFlashcard, setActiveFlashcard] = useState(0);
  return (
    <View className="max-w-3xl mx-auto animate-fade-in w-full">
      <View className="h-112">
        <Pressable onPress={() => setIsFlipped(!isFlipped)} className="h-full">
          <View
            className={`relative w-full h-full text-center transition-transform duration-500 transform-style-3d cursor-pointer ${isFlipped ? "rotate-y-180" : ""}`}
          >
            {/* FRONT */}
            <View className="absolute inset-0 backface-hidden">
              <Card className="h-full flex flex-col items-center justify-center p-16 bg-indigo-600 text-white border-0 group gap-0">
                <Text className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-8 border border-indigo-400/30 px-3 py-1 rounded-full">
                  Question
                </Text>
                <Text className="text-3xl md:text-4xl font-bold leading-tight">
                  {flashcards[activeFlashcard]?.front}
                </Text>
                <View className="absolute bottom-10 left-0 right-0 text-indigo-200 text-sm flex-row items-center justify-center gap-2 group-hover:text-white transition-colors">
                  <RotateCw className="w-4 h-4" />
                  <Text>Tap card to flip</Text>
                </View>
              </Card>
            </View>

            {/* BACK */}
            <View className="absolute inset-0 backface-hidden rotate-y-180">
              <Card className="h-full flex flex-col items-center justify-center p-16  shadow-2xl border-2 ">
                <Text className="text-emerald-600 bg-emerald-50 text-xs font-bold uppercase tracking-widest mb-8 px-3 py-1 rounded-full">
                  Answer
                </Text>
                <Text className="text-2xl md:text-3xl font-medium leading-relaxed ">
                  {flashcards[activeFlashcard]?.back}
                </Text>
              </Card>
            </View>
          </View>
        </Pressable>
      </View>

      <View className="flex-row justify-center items-center gap-8 mt-10">
        <Button
          variant="outline"
          onPress={() => {
            setActiveFlashcard(activeFlashcard - 1);
            setIsFlipped(false);
          }}
          className="w-32 rounded-xl py-3 border-slate-200"
          disabled={activeFlashcard === 0}
        >
          <Text>Previous</Text>
        </Button>
        <Text className="text-slate-400 font-bold min-w-16 text-center tracking-wider">
          {activeFlashcard + 1} / {flashcards.length}
        </Text>
        <Button
          onPress={() => {
            setActiveFlashcard(activeFlashcard + 1);
            setIsFlipped(false);
          }}
          className="w-32 rounded-xl py-3 "
          disabled={activeFlashcard >= flashcards.length}
        >
          <Text>Next</Text>
        </Button>
      </View>
    </View>
  );
};

export default Flashcards;
