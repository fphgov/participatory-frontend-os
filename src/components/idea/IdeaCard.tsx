import { ITag } from "@/models/tag.model"
import Link from "next/link"
import CategoryIcon from "@/components/idea/CategoryIcon"
import { IIdea } from "@/models/idea.model"
import { IProject } from "@/models/project.model"
import { IPlan } from "@/models/plan.model"
import VoteCounter from "@/components/vote/VoteCounter"

type IdeaCardProps = {
  idea: IIdea|IProject|IPlan
  ideaPreLink: string
  tags?: ITag[],
  handleClick?: () => void|undefined
  extraButton?: React.ReactNode
  footerExtend?: React.ReactNode
  autoHeight?: boolean
  showStatus?: boolean
  showVoted?: boolean
  showCampaign?: boolean
  showMore?: boolean
  showDescription?: boolean
  tagClick?: (tag: ITag) => {}|undefined
}

export default function IdeaCard({
  idea,
  ideaPreLink,
  tags,
  handleClick,
  extraButton = false,
  footerExtend = false,
  autoHeight = false,
  showStatus = true,
  showVoted = false,
  showCampaign = false,
  showMore = true,
  showDescription = true,
  tagClick = undefined,
}: IdeaCardProps): JSX.Element|null {
  if (idea == null) {
    return null
  }

  const themeName = idea?.campaign_theme?.name || idea?.campaignTheme?.name || ''
  const shortDescription = idea.description
  const statusCode = idea?.status?.code?.toLowerCase()

  return (
    <div className={`prop-wrapper ${autoHeight ? 'prop-wrapper-auto' : ''}`}>
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

            {showDescription ? <div className="prop-description">{shortDescription}</div> : null}
          </div>

          {showMore ?
            <>
              {/* <hr /> */}

              {footerExtend ? footerExtend : null}

              <footer className="post-card-meta">
                {showVoted && idea?.voted !== null || showCampaign || showStatus ? <>
                  <div>
                    {showVoted && idea?.voted !== null ? <VoteCounter count={idea?.voted || 0} /> : null}
                    {showCampaign ? <span className="campaign-name">{idea?.campaign?.shortTitle}</span> : null}
                    {showStatus ? <div className="prop-build">{idea.status?.title}</div> : null}
                  </div>
                </> : null}

                <div className="post-more-wrapper">
                  {extraButton ? extraButton : null}
                  <Link href={`${ideaPreLink}/${idea.id}`} className="btn post-more post-more-outline" onClick={handleClick}>Megnézem</Link>
                </div>
              </footer>

            </> : null}
        </div>
      </div>
    </div>
  )
}
