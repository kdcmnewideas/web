export interface IKey {
  provider: string
  label: string
  id: number
  user_id: string
  capabilities: string[]
  total_cost: number
  is_active: boolean
  created_at: string
}

export interface IAddKey {
  provider: string
  label: string
  api_key: string
}

export interface IAiUsage {
  operation: string
  model_used: string
  tokens_input: number
  tokens_output: number
  cost: number
}

export interface IAiAnalytics  {
  id: number
  capability_used: string
  operation: string
  model_used: string
  total_tokens: number
  cost: number
  timestamp: string
}
