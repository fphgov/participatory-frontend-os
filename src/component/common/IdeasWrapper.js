import React, { useState } from "react"
import {
  Link,
} from "react-router-dom"

export default function IdeasWrapper({ idea, handleClick }) {
  const [isHover, setIsHover] = useState(false)

  const themeColor = idea.campaign_theme.rgb
  const themeName = idea.campaign_theme.name
  const shortDescription = idea.description

  return (
    <div className="col-sm-12 col-md-6 col-lg-4">
      <div className="prop-wrapper">
        <div className="prop-inner">
          <div className="prop-picture"></div>
          <div className="prop-category" style={{ backgroundColor: themeColor }}>{themeName}</div>
          <div className="prop-content-wrapper" style={{ borderColor: themeColor }}>
            <div className="prop-content">
              <div className="prop-title">
                <Link to={`/otletek/${idea.id}`}>{idea.title}</Link>
              </div>
              <div className="prop-line" style={{ backgroundColor: themeColor }}></div>
              <div className="prop-description">{shortDescription}</div>
            </div>

            <div className="prop-more" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
              <div className="btn-wrapper">
                <Link to={`/otletek/${idea.id}`} className="btn btn-secondary" onClick={handleClick} style={{ borderColor: themeColor, color: isHover ? '#fff' : themeColor, backgroundColor: isHover ? themeColor : 'transparent' }}>Megtekintés</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
