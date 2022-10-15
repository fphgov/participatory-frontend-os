import React from "react"

export default function TimeLineItem({ icon, date, description }) {
  return (
    <div className="timeline-item">
      <div className="timeline-image">
        <img src={icon} />
      </div>

      <div className="timeline-date">{date}</div>
      <div className="timeline-description">{description}</div>
    </div>
  )
}
