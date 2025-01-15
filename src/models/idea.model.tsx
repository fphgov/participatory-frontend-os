import { ListLinks } from "@/lib/types"
import { ICampaignTheme } from "@/models/campaignTheme.model"
import { IFeaturedImage } from "@/models/common.model"
import { IProject } from "@/models/project.model"
import { ICampaignLocation } from "@/models/campaignLocation.model"
import { IWorkflowState } from "@/models/workflowState.model"
import { ISubmitter } from "@/models/submitter.model"
import { ICampaign } from "@/models/campaign.model"
import { IWorkflowStateExtra } from "@/models/workflowStateExtra.model"
import { IMedia } from "@/models/media.model"
import { IComment } from "@/models/comment.model"
import {IIdeaCampaignLocation} from "@/models/ideaCampaignLocation.model";

export type IIdeaStatus = {
  id: string|number
  code: string
  title: string
}

export type IIdea = {
  id: number
  status: IIdeaStatus
  campaign: ICampaign
  campaign_theme?: ICampaignTheme
  campaignTheme?: ICampaignTheme
  campaignLocation?: ICampaignLocation
  ideaCampaignLocations?: IIdeaCampaignLocation[]
  _links?: ListLinks
  project?: IProject
  featuredImage?: IFeaturedImage
  title: string
  description: string
  locationDescription?: string|null
  solution?: string|null
  location?: string|null|undefined
  submitter?: ISubmitter
  createdAt?: string
  answer?: string|null
  cost?: number
  medias?: IMedia[]
  comments?: IComment[]
  links?: string[]
  workflowState?: IWorkflowState
  workflowStateExtra?: IWorkflowStateExtra
  voted?: number
}
