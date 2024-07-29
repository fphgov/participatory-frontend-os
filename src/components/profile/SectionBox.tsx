import React from "react";

type SectionBoxProps = {
  children: React.ReactNode
  footer?: React.ReactNode
}

export default function SectionBox({ children, footer }: SectionBoxProps): JSX.Element {
  return (
    <div className="section section-block">
      <div className="section-content">
        {children}
      </div>

      {footer ? footer : null}
    </div>
  )
}
