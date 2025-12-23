import { QA } from "@/types/types";
import { ArrowLeft, Sparkles, Volume2 } from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { useUniwind } from "uniwind";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Text } from "../ui/text";

interface QuickprepProps {
  quickPrep: QA[];
}

const Quickprep = ({ quickPrep }: QuickprepProps) => {
  const { theme } = useUniwind();
  const [prepLength, setPrepLength] = useState("Short");
  const [activePrepIndex, setActivePrepIndex] = useState(0);
  const currentQA = quickPrep[activePrepIndex];

  // --- Handlers ---

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

  return (
    <View className="max-w-4xl mx-auto animate-fade-in w-full">
      <Card className="p-0 overflow-hidden w-full">
        {/* Question Header */}
        <View className="p-8 md:p-10 border-b border-border">
          <View className="flex flex-col md:flex-row justify-between items-start gap-6">
            <Text className="text-2xl md:text-3xl font-bold leading-tight">
              {currentQA.question}
            </Text>
            <View className="flex-row gap-3 shrink-0">
              <Button variant={"secondary"}>
                <Volume2 size={16} color={"#ad46ff"} />
                <Text>Read</Text>
              </Button>
              <Button variant={"secondary"}>
                <Sparkles size={16} color={"#615fff"} />
                <Text>AI Hint</Text>
              </Button>
            </View>
          </View>
        </View>

        {/* Answer Body */}
        <View className="p-8 md:p-10 ">
          <View className="flex-row items-center justify-between mb-8">
            <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Answer Detail Level
            </Text>

            <Tabs value={prepLength} onValueChange={setPrepLength}>
              <TabsList>
                {["Short", "Medium", "Long"].map((len) => (
                  <TabsTrigger value={len} key={len}>
                    <Text>{len}</Text>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </View>

          <View className="min-h-50 bg-muted rounded-2xl p-8 border border-border">
            <Text className=" md:text-xl leading-loose text-muted-foreground font-medium">
              {currentQA[`answer${prepLength}` as keyof QA]}
            </Text>
          </View>

          <View className="flex-row justify-between items-center mt-10 pt-6 border-t border-border">
            <Button
              variant="ghost"
              onPress={handlePrevPrep}
              disabled={activePrepIndex === 0}
            >
              <ArrowLeft color={theme === "dark" ? "#fff" : "#000"} size={16} />
              <Text>Previous Topic</Text>
            </Button>
            <Text className="text-sm font-bold text-slate-300">
              Topic {activePrepIndex + 1} of {quickPrep.length}
            </Text>
            <Button
              onPress={handleNextPrep}
              disabled={activePrepIndex === quickPrep.length - 1}
            >
              <Text>Next Topic</Text>
            </Button>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default Quickprep;
