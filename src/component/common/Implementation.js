import React, { useState } from "react"
import { getHungarianDateFormat } from '../assets/dateFormats'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"

export default function Implementation({ implementations }) {
  const documentMimes = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf',
  ]

  const [photoIndex, setPhotoIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const renderImplementation = (implementation) => {
    const images = implementation.medias.filter(media => documentMimes.indexOf(media.type) === -1).map((item) => {
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

    const documents = implementation.medias.filter(media => documentMimes.indexOf(media.type) > -1).map((item) => {
      const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA_DOWNLOAD.toString().replace(':id', item.id)

      return { original: link }
    })

    return (
      <>
        <div className="implementation-heading">
          <div className="implementation-info">
            <span className="implementation-time">{getHungarianDateFormat(new Date(implementation.createdAt))}</span>
          </div>
        </div>

        <div className="implementation-body" dangerouslySetInnerHTML={{ __html: implementation.content }} />

        <div className="implementation-attachments">
          {implementation.medias && implementation.medias.length > 0 && images.length > 0 ? (
            <>
              <h4>Galéria:</h4>
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
