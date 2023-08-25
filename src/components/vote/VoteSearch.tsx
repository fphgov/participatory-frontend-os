import React from "react"
import VoteSearchInput from "@/components/vote/VoteSearchInput"
import HeroTags from "@/components/idea/HeroTags"

type VoteSearchProps = {
  title: string
  baseUrl: string
  searchParams: Record<string, string>
}

export default function VoteSearch({ title, baseUrl, searchParams }: VoteSearchProps): JSX.Element {
  const tags = [
    { id: 175, name: '#hulladék / köztisztaság / wc' },
    { id: 173, name: '#közlekedés' },
    { id: 176, name: '#kultúra / közösség / sport' },
    { id: 177, name: '#szociális gondoskodás' },
    { id: 178, name: '#zöldítés / parkok / utcabútorok' }
  ]

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
              <HeroTags tags={tags} baseUrl={baseUrl} searchParams={searchParams} />
            </div>
          </div>
        </div>

        <hr />

      </div>
    </div>
  )
}
