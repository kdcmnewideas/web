import Notes from "@/components/learn/notes";
import PodcastMode from "@/components/learn/podcast-mode";
import { QuickQuiz } from "@/components/learn/quick-quiz";
import { ReadMode } from "@/components/learn/read-mode";
import { LearnTopicsList } from "@/components/learn/topics-list";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { ALL_LESSONS, LESSON_CONTENTS, SUBJECTS } from "@/mockData";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  ChevronLeft,
  FileText,
  Headphones,
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { useUniwind } from "uniwind";

const Learn = () => {
  const { theme } = useUniwind();
  const { lessonId, subjectId }: { lessonId: string, subjectId: string } = useLocalSearchParams();
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({});
  const [notes, setNotes] = useState("");
  const [viewMode, setViewMode] = useState<"read" | "podcast">("read");

  // Podcast State
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const audioIntervalRef = useRef<number | null>(null);

  const lesson = ALL_LESSONS.find((l) => l.id === lessonId);
  const subject = SUBJECTS.find((s) => s.id === lesson?.subjectId);
  const content =
    lessonId && LESSON_CONTENTS[lessonId]
      ? LESSON_CONTENTS[lessonId]
      : LESSON_CONTENTS["l1"];

  const topics = content?.topics || [];
  const currentTopic = topics[activeTopicIndex];
  const quizQuestions = content?.quiz || [];
  const activeQuestion =
    quizQuestions[activeTopicIndex % quizQuestions.length] || quizQuestions[0];

  useEffect(() => {
    if (isPlaying) {
      audioIntervalRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5 * playbackSpeed;
        });
      }, 100);
    } else {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    }
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  useEffect(() => {
    setProgress(0);
    setIsPlaying(false);
  }, [activeTopicIndex]);

  if (!lesson)
    return (
      <View className="p-8">
        <Text>{lessonId} Lesson not found</Text>
      </View>
    );

  return (
    <View className="min-h-screen  animate-fade-in pb-20 md:pb-0">
      <View className=" border-b border-border px-6 py-4 mb-6">
        <Button onPress={() => {router.navigate(`/subject/${subject?.id}`)}} variant="ghost" className="w-fit">
          <ArrowLeft size={16} color={theme === "dark" ? "#fff" : ""} />
          <Text>Back to {subject?.title || "Subject"}</Text>
        </Button>
      </View>

      <View className="max-w-350 mx-auto px-4 md:px-6">
        <View className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <View className="lg:col-span-3">
            <LearnTopicsList
              topics={topics}
              activeTopicIndex={activeTopicIndex}
              onTopicSelect={setActiveTopicIndex}
            />
          </View>

          <View className="lg:col-span-6">
            <Card className="p-8 min-h-150 flex flex-col relative overflow-hidden">
              <View className="flex justify-center mb-8">
                <View className="bg-slate-100 p-1 rounded-xl inline-flex items-center shadow-inner">
                  <Button
                    onPress={() => setViewMode("read")}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      viewMode === "read"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <FileText className="w-4 h-4 mr-2" /> Read
                  </Button>
                  <Button
                    onPress={() => setViewMode("podcast")}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      viewMode === "podcast"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <Headphones className="w-4 h-4 mr-2" /> Podcast
                  </Button>
                </View>
              </View>

              {viewMode === "read" ? (
                <ReadMode
                  topic={currentTopic}
                  onReadAloud={() => {
                    setViewMode("podcast");
                    setIsPlaying(true);
                  }}
                />
              ) : (
                <PodcastMode
                  topic={currentTopic}
                  subject={subject}
                  lesson={lesson}
                  isPlaying={isPlaying}
                  progress={progress}
                  playbackSpeed={playbackSpeed}
                  onTogglePlay={() => setIsPlaying(!isPlaying)}
                  onSetProgress={setProgress}
                  onCycleSpeed={() =>
                    setPlaybackSpeed((prev) =>
                      prev === 1 ? 1.5 : prev === 1.5 ? 2 : prev === 2 ? 0.5 : 1
                    )
                  }
                />
              )}

              <View className="flex justify-between items-center mt-auto pt-6 border-t border-slate-100 w-full">
                <Button
                  variant="ghost"
                  className="bg-slate-50 hover:bg-slate-100"
                  disabled={activeTopicIndex === 0}
                  onPress={() => setActiveTopicIndex((prev) => prev - 1)}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                </Button>
                <Button
                  onPress={() => {
                    if (activeTopicIndex < topics.length - 1)
                      setActiveTopicIndex((prev) => prev + 1);
                  }}
                  className="px-8"
                >
                  {activeTopicIndex < topics.length - 1 ? "Next" : "Take Quiz"}
                </Button>
              </View>
            </Card>
          </View>

          <View className="lg:col-span-3 space-y-6">
            {activeQuestion && (
              <QuickQuiz
                question={activeQuestion}
                selectedAnswerIndex={selectedAnswers[activeQuestion.id]}
                onAnswer={(idx) =>
                  setSelectedAnswers((prev) => ({
                    ...prev,
                    [activeQuestion.id]: idx,
                  }))
                }
              />
            )}
            <Notes notes={notes} onNotesChange={setNotes} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Learn;
