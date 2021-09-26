import React, { useState } from "react"
import {
  Link,
} from "react-router-dom"

export default function ProjectsWrapper(props) {
  const [isHover, setIsHover] = useState(false)

  const themeColor = props.project.campaign_theme.rgb
  const themeName = props.project.campaign_theme.name
  const shortDescription = props.project.description

  return (
    <div className="col-sm-12 col-md-6 col-lg-4">
      <div className="prop-wrapper">
        <div className="prop-inner">
          <div className="prop-picture"></div>
          <div className="prop-category" style={{ backgroundColor: themeColor }}>{themeName}</div>
          <div className="prop-content-wrapper" style={{ borderColor: themeColor }}>
            <div className="prop-content">
              <div className="prop-tags-wrapper">
                <div className="prop-tags">{props.project.tags.map((tag, i) => {
                  return (
                    <div key={i} className="filter-tag bg-transition" style={{ backgroundColor: themeColor }} onClick={() => props.tagClick(tag)}>#{tag.name}</div>
                  )
                })}</div>
              </div>

              <div className="prop-title">
                <Link to={`/projektek/${props.project.id}`}>{props.project.title}</Link>
              </div>
              <div className="prop-line" style={{ backgroundColor: themeColor }}></div>
              <div className="prop-description">{shortDescription}</div>
            </div>

            <div className="prop-more" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
              <div className="btn-wrapper">
                <Link to={`/projektek/${props.project.id}`} className="btn btn-secondary" onClick={props.handleClick} style={{ borderColor: themeColor, color: isHover ? '#fff' : themeColor, backgroundColor: isHover ? themeColor : 'transparent' }}>Megtekintés</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
