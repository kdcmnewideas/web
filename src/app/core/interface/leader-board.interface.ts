export interface ITop10Request {
  org_id: string;
  filter_user_ids: string[];
}

export interface IRanking {
  rank: number;
  user_id: string;
  score: number;
  exams_count: number;
  is_current_user: boolean;
}

export interface IContentLevel {
  reference_id: string;
  reference_type: string;
  scope: string;
  org_id: string;
}

export interface IMyRank {
  global_rank: number;
  global_percentile: number;
  current_score: number;
}
