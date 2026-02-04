export interface ISubject {
  title: string;
  description: string;
  thumbnail_url: string;
  org_id: string;
  board_id: string;
  class_id: string;
  category_id: string;
}

export interface ISubjectResponse {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  org_id: string;
  board_id: string;
  class_id: string;
  category_id: string;
  created_by: string;
  created_at: string;
  total_input_tokens: number;
  total_output_tokens: number;
  estimated_cost_usd: number;
}

export interface ISubjectDetails {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  org_id: string;
  board_id: string;
  class_id: string;
  category_id: string;
  created_by: string;
  created_at: string;
  total_input_tokens: number;
  total_output_tokens: number;
  estimated_cost_usd: number;
  chapters: Chapter[];
}

interface Chapter {
  id: string;
  title: string;
  topics: Topic[];
}

interface Topic {
  id: string;
  title: string;
  subtopics: Subtopic[];
}

interface Subtopic {
  id: string;
  title: string;
  content_original: string;
  variations: Variations;
  images: Image[];
}

interface Image {
  url: string;
  caption: string;
}

interface Variations {
  easy: Easy;
  medium: Easy;
  hard: Easy;
}

interface Easy {
  text: string;
  keywords: Keyword[];
}

interface Keyword {
  word: string;
  definition: string;
}
