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
import StoreContext from '../../../StoreContext'
import clonedeep from 'lodash.clonedeep'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle, faMinusCircle, faFileUpload, faFile } from "@fortawesome/free-solid-svg-icons"
import getGravatarURL from "../../lib/gravatar"
import tokenParser from '../../assets/tokenParser'

export default function IdeaBasic({ nextStep, handleAddElem, changeRaw, handleRemoveElem, handleChange, values, profile }) {
  const context = useContext(StoreContext)

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
                  Ötlet beküldés <span className="profile-name">{`${profile.lastname} ${profile.firstname}`}</span> névvel. Nem Ön az? <Link to="/kijelentkezes">Kijelentkezés</Link>
                </div>
              </div>
            </> : null}

            <h3>Ötlet</h3>

            <InputLengthValidator
              title="Ötlet megnevezése*"
              name="title"
              tipp="Lorem ipsum dolor sit amet consectetur adipisicing elit!"
              value={values.title}
              options={{ min: 4, max: 100 }}
              info={''}
              onChange={handleChange}
            />

            <InputLengthValidator
              title="Mit oldana meg / mire megoldás?*"
              name="solution"
              tipp="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus pariatur voluptas tempore repellat, dolore praesentium, corporis voluptates blanditiis similique temporibus, molestias quam fugit eos? At beatae ad illum aliquid soluta!"
              value={values.solution}
              options={{ min: 4, max: 100 }}
              info={''}
              onChange={handleChange}
            />

            <TextareaLengthValidator
              title="Leírás*"
              name="description"
              tipp="Lorem ipsum dolor sit amet consectetur adipisicing elit."
              value={values.description}
              options={{ min: 4, max: 1000 }}
              info={''}
              onChange={handleChange}
            />

            <div className="input-wrapper">
              <label htmlFor="links">Kapcsolódó hivatkozások</label>
              <div className="tipp">Lorem ipsum dolor sit amet consectetur adipisicing elit!</div>

              {values.links.map((link, i) => {
                return (
                  <div key={i} className="link-elem">
                    <button className="danger" onClick={() => {
                      handleRemoveElem('links', link)
                    }}><FontAwesomeIcon icon={faMinusCircle} /> Eltávolítás</button>

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
              <div className="tipp">Lorem ipsum dolor sit amet consectetur adipisicing elit!</div>

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

                      <p>Tallózzad be, vagy húzza a kijelőlt bezőbe a kapcsolódó anyagokat!</p>

                    </label>
                  </> : null}
                </div>
              </DragAndDrop>

              <FormPaginator nextStep={nextStep} />

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
