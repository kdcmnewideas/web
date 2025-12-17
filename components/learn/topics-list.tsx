
import { BookOpen } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { useUniwind } from 'uniwind';
import { Topic } from '../../types/types';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Text } from '../ui/text';

interface LearnTopicsListProps {
  topics: Topic[];
  activeTopicIndex: number;
  onTopicSelect: (index: number) => void;
}

export const LearnTopicsList= ({ 
  topics, 
  activeTopicIndex, 
  onTopicSelect 
}: LearnTopicsListProps) => {
  const { theme } = useUniwind();
  return (
    <Card className="p-5 h-full max-h-[calc(100vh-120px)] overflow-y-auto">
      <Text className="font-bold  mb-4 text-lg">Lesson Topics</Text>
      <View className="space-y-3">
        {topics.map((topic, idx) => {
          const isActive = idx === activeTopicIndex;
          return (
            <Button
              key={topic.id}
              onPress={() => onTopicSelect(idx)}
              variant={isActive ? 'default' : 'ghost'}
              className="group flex-row items-center justify-between rounded-xl"
              
            >
              <View className="flex-row items-center gap-3 overflow-hidden">
                <BookOpen className={`w-4 h-4 shrink-0 `} color={theme==="dark"? "#fff": "#000"} />
                <Text className="font-medium truncate text-sm">{topic.title}</Text>
              </View>
            </Button>
          );
        })}
      </View>
    </Card>
  );
};
