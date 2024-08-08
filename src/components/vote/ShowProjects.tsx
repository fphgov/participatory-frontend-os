"use client"

import {FC, useState} from "react"
import IdeasWrapper from "@/components/idea/IdeasWrapper";
import dynamic from "next/dynamic";
import VoteButtonCard from "@/components/vote/VoteButtonCard";

type ShowProjectsProps = {
  projectList: any
  enableMapList: boolean
  token: any
}

const ShowProjects: FC<ShowProjectsProps> = ({ projectList, enableMapList, token }) => {
  const [showMap, setShowMap] = useState(true)
  const Map = dynamic(() => import('../../components/map/Map'), {
    loading: () => <p>A térkép töltődik...</p>,
    ssr: false,
  });

  return (
    <>
      {
        enableMapList ?
          <div className="change_list_view">
            <span onClick={() => {setShowMap(!showMap)}}>{showMap ? 'Lista nézet' : 'Térkép nézet'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
              <path d="M5 16V3H0V0H13V3H8V16H5ZM14 16V8H11V5H20V8H17V16H14Z" fill="#12326E"/>
            </svg>
          </div> : null
      }
      {
        enableMapList && showMap ?
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
                    <VoteButtonCard showVoteButton={!project.voted} disableVoteButton={false} errorVoteable={""}
                                    token={token} projectId={project.id}/>
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
    </>
  )
}

export default ShowProjects