import React from "react"
import VoteSearchInput from "@/components/vote/VoteSearchInput"

type VoteSearchProps = {
  title: string
  baseUrl: string
  searchParams: Record<string, string>
}

export default function VoteSearch({ title, baseUrl, searchParams }: VoteSearchProps): JSX.Element {
  return (
    <div className="vote-search-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h4>{title}</h4>
          </div>
          <div className="col-lg-6">
            <div className="vote-search-input">
              <VoteSearchInput baseUrl={baseUrl} searchParams={searchParams} />
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
