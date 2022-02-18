import React from "react"
import {
  Link,
} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComments } from "@fortawesome/free-solid-svg-icons"
import GREEN from '../../img/zold_budapest_white_category.svg'
import CARE from '../../img/eselyteremto_budapest_white_category.svg'
import OPEN from '../../img/nyitott_budapest_white_category.svg'

export default function ProjectsWrapper({ project, handleClick, tagClick }) {
  const themeColor = project.campaign_theme.rgb
  const themeCode = project.campaign_theme.code
  const themeName = project.campaign_theme.name
  const themeTitle = project.campaign_theme.title
  const shortDescription = project.description
  const status = project.status.title
  const statusCode = project.status.code.toLowerCase()

  const getThemeLogo = () => {
    let src = GREEN

    if (themeCode === 'OPEN' || themeCode === 'WHOLE') {
      src = OPEN
    } else if (themeCode === 'CARE') {
      src = CARE
    }

    return (
      <img src={src} alt={`${themeName} logó`} />
    )
  }

  return (
    <div className="col-sm-12 col-md-6 col-lg-4">
      <div className="prop-wrapper">
        <div className={`prop-inner prop-status-${statusCode}`}>
          <div className="prop-picture">
            {getThemeLogo()}
            <div className="prop-campaign-inner" style={{ backgroundColor: themeColor }}>{themeName} <span>({themeTitle})</span></div>
          </div>
          <div className="prop-category" style={{ backgroundColor: themeColor }}>
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

              <div className="prop-description">{shortDescription}</div>
            </div>

            <div className="prop-more">
              <div className="btn-wrapper">
                <Link to={`/projektek/${project.id}`} className="btn btn-secondary" onClick={handleClick}>Megtekintés</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
