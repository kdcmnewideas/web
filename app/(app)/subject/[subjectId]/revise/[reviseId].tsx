import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { ALL_LESSONS, LESSON_CONTENTS } from "@/mockData";
import { ScreenName } from "@/types/types";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  FileText,
  List,
  Mic,
  PenTool,
  Plus,
  RotateCw,
  Sparkles,
  Trash2,
  Video,
  Volume2,
} from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { useUniwind } from "uniwind";

interface ReviseScreenProps {
  lessonId?: string;
  onNavigate: (screen: ScreenName, params?: any) => void;
}

type TabType = "Flashcards" | "Quick Prep" | "Notes";
type AnswerLength = "Short" | "Medium" | "Long";

interface NoteItem {
  id: string;
  type: "text" | "audio" | "video";
  content: string;
  date: string;
}

const ReviseScreen: React.FC<ReviseScreenProps> = () => {
  const { theme } = useUniwind();
  const {
    reviseId: lessonId,
    subjectId,
  }: { reviseId: string; subjectId: string } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<string>("Flashcards");
  const [activeFlashcard, setActiveFlashcard] = useState(0);
  const [activePrepIndex, setActivePrepIndex] = useState(0);
  const [prepLength, setPrepLength] = useState<AnswerLength>("Medium");
  const [isFlipped, setIsFlipped] = useState(false);

  // Notes State
  const [newNoteText, setNewNoteText] = useState("");
  const [notesList, setNotesList] = useState<NoteItem[]>([
    {
      id: "n1",
      type: "text",
      content:
        "Remember to review the basic operations section before the test.",
      date: "2 hours ago",
    },
    {
      id: "n2",
      type: "audio",
      content: "Audio recording about variables",
      date: "1 day ago",
    },
  ]);

  const lesson = ALL_LESSONS.find((l) => l.id === lessonId);
  const content =
    lessonId && LESSON_CONTENTS[lessonId]
      ? LESSON_CONTENTS[lessonId]
      : LESSON_CONTENTS["l1"];

  if (!content) return <View>No content available</View>;

  const flashcards = content.flashcards || [];
  const quickPrep = content.quickPrep || [];
  const currentQA = quickPrep[activePrepIndex];

  // --- Handlers ---

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setActiveFlashcard((prev) => (prev + 1) % flashcards.length);
    }, 200);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setActiveFlashcard(
        (prev) => (prev - 1 + flashcards.length) % flashcards.length
      );
    }, 200);
  };

  const handleNextPrep = () => {
    if (activePrepIndex < quickPrep.length - 1) {
      setActivePrepIndex((prev) => prev + 1);
    }
  };

  const handlePrevPrep = () => {
    if (activePrepIndex > 0) {
      setActivePrepIndex((prev) => prev - 1);
    }
  };

  const handleAddTextNote = () => {
    if (!newNoteText.trim()) return;
    const newNote: NoteItem = {
      id: Date.now().toString(),
      type: "text",
      content: newNoteText,
      date: "Just now",
    };
    setNotesList([newNote, ...notesList]);
    setNewNoteText("");
  };

  const handleMockRecord = (type: "audio" | "video") => {
    // In a real app, this would trigger recording logic
    const newNote: NoteItem = {
      id: Date.now().toString(),
      type: type,
      content: `${type === "audio" ? "Audio" : "Video"} recording`,
      date: "Just now",
    };
    setNotesList([newNote, ...notesList]);
  };

  const handleDeleteNote = (id: string) => {
    setNotesList(notesList.filter((n) => n.id !== id));
  };

  const tabs: { id: TabType; icon: React.ElementType }[] = [
    { id: "Flashcards", icon: RotateCw },
    { id: "Quick Prep", icon: List },
    { id: "Notes", icon: PenTool },
  ];

  return (
    <View className="max-w-5xl mx-auto animate-fade-in pb-20 w-full">
      <View className="items-start">
        <Button
          variant="ghost"
          onPress={() => router.navigate("/subject/[subjectId]")}
          className=" w-fit"
        >
          <ArrowLeft
            className="w-4 h-4 mr-2"
            color={theme === "dark" ? "#fff" : "#000"}
          />
          <Text>Back to Subject</Text>
        </Button>
      </View>

      <View className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <View>
          <Text className="text-3xl font-bold  mb-2">
            Revision: {lesson?.title}
          </Text>
          <Text className="text-slate-500 dark:text-slate-400 text-lg">
            Select a tool to start revising key concepts.
          </Text>
        </View>
      </View>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger value={tab.id} key={tab.id}>
              <tab.icon size={16} color={theme==="dark"? "#fff": "#000"}/>
              <Text>{tab.id}</Text>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      

      <View className="min-h-125">
        {/* FLASHCARDS SECTION */}
        {activeTab === "Flashcards" && (
          <View className="max-w-3xl mx-auto animate-fade-in">
            <View className="relative h-112 perspective-1000">
              <Pressable onPress={() => setIsFlipped(!isFlipped)}>
                <View
                  className={`relative w-full h-full text-center transition-transform duration-500 transform-style-3d cursor-pointer ${isFlipped ? "rotate-y-180" : ""}`}
                >
                  {/* FRONT */}
                  <View className="absolute inset-0 backface-hidden">
                    <Card className="h-full flex flex-col items-center justify-center p-16 bg-linear-to-br from-indigo-500 to-indigo-700 text-white shadow-2xl shadow-indigo-200 border-0 group">
                      <span className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-8 border border-indigo-400/30 px-3 py-1 rounded-full">
                        Question
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                        {flashcards[activeFlashcard]?.front}
                      </h3>
                      <View className="absolute bottom-10 left-0 right-0 text-indigo-200 text-sm flex items-center justify-center gap-2 group-hover:text-white transition-colors">
                        <RotateCw className="w-4 h-4" /> Tap card to flip
                      </View>
                    </Card>
                  </View>

                  {/* BACK */}
                  <View className="absolute inset-0 backface-hidden rotate-y-180">
                    <Card className="h-full flex flex-col items-center justify-center p-16 bg-white text-slate-800 shadow-2xl border-2 border-indigo-50">
                      <span className="text-emerald-600 bg-emerald-50 text-xs font-bold uppercase tracking-widest mb-8 px-3 py-1 rounded-full">
                        Answer
                      </span>
                      <h3 className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-700">
                        {flashcards[activeFlashcard]?.back}
                      </h3>
                    </Card>
                  </View>
                </View>
              </Pressable>
            </View>

            <View className="flex justify-center items-center gap-8 mt-10">
              <Button
                variant="outline"
                onPress={handlePrevCard}
                className="w-32 rounded-xl py-3 border-slate-200"
              >
                Previous
              </Button>
              <span className="text-slate-400 font-bold min-w-16 text-center tracking-wider">
                {activeFlashcard + 1} / {flashcards.length}
              </span>
              <Button
                onPress={handleNextCard}
                className="w-32 rounded-xl py-3 shadow-lg shadow-indigo-200"
              >
                Next
              </Button>
            </View>
          </View>
        )}

        {/* QUICK PREP Q&A */}
        {activeTab === "Quick Prep" && currentQA && (
          <View className="max-w-4xl mx-auto animate-fade-in">
            <Card className="p-0 overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50">
              {/* Question Header */}
              <View className="bg-slate-50 p-8 md:p-10 border-b border-slate-100">
                <View className="flex flex-col md:flex-row justify-between items-start gap-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
                    {currentQA.question}
                  </h2>
                  <View className="flex gap-3 shrink-0">
                    <Button className="flex items-center px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 font-bold transition-colors shadow-sm">
                      <Volume2 className="w-4 h-4 mr-2 text-indigo-500" /> Read
                    </Button>
                    <Button className="flex items-center px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 font-bold transition-colors shadow-sm">
                      <Sparkles className="w-4 h-4 mr-2 text-purple-500" /> AI
                      Hint
                    </Button>
                  </View>
                </View>
              </View>

              {/* Answer Body */}
              <View className="p-8 md:p-10 bg-white">
                <View className="flex items-center justify-between mb-8">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Answer Detail Level
                  </span>
                  <View className="flex gap-2 bg-slate-100 p-1 rounded-lg">
                    {(["Short", "Medium", "Long"] as AnswerLength[]).map(
                      (len) => (
                        <Button
                          key={len}
                          onPress={() => setPrepLength(len)}
                          className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                            prepLength === len
                              ? "bg-white text-indigo-600 shadow-sm"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          {len}
                        </Button>
                      )
                    )}
                  </View>
                </View>

                <View className="min-h-50 bg-slate-50/50 rounded-2xl p-8 border border-slate-100">
                  <p className="text-lg md:text-xl leading-loose text-slate-700 font-medium">
                    {currentQA[`answer${prepLength}`]}
                  </p>
                </View>

                <View className="flex justify-between items-center mt-10 pt-6 border-t border-slate-100">
                  <Button
                    variant="ghost"
                    onPress={handlePrevPrep}
                    disabled={activePrepIndex === 0}
                    className="text-slate-500 hover:text-slate-800 pl-0"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Previous Topic
                  </Button>
                  <span className="text-sm font-bold text-slate-300">
                    Topic {activePrepIndex + 1} of {quickPrep.length}
                  </span>
                  <Button
                    onPress={handleNextPrep}
                    disabled={activePrepIndex === quickPrep.length - 1}
                    className="px-8 rounded-xl shadow-lg shadow-indigo-100"
                  >
                    Next Topic
                  </Button>
                </View>
              </View>
            </Card>
          </View>
        )}

        {/* NOTES TAB */}
        {activeTab === "Notes" && (
          <View className="max-w-4xl mx-auto animate-fade-in grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Col: Create Note */}
            <View className="lg:col-span-5 space-y-6">
              <Card className="p-6 sticky top-6">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                  <PenTool className="w-5 h-5 mr-2 text-indigo-600" /> New Note
                </h3>
                <View className="mb-6">
                  <textarea
                    className="w-full h-40 p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all resize-none placeholder-slate-400 text-slate-700 leading-relaxed"
                    placeholder="Type your note here..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                  />
                </View>
                <View className="space-y-3">
                  <Button
                    onPress={handleAddTextNote}
                    className="justify-center shadow-lg shadow-indigo-100"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Text Note
                  </Button>
                  <View className="grid grid-cols-2 gap-3">
                    <Button
                      onPress={() => handleMockRecord("audio")}
                      className="flex items-center justify-center px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-colors"
                    >
                      <Mic className="w-4 h-4 mr-2 text-rose-500" /> Audio
                    </Button>
                    <Button
                      onPress={() => handleMockRecord("video")}
                      className="flex items-center justify-center px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-colors"
                    >
                      <Video className="w-4 h-4 mr-2 text-teal-500" /> Video
                    </Button>
                  </View>
                </View>
              </Card>
            </View>

            {/* Right Col: List */}
            <View className="lg:col-span-7">
              <View className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">My Notes</h3>
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                  {notesList.length} Items
                </span>
              </View>

              <View className="space-y-4">
                {notesList.map((note) => (
                  <View
                    key={note.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all group relative"
                  >
                    <View className="flex items-start gap-4">
                      <View
                        className={`
                                w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                                ${
                                  note.type === "text"
                                    ? "bg-indigo-50 text-indigo-600"
                                    : note.type === "audio"
                                      ? "bg-rose-50 text-rose-600"
                                      : "bg-teal-50 text-teal-600"
                                }
                             `}
                      >
                        {note.type === "text" && (
                          <FileText className="w-5 h-5" />
                        )}
                        {note.type === "audio" && <Mic className="w-5 h-5" />}
                        {note.type === "video" && <Video className="w-5 h-5" />}
                      </View>

                      <View className="flex-1 min-w-0 pt-1">
                        <p className="text-slate-800 font-medium leading-relaxed">
                          {note.content}
                        </p>
                        <p className="text-xs text-slate-400 mt-2 font-medium">
                          {note.date}
                        </p>
                      </View>

                      <Button
                        onPress={() => handleDeleteNote(note.id)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </View>
                  </View>
                ))}

                {notesList.length === 0 && (
                  <View className="text-center py-16 text-slate-400 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                    <View className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 opacity-40" />
                    </View>
                    <p className="font-medium">No notes yet</p>
                    <p className="text-sm mt-1">
                      Capture your thoughts while revising.
                    </p>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ReviseScreen;
