import React from 'react'
import FormPaginator from './elements/FormPaginator'
import VoteRadio from './elements/VoteRadio'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"

export default function VoteCategory({ name, code, description, nextStep, prevStep, handleChange, values, projects }) {
  const isSelectedAll = values && values[`theme_${code}_small`] && values[`theme_${code}_big`]
  const smallProjects = projects.filter(elem => elem.campaignTheme.code == code && elem.projectType.id == 2)
  const bigProjects   = projects.filter(elem => elem.campaignTheme.code == code && elem.projectType.id == 3)

  const validationAndNext = () => {
    if (isSelectedAll) {
      nextStep()
    }
  }

  return (
    <>
      <div className="form-group location">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <h3>{name}</h3>

            <div>{description}</div>

            <fieldset>
              <legend>Kis ötlet*</legend>

              <div className="information"><FontAwesomeIcon icon={faInfoCircle} /> A kis ötleteknek alsó értékhatára nincs, de maximum 50 millió Ft-ból megvalósíthatónak kell lenniük. Minden kategóriában maximum 4 ilyen ötlet nyerhet.</div>

              <div className="radio-inline-block">
                {smallProjects.map((project, i) => {
                  return (
                  <VoteRadio
                    key={`theme_${code}_small_${i}`}
                    id={`theme_${code}_${project.id}`}
                    name={`theme_${code}_small`}
                    value={project.id}
                    radioValue={values[`theme_${code}_small`]}
                    title={project.title}
                    price={project.cost}
                    details={<>
                      <p>{project.description}</p>

                      <h4>Mire megoldás?</h4>

                      <p>{project.solution}</p>

                      <h4>Helyszín</h4>
                      <p>{project.location ? project.location : '-'}</p>
                    </>}
                    handleChange={handleChange}
                  />
                )})}
              </div>

            </fieldset>

            <fieldset>
              <legend>Nagy ötlet*</legend>

              <div className="information"><FontAwesomeIcon icon={faInfoCircle} /> Nagy ötletnek az számít, aminek a megvalósítása 50 és 133 millió Ft közé esik.Minden kategóriában csak egy ilyen ötlet nyerhet.</div>

              <div className="radio-inline-block">
                {bigProjects.map((project, i) => {
                  return (
                    <VoteRadio
                      key={`theme_${code}_big_${i}`}
                      id={`theme_${code}_${project.id}`}
                      name={`theme_${code}_big`}
                      value={project.id}
                      radioValue={values[`theme_${code}_big`]}
                      title={project.title}
                      price={project.cost}
                      details={<>
                        <p>{project.description}</p>

                        <h4>Mire megoldás?</h4>

                        <p>{project.solution}</p>

                        <h4>Helyszín</h4>
                        <p>{project.location ? project.location : '-'}</p>
                      </>}
                      handleChange={handleChange}
                    />
                  )
                })}
              </div>
            </fieldset>

            <div className="input-wrapper">
              <FormPaginator prevStep={prevStep} nextStep={validationAndNext} nextStepInvalid={!isSelectedAll} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
