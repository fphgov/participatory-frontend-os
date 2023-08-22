import { ITag } from "@/models/tag.model"
import { ICampaignTheme } from "@/models/campaignTheme.model"
import { ICampaign } from "./campaign.model"
import { ICampaignLocation } from "./campaignLocation.model"
import { IMedia } from "./media.model"
import { IWorkflowState } from "./workflowState.model"

export type IProjectStatus = {
  id?: string|number
  code: string
  title: string
}

export type IProjectType = {
  id: number
  title: string
  description: string
  createdAt: string
}

export type IProject = {
  id: number
  projectType: IProjectType
  campaign: ICampaign
  status: IProjectStatus
  campaign_theme?: ICampaignTheme
  campaignTheme?: ICampaignTheme
  ideas: number[]
  tags: ITag[]
  campaignLocations?: ICampaignLocation
  medias?: IMedia[]
  workflowState: IWorkflowState
  implementations: any[]
  title: string
  description: string
  location?: string|null|undefined
  solution: string
  cost: number|null
  video?: string|null
  win: boolean
  createdAt?: string
  voted: number
  // _links?: ListLinks
}
