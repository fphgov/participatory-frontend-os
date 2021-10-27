import React, { useState, useEffect, useContext } from 'react'
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
import { faPlusCircle, faMinusCircle, faFileUpload, faFile } from "@fortawesome/free-solid-svg-icons"
import getGravatarURL from "../../lib/gravatar"
import tokenParser from '../../assets/tokenParser'

export default function IdeaBasic({ nextStep, handleAddElem, changeRaw, handleRemoveElem, handleChange, values, profile }) {
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
      alert('A kapcsolodó link mező nem üres. Ha valós nyomja meg a Hozzáadás gombot, vagy törölje a mező értékét.')

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
                <div className="avatar"><img src={getGravatarURL(tokenParser('user.email'))} alt="Avatar kép" aria-hidden="true" /></div>
                <div className="profil-information">
                  Ötletbeküldés <span className="profile-name">{`${profile.lastname} ${profile.firstname}`}</span> névvel. Nem Te vagy az? <Link to="/kijelentkezes">Kijelentkezés</Link>
                </div>
              </div>
            </> : null}

            <h3>Ötlet</h3>

            <InputLengthValidator
              title="Ötlet megnevezése*"
              name="title"
              tipp="Adj az ötletednek olyan tömör, lényegretörő címet, megnevezést, amiből kiderül, hogy mit javasolsz!"
              value={values.title}
              options={{ min: 4, max: 100 }}
              info={''}
              onChange={handleChange}
            />

            <TextareaLengthValidator
              title="Mit oldana meg / mire megoldás?*"
              name="solution"
              tipp="Írd le röviden, hogy miért van szükség erre a fejlesztésre, kiknek milyen helyzetre, problémára ad választ, megoldást!"
              value={values.solution}
              options={{ min: 4, max: 500 }}
              info={''}
              onChange={handleChange}
            />

            <TextareaLengthValidator
              title="Leírás*"
              name="description"
              tipp="Írd le röviden az ötleted, vagyis azt, hogy javaslatod szerint a Főváros mit hozzon létre a közösségi költségvetés keretében!"
              value={values.description}
              options={{ min: 200, max: 1000 }}
              info={''}
              onChange={handleChange}
            />

            <div className="input-wrapper">
              <label htmlFor="links">Kapcsolódó hivatkozások</label>
              <div className="tipp">Ha szeretnél megosztani példákat, egyéb háttérinformációkat, itt az ötleted leírását kiegészítheted linkekkel.</div>

              {values.links.map((link, i) => {
                return (
                  <div key={i} className="link-elem">
                    <button className="danger" onClick={() => {
                      handleRemoveElem('links', link)
                    }}><FontAwesomeIcon icon={faMinusCircle} rel="noopener noreferrer" /> Eltávolítás</button>

                    <a href={link} target="_blank">{link}</a>
                  </div>
                )
              })}

              {values.links.length <= 4 ?
                <>
                  <input type="text"
                    aria-describedby="links-help-text"
                    aria-invalid={errorLink ? true : false}
                    autoCorrect="off"
                    autoCapitalize="none"
                    name="links"
                    id="links"
                    placeholder="https://"
                    value={tempLink}
                    onBlur={() => {
                      setErrorLink(tempLink.length === 0 || matchUrl(tempLink) ? '' : 'Hibás URL cím')
                    }}
                    onChange={({ target: { value } }) => {
                      setTempLink(rmEmojis(value))
                    }} />
                  <div className="validator-info">
                    <span id="links-help-text">{errorLink}</span>
                  </div>

                  <button onClick={() => {
                    if (matchUrl(tempLink) && tempLink.length !== 0) {
                      handleAddElem('links', tempLink)
                      setTempLink('')
                    }
                  }}><FontAwesomeIcon icon={faPlusCircle} /> Hozzáadás</button>
                </> : null
              }
            </div>

            <div className="input-wrapper">
              <label htmlFor="medias">Kapcsolódó anyagok</label>
              <div className="tipp">Ha szeretnél fotókat, további leírásokat megosztani, itt tudod azokat is csatolni.</div>

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
                            <div className="file-elem-remove" onClick={() => { removeTempMedia(file) }}><FontAwesomeIcon icon={faMinusCircle} size="1x" /></div>
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

                      <p>Tallózd be, vagy húzd a kijelőlt mezőbe a kapcsolódó anyagokat!</p>

                    </label>
                  </> : null}
                </div>
              </DragAndDrop>

              <FormPaginator nextStep={validationAndNext} />

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
