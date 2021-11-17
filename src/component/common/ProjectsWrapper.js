import React, { useState } from "react"
import {
  Link,
} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComments } from "@fortawesome/free-solid-svg-icons"

export default function ProjectsWrapper({ project, handleClick, tagClick }) {
  const [isHover, setIsHover] = useState(false)

  const themeColor = project.campaign_theme.rgb
  const themeName = project.campaign_theme.name
  const themeTitle = project.campaign_theme.title
  const shortDescription = project.description
  const status = project.status.title
  const statusCode = project.status.code.toLowerCase()

  return (
    <div className="col-sm-12 col-md-6 col-lg-4">
      <div className="prop-wrapper">
        <div className={`prop-inner prop-status-${statusCode}`}>
          <div className="prop-picture"></div>
          <div className="prop-category" style={{ backgroundColor: themeColor }}>
            <div className="prop-theme">{themeName} <span>({themeTitle})</span></div>
            <div className="prop-status"><FontAwesomeIcon icon={faComments} mask={[ 'far' ]} /> {status}</div>
          </div>
          <div className="prop-content-wrapper" style={{ borderColor: themeColor }}>
            <div className="prop-content">
              <div className="prop-tags-wrapper">
                <div className="prop-tags">{project.tags.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i).map((tag, i) => {
                  return (
                    <div key={i} className="filter-tag bg-transition" style={{ backgroundColor: themeColor }} onClick={() => tagClick(tag)}>#{tag.name}</div>
                  )
                })}</div>
              </div>

              <div className="prop-title">
                <Link to={`/projektek/${project.id}`}>{project.title}</Link>
              </div>

              {/* <div className="prop-line" style={{ backgroundColor: themeColor }}></div> */}
              <div className="prop-description">{shortDescription}</div>
            </div>

            <div className="prop-more" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
              <div className="btn-wrapper">
                <Link to={`/projektek/${project.id}`} className="btn btn-secondary" onClick={handleClick} style={{ borderColor: themeColor, color: isHover ? '#fff' : themeColor, backgroundColor: isHover ? themeColor : 'transparent' }}>Megtekintés</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
