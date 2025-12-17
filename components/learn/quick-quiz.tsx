import { Question } from "@/types/types";
import React from "react";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Text } from "../ui/text";

interface LearnQuickQuizProps {
  question: Question;
  selectedAnswerIndex?: number;
  onAnswer: (index: number) => void;
}

export const QuickQuiz = ({
  question,
  selectedAnswerIndex,
  onAnswer,
}: LearnQuickQuizProps) => {
  const hasAnswered = selectedAnswerIndex !== undefined;

  return (
    <Card className="p-6">
      <Text className="font-bold text-lg">Quick Quiz</Text>
      <Text className="text-sm text-slate-600 dark:text-slate-400 font-medium">
        {question.text}
      </Text>

      <View className="gap-3">
        <RadioGroup value={question.options[selectedAnswerIndex?? -1]} onValueChange={(e)=> {}}>
        {question.options.map((opt, idx) => {
          const isSelected = selectedAnswerIndex === idx;
          const isCorrect = question.correctAnswer === idx;

          let containerClass = "border-slate-200 hover:bg-slate-50";

          if (hasAnswered) {
            if (isCorrect) {
              containerClass = "bg-green-50! dark:bg-green-900/20! border-green-200! dark:border-green-600!";
            } else if (isSelected) {
              containerClass = "bg-red-50! dark:bg-red-900/20! border-red-200! dark:border-red-600!";
            }
          } else if (isSelected) {
            containerClass = "border-indigo-600 bg-indigo-50/10";
          }

          return (
            <Button
              key={idx}
              disabled={hasAnswered}
              onPress={() => onAnswer(idx)}
              variant={"outline"}
              className={`w-full rounded-xl flex-row items-start transition-all ${containerClass}`}
            >
              <View className="flex flex-row items-center gap-3 w-full">
                <RadioGroupItem value={opt} id={idx.toString()} />
                <Label htmlFor={idx.toString()} className="text-sm">
                  {opt}
                </Label>
              </View>
            </Button>
          );
        })}
        </RadioGroup>
      </View>
      {hasAnswered && (
        <View className=" bg-slate-100 p-3 rounded-lg ">
          <Text className="font-bold text-slate-800 text-xs">Explanation:</Text>
          <Text className="text-slate-600 text-xs">{question.explanation}</Text>
        </View>
      )}
    </Card>
  );
};
