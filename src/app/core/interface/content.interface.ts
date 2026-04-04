import { IChapter, ITopic } from "./ingestion.interface"

export interface ISubjectData {
  id: string
  title: string
  description: string
  chapters: IChapter[]
}

export interface IChapterData {
  id: string
  title: string
  topics: ITopic[]
  start_page: number
}

export interface ITopicData {
  id: string
  title: string
  status: string
  subtopics: any[]
}
