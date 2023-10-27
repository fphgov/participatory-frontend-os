
import { getHungarianDateFormat } from '@/utilities/dateFormats'
import { getDocuments, getImages } from '@/utilities/helperFunctions'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Gallery from '@/components/common/Gallery'
import { IImplementation } from '@/models/implementations'

type ImplementationProps = {
  implementations: IImplementation[]
}

export default function Implementation({ implementations }: ImplementationProps): JSX.Element {
  const renderImplementation = (implementation: IImplementation) => {
    const images = getImages(implementation.medias) || []
    const documents = getDocuments(implementation.medias) || []

    return (
      <>
        <div className="implementation-heading">
          <div className="implementation-info">
            <span className="implementation-time">{getHungarianDateFormat(implementation.createdAt)}</span>
          </div>
        </div>

        <div className="implementation-body" dangerouslySetInnerHTML={{ __html: implementation.content }} />

        <div className="implementation-attachments">
          {implementation.medias && implementation.medias.length > 0 && images.length > 0 ? (
            <>
              <h4>Galéria:</h4>
              <div className="media-sep">
                {images && images.length > 0 ? <Gallery items={images} showThumbnails={true} /> : null}
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
