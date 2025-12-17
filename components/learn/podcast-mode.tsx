import { Lesson, Subject, Topic } from '@/types/types';
import React from 'react';
import { Text, View } from 'react-native';

interface LearnPodcastModeProps {
  topic: Topic;
  subject?: Subject;
  lesson?: Lesson;
  isPlaying: boolean;
  progress: number;
  playbackSpeed: number;
  onTogglePlay: () => void;
  onSetProgress: (p: number) => void;
  onCycleSpeed: () => void;
}


const podcastMode = ({topic, subject, lesson, isPlaying, progress, playbackSpeed, onTogglePlay, onSetProgress, onCycleSpeed}: LearnPodcastModeProps) => {
  return (
    <View>
      <Text>podcastMode</Text>
    </View>
  )
}

export default podcastMode