"use server"

import {redirect} from 'next/navigation'
import {getToken, saveToken} from "@/lib/actions"
import {
  ArticleListResponse,
  ArticleResponse,
  FilterResponse,
  IdeaListResponse,
  IdeaResponse,
  IssueResponse,
  MessageResponse,
  OkResponse,
  PageResponse,
  PhaseStatusResponse,
  PlanListResponse,
  PlanResponse,
  ProjectListResponse,
  ProjectResponse,
  UserLoginResponse,
  UserPreferenceResponse,
  UserResponse,
  VotedProjectListResponse,
  VoteResponse,
  VoteStatusResponse
} from "@/lib/types"
import {IUser} from "@/models/user.model"
import {IIdea} from '@/models/idea.model'
import {IProject} from "@/models/project.model"
import {IArticle} from "@/models/article.model"
import {IPage} from "@/models/page.model"
import {IPlan} from '@/models/plan.model'
import endpoints from '@/lib/endpoints'
import {IPhaseStatus} from '@/models/phaseStatus.model'
import {ApiError} from 'next/dist/server/api-utils';
import {Agent, setGlobalDispatcher} from 'undici'
import {IUserPreference} from '@/models/userPreference.model'

export type ProfileData = {
  profile: IUser|null
  profilePreference: IUserPreference|null
}

type ApiLoginUserProps = {
  email: string
  password: string
  type: string
  pathname: string
  privacy: string
  liveInCity: string
  newsletter: string
  prize: string
  recaptchaToken: string
}

const agent = new Agent({
  connect: {
    rejectUnauthorized: false
  }
})

setGlobalDispatcher(agent)

const isObject = (obj: any): boolean => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

const backendUrl = (url: string|undefined): string => `${process.env.BACKEND_URL}/app${url}`

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("Content-Type") || ""
  const isJson = contentType.includes("application/json") || contentType.includes("application/hal+json")
  const data = isJson ? await response.json() : await response.text()

  if (response.status === 403) {
    throw new ApiError(403, 'Google reCapcha ellenőrzés sikertelen')
  }

  if (!response.ok) {
    if (isJson && isObject(data.errors)) {
      throw new ApiError(response.status, JSON.stringify(data.errors))
    }

    if (response.statusText === "Unauthorized") {
      redirect('/?auth=login')
    }

    throw new ApiError(response.status, data.message || response.statusText)
  }

  return data as T
}

export async function apiLoginUser(credentials: ApiLoginUserProps): Promise<{ token: string | null, message: string}> {
  const urlencoded = new URLSearchParams()

  urlencoded.append("email", credentials.email)
  urlencoded.append("password", credentials.password)
  urlencoded.append("type", credentials.type)
  urlencoded.append("pathname", credentials.pathname)
  urlencoded.append("privacy", credentials.privacy)
  urlencoded.append("liveInCity", credentials.liveInCity)
  urlencoded.append("newsletter", credentials.newsletter)
  urlencoded.append("prize", credentials.prize)
  urlencoded.append("g-recaptcha-response", credentials.recaptchaToken)

  const url = backendUrl(endpoints.API_REQ_LOGIN)

  const response = await fetch(url, {
    cache: "no-store",
    method: "POST",
    credentials: "include",
    headers: {
      'Content': "application/json",
      'Content-Type': "application/x-www-form-urlencoded",
    },
    body: urlencoded,
  })

  const { token, message } = await handleResponse<UserLoginResponse>(response)

  if (token) {
    await saveToken(token)
  }

  return {
    token,
    message
  }
}

export async function apiLoginUserWithHash(hash: string): Promise<{ token: string | null, message: string }> {
  const url = backendUrl((endpoints.API_REQ_PROFILE_LOGIN_WITH_MAGIC_LINK || '').toString().replace(':hash', hash))

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers: {
      'Content': "application/json",
    },
  })

  const { token, message } = await handleResponse<UserLoginResponse>(response)

  if (token) {
    await saveToken(token)
  }

  return {
    token,
    message
  }
}

export async function getProfileData(): Promise<ProfileData> {
  const profile = await apiProfileData()
  const profilePreference = await apiProfilePreferenceData()

  return {
    profile,
    profilePreference,
  }
}

export async function apiProfileData(): Promise<IUser> {
  const token = (await getToken())?.value

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const url = backendUrl(endpoints.API_REQ_PROFILE)

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers,
  })

  return handleResponse<UserResponse>(response).then(data => data.data)
}

export async function apiProfilePreferenceData(): Promise<IUserPreference> {
  const token = (await getToken())?.value

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers[ "Authorization" ] = `Bearer ${token}`
  }

  const url = backendUrl(endpoints.API_REQ_PROFILE_PREFERENCE)

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers,
  })

  return handleResponse<UserPreferenceResponse>(response).then(data => data.data)
}

