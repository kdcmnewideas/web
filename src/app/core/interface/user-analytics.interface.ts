export interface ITrackTimeRequest {
  reference_id: string;
  reference_type: string;
  duration_seconds: number;
  start_time: string;
  end_time: string;
}

export interface IReadinessReport {
  subject_id: string;
  exam_readiness_score: number;
  exam_readiness_grade: string;
  goal_readiness_score: number;
  goal_readiness_status: string;
  goal_target: number;
}

export interface ITopicMastery {
  topic_id: string;
  status: string;
  total_study_time_minutes: number;
  total_assessment_time_minutes: number;
  hesitation_ratio: number;
  velocity_score: number;
}
