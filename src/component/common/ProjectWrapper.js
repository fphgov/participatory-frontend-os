import React, { useContext } from "react"
import {
  Link,
} from "react-router-dom"
import StoreContext from '../../StoreContext'
import PopUp from '../assets/PopUp'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
import nFormatter from '../assets/nFormatter'
import { getHungarianDateFormat } from '../assets/dateFormats'
import Implementation from '../common/Implementation'
import Gallery from "../common/Gallery"
import CategoryIcon from './CategoryIcon'
import SocialIconBtnFb from '../../img/social-fb-btn.svg'
import { getImages, getDocuments } from '../assets/helperFunctions'

export default function ProjectWrapper({ project, showVoteButton, disableVoteButton, onClickVote, onTipClick }) {
  const context = useContext(StoreContext)
  const isProject = [ 140, 200 ].indexOf(project.workflowState.id) !== -1;

  const theme = project.campaignTheme

  const images = getImages(project.medias)
  const documents = getDocuments(project.medias)

  return (
    <div className="prop-inner-wrapper">
      <div className="prop-inner-content">
        <div className="row">
          <div className="col-lg-8">
            <div className="prop-single-wrapper prop-single-body">
              <div className="prop-single-inner">
                <div className="prop-single-content">
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

                  {project.locationDescription ? <>
                    <div className="prop-single-section">
                      <h3>Helyszín</h3>

                      <div className="prop-single-location-description" dangerouslySetInnerHTML={{ __html: project.locationDescription }} />
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
                  </>) : null}

                  {project.links && project.links.length > 0 ? (
                    <div className="prop-single-section prop-single-section-hidden-bottom">
                      <h3>{project.links.length > 1 ? "Kapcsolódó hivatkozások" : "Kapcsolódó hivatkozás"}</h3>

                      <ul className="links">
                        {project.links.map((link, i) => {
                          return (
                            <li key={`link-${i}`}><a href={link} rel="noopener noreferrer">{link}</a></li>
                          )
                        })}
                      </ul>
                    </div>
                  ) : null}

                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            {project.voted ? (
              <div className="prop-single-wrapper prop-single-sidebar prop-single-sidebar-info">
                <div className="prop-single-content">
                  <div className="prop-info-title">Beérkezett szavazatok</div>
                  <div className="prop-info-content prop-info-vote">
                    {project.voted} szavazat
                  </div>
                </div>
              </div>
            ) : null}

            <div className="prop-single-wrapper prop-single-sidebar">
              <div className="prop-single-content">
                {showVoteButton ? <>
                  <button className={`btn btn-primary btn-vote ${disableVoteButton ? 'btn-disable' : ''}`} onClick={onClickVote}>Erre az ötletetre szavazok *</button>
                </> : null}

                {project.campaign ? (
                  <div className="prop-single-side-section">
                    <div className="prop-info-title">Időszak</div>
                    <div className="prop-info-content">
                      {project.campaign.shortTitle}
                    </div>
                  </div>
                ) : null}

                <div className="prop-single-side-section">
                  <div className="prop-info-title">Állapot</div>
                  <div className="prop-info-content">
                    {project.workflowState.title}
                  </div>
                </div>

                <div className="prop-single-side-section prop-single-cost">
                  <div className="prop-info-title">Becsült költség</div>
                  <div className="prop-info-content">
                    {!project.cost ? <>Nincs becsült költség</> : <>{nFormatter(project.cost)}</>}
                  </div>
                </div>

                <div className="prop-single-side-section prop-single-ideas">
                  <div className="prop-info-title">Kapcsolódó ötletek</div>
                  <div className="prop-info-content">
                    {project.ideas.length === 0 ? <>Nincs kapcsolódó ötlet</> : null}
                    {project.ideas.map((idea, i) => {
                      return (<div className="idea" key={i}>
                        <Link to={`/otletek/${idea}`}>{idea}</Link>
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

                {theme.name ? (
                  <div className="prop-single-side-section prop-single-elem">
                    <div className="prop-info-title">Kategória</div>
                    <div className="prop-info-content">
                      <div className="prop-category">
                        <div className="prop-theme"><CategoryIcon name={theme.name} />{theme.name}</div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {showVoteButton ? <>
                  <div className="tipp">* A szavazat akkor érvényes, ha a felső, kék sávban található <div onClick={() => { context.set('rk_modal_open', true); onTipClick() }} style={{ textDecoration: 'underline', display: 'inline', cursor: 'pointer' }}>Szavazás</div> menüpontban mindhárom kategóriából választottál egy-egy ötletet, és azokat a beküldés gombbal beküldted.</div>
                </> : null}

                <div className="prop-single-share">
                  <div className="prop-info-content">
                    <div className="prop-info-content-center">
                      <div>Oszd meg másokkal is!</div>

                      <PopUp url={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} title="Megosztom az ötletet Facebookon">
                        <img src={SocialIconBtnFb} alt="Facebook logo" />
                      </PopUp>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {project.implementations && project.implementations.length > 0 ? <>
          <div className="prop-single-history">
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
  )
}
