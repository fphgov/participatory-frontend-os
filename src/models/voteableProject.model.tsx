export type IVoteableProject = {
  id: number
  cost: number
  solution: string
  location: string
  description: string
  title: string
  campaignTheme: { id: number; code: string; name: string; }
  projectType: { id: number; title: string; }
  latitude?: string
  longitude?: string
}
