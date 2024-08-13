import React from "react"
import VoteSearchInput from "@/components/vote/VoteSearchInput"
import HeroTags from "@/components/idea/HeroTags"
import VoteLocationFilter from '@/components/vote/VoteLocationFilter'

type VoteSearchProps = {
  title: string
  baseUrl: string
  ready?: boolean
  searchParams: Record<string, string>
  availableMap: boolean
  enableMapList: boolean
  switchListMode: () => void
  listMode: string
}

export default function VoteSearch({ title, baseUrl, searchParams, ready = false, availableMap, enableMapList, switchListMode, listMode }: VoteSearchProps): JSX.Element {
  const theme = searchParams?.theme

  const tags = [
    { id: 175, name: '#hulladék / köztisztaság / wc' },
    { id: 173, name: '#közlekedés' },
    { id: 176, name: '#kultúra / közösség / sport' },
    { id: 177, name: '#szociális gondoskodás' },
    { id: 178, name: '#zöldítés / parkok / utcabútorok' }
  ]

  const voteStatus = (
    <>
      <div className="vote-status"></div>
      <div className="vote-title">Ebben a kategóriában nincs már több szavazatod</div>
    </>
  );

  return (
    <div className="vote-search-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-xl-12">
            <div className="vote-search-title">
              {ready ? voteStatus : null}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="vote-search-tags">
              <HeroTags tags={tags} baseUrl={baseUrl} searchParams={searchParams} />
            </div>
          </div>
          <div className="col-6">
            {
              availableMap && enableMapList ?
              <div className="change_list_view">
                <span onClick={() => { switchListMode() }}>{listMode === 'map' ? 'Lista nézet' : 'Térkép nézet'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                  <path d="M5 16V3H0V0H13V3H8V16H5ZM14 16V8H11V5H20V8H17V16H14Z" fill="#12326E"/>
                </svg>
              </div> : null
            }
          </div>
        </div>

      </div>
    </div>
  )
}
