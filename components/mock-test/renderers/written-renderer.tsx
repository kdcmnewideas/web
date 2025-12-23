
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

interface WrittenRendererProps {
  answer: string | undefined;
  setAnswer: (val: string) => void;
}

export const WrittenRenderer: React.FC<WrittenRendererProps> = ({ answer, setAnswer }) => {
  return (
    <View className="gap4">
      <View className="p-4 bg-secondary border border-border rounded-2xl flex-row items-start gap-3 mb-6">
         <FileText className="w-5 h-5 text-indigo-600 mt-1" />
         <Text className="text-sm text-indigo-800 dark:text-indigo-400 font-medium">Please provide a detailed response. Your submission will be evaluated for depth and accuracy.</Text>
      </View>
      <Textarea
        className="h-64 "
        placeholder="Type your answer here..."
        value={answer || ''}
        onChangeText={(e) => setAnswer(e)}
      />
    </View>
  );
};
