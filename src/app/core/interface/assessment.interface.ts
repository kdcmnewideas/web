export interface ISubmitAssessment {
  reference_id: string
  reference_type: string
  assignment_type: string
  user_answer: string
  duration_seconds: number
  question_context: string
  org_id: string
  api_key: string
}

export interface IAssessment {
  id: number
  reference_id: string
  assignment_type: string
  completed_at: string
  percentage: number
}


export interface IAssessmentFeedback {
  id: number
  reference_id: string
  assignment_type: string
  status: string
  completed_at: string
  duration_seconds: number
  score: Score
  feedback: Feedback
}

export interface Score {
  score_obtained: number
  max_score: number
  percentage: number
  is_passed: boolean
}

export interface Feedback {
  summary_text: string
  detailed_analysis: DetailedAnalysis
  suggested_actions: string[]
  user_submission: string
}

export interface DetailedAnalysis {
  additionalProp1: AdditionalProp1
}

export interface AdditionalProp1 {}
