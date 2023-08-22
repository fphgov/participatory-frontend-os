import { IFeaturedImage } from "@/models/common.model"

export type IArticleCategory = {
  id: number
  code: string
  name: string
}

export type IArticleStatus = {
  id: number
  code: string
  name: string
}

export type IArticle = {
  id: number
  slug: string
  title: string
  description: string
  content: string
  category: IArticleCategory
  status: IArticleStatus
  featuredImage: IFeaturedImage
  createdAt: string
}
