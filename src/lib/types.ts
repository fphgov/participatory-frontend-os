import { IArticle } from "@/models/article.model"
import { IIdea } from "@/models/idea.model"
import { IPage } from "@/models/page.model"
import { IProject } from "@/models/project.model"
import { IPlan } from "@/models/plan.model"
import { IUser } from "@/models/user.model"
import { IVoteableProject } from "@/models/voteableProject.model"
import { IPhaseStatus } from "@/models/phaseStatus.model"
import { IUserPreference } from "@/models/userPreference.model"

export interface PageResponse {
  data: IPage
}

export interface MessageResponse {
  message: string
}

export interface VoteResponse {
  message: string
  data: {
    remainingVote: [
      { id: number, votes: number }
    ]
  }
}

export interface UserResponse {
  data: IUser
}

export interface UserPreferenceResponse {
  data: IUserPreference
}

export interface ArticleResponse {
  data: IArticle
}

export interface PhaseStatusResponse {
  data: IPhaseStatus
}

export interface VoteStatusResponse {
  data: {
    voteables_count: number,
    voteables_count_by_campaign_themes: Record<string, number>,
    projects: IProject[],
  }
}

export interface IdeaResponse extends IIdea {
}

export interface ProjectResponse extends IProject {
}

export interface PlanResponse extends IPlan {
}

export interface UserLoginResponse {
  token: string
  message: string
}

export interface ListLinks {
  self?: { href: string }
  prev?: { href: string }
  next?: { href: string }
  first?: { href: string }
  last?: { href: string }
}

export interface ListResponse {
  _total_items: number
  _page: number
  _page_count: number
  _links: ListLinks
}

export interface IdeaListResponse extends ListResponse {
  _embedded: {
    ideas: IIdea[]
  }
}

export interface ProjectListResponse extends ListResponse {
  _embedded: {
    projects: IProject[]
  }
}

export interface PlanListResponse extends ListResponse {
  _embedded: {
    projects: IPlan[]
  }
}

export interface VotedProjectListResponse {
  data: IProject[]
}

export interface ArticleListResponse extends ListResponse {
  data: IArticle[]
}

export interface FilterResponse {
  theme: { code: string, name: string }[]
  location: { code: string, name: string }[]
  campaign: { id: number, name: string }[]
  status: { code: string, name: string }[]
}

export interface VoteListResponse {
  data: IVoteableProject[]
}

export interface IssueResponse {
  message: string
  code: string
}

export interface OkResponse {
  data: {
    code: string
  }
}
