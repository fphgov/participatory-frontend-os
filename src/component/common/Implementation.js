import React, { Suspense, lazy } from "react"
import { getHungarianDateFormat } from '../assets/dateFormats'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilePdf, faCalendarDay } from "@fortawesome/free-solid-svg-icons"
import modernizr from 'modernizr'

const ImageGallery = lazy(() => import('react-image-gallery'))

export default function Implementation({ implementations }) {
  const documentMimes = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf',
  ]

  const renderImplementation = (implementation) => {
    const images = implementation.medias.filter(media => documentMimes.indexOf(media.type) === -1).map((item) => {
      const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA.toString().replace(':id', item.id)

      return { original: link }
    })

    const documents = implementation.medias.filter(media => documentMimes.indexOf(media.type) > -1).map((item) => {
      const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA_DOWNLOAD.toString().replace(':id', item.id)

      return { original: link }
    })

    return (
      <>
        <div className="implementation-heading">
          <div className="implementation-info">
            <span className="implementation-time">
              <FontAwesomeIcon icon={faCalendarDay} />
              {getHungarianDateFormat(new Date(implementation.createdAt))}
            </span>
          </div>
        </div>

        <div className="implementation-body" dangerouslySetInnerHTML={{ __html: implementation.content }} />

        <div className="implementation-attachments">
          {implementation.medias && implementation.medias.length > 0 && images.length > 0 ? (
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

          {implementation.medias && implementation.medias.length > 0 && documents.length > 0 ? (
            <>
              <h4>Csatolmányok:</h4>
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
      </>
    )
  }

  return (
    <div className="implementation-wrapper">
      {implementations && implementations.filter((c) => c.parentImplementation == null).map((implementation, key) => (
        <div key={key} className="implementation-item">
          {renderImplementation(implementation)}
        </div>
      ))}
    </div>
  )
}
