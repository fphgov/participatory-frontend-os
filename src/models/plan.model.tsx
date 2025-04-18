import { ListLinks } from "@/lib/types"
import { ITag } from "@/models/tag.model"
import { ICampaignTheme } from "@/models/campaignTheme.model"
import { ICampaign } from "./campaign.model"

export type IPlanStatus = {
  id?: string|number
  code: string
  title: string
}

export type IPlan = {
  id: string|number
  status: IPlanStatus
  campaign?: ICampaign
  campaign_theme?: ICampaignTheme
  campaignTheme?: ICampaignTheme
  tags: ITag
  title: string
  description: string
  video?: string|null
  location?: string|null|undefined
  _links: ListLinks
  voted?: number
}
