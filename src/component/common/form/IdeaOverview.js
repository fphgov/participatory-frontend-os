import React from 'react'
import fileSize from '../../assets/fileSize'
import nFormatter from '../../assets/nFormatter'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile } from "@fortawesome/free-solid-svg-icons"
import CategoryIcon from '../CategoryIcon'

export default function IdeaOverview({ values, submitIdea, error }) {
  const categories = {
    7: "Zöld Budapest",
    8: "Esélyteremtő Budapest",
    9: "Nyitott Budapest"
  }

  const ErrorMini = (props) => {
    if (typeof props.error === 'object') {
      return Object.values(props.error).map((e, i) => {
        return (<div key={i} className="error-message-inline">{e}</div>)
      })
    } else {
      return (<div key={props.increment} className="error-message-inline">{props.error}</div>)
    }
  }

  const ErrorRender = ({ error, name }) => {
    return (<>
      {error && error[name] ? Object.values(error[name]).map((err, i) => {
        return <ErrorMini key={i} error={err} increment={i} />
      }) : null}
    </>)
  }

  return (
    <>
      <h3>Áttekintés</h3>

      <div className="form-group location">
        <p>Így néz ki ötleted. Küldd be a „beküldöm az ötletem” gombbal, vagy, ha még változtatnál rajta, kiegészítenéd, akkor kattints a „javítom” gombra!</p>

        {error && error.form ? <div className="error">
          <ErrorRender error={error} name="form" />
        </div> : null}

        <div className="overview-wrapper">
          <div className="overview">
            <div className="overview-name">Kategória</div>
            <div className="overview-value">
              {values.theme && categories[values.theme] ? <div className="prop-category"><div className="prop-theme"><CategoryIcon size={24} name={categories[values.theme]} />{categories[values.theme]}</div></div> : "-"}
            </div>

            <ErrorRender error={error} name="theme" />
          </div>

          <div className="overview">
            <div className="overview-name">Ötleted helyszíne</div>
            <div className="overview-value">{values.location === "1" ? "Konkrét helyszínhez kötődik" : "Nem kötődik konkrét helyszínhez"}</div>
            <div className="overview-value">{values.locationDescription ? values.locationDescription : ""}</div>
            <div className="overview-value">{values.locationDistrict ? values.locationDistrict !== 'Margit sziget' ? `${values.locationDistrict}. kerület` : values.locationDistrict : ""}</div>

            <ErrorRender error={error} name="location" />
            <ErrorRender error={error} name="location_description" />
            <ErrorRender error={error} name="location_district" />
          </div>

          <div className="overview">
            <div className="overview-name">Ötleted megnevezése</div>
            <div className="overview-value">{values.title ? values.title : "-"}</div>

            <ErrorRender error={error} name="title" />
          </div>

          <div className="overview">
            <div className="overview-name">Ötleted leírása:</div>
            <div className="overview-value">{values.description ? values.description : "-"}</div>

            <ErrorRender error={error} name="description" />
          </div>

          <div className="overview">
            <div className="overview-name">Min szeretnél változtatni?</div>
            <div className="overview-value">{values.solution ? values.solution : "-"}</div>

            <ErrorRender error={error} name="solution" />
          </div>

          <div className="overview">
            <div className="overview-name">Becsült költség</div>
            <div className="overview-value">{values.cost ? nFormatter(values.cost) : "-"}</div>

            <ErrorRender error={error} name="cost" />
          </div>

          <div className="overview">
            <div className="overview-name">Képek, dokumentumok</div>
            <div className="overview-value">{
              values.medias.length > 0 ?
                values.medias.map((file, i) => (
                  <div key={`file-${i}`} className="file-elem">
                    <div className="file-elem-icon"><FontAwesomeIcon icon={faFile} size="2x" /></div>
                    <div className="file-elem-name">{file.name}</div>
                    <div className="file-elem-size">({fileSize(file.size)})</div>
                  </div>
                )) : <>Nincs</>
            }</div>

            <ErrorRender error={error} name="medias" />
          </div>

          <div className="overview">
            <div className="overview-name">Kapcsolódó hivatkozások</div>
            <div className="overview-value">{
              values.links.length > 0 ?
                values.links.map((link, i) => (
                  <div key={i} className="link-elem">
                    <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                  </div>
                )) : <>Nincs</>
            }</div>

            <ErrorRender error={error} name="links" />
          </div>
        </div>

      </div>

      <button type="submit" className="btn btn-headline next-step submit" onClick={submitIdea}>Beküldöm az ötletem</button>
    </>
  )
}
