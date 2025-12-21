import MindMap from "@/components/learn/mind-map";
import Notes from "@/components/learn/notes";
import PodcastMode from "@/components/learn/podcast-mode";
import { QuickQuiz } from "@/components/learn/quick-quiz";
import { ReadMode } from "@/components/learn/read-mode";
import { LearnTopicsList } from "@/components/learn/topics-list";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { ALL_LESSONS, LESSON_CONTENTS, SUBJECTS } from "@/mockData";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  ChevronLeft,
  FileText,
  Headphones,
  Mic2,
  Network,
  Sparkles,
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { useUniwind } from "uniwind";

const Learn = () => {
  const { theme } = useUniwind();
  const { lessonId, subjectId }: { lessonId: string; subjectId: string } =
    useLocalSearchParams();
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({});
  const [notes, setNotes] = useState("");
  const [viewMode, setViewMode] = useState<string>("read");

  // Podcast State
  const [podcastStatus, setPodcastStatus] = useState<
    "config" | "generating" | "active"
  >("config");
  const [numSpeakers, setNumSpeakers] = useState<number>(1);
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

  const handleStartPodcast = () => {
    setPodcastStatus("generating");
    setTimeout(() => {
      setPodcastStatus("active");
      setIsPlaying(true);
    }, 2000); // Simulate AI generation
  };

  if (!lesson)
    return (
      <View className="p-8">
        <Text>{lessonId} Lesson not found</Text>
      </View>
    );

  return (
    <View className="min-h-screen  animate-fade-in pb-20 md:pb-0">
      <View className=" border-b border-border px-6 py-4 mb-6 items-start">
        <Button
          onPress={() => {
            router.navigate(`/subject/${subject?.id}`);
          }}
          variant="ghost"
          className="w-fit"
        >
          <ArrowLeft size={16} color={theme === "dark" ? "#fff" : "#000"} />
          <Text>Back to {subject?.title || "Subject"}</Text>
        </Button>
      </View>
      <View className="max-w-350 px-4 md:px-6 mb-10">
        <LearnTopicsList
          topics={topics}
          activeTopicIndex={activeTopicIndex}
          onTopicSelect={setActiveTopicIndex}
        />
      </View>

      <View className="max-w-350 mx-auto px-4 md:px-6">
        <View className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <View className="lg:col-span-9">
            <Card className="p-8 min-h-150 flex flex-col relative overflow-hidden">
              <View className="flex justify-center mb-8">
                <Tabs value={viewMode} onValueChange={setViewMode}>
                  <TabsList>
                    <TabsTrigger value="read">
                      <Text className="flex gap-2">
                        <FileText
                          className="w-4 h-4"
                          color={theme === "dark" ? "#fff" : "#000"}
                        />{" "}
                        Read
                      </Text>
                    </TabsTrigger>
                    <TabsTrigger value="podcast">
                      <Text className="flex gap-2">
                        <Headphones
                          className="w-4 h-4"
                          color={theme === "dark" ? "#fff" : "#000"}
                        />{" "}
                        Podcast
                      </Text>
                    </TabsTrigger>
                    <TabsTrigger value="mindmap">
                      <Text className="flex gap-2">
                        <Network
                          color={theme === "dark" ? "#fff" : "#000"}
                          size={16}
                        />{" "}
                        Mindmap
                      </Text>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </View>

              {viewMode === "read" ? (
                <ReadMode
                  topic={currentTopic}
                  onReadAloud={() => {
                    setViewMode("podcast");
                    setIsPlaying(true);
                  }}
                />
              ) : viewMode === "podcast" ? (
                podcastStatus === "config" ? (
                  <View className="grow flex flex-col items-center justify-center animate-fade-in text-center p-6">
                    <View className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center text-indigo-600 mb-6 shadow-sm">
                      <Headphones className="w-10 h-10" />
                    </View>
                    <Text className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
                      Podcast Studio
                    </Text>
                    <Text className="text-slate-500 mb-10 max-w-sm">
                      Customize your AI-generated audio lesson format.
                    </Text>

                    <View className="w-full max-w-md mb-10 space-y-6 text-left">
                      <View>
                        <Label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                          Number of Speakers
                        </Label>
                        <View className="relative">
                          <select
                            value={numSpeakers}
                            onChange={(e) =>
                              setNumSpeakers(parseInt(e.target.value))
                            }
                            className="w-full h-14 pl-12 pr-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-800 font-bold focus:border-indigo-600 focus:ring-0 transition-all appearance-none cursor-pointer shadow-sm"
                          >
                            <option value={1}>1 Speaker (Solo Lecture)</option>
                            <option value={2}>2 Speakers (Classic Duo)</option>
                            <option value={3}>
                              3 Speakers (Panel Discussion)
                            </option>
                            <option value={4}>4 Speakers (Round Table)</option>
                          </select>
                          <View className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600">
                            <Mic2 className="w-5 h-5" />
                          </View>
                          <View className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <ChevronLeft className="w-4 h-4 -rotate-90" />
                          </View>
                        </View>
                      </View>
                      <Alert icon={Sparkles}>
                        <AlertTitle>
                          {numSpeakers === 1
                            ? "A single professional AI voice will narrate the lesson topics in a clear, focused manner."
                            : `We'll assign ${numSpeakers} unique AI voices to simulate a natural, conversational debate about the topic.`}
                        </AlertTitle>
                      </Alert>
                    </View>

                    <Button
                      size="lg"
                      className="w-full max-w-md h-14"
                      onPress={handleStartPodcast}
                    >
                      <Text className="text-lg ">Generate Lesson</Text>
                    </Button>
                  </View>
                ) : podcastStatus === "generating" ? (
                  <View className="grow flex flex-col items-center justify-center animate-pulse">
                    <View className="relative w-24 h-24 mb-6">
                      <View className="absolute inset-0 border-4 border-indigo-100 rounded-full"></View>
                      <View className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></View>
                      <View className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-indigo-600" />
                      </View>
                    </View>
                    <Text className="text-xl font-bold  mb-2">
                      AI is drafting the script...
                    </Text>
                    <Text className="text-slate-500 dark:text-slate-400">
                      Assigning {numSpeakers} distinct voices
                    </Text>
                  </View>
                ) : (
                  <PodcastMode
                    topic={currentTopic}
                    subject={subject}
                    lesson={lesson}
                    isPlaying={isPlaying}
                    numSpeakers={numSpeakers as any}
                    playbackSpeed={playbackSpeed}
                    onTogglePlay={() => setIsPlaying(!isPlaying)}
                    onCycleSpeed={() =>
                      setPlaybackSpeed((prev) =>
                        prev === 1
                          ? 1.5
                          : prev === 1.5
                            ? 2
                            : prev === 2
                              ? 0.5
                              : 1
                      )
                    }
                  />
                )
              ) : (
                <View className="grow min-h-150 border border-slate-200/50 rounded-3xl overflow-hidden bg-white">
                  <MindMap rootNode={currentTopic?.mindMap} isDark={false} />
                </View>
              )}

              <View className="flex-row justify-between items-center mt-auto pt-6 border-t border-border w-full">
                <Button
                  variant="ghost"
                  disabled={activeTopicIndex === 0}
                  onPress={() => setActiveTopicIndex((prev) => prev - 1)}
                >
                  <ChevronLeft color={theme === "dark" ? "#fff" : "#000"} />
                  <Text>Previous</Text>
                </Button>
                <Button
                  onPress={() => {
                    if (activeTopicIndex < topics.length - 1)
                      setActiveTopicIndex((prev) => prev + 1);
                  }}
                  className="px-8"
                >
                  <Text>
                    {activeTopicIndex < topics.length - 1
                      ? "Next"
                      : "Take Quiz"}
                  </Text>
                </Button>
              </View>
            </Card>
          </View>

          <View className="lg:col-span-3 gap-6">
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
