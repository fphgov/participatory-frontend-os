import React from "react"
import HeroTags from "@/components/idea/HeroTags"

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
  const tags = [
    {id: 175, name: '#hulladék / köztisztaság / wc'},
    {id: 173, name: '#közlekedés'},
    {id: 176, name: '#kultúra / közösség / sport'},
    {id: 177, name: '#szociális gondoskodás'},
    {id: 178, name: '#zöldítés / parkok / utcabútorok'}
  ]

  const voteStatus = (
    <>
      <div className="vote-search-title">
        <div className="vote-status"></div>
        <div className="vote-title">Ebben a kategóriában nincs már több szavazatod</div>
      </div>
    </>
  );

  return (
    <div className="vote-search-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-xl-12">
            {ready ? voteStatus : null}
          </div>
        </div>

        <div className="vote-filter-2">
           <div className="vote-search-tags">
              <HeroTags tags={tags} baseUrl={baseUrl} searchParams={searchParams}/>
            </div>

            {availableMap && enableMapList ? <>
              <div className="change-list-view" onClick={() => { switchListMode() }}>
                {listMode === 'map' ? <div className="btn-filter btn-filter-list">Lista nézet</div> : <div className="btn-filter btn-filter-map">Térkép nézet</div>}
              </div>
            </> : null}
        </div>
      </div>
    </div>
  )
}
