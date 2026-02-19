export interface IIngestion {
  estimated_completion_time: string;
  estimated_cost_usd: number;
  file_url: string;
  job_id: string;
  progress_url: string;
  queue_backend: string;
  status: string;
  subject_id: string;
}

export interface IIngestionExtimate {
  estimated_cost_usd: number;
  estimated_input_tokens: number;
  estimated_output_tokens: number;
  max_cost_usd: number;
  model: string;
  total_pages: number;
  within_budget: boolean;
}

export interface IIngestionProgress {
  created_at: string;
  current_stage: string;
  estimated_time_remaining: number;
  job_id: string;
  processed_chapters: number;
  progress_percentage: number;
  started_at: string;
  status: string;
  total_chapters: number;
}

export interface IIngestionJobList {
  jobs: IIngestionJob[]
  limit: number
  skip: number
  total: number
}

export interface IIngestionJob {
  completed_at: string
  created_at: string
  current_stage: string
  id: string
  progress_percentage: number
  status: string
  subject_id: string
  subject_title: string
}

export interface IJobContent {
  id: string
  title: string
  description: string
  thumbnail_url: string
  org_id: string
  board_id: string
  class_id: string
  category_id: string
  created_by: string
  created_at: string
  total_input_tokens: number
  total_output_tokens: number
  estimated_cost_usd: number
  chapters: IChapter[]
}

export interface IChapter {
  id: string
  title: string
  topics: ITopic[]
}

export interface ITopic {
  id: string
  title: string
  subtopics: ISubtopic[]
}

export interface ISubtopic {
  id: string
  title: string
  content_original: string
  variations: IVariations
  images: IImage[]
}

export interface IVariations {
  easy: IContent
  medium: IContent
  hard: IContent
}

export interface IContent {
  text: string
  keywords: IKeyword[]
}

export interface IKeyword {
  word: string
  definition: string
}

export interface IImage {
  url: string
  caption: string
}

export interface IDBHealth {
  checks: IChecks
  status: string
  timestamp: string
}

export interface IChecks {
  database: string
  queue: string
  storage: string
}

export interface IIngestionMetrics {
  average_cost_usd: number
  completed: number
  failed: number
  pending: number
  processing: number
  queue_backend: string
  success_rate: number
  total_jobs: number
}