export async function apiProfileIdeaData(data: Record<string, string>): Promise<IIdea[]> {
  const token = (await getToken())?.value

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const url = backendUrl(endpoints.API_REQ_IDEAS + '?' + new URLSearchParams(data as Record<string, string>).toString())

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers,
  })

  return handleResponse<IdeaListResponse>(response).then(data => data._embedded.ideas)
}

export async function apiProfileVotesData(): Promise<IProject[]> {
  const token = (await getToken())?.value

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const url = backendUrl(endpoints.API_REQ_PROFILE_VOTE)

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers,
  })

  return handleResponse<VotedProjectListResponse>(response).then(data => data.data)
}

export async function apiProfileDelete(): Promise<MessageResponse> {
  const token = (await getToken())?.value

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const url = backendUrl(endpoints.API_REQ_PROFILE_DELETE)

  const response = await fetch(url, {
    cache: "no-store",
    method: "DELETE",
    credentials: "include",
    headers
  })

  return await handleResponse<MessageResponse>(response).then(data => data)
}

export async function apiProfileChangePassword(credentials: { password: string, password_again: string }): Promise<MessageResponse> {
  const token = (await getToken())?.value

  const headers: Record<string, string> = {
    "Content": "application/json",
    'Content-Type': "application/x-www-form-urlencoded",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const urlencoded = new URLSearchParams()

  urlencoded.append("password", credentials.password)
  urlencoded.append("password_again", credentials.password_again)

  const url = backendUrl(endpoints.API_REQ_PASSWORD)

  const response = await fetch(url, {
    cache: "no-store",
    method: "POST",
    credentials: "include",
    headers,
    body: urlencoded,
  })

  return handleResponse<MessageResponse>(response).then(data => data)
}

export async function apiProfileChangeNewsletter(data: { newsletter: boolean }): Promise<MessageResponse> {
  const token = (await getToken())?.value

  const headers: Record<string, string> = {
    "Content": "application/json",
    'Content-Type': "application/x-www-form-urlencoded",
  }

  if (token) {
    headers[ "Authorization" ] = `Bearer ${token}`
  }

  const urlencoded = new URLSearchParams()

  urlencoded.append("newsletter", data.newsletter ? '1' : '0')

  const url = backendUrl(endpoints.API_REQ_PROFILE_SIMPLE_NEWSLETTER)

  const response = await fetch(url, {
    cache: "no-store",
    method: "POST",
    credentials: "include",
    headers,
    body: urlencoded,
  })

  return handleResponse<MessageResponse>(response).then(data => data)
}

export async function apiProfileChangePrize(data: { prize: boolean }): Promise<MessageResponse> {
  const token = (await getToken())?.value

  const headers: Record<string, string> = {
    "Content": "application/json",
    'Content-Type': "application/x-www-form-urlencoded",
  }

  if (token) {
    headers[ "Authorization" ] = `Bearer ${token}`
  }

  const urlencoded = new URLSearchParams()

  urlencoded.append("prize", data.prize ? '1' : '0')

  const url = backendUrl(endpoints.API_REQ_PROFILE_SIMPLE_PRIZE)

  const response = await fetch(url, {
    cache: "no-store",
    method: "POST",
    credentials: "include",
    headers,
    body: urlencoded,
  })

  return handleResponse<MessageResponse>(response).then(data => data)
}


export async function apiProfilePersonalData(credentials: { birthyear: string, postalCode: string }): Promise<MessageResponse> {
  const token = (await getToken())?.value

  const headers: Record<string, string> = {
    "Content": "application/json",
    'Content-Type': "application/x-www-form-urlencoded",
  }

  if (token) {
    headers[ "Authorization" ] = `Bearer ${token}`
  }

  const urlencoded = new URLSearchParams()

  urlencoded.append("birthyear", credentials.birthyear)
  urlencoded.append("postal_code", credentials.postalCode)

  const url = backendUrl(endpoints.API_REQ_PERSONAL)

  const response = await fetch(url, {
    cache: "no-store",
    method: "POST",
    credentials: "include",
    headers,
    body: urlencoded,
  })

  return handleResponse<MessageResponse>(response).then(data => data)
}

export async function apiProfileHearAbout(credentials: { hearAbout: string }): Promise<MessageResponse> {
  const token = (await getToken())?.value

  const headers: Record<string, string> = {
    "Content": "application/json",
    'Content-Type': "application/x-www-form-urlencoded",
  }

  if (token) {
    headers[ "Authorization" ] = `Bearer ${token}`
  }

  const urlencoded = new URLSearchParams()

  urlencoded.append("hear_about", credentials.hearAbout)

  const url = backendUrl(endpoints.API_REQ_PROFILE_HEAR_ABOUT)

  const response = await fetch(url, {
    cache: "no-store",
    method: "POST",
    credentials: "include",
    headers,
    body: urlencoded,
  })

  return handleResponse<MessageResponse>(response).then(data => data)
}

export async function apiIdeaSubmission(formData: any): Promise<Record<string, string>> {
  const token = (await getToken())?.value

  const url = backendUrl(endpoints.API_REQ_PROFILE_IDEA)

  const headers: Record<string, string> = {
    'Accept': 'application/json',
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { ...headers, ...formData.getHeaders()},
    body: formData.getBuffer(),
  })

  return handleResponse<any>(response).then(data => data)
}

