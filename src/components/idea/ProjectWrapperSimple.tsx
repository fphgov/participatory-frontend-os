import Link from "next/link"
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IProject } from "@/models/project.model"
import { getDocuments, getImages } from "@/utilities/helperFunctions"
import CategoryIcon from "@/components/idea/CategoryIcon"
import ShareInfo from "@/components/common/ShareInfo"
import Implementation from "@/components/idea/Implementation"
import VoteButton from "@/components/vote/VoteButton"
import Gallery from "@/components/common/Gallery"
import IdeaRelationTipp from "@/components/idea/IdeaRelationTipp"
import nFormatter from "@/utilities/nFormatter"
import { IVoteStatus } from "@/models/voteableProject.model"
import {generateRandomValue} from "@/utilities/generateRandomValue";

type IdeasWrapperProps = {
  project: IProject
  voteable: boolean
  disableVoteButton: boolean
  disableRelatedIdeas?: boolean
  errorVoteable: string
  token: string|null
  backHref?: string
  voteStatus: IVoteStatus
}

export default function ProjectWrapperSimple({
  project,
  voteable,
  token,
  errorVoteable,
  disableVoteButton,
  backHref,
  disableRelatedIdeas = false,
  voteStatus
}: IdeasWrapperProps): JSX.Element {
  const rand = generateRandomValue().toString()
  const theme = project?.campaignTheme

  const isProject = [140, 200].indexOf(project?.workflowState?.id) !== -1

  const images = project.medias ? getImages(project.medias) : []
  const documents = project.medias ? getDocuments(project.medias) : []

  return (
    <div className="prop-inner-wrapper">
      <div className={`prop-inner-content${voteable ? ' voteable' : ''}`}>
        <div className="row">
          <div className="offset-xl-1 offset-lg-1 col-xl-7 col-lg-7">
            <div className="prop-single-wrapper prop-single-body">
              <div className="prop-single-inner">
                <div className="prop-single-content">
                  {project.location ? <>
                    <div className="prop-single-section">
                      <h3>Helyszín</h3>

                      <div className="prop-single-location-description" dangerouslySetInnerHTML={{ __html: project.location }} />
                    </div>
                  </> : null}

                  {project.description ? <>
                    <div className="prop-single-section">
                      <h3>Leírás</h3>

                      <div className="prop-single-description" dangerouslySetInnerHTML={{ __html: project.description }} />
                    </div>
                  </> : null}

                  {project.solution ? <>
                    <div className="prop-single-section">
                      <h3>Mire megoldás?</h3>

                      <div className="prop-single-solution" dangerouslySetInnerHTML={{ __html: project.solution }} />
                    </div>
                  </> : null}

                  {project.video || (project.medias && project.medias.length > 0) ? (<>
                    <div className="prop-single-section">
                      <h3>Feltöltött képek, dokumentumok</h3>

                      {project.video ? (
                        <>
                          <div className="media-sep">
                            <div className="prop-single-video" dangerouslySetInnerHTML={{ __html: `<iframe width="100%" height="315" src="${project.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` }} />
                          </div>
                        </>
                      ) : null}

                      {project.medias && project.medias.length > 0 ? (
                        <>
                          <div className="media-sep">
                            {images && images.length > 0 ? <Gallery items={images} showThumbnails={true} /> : null}
                          </div>
                        </>
                      ) : null}

                      {project.medias && project.medias.length > 0 ? (
                        <>
                          <div className="media-sep">
                            <div className="documents">
                              {documents && documents.length > 0 ? documents.map((document, i) => (
                                <a key={i} href={document.original} target="_blank" rel="noopener noreferrer">
                                  <div key={i} className="document">
                                    <FontAwesomeIcon icon={faFilePdf} />
                                  </div>
                                </a>
                              )) : null}
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </>) : null}
                </div>
              </div>

              {project.implementations && project.implementations.length > 0 ? <>
                <div className={`prop-single-history ${isProject ? 'prop-single-history-project' : 'prop-single-history-idea'}`}>
                  <div className="prop-single-inner">
                    <div className="prop-single-content">
                      <h3>
                        {isProject ? 'Hol tartunk a megvalósítással?' : 'Hivatal visszajelzése'}
                      </h3>

                      <Implementation implementations={project.implementations} />
                    </div>
                  </div>
                </div>
              </> : null}
            </div>
          </div>

          <div className="col-xl-3 col-lg-4">
            <div className="prop-single-wrapper prop-single-sidebar">
              <div className="prop-single-content">
                {theme?.name ? (
                  <div className="prop-single-side-section prop-single-elem">
                    <div className="prop-info-title">Kategória</div>
                    <div className="prop-info-content">
                      <div className="prop-category">
                        <div className="prop-theme">
                          <Link href={`${backHref ? backHref : `/projektek/?theme=${theme.code}`}`}><CategoryIcon name={theme.name} color="blue" />{theme.name}</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {project?.tags ? (
                  <div className="prop-single-side-section prop-single-elem">
                    <div className="prop-info-title">Címkék</div>
                    <div className="prop-info-content">
                      {project.tags.map((tag, i) => {
                        return (<div className="tag" key={i}>
                          {backHref ? <Link href={`${backHref}&tag=${tag.id}`}>#{tag.name}</Link> : <Link href={`/projektek?tag=${tag.id}`}>#{tag.name}</Link>}
                        </div>)
                      })}
                    </div>
                  </div>
                ) : null}

                <div className="prop-single-side-section prop-single-cost">
                  <div className="prop-info-title">Tervezett költség</div>
                  <div className="prop-info-content">
                    {!project.cost ? <>Nincs tervezett költség</> : <>{nFormatter(project.cost)}</>}
                  </div>
                </div>

                {! disableRelatedIdeas ? <div className="prop-single-side-section prop-single-ideas">
                  <div className="prop-info-title">Kapcsolódó ötletek <IdeaRelationTipp /></div>
                  <div className="prop-info-content">
                    {project.ideas.length === 0 ? <>Nincs kapcsolódó ötlet</> : null}
                    {project.ideas.map((idea, i) => {
                      return (<div className="idea" key={i}>
                        <Link href={`/otletek/${idea}`}>{idea}</Link>
                      </div>)
                    })}
                  </div>
                </div> : null}
              </div>
            </div>

            <ShareInfo type="simple" />

            <VoteButton
              style="background"
              voteStatus={voteStatus}
              showVoteButton={voteable}
              disableVoteButton={disableVoteButton}
              projectId={project.id}
              token={token}
              errorVoteable={errorVoteable}
              theme={project?.campaignTheme?.code ?? ''}
              rand={rand}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
