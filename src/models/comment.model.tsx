import { ISubmitter } from "@/models/submitter.model"

export type IComment = {
  id: number
  submitter: ISubmitter
  idea: null
  content: string
  parentComment: IComment|null
  createdAt: string
}