export async function apiRegistration(data: Record<string, string>): Promise<Record<string, string>> {
  const urlencoded = new URLSearchParams(data as Record<string, string>)

  const url = backendUrl(endpoints.API_REQ_REGISTRATION)

  const response = await fetch(url, {
    cache: "no-store",
    method: "POST",
    credentials: "include",
    headers: {
      'Content': "application/json",
      'Content-Type': "application/x-www-form-urlencoded",
    },
    body: urlencoded,
  })

  return handleResponse<any>(response).then(data => data)
}

export async function apiLostPassword(data: Record<string, string>): Promise<Record<string, string>> {
  const urlencoded = new URLSearchParams(data as Record<string, string>)

  const url = backendUrl(endpoints.API_REQ_PROFILE_FORGOT_PASSWORD)

  const response = await fetch(url, {
    cache: "no-store",
    method: "POST",
    credentials: "include",
    headers: {
      'Content': "application/json",
      'Content-Type': "application/x-www-form-urlencoded",
    },
    body: urlencoded,
  })

  return handleResponse<any>(response).then(data => data)
}

export async function apiArticlesData(data: Record<string, string>|Record<string, any>): Promise<IArticle[]> {
  const url = backendUrl(endpoints.API_REQ_POSTS + '?' + new URLSearchParams(data as Record<string, string>).toString())

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers: {
      'Content': "application/json",
    },
  })

  return handleResponse<ArticleListResponse>(response).then(data => data.data)
}

export async function apiArticleData(slug: string): Promise<IArticle> {
  const url = backendUrl((endpoints.API_REQ_POST || '').toString().replace(':slug', slug))

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers: {
      'Content': "application/json",
    },
  })

  return handleResponse<ArticleResponse>(response).then(data => data.data)
}

export async function apiPageData(slug: string): Promise<IPage> {
  const url = backendUrl((endpoints.API_REQ_PAGE || '').toString().replace(':slug', slug))

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers: {
      'Content': "application/json",
    },
  })

  return handleResponse<PageResponse>(response).then(data => data.data)
}

export async function apiIdeaData(id: number|string): Promise<IIdea> {
  const url = backendUrl((endpoints.API_REQ_IDEA || '').toString().replace(':id', id.toString()))

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers: {
      'Content': "application/json",
    },
  })

  return handleResponse<IdeaResponse>(response).then(data => data)
}

export async function apiProjectData(id: number|string): Promise<IProject> {
  const url = backendUrl((endpoints.API_REQ_PROJECT || '').toString().replace(':id', id.toString()))

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers: {
      'Content': "application/json",
    },
  })

  return handleResponse<ProjectResponse>(response).then(data => data)
}

export async function apiPlanData(id: number|string): Promise<IPlan> {
  const url = backendUrl((endpoints.API_REQ_PLAN || '').toString().replace(':id', id.toString()))

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers: {
      'Content': "application/json",
    },
  })

  return handleResponse<PlanResponse>(response).then(data => data)
}

export async function apiCheckPhase(): Promise<IPhaseStatus> {
  const url = backendUrl(endpoints.API_REQ_PHASE_CHECK)

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers: {
      'Content': "application/json",
    },
  })

  return handleResponse<PhaseStatusResponse>(response).then(data => data.data)
}

export async function apiVote(projectId: number|string): Promise<VoteResponse> {
  const token = (await getToken())?.value

  const headers: Record<string, string> = {
    "Content": "application/json",
    'Content-Type': "application/x-www-form-urlencoded",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const url = backendUrl(endpoints.API_REQ_PROFILE_VOTE)

  const urlencoded = new URLSearchParams()

  urlencoded.append("projects[0]", projectId.toString())

  const response = await fetch(url, {
    cache: "no-store",
    method: "POST",
    credentials: "include",
    body: urlencoded,
    headers,
  })

  return handleResponse<VoteResponse>(response).then(data => data)
}

export async function apiCheckVote(id: number|string|undefined): Promise<IssueResponse|OkResponse> {
  const token = (await getToken())?.value

  const headers: Record<string, string> = {
    "Content": "application/json",
    'Content-Type': "application/x-www-form-urlencoded",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const projectId = id === undefined ? '' : id.toString()

  const url = backendUrl((endpoints.API_REQ_VOTE_CHECK || '').toString().replace(':id', projectId))

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers,
  })

  return handleResponse<IssueResponse|OkResponse>(response).then(data => data)
}

