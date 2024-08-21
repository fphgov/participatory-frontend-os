import React from "react"
import TimeLineItem from "../common/TimeLineItem"

export type TimeLineWrapperProps = {
  title: string
}

export default function TimeLineWrapper({ title }: TimeLineWrapperProps): JSX.Element {
  return (
    <div className="light-section fix-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3>{title}</h3>
          </div>

          <div className="col-md-12">
            <div className="timeline-wrapper">
              <TimeLineItem icon="timeline-icon-1-done.svg" date="2023.11.15. - 2024.01.05." description="Ötletek beküldése" />
              <TimeLineItem icon="timeline-icon-2-done.svg" date="2024. első negyedév" description="Szakmai jóváhagyás" />
              <TimeLineItem icon="timeline-icon-3.svg" date="2024. tavasz" description="Ötletfejlesztés" />
              <TimeLineItem icon="timeline-icon-4.svg" date="2024. ősz" description="Szavazás" />
              <TimeLineItem icon="timeline-icon-5.svg" date="2024. ősztől" description="Megvalósítás" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
