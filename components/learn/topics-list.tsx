import { TriggerRef } from "@rn-primitives/select";
import { BookOpen, CheckCircle2, Circle } from "lucide-react-native";
import React from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUniwind } from "uniwind";
import { Topic } from "../../types/types";
import {
  NativeSelectScrollView,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { Text } from "../ui/text";

interface LearnTopicsListProps {
  topics: Topic[];
  activeTopicIndex: number;
  onTopicSelect: (index: number) => void;
}

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Cherry", value: "cherry" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Orange", value: "orange" },
  { label: "Lemon", value: "lemon" },
  { label: "Kiwi", value: "kiwi" },
  { label: "Mango", value: "mango" },
  { label: "Pomegranate", value: "pomegranate" },
  { label: "Watermelon", value: "watermelon" },
  { label: "Peach", value: "peach" },
  { label: "Pear", value: "pear" },
  { label: "Plum", value: "plum" },
  { label: "Raspberry", value: "raspberry" },
  { label: "Tangerine", value: "tangerine" },
];

export const LearnTopicsList = ({
  topics,
  activeTopicIndex,
  onTopicSelect,
}: LearnTopicsListProps) => {
  const { theme } = useUniwind();
  const ref = React.useRef<TriggerRef>(null);

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({
      ios: insets.bottom,
      android: insets.bottom + 24,
    }),
    left: 12,
    right: 12,
  };

  // Workaround for rn-primitives/select not opening on mobile
  function onTouchStart() {
    ref.current?.open();
  }
  return (
    <>
      <Select onValueChange={(e) => onTopicSelect(parseInt(e?.value || "-1"))} value={{value: activeTopicIndex.toString(), label: topics[activeTopicIndex].title}}>
        <SelectTrigger
          ref={ref}
          onTouchStart={onTouchStart}
          className="h-auto! w-full"
        >
          <SelectValue placeholder="Select a fruit">
            <View className="flex-row items-center gap-4 overflow-hidden">
              <View className="shrink-0 w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <BookOpen className="w-4 h-4" />
              </View>
              <View className="text-left overflow-hidden">
                <View className=" leading-none mb-1">
                  <Text className="text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase">
                    Topic {activeTopicIndex + 1} of {topics.length}
                  </Text>
                </View>
                <View>
                  <Text className="font-bold  truncate">
                    {topics[activeTopicIndex].title}
                  </Text>
                </View>
              </View>
            </View>
          </SelectValue>
        </SelectTrigger>
        <SelectContent insets={contentInsets} className="w-full">
          <NativeSelectScrollView>
            <SelectGroup>
              {topics.map((topic, idx) => {
                const isActive = idx === activeTopicIndex;
                const isCompleted = idx < activeTopicIndex;
                return (
                  <SelectItem
                    key={topic.id}
                    label={topic.title}
                    value={idx.toString()}
                  >
                    <View className="flex-row items-center gap-3">
                      <Text
                        className={`text-[10px] font-black ${isActive ? "text-indigo-200" : "text-slate-300"}`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </Text>
                      <Text className="font-bold text-sm text-left">
                        {topic.title}
                      </Text>
                    </View>

                    {isCompleted ? (
                      <View
                        className={`p-1 rounded-full ${isActive ? "bg-white/20" : "bg-emerald-50"}`}
                      >
                        <CheckCircle2
                          className={`w-4 h-4 ${isActive ? "text-white" : "text-emerald-500"}`}
                        />
                      </View>
                    ) : isActive ? (
                      <View className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-200" />
                    )}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </NativeSelectScrollView>
        </SelectContent>
      </Select>
    </>
  );
};
