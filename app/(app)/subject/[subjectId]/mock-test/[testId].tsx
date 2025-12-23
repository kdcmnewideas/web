import { TestFinished } from "@/components/mock-test/fineshed";
import { TestHeader } from "@/components/mock-test/header";
import { TestCategory, TestIntro } from "@/components/mock-test/intro";
import { QuestionRenderer } from "@/components/mock-test/question-renderer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { ALL_LESSONS, LESSON_CONTENTS } from "@/mockData";
import { Question, QuestionType, ScreenName } from "@/types/types";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, ChevronRight } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { useUniwind } from "uniwind";

const Test = () => {
  const { theme } = useUniwind();
  const { testId: lessonId }: { testId: string } = useLocalSearchParams();
  const [status, setStatus] = useState<"intro" | "active" | "finished">(
    "intro"
  );
  const [selectedCategory, setSelectedCategory] =
    useState<TestCategory>("MIXED");
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState(600);

  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<any>(null);

  const lesson = ALL_LESSONS.find((l) => l.id === lessonId);
  const content =
    lessonId && LESSON_CONTENTS[lessonId]
      ? LESSON_CONTENTS[lessonId]
      : LESSON_CONTENTS["l1"];
  const allQuestions = content?.quiz || [];
  const onNavigate = (screen: ScreenName, params?: any) => {
    router.push({
      pathname: screen,
      params,
    });
  };

  // Global Timer effect
  useEffect(() => {
    let timer: any;
    if (status === "active" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && status === "active") {
      setStatus("finished");
    }
    return () => clearInterval(timer);
  }, [status, timeLeft]);

  // Oral Recording Timer effect
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setRecordingTime(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const handleLaunch = () => {
    let filtered: Question[] = [];
    switch (selectedCategory) {
      case "MCQ":
        filtered = allQuestions.filter((q) => q.type === QuestionType.MCQ);
        break;
      case "WRITTEN_ORAL":
        filtered = allQuestions.filter(
          (q) => q.type === QuestionType.WRITTEN || q.type === QuestionType.ORAL
        );
        break;
      case "INTERACTIVE":
        filtered = allQuestions.filter(
          (q) =>
            q.type === QuestionType.FILL_BLANKS ||
            q.type === QuestionType.TRUE_FALSE ||
            q.type === QuestionType.MATCHING
        );
        break;
      default:
        filtered = allQuestions;
    }

    if (filtered.length === 0) {
      alert(
        "No questions found for this category. Using all available questions."
      );
      filtered = allQuestions;
    }

    setActiveQuestions(filtered);
    setStatus("active");
    setTimeLeft(filtered.length * 60);
  };

  const calculateScore = () => {
    let score = 0;
    activeQuestions.forEach((q) => {
      const userAns = answers[q.id];
      if (q.type === QuestionType.MCQ || q.type === QuestionType.TRUE_FALSE) {
        if (userAns === q.correctAnswer) score++;
      } else if (q.type === QuestionType.FILL_BLANKS) {
        const correct = q.correctAnswer as string[];
        const user = userAns as string[];
        if (
          user &&
          correct &&
          user.every(
            (val, i) =>
              val?.trim().toLowerCase() === correct[i]?.trim().toLowerCase()
          )
        ) {
          score++;
        }
      } else if (q.type === QuestionType.MATCHING) {
        const userMap = userAns as Record<string, string>;
        const pairs = q.pairs || [];
        if (userMap && pairs.every((p) => userMap[p.left] === p.right)) {
          score++;
        }
      } else {
        if (userAns) score++;
      }
    });
    return Math.round((score / Math.max(1, activeQuestions.length)) * 100);
  };

  if (status === "intro") {
    return (
      <TestIntro
        lessonTitle={lesson?.title}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onStart={handleLaunch}
        onCancel={() =>
          onNavigate(ScreenName.SUBJECTS, { subjectId: lesson?.subjectId })
        }
      />
    );
  }

  if (status === "finished") {
    return (
      <TestFinished
        score={calculateScore()}
        onRetry={() => {
          setStatus("intro");
          setAnswers({});
          setCurrentQuestionIdx(0);
        }}
        onReturn={() =>
          onNavigate(ScreenName.SUBJECTS, { subjectId: lesson?.subjectId })
        }
      />
    );
  }

  const currentQ = activeQuestions[currentQuestionIdx];
  if (!currentQ) return null;

  return (
    <View className="max-w-5xl mx-auto animate-fade-in pb-20 w-full">
      <TestHeader
        currentIdx={currentQuestionIdx}
        totalQuestions={activeQuestions.length}
        timeLeft={timeLeft}
      />

      <View className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <View className="lg:col-span-8">
          <Card className="mb-8 p-10 border-0 relative overflow-hidden min-h-125">
            <Text className="text-2xl md:text-3xl font-black mb-10 leading-tight pt-4">
              {currentQ.text}
            </Text>
            <QuestionRenderer 
                 question={currentQ}
                 answer={answers[currentQ.id]}
                 setAnswer={(val) => setAnswers(prev => ({ ...prev, [currentQ.id]: val }))}
                 isRecording={isRecording}
                 setIsRecording={setIsRecording}
                 recordingTime={recordingTime}
               />
          </Card>
          <View className="flex-row justify-between items-center px-4">
            <Button
              variant="ghost"
              disabled={currentQuestionIdx === 0}
              className="h-14 px-8 "
              onPress={() => {
                if (isRecording) setIsRecording(false);
                setCurrentQuestionIdx((prev) => prev - 1);
              }}
            >
              <ArrowLeft size={20} color={theme==="dark" ? "#fff" : "#000"}/>
              <Text>Back</Text>
            </Button>
            {currentQuestionIdx < activeQuestions.length - 1 ? (
              <Button
                className="h-14 px-12  font-black"
                onPress={() => {
                  if (isRecording) setIsRecording(false);
                  setCurrentQuestionIdx((prev) => prev + 1);
                }}
              >
                <Text>Continue</Text><ChevronRight size={20} color={"#fff"}/>
              </Button>
            ) : (
              <Button
                onPress={() => {
                  if (isRecording) setIsRecording(false);
                  setStatus("finished");
                }}
                className="h-14 px-12 font-black"
              >
                <Text>Complete Test</Text>
              </Button>
            )}
          </View>
        </View>
        <View className="lg:col-span-4 space-y-6">
          <Card className="p-8">
            <Text className="text-sm font-black text-slate-400 uppercase tracking-widest">
              Mode: {selectedCategory.replace("_", " & ")}
            </Text>
            <View className="gap-4">
              <Text className="flex gap-3 text-sm text-slate-600 dark:text-slate-300 font-medium">
                <View className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0"></View>
                Question format is locked to {selectedCategory.toLowerCase()}.
              </Text>
              <Text className="flex gap-3 text-sm text-slate-600 dark:text-slate-300 font-medium">
                <View className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0"></View>
                Timer is set to 1 min / question.
              </Text>
            </View>
          </Card>
          <View className="bg-indigo-600 rounded-xl p-8  relative overflow-hidden group shadow-lg">
            <Text className="font-black text-xl mb-2 text-white">Focused Session</Text>
            <Text className="text-indigo-100 text-sm mb-6 leading-relaxed opacity-80 ">
              You are currently in a specialized assessment drill.
            </Text>
            <Button
              variant="outline"
              className="w-full h-12 bg-white/10 border-white/20 text-white font-bold rounded-xl hover:bg-white/20"
            >
              <Text>Flag Question</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Test;
