import React from "react"

type VoteSearchProps = {
  title: string
}

export default function VoteSearch({ title }: VoteSearchProps): JSX.Element {
  return (
    <div className="vote-search-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h4>{title}</h4>
          </div>
          <div className="col-lg-6">
            <div className="vote-search-input">
              kereső
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="vote-search-tags">
              Címkék:
            </div>
          </div>
        </div>

        <hr />

      </div>
    </div>
  )
}
