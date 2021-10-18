import React, { useContext, Suspense, lazy } from "react"
import {
  Link,
} from "react-router-dom"
import StoreContext from '../../StoreContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"
import nFormatter from '../assets/nFormatter'
import modernizr from 'modernizr'

const ImageGallery = lazy(() => import('react-image-gallery'));

export default function ProjectWrapper(props) {
  const context = useContext(StoreContext)

  const theme = props.project.campaign_theme

  const images = props.project.medias.filter(media => media.type !== 'application/pdf').map((item) => {
    const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA.toString().replace(':id', item.id)

    return { original: link }
  })

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
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="prop-single-wrapper prop-single-sidebar">
              <div className="prop-single-content">
                {props.showVoteButton ? <>
                  <button className={`btn btn-primary btn-vote ${props.disableVoteButton ? 'btn-disable' : ''}`} style={{ backgroundColor: theme.rgb }} onClick={props.onClickVote}>Erre az ötletetre szavazok *</button>
                </> : null}

                <h2>Ötlet</h2>

                {props.project.voted !== null ? (
                  <div className="prop-single-voted">
                    <div className="prop-info-title">Beérkezett szavazatok:</div>
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
                    <b>{props.project.workflow_state.title}</b>
                  </div>
                </div>

                <div className="prop-single-cost">
                  <div className="prop-info-title">Becsült ráfordítás</div>
                  <div className="prop-info-content">
                    {!props.project.cost ? <b>Nincs becsült ráfordítás</b> : <b>{nFormatter(props.project.cost)}</b>}
                  </div>
                </div>

                <div className="prop-single-ideas">
                  <div className="prop-info-title">Kapcsolódó ötletek</div>
                  <div className="prop-info-content">
                    {props.project.ideas.length === 0 ? <b>Nincs kapcsolódó ötlet</b> : null}
                    {props.project.ideas.map((idea, i) => {
                      return (<div className="idea" key={i}>
                        <Link to={`/otletek/${idea}`} style={{ backgroundColor: theme.rgb }}>{idea}</Link>
                      </div>)
                    })}
                  </div>
                </div>

                <div className="prop-single-tags">
                  <div className="prop-info-title">Címkék</div>
                  <div className="prop-info-content">
                    {props.project.tags.map((tag, i) => {
                      return (<div className="tag" key={i}>
                        <Link to={`/projektek?tag=${tag.id}`} style={{ backgroundColor: theme.rgb }}>#{tag.name}</Link>
                      </div>)
                    })}
                  </div>
                </div>

                {props.project.submitter ? (
                  <div className="prop-single-wrapper">
                    <div className="prop-info-title">Beküldte</div>
                    <div className="prop-single-content">
                      <div className="prop-single-submitter">{props.project.submitter.lastname} {props.project.submitter.firstname}</div>
                      <div className="prop-single-submited">{new Date(props.project.createdAt.date).toLocaleString()}</div>
                    </div>
                  </div>
                ) : null}

                {props.showVoteButton ? <>
                  <div className="tipp">* A szavazat akkor érvényes, ha a felső, kék sávban található <div onClick={() => { context.set('rk_modal_open', true); props.onTipClick() }} style={{ textDecoration: 'underline', display: 'inline', cursor: 'pointer' }}>Szavazás</div> menüpontban mindhárom kategóriából választott egy-egy ötletet, és azokat a beküldés gombbal beküldte.</div>
                </> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
