interface ISubjectContentResponse {
  id: string;
  title: string;
  description: string;
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
