import React from 'react'
import FormPaginator from './elements/FormPaginator'
import fileSize from '../../assets/fileSize'
import nFormatter from '../../assets/nFormatter'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile } from "@fortawesome/free-solid-svg-icons"

export default function IdeaOverview({ firstStep, values, submitIdea, error }) {
  const categories = {
    4: "Zöld Budapest",
    5: "Esélyteremtő Budapest",
    6: "Nyitott Budapest"
  }

  const location = typeof values.location === 'object' ? `${values.location.nfn} kerület, ${values.location.php}` : '-'

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
        <p>Így néz ki ötleted. Küldd be a „beküldöm az ötletet” gombbal, vagy, ha még változtatnál rajta, kiegészítenéd, akkor kattints a „javítom” gombra!</p>

        {error && error.form ? <div className="error">
          <ErrorRender error={error} name="form" />
        </div> : null}

        <div className="overview-wrapper">
          <div className="overview">
            <div className="overview-name">Ötlet megnevezése</div>
            <div className="overview-value">{values.title ? values.title : "-"}</div>

            <ErrorRender error={error} name="title" />
          </div>
          <div className="overview">
            <div className="overview-name">Mit oldana meg / mire megoldás?</div>
            <div className="overview-value">{values.solution ? values.solution : "-"}</div>

            <ErrorRender error={error} name="solution" />
          </div>
          <div className="overview">
            <div className="overview-name">Leírás</div>
            <div className="overview-value">{values.description ? values.description : "-"}</div>

            <ErrorRender error={error} name="description" />
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
          <div className="overview">
            <div className="overview-name">Kapcsolodó anyagok</div>
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
            <div className="overview-name">Helyszín</div>
            <div className="overview-value">{values.location ? location : "-"}</div>

            <ErrorRender error={error} name="location" />
          </div>

          <div className="overview">
            <div className="overview-name">Kategória</div>
            <div className="overview-value">{values.theme && categories[values.theme] ? categories[values.theme] : "-"}</div>

            <ErrorRender error={error} name="theme" />
          </div>

          <div className="overview">
            <div className="overview-name">Becsült ráfordítás</div>
            <div className="overview-value">{values.cost ? nFormatter(values.cost) : "-"}</div>

            <ErrorRender error={error} name="cost" />
          </div>

          <div className="overview">
            <div className="overview-name">Részvétel a megvalósításban</div>
            <div className="overview-value">{values.participate && values.participate != " " ? values.participate : 'Nem'}</div>

            <ErrorRender error={error} name="participate" />
          </div>
        </div>

      </div>

      <FormPaginator firstStep={firstStep}>
        <button type="submit" className="submit" onClick={submitIdea}>Beküldöm az ötletet</button>
      </FormPaginator>
    </>
  )
}
