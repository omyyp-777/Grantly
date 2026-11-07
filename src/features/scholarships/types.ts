export type Scholarship = {
  id: number
  name: string
  provider: string
  amount: number
  deadline: string
  category: string
  level: string
  match: number
  tag: string
  color: string
  description: string
  eligibility: string[]
}

export type StudentProfile = {
  name: string
  course: string
  college: string
  year: string
  score: string
  income: string
  state: string
  level: string
}
