import React from "react"
import { Link } from 'react-router-dom'

export default function ListElement({ name, object }) {
  return (
    <div className="col-md-12">
      <div className={`${name}s-wrapper`}>
        <div className={`${name}s-inner`}>
          <div className="article-content">
            <Link to={`/${name}s/${object.id}`} className="article-flex">
              <div className="article-category" title={`${object.campaign_theme.name} ${object.campaign_theme.title}`} style={{ backgroundColor: object.campaign_theme.rgb }}></div>

              <div role="alert" aria-label={`Azonosító: ${object.id}`} className="article-title">
                {object.id} | {object.title}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
