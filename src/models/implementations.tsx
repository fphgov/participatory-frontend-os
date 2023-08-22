import { IMedia } from "./media.model"
import { IProject } from "./project.model"
import { ISubmitter } from "./submitter.model"

export type IImplementation = {
  id: number
  content: string
  createdAt: string
  submitter: ISubmitter
  project?: IProject
  medias: IMedia[]
  parentImplementation?: IImplementation
}
