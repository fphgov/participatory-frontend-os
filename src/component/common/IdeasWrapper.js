import React, { useMemo } from "react"
import {
  Link,
} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComments } from "@fortawesome/free-solid-svg-icons"
import GREEN from '../../img/zold_budapest_white_category.svg'
import CARE from '../../img/eselyteremto_budapest_white_category.svg'
import OPEN from '../../img/nyitott_budapest_white_category.svg'

export default function IdeasWrapper({ idea, handleClick }) {
  const themeColor = idea.campaign_theme.rgb
  const themeCode = idea.campaign_theme.code
  const themeName = idea.campaign_theme.name
  const themeTitle = idea.campaign_theme.title
  const shortDescription = idea.description
  const statusId = idea.status.id - 0
  const statusCode = idea.status.code.toLowerCase()
  const status = idea.status.title
  const submitter = idea.submitter

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

  const isActiveStatus = (id) => {
    return id <= 200
  }

  const isActive = useMemo(() => isActiveStatus(statusId), [statusId])

  return (
    <div className="col-sm-12 col-md-6 col-lg-4">
      <div className="prop-wrapper">
        <div className={`prop-inner prop-status-${statusCode} prop-state-${isActive ? 'active' : 'inactive'}`}>
          <div className="prop-picture">
            {getThemeLogo()}
            <div className="prop-campaign-inner" style={{ backgroundColor: themeColor }}>{themeName} <span>({themeTitle})</span></div>
          </div>
          <div className="prop-category" style={{ backgroundColor: themeColor }}>
            <div className="prop-status"><FontAwesomeIcon icon={faComments} mask={['far']} /> {status}</div>
          </div>
          <div className="prop-content-wrapper">
            <div className="prop-content">
              <h2 className="prop-title">
                <Link to={`/otletek/${idea.id}`}>{idea.title}</Link>
              </h2>
              <div className="prop-description">{shortDescription}</div>
            </div>

            <div className="prop-line"></div>

            <div className="prop-more">
              <div className="btn-wrapper">
                <Link to={`/otletek/${idea.id}`} className="btn btn-secondary" onClick={handleClick}>Megtekintés</Link>
              </div>
            </div>

            <div className="prop-footer">
              <div className="prop-submitter">
                <div className="prop-submitter-label">Beküldő</div>
                <div className="prop-submitter-name">{submitter}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
