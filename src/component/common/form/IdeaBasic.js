import React, { useState, useEffect } from 'react'
import {
  Link,
} from "react-router-dom"
import { rmEmojis } from '../../lib/removeSpecialCharacters'
import { matchUrl } from '../../lib/matches'
import fileSize from '../../assets/fileSize'
import DragAndDrop from '../../common/form/elements/DragAndDrop'
import InputLengthValidator from './elements/InputLengthValidator'
import TextareaLengthValidator from './elements/TextareaLengthValidator'
import FormPaginator from './elements/FormPaginator'
import clonedeep from 'lodash.clonedeep'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faFileUpload, faFile } from "@fortawesome/free-solid-svg-icons"
import InputAddition from '../../common/form/elements/InputAddition'

export default function IdeaBasic({ nextStep, prevStep, handleAddElem, changeRaw, handleRemoveElem, handleChange, handleChangeNumber, values, profile }) {
  const [ dragged, setDragged ] = useState(false)
  const [ errorLink, setErrorLink ] = useState('')
  const [ tempLink, setTempLink ] = useState('')
  const [ tempMedia, setTempMedia ] = useState([])

  const maxFiles = 5

  const removeItemOnce = (array, value) => {
    const index = array.indexOf(value)

    if (index > -1) {
      array.splice(index, 1)
    }

    return array
  }

  const addTempMedia = (newMediaList) => {
    const medias = clonedeep(tempMedia)

    if ((tempMedia.length + newMediaList.length) <= maxFiles) {
      for (let i = 0; i < newMediaList.length; i++) {
        medias.push(newMediaList[i])
      }
    }

    setTempMedia([ ...medias ])
  }

  const removeTempMedia = (file) => {
    const medias = clonedeep(tempMedia)
    const removedMedias = removeItemOnce(medias, file)

    setTempMedia([ ...removedMedias ])
  }

  const onFileChange = (e) => {
    addTempMedia(e.target.files)
    // setTempMedia(e.target.files)
  }

  const handleDrop = (files) => {
    addTempMedia(files)

    // setTempMedia(files)
  }

  const validationAndNext = () => {
    if (tempLink.length > 0) {
      alert('A kapcsolodó hivatkozások mező nem üres. Hivatkozás hozzáadásához nyomd meg a mező alatti Hozzáadás gombot, vagy töröld a mező tartalmát.')

      return
    }

    nextStep()
  }

  useEffect(() => {
    changeRaw('medias', tempMedia)
  }, [tempMedia])

  useEffect(() => {
    setTempMedia([...values.medias])
  }, [])

  return (
    <>

      <div className="form-group location">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

            {profile ? <>
              <div className="profile">
                <div className="profil-information">
                  Ötletbeküldés <span className="profile-name">{`${profile.lastname} ${profile.firstname}`}</span> névvel. Nem Te vagy az? <Link to="/kijelentkezes">Kijelentkezés</Link>
                </div>
              </div>
            </> : null}

            <h2>Kötelezően kitöltendő mezők</h2>

            <p className="info">Minden fontos információt itt tudsz megadni az ötleteddel kapcsolatban, minden mező kitöltése kötelező.</p>

            <InputLengthValidator
              title="Ötleted megnevezése"
              name="title"
              tipp="Adj ötletednek olyan címet, ami tömör, lényegretörő, kiderül, mit javasolsz."
              value={values.title}
              options={{ min: 4, max: 100 }}
              info={''}
              onChange={handleChange}
            />

            <hr />

            <TextareaLengthValidator
              title="Ötleted leírása"
              name="description"
              tipp="Írd le az ötleted, vagyis azt, hogy javaslatod szerint mit valósítson meg a Főváros a közösségi költségvetés keretében."
              value={values.description}
              options={{ min: 200, max: 1000 }}
              info={''}
              onChange={handleChange}
            />

            <hr />

            <TextareaLengthValidator
              title="Milyen problémát old meg az ötleted?"
              name="solution"
              tipp="Írd le röviden, hogy miért van szükség erre a fejlesztésre. Kinek milyen helyzetre, problémára ad választ, megoldást?"
              value={values.solution}
              options={{ min: 20, max: 250 }}
              info={''}
              onChange={handleChange}
            />

            <hr />

            <h2>Kiegészítő információk</h2>

            <p className="info">A projektedhez kapcsolódó, kiegészítő információkat tudsz itt megadni (pl. képek, dokumentumok, hivatkozás)</p>

            <div className="input-wrapper">
              <label htmlFor="cost">Becsült költség</label>
              <div className="tipp">Ha van elképzelésed az ötleted megvalósításának költségeiről, itt tudod megadni.</div>
              <input type="text" autoCorrect="off" autoCapitalize="none" name="cost" id="cost" value={values.cost} onChange={handleChangeNumber} />
            </div>

            <hr />

            <div className="input-wrapper">
              <label htmlFor="medias">Képek, dokumentumok feltöltése</label>
              <div className="tipp">Itt tudsz képeket vagy egyéb dokumentumokat feltölteni, amikről úgy gondolod, segítik az ötleted megértését, kapcsolódnak hozzá. Max. 5 darab fájl tölthető fel!</div>

              <DragAndDrop
                onHandleDrop={handleDrop}
                onChangeDrag={(drag) => { setDragged(drag) }}
              >
                <div className={`input-file-wrapper ${dragged ? 'dragged' : ''}`}>
                  <input id="file" name="file" type="file" multiple onChange={onFileChange} />

                  {tempMedia.length > 0 ? <>
                    <div className="file-list">
                      {tempMedia.map((file, i) => {
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

                  {tempMedia.length > 0 && tempMedia.length < maxFiles ? <>
                    <div className="file-list-separator"></div>
                  </> : null}

                  {tempMedia.length < maxFiles ? <>
                    <label htmlFor="file" className="input-file-content">
                      <FontAwesomeIcon icon={faFileUpload} size="3x" />

                      <p>Tallózd be, vagy húzd a kijelölt mezőbe a kapcsolódó anyagokat!</p>
                    </label>
                  </> : null}
                </div>
              </DragAndDrop>
            </div>

            <hr />

            <div className="input-wrapper">
              <label htmlFor="links">Kapcsolódó hivatkozás megadása</label>
              <div className="tipp">Ha szeretnél megosztani példákat, egyéb háttérinformációkat, itt az ötleted leírását kiegészítheted linkekkel.</div>

              {values.links.map((link, i) => {
                return (
                  <InputAddition
                    key={i}
                    id="links"
                    name="links"
                    placeholder="https://"
                    value={link}
                    onRemove={() => {
                      handleRemoveElem('links', link)
                    }}
                  />
                )
              })}

              {values.links.length <= 4 ?
                <>
                  <InputAddition
                    id="links"
                    name="links"
                    placeholder="https://"
                    value={tempLink}
                    invalid={errorLink}
                    onBlur={() => {
                      setErrorLink(tempLink.length === 0 || matchUrl(tempLink) ? '' : 'Hibás URL cím')
                    }}
                    onChange={({ target: { value } }) => {
                      setTempLink(rmEmojis(value))
                    }}
                    onAdd={() => {
                      if (matchUrl(tempLink) && tempLink.length !== 0) {
                        handleAddElem('links', tempLink)
                        setTempLink('')
                      }
                    }}
                  />
                </> : null
              }
            </div>

            <hr />

            <FormPaginator prevStep={prevStep} nextStep={validationAndNext} />
          </div>
        </div>
      </div>
    </>
  )
}
