import React from "react"
import { getHungarianDateFormat } from '../assets/dateFormats'

export default function Implementation({ implementations }) {
  return (
    <div className="implementation-wrapper">
      {implementations && implementations.filter((c) => c.parentImplementation == null).map((implementation, key) => (
        <div key={key} className="implementation-item">
          <div className="implementation-heading">
            <div className="implementation-info">
              <span className="implementation-time">{getHungarianDateFormat(new Date(implementation.createdAt))}</span>
            </div>
          </div>

          <div className="implementation-body">
            {implementation.content}
          </div>
        </div>
      ))}
    </div>
  )
}
