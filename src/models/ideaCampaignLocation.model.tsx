import { ICampaignLocation } from "@/models/campaignLocation.model"
import {IIdea} from "@/models/idea.model";

export type IIdeaCampaignLocation = {
  id: number
  campaignLocation?: ICampaignLocation
  idea?: IIdea,
  createdAt: string
}
