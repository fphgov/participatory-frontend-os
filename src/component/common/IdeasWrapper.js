import React from "react"
import IdeaCard from './IdeaCard'

export default function IdeasWrapper({ idea, tags, handleClick, isBuilding = false, tagClick = null }) {
  return (
    <div className="col-sm-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
      <IdeaCard idea={idea} tags={tags} handleClick={handleClick} isBuilding={isBuilding} tagClick={tagClick} />
    </div>
  )
}
