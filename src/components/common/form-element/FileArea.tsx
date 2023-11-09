'use client'

import React, { useState } from 'react'
import DragAndDrop from './DragAndDrop'
import clonedeep from 'lodash.clonedeep'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faFileUpload, faFile } from "@fortawesome/free-solid-svg-icons"
import fileSize from '@/utilities/fileSize'

type FileAreaProps = {
  changeRaw: (name: string, files: any[]) => void
  originalMedias: File[]
}

export default function FileArea({ changeRaw, originalMedias }: FileAreaProps) {
  const [ dragged, setDragged ] = useState(false)

  const maxFiles = 5

  const removeItemOnce = (array: any[], value: any) => {
    const index = array.indexOf(value)

    if (index > -1) {
      array.splice(index, 1)
    }

    return array
  }

  const addTempMedia = (newMediaList: string | any[]) => {
    const medias = clonedeep(originalMedias)

    if ((originalMedias.length + newMediaList.length) <= maxFiles) {
      for (let i = 0; i < newMediaList.length; i++) {
        medias.push(newMediaList[i])
      }
    }

    changeRaw('medias', [ ...medias ])
  }

  const removeTempMedia = (file: any) => {
    const medias = clonedeep(originalMedias)
    const removedMedias = removeItemOnce(medias, file)

    changeRaw('medias', [ ...removedMedias ])
  }

  const onFileChange = (e: any) => {
    addTempMedia(e.target.files)
  }

  const handleDrop = (files: any) => {
    addTempMedia(files)
  }

  return (
    <>
      <DragAndDrop
        onHandleDrop={handleDrop}
        onChangeDrag={(drag: boolean | ((prevState: boolean) => boolean)) => { setDragged(drag) }}
      >
        <div className={`input-file-wrapper ${dragged ? 'dragged' : ''}`}>
          <input id="file" name="file" type="file" multiple onChange={onFileChange} />

          {originalMedias.length > 0 ? <>
            <div className="file-list">
              {originalMedias.map((file: File, i: number) => {
                return (
                  <div key={`file-${i}`} className="file-elem">
                    <div className="file-elem-remove" onClick={() => { removeTempMedia(file) }}><FontAwesomeIcon icon={faTrash} size="1x" /></div>
                    <div className="file-elem-icon"><FontAwesomeIcon icon={faFile} size="2x" /></div>
                    <div className="file-elem-name">{file.name}</div>
                    <div className="file-elem-size">({fileSize(file.size)})</div>
                  </div>
                )
              })}
            </div>
          </> : null}

          {originalMedias.length > 0 && originalMedias.length < maxFiles ? <>
            <div className="file-list-separator"></div>
          </> : null}

          {originalMedias.length < maxFiles ? <>
            <label htmlFor="file" className="input-file-content">
              <FontAwesomeIcon icon={faFileUpload} size="3x" />

              <p>Tallózd be, vagy húzd ide fájlt a feltöltéshez</p>
            </label>
          </> : null}
        </div>
      </DragAndDrop>
    </>
  )
}
