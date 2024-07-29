import React from "react";

type SectionBoxDetailsProps = {
  children: React.ReactNode
  footer?: React.ReactNode
  summary?: React.ReactNode | string
}

export default function SectionBoxDetails({ children, footer, summary }: SectionBoxDetailsProps): JSX.Element {
  return (
    <div className="section section-block section-block-details">
      <details className="section-more-2">
        <summary>
          {summary}
        </summary>

        <div className="section-content">
          {children}
        </div>
      </details>

      {footer ? footer : null}
    </div>
  )
}
