export type ApplicationStatus = 'Saved' | 'Preparing' | 'Applied' | 'Approved' | 'Rejected'

export type Application = {
  id: number
  scholarship: string
  provider: string
  amount: number
  status: ApplicationStatus
  deadline: string
}
