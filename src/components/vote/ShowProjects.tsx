"use client"

import { FC, useEffect, useState } from "react"
import { Suspense } from 'react'
import IdeasWrapper from "@/components/idea/IdeasWrapper"
import dynamic from "next/dynamic"
import VoteButtonCard from "@/components/vote/VoteButtonCard"
import {categoryResolver} from "@/utilities/categoryResolver";
import VoteSearch from "@/components/vote/VoteSearch";

type ShowProjectsProps = {
  projectList: any
  enableMapList: boolean
  token: any
  noVotesLeft: boolean
  title: string
  baseUrl: string
  searchParams: Record<string, string>
}

const ShowProjects: FC<ShowProjectsProps> = ({
  projectList,
  enableMapList,
  token,
  noVotesLeft,
  title,
  baseUrl,
  searchParams,
}) => {
  const [availableMap, setAvailableMap] = useState(false)
  const [listMode, setListMode] = useState('map')
  const Map = dynamic(() => import('../../components/map/Map'), {
    loading: () => <p>A térkép töltődik...</p>,
    ssr: false,
  })

  const switchListMode = () => {
    if (availableMap) {
      const mode = listMode === 'map' ? 'list' : 'map'

      localStorage.setItem('list_mode', mode)

      setListMode(mode)
    }
  }

  useEffect(() => {
    if (window && window.Modernizr?.webgl) {
      setAvailableMap(true)
    }

    if (localStorage.getItem('list_mode')) {
      setListMode(localStorage.getItem('list_mode') || 'map')
    }
  }, [])

  return (
    <>
      <Suspense fallback={null}>
        <VoteSearch
          title={title}
          searchParams={searchParams}
          baseUrl={baseUrl}
          ready={noVotesLeft}
          availableMap={availableMap}
          enableMapList={enableMapList}
          switchListMode={switchListMode}
          listMode={listMode}
        />
        {
          availableMap && enableMapList && listMode === 'map' ?
            <div className="map-wrapper">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <Map projectList={projectList} token={token} />
                  </div>
                </div>
              </div>
            </div>
          :
            <div className="list-wrapper">
              <div className="container">
                <div className="row">
                  {projectList?._embedded?.projects.map((project: any, i: number) => <IdeasWrapper
                    className={`col-sm-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 ${project.voted ? 'voted' : ''}`}
                    ideaPreLink="/projektek"
                    key={i}
                    idea={project}
                    showStatus={false}
                    showVoted={false}
                    showDescription={false}
                    extraButton={
                      <VoteButtonCard
                        showVoteButton={!project.voted && !noVotesLeft}
                        disableVoteButton={false}
                        errorVoteable={""}
                        token={token}
                        projectId={project.id}
                      />
                    }
                    footerExtend={
                      project.voted ? <div className="prop-build">Már szavaztál erre az ötletre</div> : null
                    }
                  />)}

                  <div className="col-md-12">
                    {projectList?._embedded?.projects && projectList?._embedded?.projects.length === 0 ?
                      <p>Nincs találat a megadott feltételek alapján, próbálj meg más kategóriában vagy kevesebb/más
                        feltétel szerint szűrni.</p> : ''}
                  </div>
                </div>
              </div>
            </div>
        }
      </Suspense>
    </>
  )
}

export default ShowProjects
