import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile } from "@fortawesome/free-solid-svg-icons"
import fileSize from '@/utilities/fileSize'

type MediaListProps = {
  originalMedias: File[]
}

export default function MediaList({ originalMedias = [] }: MediaListProps) {
  return (<>
    {originalMedias?.length > 0 ? <>
      <div className="file-list file-list-view">
        {originalMedias.map((file: File, i: number) => {
          return (
            <div key={`file-${i}`} className="file-elem">
              <div className="file-elem-icon"><FontAwesomeIcon icon={faFile} size="2x" /></div>
              <div className="file-elem-name">{file.name}</div>
              <div className="file-elem-size">({fileSize(file.size)})</div>
            </div>
          )
        })}
      </div>
    </> : null}
  </>)
}
