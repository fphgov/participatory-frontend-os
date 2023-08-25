"use server"

import { redirect } from 'next/navigation'
import { saveToken, getToken } from "@/lib/actions"
import {
  ArticleListResponse,
  ArticleResponse,
  FilterResponse,
  IdeaListResponse,
  IdeaResponse,
  PageResponse,
  PlanListResponse,
  PlanResponse,
  MessageResponse,
  ProjectListResponse,
  ProjectResponse,
  UserLoginResponse,
  UserResponse
} from "@/lib/types"
import { IUser } from "@/models/user.model"
import { IIdea } from '@/models/idea.model'
import { IProject } from "@/models/project.model"
import { IArticle } from "@/models/article.model"
import { IPage } from "@/models/page.model"
import { IPlan } from '@/models/plan.model'
import endpoints from '@/lib/endpoints'

type ApiLoginUserProps = {
  email: string
  password: string
  recaptchaToken: string
}

const isObject = (obj: any): boolean => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

const backendUrl = (url: string|undefined): string => `${process.env.BACKEND_URL}/app${url}`

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("Content-Type") || ""
  const isJson = contentType.includes("application/json") || contentType.includes("application/hal+json")
  const data = isJson ? await response.json() : await response.text()

  if (response.status === 403) {
    throw new Error('Google reCapcha ellenőrzés sikertelen')
  }

  if (!response.ok) {
    if (isJson && isObject(data.errors)) {
      throw new Error(JSON.stringify(data.errors))
    }

    if (response.statusText === "Unauthorized") {
      redirect('/bejelentkezes')
    }

    throw new Error(data.message || response.statusText)
  }

  return data as T
}

export async function apiLoginUser(credentials: ApiLoginUserProps): Promise<string> {
  var urlencoded = new URLSearchParams()

  urlencoded.append("email", credentials.email)
  urlencoded.append("password", credentials.password)
  urlencoded.append("g-recaptcha-response", credentials.recaptchaToken)

  const url = backendUrl(endpoints.API_REQ_LOGIN)

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      'Content': "application/json",
      'Content-Type': "application/x-www-form-urlencoded",
    },
    body: urlencoded,
  })

  const { token } = await handleResponse<UserLoginResponse>(response)

  if (token) {
    saveToken(token)
  }

  return token
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
    method: "GET",
    credentials: "include",
    headers,
  })

  return handleResponse<UserResponse>(response).then(data => data.data)
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
    method: "GET",
    credentials: "include",
    headers,
  })

  return handleResponse<IdeaListResponse>(response).then(data => data._embedded.ideas)
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

  var urlencoded = new URLSearchParams()

  urlencoded.append("password", credentials.password)
  urlencoded.append("password_again", credentials.password_again)

  const url = backendUrl(endpoints.API_REQ_PASSWORD)

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers,
    body: urlencoded,
  })

  return handleResponse<MessageResponse>(response).then(data => data)
}

export async function apiRegistration(data: Record<string, string>): Promise<Record<string, string>> {
  var urlencoded = new URLSearchParams(data as Record<string, string>)

  const url = backendUrl(endpoints.API_REQ_REGISTRATION)

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      'Content': "application/json",
      'Content-Type': "application/x-www-form-urlencoded",
    },
    body: urlencoded,
  })

  return await handleResponse<any>(response).then(data => data)
}

export async function apiLostPassword(data: Record<string, string>): Promise<Record<string, string>> {
  var urlencoded = new URLSearchParams(data as Record<string, string>)

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

  return await handleResponse<any>(response).then(data => data)
}

export async function apiArticlesData(data: Record<string, string>|Record<string, any>): Promise<IArticle[]> {
  const url = backendUrl(endpoints.API_REQ_POSTS + '?' + new URLSearchParams(data as Record<string, string>).toString())

  const response = await fetch(url, {
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
    method: "GET",
    credentials: "include",
    headers: {
      'Content': "application/json",
    },
  })

  return handleResponse<PlanResponse>(response).then(data => data)
}

export async function apiProfileActivate(hash: string): Promise<string> {
  const url = backendUrl((endpoints.API_REQ_PROFILE_ACTIVATE || '').toString().replace(':hash', hash))

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      'Content': "application/json",
    },
  })

  return handleResponse<MessageResponse>(response).then(data => data.message)
}

export async function apiIdeasData(data: Record<string, string>): Promise<IdeaListResponse> {
  const url = backendUrl(endpoints.API_REQ_IDEAS + '?' + new URLSearchParams(data as Record<string, string>).toString())

  const response = await fetch(url, {
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
    method: "GET",
    credentials: "include",
    headers: {
      'Content': "application/json",
    },
  })

  return handleResponse<FilterResponse>(response).then(data => data)
}

export async function apiVoteablePlansData(data: Record<string, string>): Promise<PlanListResponse> {
  const url = backendUrl(endpoints.API_REQ_VOTE_LIST + '?' + new URLSearchParams(data as Record<string, string>).toString())

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      'Content': "application/json",
    },
  })

  return handleResponse<PlanListResponse>(response).then(data => data)
}

export async function apiProjectsFilter(data: Record<string, string>): Promise<FilterResponse> {
  const url = backendUrl(endpoints.API_REQ_FILTER_PROJECTS+ '?' + new URLSearchParams(data as Record<string, string>).toString())

  const response = await fetch(url, {
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
    method: "GET",
    credentials: "include",
    headers: {
      'Content': "application/json",
    },
  })

  return handleResponse<FilterResponse>(response).then(data => data)
}

export async function apiProfileSaving(hash: string, data: Record<string, string|boolean>): Promise<Record<string, string>> {
  var urlencoded = new URLSearchParams(data as Record<string, string>)

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

  return await handleResponse<any>(response).then(data => data)
}

// export async function apiVoteList(data: Record<string, string>): Promise<VoteListResponse|IssueResponse> {
//   const url = backendUrl(endpoints.API_REQ_VOTE_LIST + '?' + new URLSearchParams(data).toString())

//   const response = await fetch(url, {
//     method: "GET",
//     credentials: "include",
//     headers: {
//       'Content': "application/json",
//     },
//   })

//   return handleResponse<VoteListResponse|IssueResponse>(response).then(data => data)
// }
