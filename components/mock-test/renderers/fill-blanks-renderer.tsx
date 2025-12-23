
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';

interface FillBlanksRendererProps {
  blankText: string;
  answer: string[] | undefined;
  setAnswer: (val: string[]) => void;
}

export const FillBlanksRenderer: React.FC<FillBlanksRendererProps> = ({ blankText, answer, setAnswer }) => {
  const parts = blankText?.split('[blank]') || [];
  const userBlanks = answer || Array(parts.length - 1).fill('');

  const updateBlank = (val: string, index: number) => {
    const next = [...userBlanks];
    next[index] = val;
    setAnswer(next);
  };

  return (
    <View className="bg-background p-10 rounded-xl border-border border">
      <View className='flex-row flex-wrap items-center'>
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            <Text className='text-xl md:text-2xl leading-loose text-slate-700 font-bold dark:text-slate-200'>{part}</Text>
            {i < parts.length - 1 && (
              <Input
                className="mx-2 px-4 py-2 w-32 md:w-48 outline-none text-center"
                placeholder="..."
                value={userBlanks[i]}
                onChangeText={(e) => updateBlank(e, i)}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};
