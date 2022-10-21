import React, { useState } from 'react'
import {
  Link,
} from "react-router-dom"
import { rmEmojis } from '../../lib/removeSpecialCharacters'
import { matchUrl } from '../../lib/matches'
import InputLengthValidator from './elements/InputLengthValidator'
import TextareaLengthValidator from './elements/TextareaLengthValidator'
import InputAddition from '../../common/form/elements/InputAddition'
import FileArea from './elements/FileArea'

export default function IdeaBasic({ nextStepTo, handleAddElem, changeRaw, handleRemoveElem, handleChange, handleChangeNumber, values }) {
  const [ errorLink, setErrorLink ] = useState('')
  const [ tempLink, setTempLink ] = useState('')

  return (
    <>

      <div className="form-group location">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

            <h2>Kötelezően kitöltendő mezők</h2>

            <p className="info">Minden fontos információt itt tudsz megadni az ötleteddel kapcsolatban, minden mező kitöltése kötelező.</p>

            <InputLengthValidator
              title="Ötleted megnevezése *"
              name="title"
              tipp="Adj ötletednek olyan címet, ami tömör, lényegretörő, kiderül, mit javasolsz."
              value={values.title}
              options={{ min: 4, max: 100 }}
              info={''}
              onChange={handleChange}
            />

            <hr />

            <TextareaLengthValidator
              title="Ötleted leírása  *"
              name="description"
              tipp="Írd le az ötleted, vagyis azt, hogy javaslatod szerint mit valósítson meg a Főváros a közösségi költségvetés keretében."
              value={values.description}
              options={{ min: 200, max: 1000 }}
              info={''}
              onChange={handleChange}
            />

            <hr />

            <TextareaLengthValidator
              title="Milyen problémát old meg az ötleted?  *"
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

              <FileArea changeRaw={changeRaw} originalMedias={values.medias} />
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

            <Link className="btn btn-headline next-step" to={nextStepTo}>Következő lépés</Link>

            <div className="asterisk">* Kötelező mező</div>
          </div>
        </div>
      </div>
    </>
  )
}
