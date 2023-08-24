import React from "react"

type VoteCategoryFilterProps = {
  children: React.ReactNode
}

export default function VoteCategoryFilter({ children }: VoteCategoryFilterProps): JSX.Element {
  return (
    <div className="vote-filter-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="vote-filter">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
