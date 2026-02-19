export interface IUserStats {
  average_score: number
  total_exams_taken: number
  goals_met_count: number
}

export interface IScoreTrend {
  exam_date: string
  score: number
  assignment_type: string
}

export interface IMasteryReport {
  overall_ers: number
  subject_breakdown: SubjectBreakdown[]
}

export interface SubjectBreakdown {
  subject_id: string
  average_score: number
  exams_taken: number
  mastery_status: string
  ers_score: number
}
