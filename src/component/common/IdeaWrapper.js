import React, { Suspense, lazy, useMemo } from "react"
import {
  Link,
} from "react-router-dom"
import PopUp from '../assets/PopUp'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF } from "@fortawesome/free-brands-svg-icons"
import { faMapMarkerAlt, faFilePdf, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import nFormatter from '../assets/nFormatter'
import { getHungarianDateFormat } from '../assets/dateFormats'
import modernizr from 'modernizr'
import Comment from '../common/Comment'
import GREEN from '../../img/zold_budapest_white_category.svg'
import CARE from '../../img/eselyteremto_budapest_white_category.svg'
import OPEN from '../../img/nyitott_budapest_white_category.svg'

const ImageGallery = lazy(() => import('react-image-gallery'));

export default function IdeaWrapper(props) {
  const theme = props.idea.campaignTheme
  const statusId = props.idea.workflowState.id - 0

  const documentMimes = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf',
  ]

  const getThemeLogo = (themeCode, themeName) => {
    let src = GREEN

    if (themeCode === 'OPEN' || themeCode === 'WHOLE') {
      src = OPEN
    } else if (themeCode === 'CARE') {
      src = CARE
    }

    return (
      <img src={src} alt={`${themeName} logó`} />
    )
  }

  const isActiveStatus = (id) => {
    return id <= 200
  }

  const isActive = useMemo(() => isActiveStatus(statusId), [statusId])

  const images = props.idea.medias.filter(media => documentMimes.indexOf(media.type) === -1).map((item) => {
    const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA.toString().replace(':id', item.id)

    return { original: link }
  })

  const documents = props.idea.medias.filter(media => documentMimes.indexOf(media.type) > -1).map((item) => {
    const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA_DOWNLOAD.toString().replace(':id', item.id)

    return { original: link }
  })

  return (
    <div className="prop-inner-wrapper">
      <div className={`prop-inner-content prop-state-${isActive ? 'active' : 'inactive'}`}>
        <div className="row">
          <div className="col-lg-8">
            <div className="prop-single-wrapper prop-single-body">
              <div className="prop-single-inner">
                <div className="prop-picture">
                  {getThemeLogo(theme.code, theme.name)}
                  <div className="prop-campaign-inner" style={{ backgroundColor: theme.rgb }}>{theme.name} <span>({props.idea.campaign.shortTitle})</span></div>
                </div>

                <div className="prop-single-content">
                  <div className="prop-location">
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {props.idea.campaignLocation && props.idea.campaignLocation.name}
                  </div>

                  <h1 className="prop-single-title" style={{ color: theme.rgb }}>{props.idea.title}</h1>
                  <div className="prop-single-description" dangerouslySetInnerHTML={{ __html: props.idea.description }} />

                  {props.idea.links && props.idea.links.length > 0 ? (
                    <>
                      <h3 style={{ color: theme.rgb }}>Kapcsolódó hivatkozások</h3>

                      <ul className="links">
                        {props.idea.links.map((link, i) => {
                          return (
                            <li key={`link-${i}`}><a href={link} rel="noopener noreferrer">{link}</a></li>
                          )
                        })}
                      </ul>
                    </>
                  ) : null}

                  {props.idea.solution ? <>
                    <h3 style={{ color: theme.rgb }}>Min szeretnél változtatni?</h3>

                    <div className="prop-single-solution" dangerouslySetInnerHTML={{ __html: props.idea.solution }} />
                  </> : null}

                  {props.idea.video || (props.idea.medias && props.idea.medias.length > 0) ? (
                    <>
                      <h3 style={{ color: theme.rgb }}>Csatolmány</h3>
                    </>
                  ) : null}

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
                        {modernizr.arrow && modernizr.webgl ?
                          <Suspense fallback={<div>Betöltés...</div>}>
                            <ImageGallery items={images} showFullscreenButton={false} showNav={false} showPlayButton={false} showBullets={true} showThumbnails={false} />
                          </Suspense> : null
                        }
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
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="prop-single-wrapper prop-single-sidebar" style={{ backgroundColor: theme.rgb }}>
              <div className="prop-single-content">
                <h2>Ötlet</h2>

                <div className="prop-single-id">
                  <div className="prop-info-title">Sorszám</div>
                  <div className="prop-info-content"><b>{props.idea.id}</b></div>
                </div>

                {props.idea.campaign ? (
                  <div className="prop-single-campaign">
                    <div className="prop-info-title">Kampány</div>
                    <div className="prop-info-content">
                      <b>{props.idea.campaign.title}</b>
                    </div>
                  </div>
                ) : null}

                <div className="prop-single-status">
                  <div className="prop-info-title">Állapot</div>
                  <div className="prop-info-content">
                    <b>{props.idea.workflowState.title}</b>
                  </div>
                </div>

                <div className="prop-single-cost">
                  <div className="prop-info-title">Becsült költség</div>
                  <div className="prop-info-content">
                    {!props.idea.cost ? <b>A költségeket nem becsülték meg</b> : <b>{nFormatter(props.idea.cost)}</b>}
                  </div>
                </div>

                {props.idea.submitter ? (
                  <div className="prop-single-elem">
                    <div className="prop-info-title">Beküldés</div>
                    <div className="prop-single-body">
                      <div className="prop-single-submitter">{props.idea.submitter.lastname} {props.idea.submitter.firstname}</div>
                      <div className="prop-single-submited">{getHungarianDateFormat(new Date(props.idea.createdAt))}</div>
                    </div>
                  </div>
                ) : null}

                {props.idea.project ? (
                  <>
                    <div className="prop-single-elem prop-single-paper">
                      <Link to={`/projektek/${props.idea.project.id}`} className="btn btn-primary btn-vote" style={{ backgroundColor: '#fff', color: theme.rgb }} onClick={props.onClickVote}>Tovább a módosított ötletre *</Link>

                      <p className="tipp">* Ide kattintva megismerheti, hogy a beadott ötlet milyen formában került szavazólapra letisztázott szöveggel, adott esetben más hasonló ötletekkel összevonva.</p>
                    </div>
                  </>
                ) : null}

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

        {props.idea.answer ? <>
          <div className="prop-single-feedback">
            <div className="prop-single-inner">
              <div className="prop-single-content">
                <div className="row">
                  <div className="col-md-1" style={{ alignSelf: 'center', textAlign: 'center' }}>
                    <div className="info-icon">
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </div>
                  </div>
                  <div className="col-md-11">
                    <h3 style={{ color: theme.rgb }}>Hivatal visszajelzése</h3>

                    <div className="prop-single-answer" dangerouslySetInnerHTML={{ __html: props.idea.answer }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </> : null}

        {props.idea.comments && props.idea.comments.length > 0 ? <>
          <div className="prop-single-comments">
            <div className="prop-single-inner">
              <div className="prop-single-content">
                <h3 style={{ color: theme.rgb }}>Megjegyzések</h3>

                <Comment comments={props.idea.comments} />
              </div>
            </div>
          </div>
        </> : null}

      </div>
    </div>
  )
}
