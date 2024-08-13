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

  const listViewButton = (
    <>
      <span>Lista nézet</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
        <path d="M5 16V3H0V0H13V3H8V16H5ZM14 16V8H11V5H20V8H17V16H14Z" fill="#12326E"/>
      </svg>
    </>
  );

  const mapViewButton = (
    <>
      <span>Térkép nézet</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M11.35 17.775L6 15.9L1.35 17.7C1.18333 17.7667 1.02083 17.7875 0.8625 17.7625C0.704167 17.7375 0.558333 17.6833 0.425 17.6C0.291667 17.5167 0.1875 17.4042 0.1125 17.2625C0.0375 17.1208 0 16.9583 0 16.775V2.75C0 2.53333 0.0625 2.34167 0.1875 2.175C0.3125 2.00833 0.483333 1.88333 0.7 1.8L5.35 0.225C5.45 0.191667 5.55417 0.166667 5.6625 0.15C5.77083 0.133333 5.88333 0.125 6 0.125C6.11667 0.125 6.22917 0.133333 6.3375 0.15C6.44583 0.166667 6.55 0.191667 6.65 0.225L12 2.1L16.65 0.3C16.8167 0.233333 16.9792 0.2125 17.1375 0.2375C17.2958 0.2625 17.4417 0.316667 17.575 0.4C17.7083 0.483333 17.8125 0.595833 17.8875 0.7375C17.9625 0.879167 18 1.04167 18 1.225V15.25C18 15.4667 17.9375 15.6583 17.8125 15.825C17.6875 15.9917 17.5167 16.1167 17.3 16.2L12.65 17.775C12.55 17.8083 12.4458 17.8333 12.3375 17.85C12.2292 17.8667 12.1167 17.875 12 17.875C11.8833 17.875 11.7708 17.8667 11.6625 17.85C11.5542 17.8333 11.45 17.8083 11.35 17.775ZM11 15.55V3.85L7 2.45V14.15L11 15.55ZM13 15.55L16 14.55V2.7L13 3.85V15.55ZM2 15.3L5 14.15V2.45L2 3.45V15.3Z"
          fill="#12326E"/>
      </svg>
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

        <div className="row">
          <div className="col-6">
            <div className="vote-search-tags">
              <HeroTags tags={tags} baseUrl={baseUrl} searchParams={searchParams}/>
            </div>
          </div>
          <div className="col-6">
            {
              availableMap && enableMapList ?
                <div className="change_list_view">
                  <span onClick={() => {
                    switchListMode()
                  }}>
                    {listMode === 'map' ? listViewButton : mapViewButton}
                  </span>
                </div> : null
            }
          </div>
        </div>

      </div>
    </div>
  )
}
