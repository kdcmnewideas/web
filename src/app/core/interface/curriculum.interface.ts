export interface IStudentEnrollRequest {
  subject_id: string
  user_id: string
}

export interface IStudentEnrollResponse {
  id: string
  user_id: string
  subject_id: string
  created_at: string
}

export interface IAssetUploadResponse {
  id: string
  asset_type: string
  url: string
  validation_summary: string
}
