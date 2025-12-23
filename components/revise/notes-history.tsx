import { NoteItem } from "@/types/types";
import {
    FileText,
    Mic,
    PenTool,
    Plus,
    Trash2,
    Video,
} from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { useUniwind } from "uniwind";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Text } from "../ui/text";
import { Textarea } from "../ui/textarea";

interface Props {
  notesList: NoteItem[];
  handleAddTextNote: () => void;
  handleMockRecord: (type: "audio" | "video") => void;
  handleDeleteNote: (id: string) => void;
}

const NotesHistory = ({
  notesList,
  handleAddTextNote,
  handleMockRecord,
  handleDeleteNote,
}: Props) => {
  const { theme } = useUniwind();
  const [newNoteText, setNewNoteText] = useState("");
  return (
    <View className="max-w-4xl mx-auto animate-fade-in grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
      {/* Left Col: Create Note */}
      <View className="lg:col-span-5 gap-6">
        <Card className="p-6 sticky top-6">
          <Text className="text-lg font-bold  mb-6 flex items-center">
            <PenTool className="mr-2 " color={"#4f39f6"} size={20} /> New Note
          </Text>
          <View className="mb-6">
            <Textarea
              placeholder="Type your note here..."
              value={newNoteText}
              onChangeText={(e) => setNewNoteText(e)}
              className="h-8"
            />
          </View>
          <View className="gap-3">
            <Button onPress={handleAddTextNote} className="justify-center">
              <Plus size={16} color={"#fff"} />
              <Text>Add Text Note</Text>
            </Button>

            <Button
              onPress={() => handleMockRecord("audio")}
              variant={"outline"}
            >
              <Mic color={"#ff2056"} size={16} />
              <Text>Audio</Text>
            </Button>
          </View>
        </Card>
      </View>

      {/* Right Col: List */}
      <View className="lg:col-span-7">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-xl font-bold ">My Notes</Text>
          <Text className="text-xs font-bold text-slate-400 px-2 py-1 rounded-md">
            {notesList.length} Items
          </Text>
        </View>

        <View className="gap-4">
          {notesList.map((note) => (
            <View
              key={note.id}
              className="bg-card p-5 rounded-2xl border border-border hover:border-indigo-300 hover:shadow-md transition-all group relative"
            >
              <View className="flex-row items-start gap-4">
                <View
                  className={`
                                w-10 h-10 rounded-xl flex-row items-center justify-center shrink-0
                                ${
                                  note.type === "text"
                                    ? "bg-indigo-50 text-indigo-600"
                                    : note.type === "audio"
                                      ? "bg-rose-50 text-rose-600"
                                      : "bg-teal-50 text-teal-600"
                                }
                             `}
                >
                  {note.type === "text" && <FileText size={20} />}
                  {note.type === "audio" && <Mic size={20} />}
                  {note.type === "video" && <Video size={20} />}
                </View>

                <View className="flex-1 min-w-0 pt-1">
                  <Text className=" font-medium leading-relaxed">
                    {note.content}
                  </Text>
                  <Text className="text-xs text-slate-400 mt-2 font-medium">
                    {note.date}
                  </Text>
                </View>

                <Button
                  onPress={() => handleDeleteNote(note.id)}
                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </Button>
              </View>
            </View>
          ))}

          {notesList.length === 0 && (
            <View className="py-16   rounded-3xl border border-dashed border-border">
              <View className="w-16 h-16 bg-card rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className=" opacity-40" size={32} color={theme==="dark"? "#fff" : "#000"}/>
              </View>
              <Text className="font-medium text-slate-400 text-center ">No notes yet</Text>
              <Text className="text-sm mt-1 text-slate-400 text-center ">
                Capture your thoughts while revising.
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default NotesHistory;
