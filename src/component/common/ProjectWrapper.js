import React, { useContext, Suspense, lazy } from "react"
import {
  Link,
} from "react-router-dom"
import StoreContext from '../../StoreContext'
import PopUp from '../assets/PopUp'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF } from "@fortawesome/free-brands-svg-icons"
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"
import nFormatter from '../assets/nFormatter'
import { getHungarianDateFormat } from '../assets/dateFormats'
import modernizr from 'modernizr'
import Implementation from '../common/Implementation'
import GREEN from '../../img/zold_budapest_white_category.svg'
import CARE from '../../img/eselyteremto_budapest_white_category.svg'
import OPEN from '../../img/nyitott_budapest_white_category.svg'

const ImageGallery = lazy(() => import('react-image-gallery'));

export default function ProjectWrapper(props) {
  const context = useContext(StoreContext)

  const theme = props.project.campaignTheme

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

  const images = props.project.medias.filter(media => documentMimes.indexOf(media.type) === -1).map((item) => {
    const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA.toString().replace(':id', item.id)

    return { original: link }
  })

  const documents = props.project.medias.filter(media => documentMimes.indexOf(media.type) > -1).map((item) => {
    const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA_DOWNLOAD.toString().replace(':id', item.id)

    return { original: link }
  })

  return (
    <div className="prop-inner-wrapper">
      <div className="prop-inner-content" style={{ borderColor: theme.rgb }}>
        <div className="row">
          <div className="col-lg-8">
            <div className="prop-single-wrapper prop-single-body">
              <div className="prop-single-inner">
                <div className="prop-picture">
                  {getThemeLogo(theme.code, theme.name)}
                  <div className="prop-campaign-inner" style={{ backgroundColor: theme.rgb }}>{theme.name} <span>({props.project.campaign.shortTitle})</span></div>
                </div>

                <div className="prop-single-content">
                  <div className="prop-location">
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {props.project.location}
                  </div>

                  <h1 className="prop-single-title" style={{ color: theme.rgb }}>{props.project.title}</h1>
                  <div className="prop-single-description" dangerouslySetInnerHTML={{ __html: props.project.description }} />

                  <h3 style={{ color: theme.rgb }}>Mire megoldás?</h3>
                  <div className="prop-single-solution" dangerouslySetInnerHTML={{ __html: props.project.solution }} />

                  {props.project.video || (props.project.medias && props.project.medias.length > 0) ? (
                    <>
                      <h3 style={{ color: theme.rgb }}>Média</h3>
                    </>
                  ) : null}

                  {props.project.video ? (
                    <>
                      <div className="media-sep">
                        <div className="prop-single-video" dangerouslySetInnerHTML={{ __html: `<iframe width="100%" height="315" src="${props.project.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` }} />
                      </div>
                    </>
                  ) : null}

                  {props.project.medias && props.project.medias.length > 0 ? (
                    <>
                      <div className="media-sep">
                        {context.get('map') && modernizr.arrow && modernizr.webgl ?
                          <Suspense fallback={<div>Betöltés...</div>}>
                            <ImageGallery items={images} showFullscreenButton={false} showNav={false} showPlayButton={false} showBullets={true} showThumbnails={false} />
                          </Suspense> : null
                        }
                      </div>
                    </>
                  ) : null}

                  {props.project.medias && props.project.medias.length > 0 ? (
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
                {props.showVoteButton ? <>
                  <button className={`btn btn-primary btn-vote ${props.disableVoteButton ? 'btn-disable' : ''}`} style={{ backgroundColor: theme.rgb }} onClick={props.onClickVote}>Erre az ötletetre szavazok *</button>
                </> : null}

                <h2>Ötlet</h2>

                {props.project.voted !== null ? (
                  <div className="prop-single-voted">
                    <div className="prop-info-title">Beérkezett szavazatok</div>
                    <div className="prop-info-content">
                      <b>{props.project.voted} szavazat</b></div>
                  </div>
                ) : null}

                {props.project.campaign ? (
                  <div className="prop-single-campaign">
                    <div className="prop-info-title">Kampány</div>
                    <div className="prop-info-content">
                      <b>{props.project.campaign.title}</b>
                    </div>
                  </div>
                ) : null}

                <div className="prop-single-status">
                  <div className="prop-info-title">Állapot</div>
                  <div className="prop-info-content">
                    <b>{props.project.workflowState.title}</b>
                  </div>
                </div>

                <div className="prop-single-cost">
                  <div className="prop-info-title">Becsült költség</div>
                  <div className="prop-info-content">
                    {!props.project.cost ? <b>Nincs becsült költség</b> : <b>{nFormatter(props.project.cost)}</b>}
                  </div>
                </div>

                <div className="prop-single-ideas">
                  <div className="prop-info-title">Kapcsolódó ötletek</div>
                  <div className="prop-info-content">
                    {props.project.ideas.length === 0 ? <b>Nincs kapcsolódó ötlet</b> : null}
                    {props.project.ideas.map((idea, i) => {
                      return (<div className="idea" key={i}>
                        <Link to={`/otletek/${idea}`} style={{ backgroundColor: '#fff', color: theme.rgb }}>{idea}</Link>
                      </div>)
                    })}
                  </div>
                </div>

                <div className="prop-single-tags">
                  <div className="prop-info-title">Címkék</div>
                  <div className="prop-info-content">
                    {props.project.tags.map((tag, i) => {
                      return (<div className="tag" key={i}>
                        <Link to={`/projektek?tag=${tag.id}`} style={{ backgroundColor: '#fff', color: theme.rgb }}>#{tag.name}</Link>
                      </div>)
                    })}
                  </div>
                </div>

                {props.project.submitter ? (
                  <div className="prop-single-wrapper">
                    <div className="prop-info-title">Beküldte</div>
                    <div className="prop-single-content">
                      <div className="prop-single-submitter">{props.project.submitter.lastname} {props.project.submitter.firstname}</div>
                      <div className="prop-single-submited">{getHungarianDateFormat(new Date(props.project.createdAt))}</div>
                    </div>
                  </div>
                ) : null}

                {props.showVoteButton ? <>
                  <div className="tipp">* A szavazat akkor érvényes, ha a felső, kék sávban található <div onClick={() => { context.set('rk_modal_open', true); props.onTipClick() }} style={{ textDecoration: 'underline', display: 'inline', cursor: 'pointer' }}>Szavazás</div> menüpontban mindhárom kategóriából választottál egy-egy ötletet, és azokat a beküldés gombbal beküldted.</div>
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

        {props.project.implementations && props.project.implementations.length > 0 ? <>
          <div className="prop-single-history">
            <div className="prop-single-inner">
              <div className="prop-single-content">
                <h3 style={{ color: theme.rgb }}>Hol tartunk a megvalósítással?</h3>

                <Implementation implementations={props.project.implementations} />
              </div>
            </div>
          </div>
        </> : null}

      </div>
    </div>
  )
}
