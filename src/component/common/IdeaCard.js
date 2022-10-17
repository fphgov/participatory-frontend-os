import React from "react"
import {
  Link,
} from "react-router-dom"
import CategoryIcon from './CategoryIcon'

export default function IdeaCard({ idea, ideaPreLink, handleClick = () => {}, tags = null, isBuilding = false, tagClick = null }) {
  if (idea == null) {
    return null
  }

  const themeName = idea.campaign_theme.name
  const shortDescription = idea.description
  const statusCode = idea.status.code.toLowerCase()

  return (
    <div className="prop-wrapper">
      <div className={`prop-inner prop-status-${statusCode}`}>
        <div className="prop-content-wrapper">
          <div className="prop-content">
            {tags && tagClick ? <>
              <div className="prop-tags-wrapper">
                <div className="prop-tags">{tags.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i).map((tag, i) => {
                  return (
                    <div key={i} className="filter-tag bg-transition" onClick={() => tagClick(tag)}>#{tag.name}</div>
                  )
                })}</div>
              </div>
            </> : null}

            <div className="prop-category mobile-only">
              <div className="prop-theme"><CategoryIcon name={themeName} />{themeName}</div>
            </div>

            <h2 className="prop-title">
              <Link to={`${ideaPreLink}/${idea.id}`}>{idea.title}</Link>
            </h2>

            <div className="prop-description">{shortDescription}</div>
            { isBuilding ? <div className="prop-build">Megvalósítás alatt áll</div> : null }
          </div>

          <hr />

          <footer className="post-card-meta">
            <div className="prop-category desktop-only">
              <div className="prop-theme"><CategoryIcon name={themeName} />{themeName}</div>
            </div>

            <div className="post-more-wrapper">
              <Link to={`${ideaPreLink}/${idea.id}`} className="btn post-more" onClick={handleClick}>Megtekintés</Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
