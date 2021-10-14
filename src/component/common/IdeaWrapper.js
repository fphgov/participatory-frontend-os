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

export default function IdeaWrapper(props) {
  const context = useContext(StoreContext)

  const theme = props.idea.campaign_theme

  const images = props.idea.medias.map((item) => {
    const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA.toString().replace(':id', item)

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
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {props.idea.campaign_location.name}
                  </div>

                  <h1 className="prop-single-title" style={{ color: theme.rgb }}>{props.idea.title}</h1>
                  <div className="prop-single-description" dangerouslySetInnerHTML={{ __html: props.idea.description }} />

                  {props.idea.solution ? <>
                    <h3 style={{ color: theme.rgb }}>Mire megoldás?</h3>

                    <div className="prop-single-solution" dangerouslySetInnerHTML={{ __html: props.idea.solution }} />
                  </> : null}

                  {props.idea.video || (props.idea.medias && props.idea.medias.length > 0) ? (
                    <>
                      <h3 style={{ color: theme.rgb }}>Média</h3>
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
                <h2>Ötlet</h2>

                {props.idea.campaign ? (
                  <div className="prop-single-campaign">
                    <div className="prop-info-title">Kampány</div>
                    <div className="prop-info-content">
                      <b>{props.idea.campaign.title}</b>
                    </div>
                  </div>
                ) : null}

                <div className="prop-single-published">{props.idea.published}</div>

                <div className="prop-single-cost">
                  <div className="prop-info-title">Becsült ráfordítás</div>
                  <div className="prop-info-content">
                    {!props.idea.cost ? <b>Nincs becsült ráfordítás</b> : <b>{nFormatter(props.idea.cost)}</b>}
                  </div>
                </div>

                {props.idea.submitter ? (
                  <div className="prop-single-elem">
                    <div className="prop-info-title">Beküldés</div>
                    <div className="prop-single-body">
                      <div className="prop-single-submitter">{props.idea.submitter.lastname} {props.idea.submitter.firstname}</div>
                      <div className="prop-single-submited">{new Date(props.idea.created_at.date).toLocaleString()}</div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
