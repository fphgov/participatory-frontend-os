import { ITag } from "@/models/tag.model"
import IdeaCard from "@/components/idea/IdeaCard"
import { IIdea } from "@/models/idea.model"
import { IPlan } from "@/models/plan.model"
import { IProject } from "@/models/project.model"

type IdeasWrapperProps = {
  idea: IIdea|IProject|IPlan
  ideaPreLink: string
  tags?: ITag[],
  handleClick?: () => void|undefined
  showStatus?: boolean
  tagClick?: (tag: ITag) => {}|undefined
  className?: string|null
}

export default function IdeasWrapper({ idea, ideaPreLink, tags, handleClick, className = null, showStatus = true, tagClick = undefined }: IdeasWrapperProps): JSX.Element {
  return (
    <div className={`${className ? className : 'col-sm-12 col-sm-12 col-md-6 col-lg-6 col-xl-4'}`}>
      <IdeaCard idea={idea} ideaPreLink={ideaPreLink} tags={tags} handleClick={handleClick} showStatus={showStatus} tagClick={tagClick} />
    </div>
  )
}
