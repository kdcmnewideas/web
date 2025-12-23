import Flashcards from "@/components/revise/flashcards";
import NotesHistory from "@/components/revise/notes-history";
import Quickprep from "@/components/revise/quickprep";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { ALL_LESSONS, LESSON_CONTENTS } from "@/mockData";
import { ScreenName } from "@/types/types";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  List,
  PenTool,
  RotateCw
} from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { useUniwind } from "uniwind";

interface ReviseScreenProps {
  lessonId?: string;
  onNavigate: (screen: ScreenName, params?: any) => void;
}

type TabType = "Flashcards" | "Quick Prep" | "Notes";

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
  }: { reviseId: string; subjectId: string } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<string>("Flashcards");;

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

  // --- Handlers ---





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
      

      <View className="min-h-125 mt-10">
        {/* FLASHCARDS SECTION */}
        {activeTab === "Flashcards" && (
         <Flashcards flashcards={flashcards}/>
        )}

        {/* QUICK PREP Q&A */}
        {activeTab === "Quick Prep" && 
          <Quickprep quickPrep={quickPrep} />
        }

        {/* NOTES TAB */}
        {activeTab === "Notes" && (
         <NotesHistory
            notesList={notesList}
            handleAddTextNote={handleAddTextNote}
            handleMockRecord={handleMockRecord}
            handleDeleteNote={handleDeleteNote}
          />
        )}
      </View>
    </View>
  );
};

export default ReviseScreen;
