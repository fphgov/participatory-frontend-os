import React from "react"
import {
  Link,
} from "react-router-dom"
import PopUp from '../assets/PopUp'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
import nFormatter from '../assets/nFormatter'
import { getHungarianDateFormat } from '../assets/dateFormats'
import Comment from '../common/Comment'
import Gallery from '../common/Gallery'
import { getImages, getDocuments } from '../assets/helperFunctions'
import CategoryIcon from './CategoryIcon'
import SocialIconBtnFb from '../../img/social-fb-btn.svg'

export default function IdeaWrapper(props) {
  const theme = props.idea.campaignTheme

  const images = getImages(props.idea.medias)
  const documents = getDocuments(props.idea.medias)

  return (
    <div className="prop-inner-wrapper">
      <div className="prop-inner-content">
        <div className="row">
          <div className="col-lg-8">
            <div className="prop-single-wrapper prop-single-body">
              <div className="prop-single-inner">
                <div className="prop-single-content">
                  {props.idea.description ? <>
                    <div className="prop-single-section">
                      <h3>Leírás</h3>

                      <div className="prop-single-description" dangerouslySetInnerHTML={{ __html: props.idea.description }} />
                    </div>
                  </> : null}

                  {props.idea.solution ? <>
                    <div className="prop-single-section">
                      <h3>Min szeretnél változtatni?</h3>

                      <div className="prop-single-solution" dangerouslySetInnerHTML={{ __html: props.idea.solution }} />
                    </div>
                  </> : null}

                  {props.idea.locationDescription ? <>
                    <div className="prop-single-section">
                      <h3>Helyszín</h3>

                      <div className="prop-single-location-description" dangerouslySetInnerHTML={{ __html: props.idea.locationDescription }} />
                    </div>
                  </> : null}

                  {props.idea.video || (props.idea.medias && props.idea.medias.length > 0) ? (<>
                    <div className="prop-single-section">
                      <h3>Feltöltött képek, dokumentumok</h3>

                      {props.idea.video ? (
                        <>
                          <div className="media-sep">
                            <div className="prop-single-video" dangerouslySetInnerHTML={{ __html: `<iframe width="100%" height="315" src="${props.idea.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` }} />
                          </div>
                        </>
                      ) : null}

                      {props.idea.medias && props.idea.medias.length > 0 ? (
                        <>
                          <div className="media-sep">
                            <Gallery items={images} showThumbnails={true} />
                          </div>
                        </>
                      ) : null}

                      {props.idea.medias && props.idea.medias.length > 0 ? (
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

                  {props.idea.links && props.idea.links.length > 0 ? (
                    <div className="prop-single-section prop-single-section-hidden-bottom">
                      <h3>{props.idea.links.length > 1 ? "Kapcsolódó hivatkozások" : "Kapcsolódó hivatkozás"}</h3>

                      <ul className="links">
                        {props.idea.links.map((link, i) => {
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
            {props.idea.project ? (
              <div className="prop-single-wrapper prop-single-sidebar prop-single-sidebar-info">
                <div className="prop-single-content">
                  <div>Ismerd meg, hogy a beadott ötlet milyen formában került szavazólapra letisztázott szöveggel, adott esetben más hasonló ötletekkel összevonva.</div>
                  <div className="prop-single-elem">
                    <Link to={`/projektek/${props.idea.project.id}`} className="btn btn-primary btn-next" onClick={props.onClickVote}>Megnézem az ötletet</Link>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="prop-single-wrapper prop-single-sidebar">
              <div className="prop-single-content">
                <div className="prop-single-side-section prop-single-id">
                  <div className="prop-info-title">Sorszám</div>
                  <div className="prop-info-content">{props.idea.id}</div>
                </div>

                {props.idea.campaignLocation && props.idea.campaignLocation.name ? (
                  <div className="prop-single-side-section">
                    <div className="prop-info-title">Lokáció</div>
                    <div className="prop-info-content">
                      {props.idea.campaignLocation.name}
                    </div>
                  </div>
                ) : null}

                {props.idea.campaign ? (
                  <div className="prop-single-side-section">
                    <div className="prop-info-title">Időszak</div>
                    <div className="prop-info-content">
                      {props.idea.campaign.shortTitle}
                    </div>
                  </div>
                ) : null}

                <div className="prop-single-side-section">
                  <div className="prop-info-title">Állapot</div>
                  <div className="prop-info-content">
                    {props.idea.workflowState.title}
                  </div>
                </div>

                <div className="prop-single-side-section prop-single-cost">
                  <div className="prop-info-title">Becsült költség</div>
                  <div className="prop-info-content">
                    {!props.idea.cost ? <>A költségeket nem becsülték meg</> : <>{nFormatter(props.idea.cost)}</>}
                  </div>
                </div>

                {props.idea.submitter ? (
                  <div className="prop-single-side-section prop-single-elem">
                    <div className="prop-info-title">Beküldés</div>
                    <div className="prop-info-content">
                      {props.idea.submitter.lastname} {props.idea.submitter.firstname}, {getHungarianDateFormat(new Date(props.idea.createdAt))}
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

        {props.idea.answer ? <>
          <div className="prop-single-history">
            <div className="prop-single-inner">
              <div className="prop-single-content">
                <h3>Hivatal visszajelzése</h3>

                <div className="prop-single-answer" dangerouslySetInnerHTML={{ __html: props.idea.answer }} />
              </div>
            </div>
          </div>
        </> : null}

        {props.idea.comments && props.idea.comments.length > 0 ? <>
          <div className="prop-single-history">
            <div className="prop-single-inner">
              <div className="prop-single-content">
                <h3>Megjegyzések</h3>

                <Comment comments={props.idea.comments} />
              </div>
            </div>
          </div>
        </> : null}

      </div>
    </div>
  )
}
