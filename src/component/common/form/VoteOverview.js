import React from 'react'
import {
  Link,
} from "react-router-dom"
import VoteRadio from './elements/VoteRadio'
import FormPaginator from './elements/FormPaginator'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVoteYea } from "@fortawesome/free-solid-svg-icons"

export default function VoteOverview({ firstStep, changeStep, values, profile, projects, onSubmit, error }) {
  const greenSmallProject = projects.filter(elem => elem.id.toString() === values.theme_GREEN_small.toString())
  const greenBigProject = projects.filter(elem => elem.id.toString() === values.theme_GREEN_big.toString())
  const careSmallProject = projects.filter(elem => elem.id.toString() === values.theme_CARE_small.toString())
  const careBigProject = projects.filter(elem => elem.id.toString() === values.theme_CARE_big.toString())
  const openSmallProject = projects.filter(elem => elem.id.toString() === values.theme_OPEN_small.toString())
  const openBigProject = projects.filter(elem => elem.id.toString() === values.theme_OPEN_big.toString())

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

  const OverviewVote = ({ projects, type, index, onClickArea }) => {
    if (!projects && typeof projects[0] !== "undefined") {
      return (<div className="no-selected-idea">Nincs kiválaszott ötlet</div>)
    }

    const project = projects[0]

    if (!project) {
      return (<div className="no-selected-idea">Nincs kiválaszott ötlet</div>)
    }

    return (
      <VoteRadio
        key={`theme_${project.campaignTheme.code}_${type}_${index}`}
        id={`theme_${project.campaignTheme.code}_${project.id}`}
        name={`theme_${project.campaignTheme.code}_${type}`}
        value={project.id}
        radioValue={values[ `theme_${project.campaignTheme.code}_${type}` ]}
        title={project.title}
        price={project.cost}
        onClickArea={onClickArea}
        htmlTitle="Vissza a kategória oldalra"
        details={<>
          <p>{project.description}</p>

          <h4>Mire megoldás?</h4>

          <p>{project.solution}</p>

          <h4>Helyszín</h4>
          <p>{project.location ? project.location : '-'}</p>
        </>}
      />
    )
  }

  return (
    <>
      <h2>Áttekintés</h2>

      <div className="form-group location">
        <p>Az alábbi ötleteket jelölted be. Ha most leadod a szavazatod, ezekre az ötletekre fogsz szavazni.</p>

        <div className="overview-wrapper">
          <div className="overview">
            <div className="overview-name">Zöld Budapest</div>
            <div className="overview-value-wrapper">
              <div className="overview-value">
                <div className="radio-title">Kis ötlet</div>
                <div className="radio-inline-block">
                  <OverviewVote projects={greenSmallProject} type="small" index={'gs1'} onClickArea={() => { changeStep(1) }} />

                  <ErrorRender error={error} name="theme_GREEN_small" />
                </div>
              </div>

              <div className="overview-value">
                <div className="radio-title">Nagy ötlet</div>
                <div className="radio-inline-block">
                  <OverviewVote projects={greenBigProject} type="big" index={'gb1'} onClickArea={() => { changeStep(1) }} />

                  <ErrorRender error={error} name="theme_GREEN_big" />
                </div>
              </div>
            </div>
          </div>

          <div className="overview">
            <div className="overview-name">Esélyteremtő Budapest</div>
            <div className="overview-value-wrapper">
              <div className="overview-value">
                <div className="radio-title">Kis ötlet</div>
                <div className="radio-inline-block">
                  <OverviewVote projects={careSmallProject} type="small" index={'cs1'} onClickArea={() => { changeStep(2) }} />

                  <ErrorRender error={error} name="theme_CARE_small" />
                </div>
              </div>

              <div className="overview-value">
                <div className="radio-title">Nagy ötlet</div>
                <div className="radio-inline-block">
                  <OverviewVote projects={careBigProject} type="big" index={'cb1'} onClickArea={() => { changeStep(2) }} />

                  <ErrorRender error={error} name="theme_CARE_big" />
                </div>
              </div>
            </div>
          </div>

          <div className="overview">
            <div className="overview-name">Nyitott Budapest</div>
            <div className="overview-value-wrapper">
              <div className="overview-value">
                <div className="radio-title">Kis ötlet</div>
                <div className="radio-inline-block">
                  <OverviewVote projects={openSmallProject} type="small" index={'os1'} onClickArea={() => { changeStep(3) }} />

                  <ErrorRender error={error} name="theme_OPEN_small" />
                </div>
              </div>

              <div className="overview-value">
                <div className="radio-title">Nagy ötlet</div>
                <div className="radio-inline-block">
                  <OverviewVote projects={openBigProject} type="big" index={'ob1'} onClickArea={() => { changeStep(3) }} />

                  <ErrorRender error={error} name="theme_OPEN_big" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <p>Ha változtatni szeretnél, másik ötletre szavaznál, kattints arra az ötletre, amelyet le szeretnél cserélni, így automatikusan annak a kategóriának az oldalára jutsz, ahol az ötlet listázva van. Itt jelöld ki az új ötletet, amire szavazni szeretnél és kattints a Tovább gombra.</p>

        <p>Ha biztos vagy abban, hogy a neked legjobban tetsző ötleteket jelölted ki, kattints a Szavazok gombra. Szavazatodon ezután már nincs módod változtatni!</p>

        {profile ? <>
          <div className="profile">
            <div className="profil-information">
              Szavazat leadása <span className="profile-name">{`${profile.lastname} ${profile.firstname}`}</span> névvel. Nem Te vagy az? <Link to="/kijelentkezes">Kijelentkezés</Link>
            </div>
          </div>
        </> : null}
      </div>

      {error && error.form ? <div className="error">
        <ErrorRender error={error} name="form" />
      </div> : null}

      <FormPaginator firstStep={firstStep} nextButtonName="Tovább">
        <button type="submit" className="submit" onClick={onSubmit}>
          <FontAwesomeIcon icon={faVoteYea} /> Szavazok
        </button>
      </FormPaginator>
    </>
  )
}
