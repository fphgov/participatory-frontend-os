import React, { useContext } from "react"
import {
  Link,
} from "react-router-dom"
import StoreContext from '../../StoreContext'
import PopUp from '../assets/PopUp'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF } from "@fortawesome/free-brands-svg-icons"
import { faMapMarkerAlt, faFilePdf } from "@fortawesome/free-solid-svg-icons"
import nFormatter from '../assets/nFormatter'
import { getHungarianDateFormat } from '../assets/dateFormats'
import Implementation from '../common/Implementation'
import Gallery from "../common/Gallery"
import { getImages, getDocuments } from '../assets/helperFunctions'

export default function ProjectWrapper({ project, showVoteButton, disableVoteButton, onClickVote, onTipClick }) {
  const context = useContext(StoreContext)
  const isProject = [ 140, 200 ].indexOf(project.workflowState.id) !== -1;

  const theme = project.campaignTheme

  const images = getImages(project.medias)
  const documents = getDocuments(project.medias)

  return (
    <div className="prop-inner-wrapper">
      <div className="prop-inner-header" style={{ backgroundColor: theme.rgb }}>
        {theme.name}
      </div>
      <div className="prop-inner-content" style={{ borderColor: theme.rgb }}>
        <div className="row">
          <div className="col-lg-8">
            <div className="prop-single-wrapper prop-single-body">
              <div className="prop-single-inner">
                <div className="prop-single-content">
                  <div className="prop-location">
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {project.location}
                  </div>

                  <h1 className="prop-single-title" style={{ color: theme.rgb }}>{project.title}</h1>
                  <div className="prop-single-description" dangerouslySetInnerHTML={{ __html: project.description }} />

                  <h3 style={{ color: theme.rgb }}>Mire megoldás?</h3>
                  <div className="prop-single-solution" dangerouslySetInnerHTML={{ __html: project.solution }} />

                  {project.video || (project.medias && project.medias.length > 0) ? (
                    <>
                      <h3 style={{ color: theme.rgb }}>Csatolmány</h3>
                    </>
                  ) : null}

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
                        <Gallery items={images} showThumbnails={true} />
                      </div>
                    </>
                  ) : null}

                  {project.medias && project.medias.length > 0 ? (
                    <>
                      <div className="media-sep">
                        <div className="documents">
                          {documents.length > 0 && documents.map((document, i) => (
                            <a key={i} href={document.original} target="_blank" rel="noopener noreferrer">
                              <div key={i} className="document">
                                <FontAwesomeIcon icon={faFilePdf} />
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="prop-single-wrapper prop-single-sidebar">
              <div className="prop-single-content">
                {showVoteButton ? <>
                  <button className={`btn btn-primary btn-vote ${disableVoteButton ? 'btn-disable' : ''}`} style={{ backgroundColor: theme.rgb }} onClick={onClickVote}>Erre az ötletetre szavazok *</button>
                </> : null}

                <h2>Ötlet</h2>

                {project.voted !== null ? (
                  <div className="prop-single-voted">
                    <div className="prop-info-title">Beérkezett szavazatok</div>
                    <div className="prop-info-content">
                      <b>{project.voted} szavazat</b></div>
                  </div>
                ) : null}

                {project.campaign ? (
                  <div className="prop-single-campaign">
                    <div className="prop-info-title">Kampány</div>
                    <div className="prop-info-content">
                      <b>{project.campaign.title}</b>
                    </div>
                  </div>
                ) : null}

                <div className="prop-single-status">
                  <div className="prop-info-title">Állapot</div>
                  <div className="prop-info-content">
                    <b>{project.workflowState.title}</b>
                  </div>
                </div>

                <div className="prop-single-cost">
                  <div className="prop-info-title">Becsült költség</div>
                  <div className="prop-info-content">
                    {!project.cost ? <b>Nincs becsült költség</b> : <b>{nFormatter(project.cost)}</b>}
                  </div>
                </div>

                <div className="prop-single-ideas">
                  <div className="prop-info-title">Kapcsolódó ötletek</div>
                  <div className="prop-info-content">
                    {project.ideas.length === 0 ? <b>Nincs kapcsolódó ötlet</b> : null}
                    {project.ideas.map((idea, i) => {
                      return (<div className="idea" key={i}>
                        <Link to={`/otletek/${idea}`} style={{ backgroundColor: theme.rgb }}>{idea}</Link>
                      </div>)
                    })}
                  </div>
                </div>

                <div className="prop-single-tags">
                  <div className="prop-info-title">Címkék</div>
                  <div className="prop-info-content">
                    {project.tags.map((tag, i) => {
                      return (<div className="tag" key={i}>
                        <Link to={`/projektek?tag=${tag.id}`} style={{ backgroundColor: theme.rgb }}>#{tag.name}</Link>
                      </div>)
                    })}
                  </div>
                </div>

                {project.submitter ? (
                  <div className="prop-single-wrapper">
                    <div className="prop-info-title">Beküldte</div>
                    <div className="prop-single-content">
                      <div className="prop-single-submitter">{project.submitter.lastname} {project.submitter.firstname}</div>
                      <div className="prop-single-submited">{getHungarianDateFormat(new Date(project.createdAt))}</div>
                    </div>
                  </div>
                ) : null}

                {showVoteButton ? <>
                  <div className="tipp">* A szavazat akkor érvényes, ha a felső, kék sávban található <div onClick={() => { context.set('rk_modal_open', true); onTipClick() }} style={{ textDecoration: 'underline', display: 'inline', cursor: 'pointer' }}>Szavazás</div> menüpontban mindhárom kategóriából választottál egy-egy ötletet, és azokat a beküldés gombbal beküldted.</div>
                </> : null}

                <div className="prop-single-share">
                  <div className="prop-info-title">Megosztás</div>
                  <div className="prop-info-content">
                    <PopUp url={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} title="Megosztom az ötletet Facebookon">
                      <span className="fa-layers fa-lg">
                        <FontAwesomeIcon icon={faFacebookF} size='xs' style={{ marginLeft: 10 }} />
                      </span>
                    </PopUp>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {project.implementations && project.implementations.length > 0 ? <>
          <div className="prop-single-history" style={{ borderColor: theme.rgb }}>
            <div className="prop-single-inner">
              <div className="prop-single-content">
                <h3 style={{ color: theme.rgb }}>
                  {isProject ? 'Hol tartunk a megvalósítással?' : 'Hivatal visszajelzése'}
                </h3>

                <Implementation implementations={project.implementations} />
              </div>
            </div>
          </div>
        </> : null}

      </div>
    </div>
  )
}
