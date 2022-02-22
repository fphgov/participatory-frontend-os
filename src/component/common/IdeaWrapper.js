import React, { useState } from "react"
import {
  Link,
} from "react-router-dom"
import PopUp from '../assets/PopUp'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF } from "@fortawesome/free-brands-svg-icons"
import { faMapMarkerAlt, faFilePdf } from "@fortawesome/free-solid-svg-icons"
import nFormatter from '../assets/nFormatter'
import { getHungarianDateFormat } from '../assets/dateFormats'
import Comment from '../common/Comment'
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"

export default function IdeaWrapper(props) {
  const theme = props.idea.campaignTheme

  const [photoIndex, setPhotoIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const documentMimes = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf',
  ]

  const images = props.idea.medias.filter(media => documentMimes.indexOf(media.type) === -1).map((item) => {
    const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA.toString().replace(':id', item.id)

    return link
  })

  const onThumbnail = (index) => {
    setPhotoIndex(index)
    setIsOpen(true)
  }

  const thumbnails = () => {
    return (
      <div className="implementation-thumbnail-container">
        {images.map((image, index) =>
        (
          <div
            className="implementation-thumbnail-block"
            key={index} tabIndex="0"
            aria-label="Miniatűr előnézeti kép"
            onClick={() => onThumbnail(index)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                onThumbnail(index)
              }
            }}>
            <img className="implementation-thumbnail-image" src={image} />
          </div>
        ))}
      </div>
    )
  }

  const documents = props.idea.medias.filter(media => documentMimes.indexOf(media.type) > -1).map((item) => {
    const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA_DOWNLOAD.toString().replace(':id', item.id)

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
                        {images && thumbnails()}
                        {isOpen && <Lightbox
                          mainSrc={images[photoIndex]}
                          nextSrc={images[(photoIndex + 1) % images.length]}
                          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                          onCloseRequest={() => setIsOpen(false)}
                          onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                        />}
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
            <div className="prop-single-wrapper prop-single-sidebar">
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
                      <Link to={`/projektek/${props.idea.project.id}`} className="btn btn-primary btn-vote" style={{ backgroundColor: theme.rgb }} onClick={props.onClickVote}>Tovább a módosított ötletre *</Link>

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
          <div className="prop-single-history" style={{ borderColor: theme.rgb }}>
            <div className="prop-single-inner">
              <div className="prop-single-content">
                <h3 style={{ color: theme.rgb }}>Hivatal visszajelzése</h3>

                <div className="prop-single-answer" dangerouslySetInnerHTML={{ __html: props.idea.answer }} />
              </div>
            </div>
          </div>
        </> : null}

        {props.idea.comments && props.idea.comments.length > 0 ? <>
          <div className="prop-single-history" style={{ borderColor: theme.rgb }}>
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
