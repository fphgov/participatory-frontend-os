import React from "react"
import { Link } from 'react-router-dom'
import { getHungarianDateFormat } from '../assets/dateFormats'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons"

export default function PostListElement({ name, object }) {
  return (
    <div className="col-md-12">
      <div className={`${name}s-wrapper`}>
        <div className={`${name}s-inner`}>
          <div className="article-content">
            <Link to={`/${name}s/${object.id}`} className="article-flex">
              <div role="alert" aria-label={`Azonosító: ${object.id}`} className="article-title">
                <div className="article-row-content">
                  <div className="article-row-title">{object.title}</div>
                  <div className="article-row-category">Kategória: {object.category.name} | Létrehozva: {getHungarianDateFormat(object.createdAt)}</div>
                </div>

                <div className="article-status-icon">{object.status.code === 'publish' ? <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#18e718' }} title="Publikálva" /> : <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red' }} title="Elrejtve" />}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
