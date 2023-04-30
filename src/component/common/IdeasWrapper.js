import React from "react"
import IdeaCard from './IdeaCard'

export default function IdeasWrapper({ idea, ideaPreLink, tags, handleClick, className = null, showStatus = true, tagClick = null }) {
  return (
    <div className={`${className ? className : 'col-sm-12 col-sm-12 col-md-6 col-lg-6 col-xl-4'}`}>
      <IdeaCard idea={idea} ideaPreLink={ideaPreLink} tags={tags} handleClick={handleClick} showStatus={showStatus} tagClick={tagClick} />
    </div>
  )
}
