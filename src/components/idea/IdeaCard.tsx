import { ITag } from "@/models/tag.model"
import Link from "next/link"
import CategoryIcon from "@/components/idea/CategoryIcon"
import { IIdea } from "@/models/idea.model"
import { IProject } from "@/models/project.model"

type IdeaCardProps = {
  idea: IIdea|IProject
  ideaPreLink: string
  tags?: ITag[],
  handleClick?: () => void|undefined
  showStatus?: boolean
  tagClick?: (tag: ITag) => {}|undefined
}

export default function IdeaCard({ idea, ideaPreLink, tags, handleClick, showStatus = true, tagClick = undefined }: IdeaCardProps): JSX.Element|null {
  if (idea == null) {
    return null
  }

  const themeName = idea?.campaign_theme?.name || ''
  const shortDescription = idea.description
  const statusCode = idea.status.code.toLowerCase()

  return (
    <div className="prop-wrapper">
      <div className={`prop-inner prop-status-${statusCode}`}>
        <div className="prop-content-wrapper">
          <div className="prop-content">
            <div className="prop-category">
              <div className="prop-theme"><CategoryIcon name={themeName} color="blue" />{themeName}</div>
            </div>

            {tags && tagClick ? <>
              <div className="prop-tags-wrapper">
                <div className="prop-tags">{tags.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i).map((tag, i) => {
                  return (
                    <div key={i} className="filter-tag bg-transition" onClick={() => tagClick(tag)}>#{tag.name}</div>
                  )
                })}</div>
              </div>
            </> : null}

            <h2 className="prop-title">
              <Link href={`${ideaPreLink}/${idea.id}`}>{idea.title}</Link>
            </h2>

            <div className="prop-description">{shortDescription}</div>
            { showStatus ? <div className="prop-build">{idea.status?.title}</div> : null }
          </div>

          <hr />

          <footer className="post-card-meta">
            <div></div>
            <div className="post-more-wrapper">
              <Link href={`${ideaPreLink}/${idea.id}`} className="btn post-more" onClick={handleClick}>Bővebben</Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