export async function apiVoteStatus(): Promise<VoteStatusResponse> {
  const token = (await getToken())?.value

  const headers: Record<string, string> = {
    "Content": "application/json",
    'Content-Type': "application/x-www-form-urlencoded",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const url = backendUrl(endpoints.API_REQ_VOTE_STATUS)

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers,
  })

  return handleResponse<VoteStatusResponse>(response).then(data => data)
}

export async function apiProfileActivate(hash: string): Promise<MessageResponse> {
  const url = backendUrl((endpoints.API_REQ_PROFILE_ACTIVATE || '').toString().replace(':hash', hash))

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers: {
      'Content': "application/json",
    },
  })

  return handleResponse<MessageResponse>(response).then(data => data)
}

export async function apiIdeasData(data: Record<string, string>): Promise<IdeaListResponse> {
  const url = backendUrl(endpoints.API_REQ_IDEAS + '?' + new URLSearchParams(data as Record<string, string>).toString())

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers: {
      'Content': "application/json",
    },
  })

  return handleResponse<IdeaListResponse>(response).then(data => data)
}

export async function apiProjectsData(data: Record<string, string>|Record<string, any>): Promise<ProjectListResponse> {
  const url = backendUrl(endpoints.API_REQ_PROJECTS+ '?' + new URLSearchParams(data as Record<string, string>).toString())

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers: {
      'Content': "application/json",
    },
  })

  return handleResponse<ProjectListResponse>(response).then(data => data)
}

export async function apiPlansData(data: Record<string, string>): Promise<PlanListResponse> {
  const url = backendUrl(endpoints.API_REQ_PLANS + '?' + new URLSearchParams(data as Record<string, string>).toString())

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers: {
      'Content': "application/json",
    },
  })

  return handleResponse<PlanListResponse>(response).then(data => data)
}

export async function apiIdeasFilter(data: Record<string, string>): Promise<FilterResponse> {
  const url = backendUrl(endpoints.API_REQ_FILTER_IDEAS + '?' + new URLSearchParams(data as Record<string, string>).toString())

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers: {
      'Content': "application/json",
    },
  })

  return handleResponse<FilterResponse>(response).then(data => data)
}

export async function apiVoteablePlansData(data: Record<string, string>): Promise<PlanListResponse> {
  const token = (await getToken())?.value

  const url = backendUrl(endpoints.API_REQ_VOTE_LIST + '?' + new URLSearchParams(data as Record<string, string>).toString())

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers[ "Authorization" ] = `Bearer ${token}`
  }

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers,
  })

  return handleResponse<PlanListResponse>(response).then(data => data)
}

export async function apiProjectsFilter(data: Record<string, string>): Promise<FilterResponse> {
  const url = backendUrl(endpoints.API_REQ_FILTER_PROJECTS+ '?' + new URLSearchParams(data as Record<string, string>).toString())

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers: {
      'Content': "application/json",
    },
  })

  return handleResponse<FilterResponse>(response).then(data => data)
}

export async function apiPlansFilter(data: Record<string, string>): Promise<FilterResponse> {
  const url = backendUrl(endpoints.API_REQ_FILTER_PLANS + '?' + new URLSearchParams(data as Record<string, string>).toString())

  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    credentials: "include",
    headers: {
      'Content': "application/json",
    },
  })

  return handleResponse<FilterResponse>(response).then(data => data)
}

export async function apiProfileSaving(hash: string, data: Record<string, string|boolean>): Promise<Record<string, string>> {
  const urlencoded = new URLSearchParams(data as Record<string, string>)

  const url = backendUrl((endpoints.API_REQ_PROFILE_CONFIRMATION || '').toString().replace(':hash', hash))

  const response = await fetch(url, {
    cache: "no-store",
    method: "POST",
    credentials: "include",
    headers: {
      'Content': "application/json",
      'Content-Type': "application/x-www-form-urlencoded",
    },
    body: urlencoded,
  })

  return handleResponse<any>(response).then(data => data)
}

export async function apiResetPasswordChange(data: Record<string, string>): Promise<MessageResponse> {
  const urlencoded = new URLSearchParams(data)

  const url = backendUrl(endpoints.API_REQ_PROFILE_RESET_PASSWORD)

  const response = await fetch(url, {
    cache: "no-store",
    method: "POST",
    credentials: "include",
    headers: {
      'Content': "application/json",
      'Content-Type': "application/x-www-form-urlencoded",
    },
    body: urlencoded,
  })

  return handleResponse<MessageResponse>(response).then(data => data)
}
