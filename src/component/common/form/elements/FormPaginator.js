import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-solid-svg-icons"

export default function FormPaginator({ children, prevStep, nextStep, firstStep, nextStepInvalid = false, nextButtonName = 'Következő lépés' }) {
  return (
    <div className="navigation-wrapper">
      {prevStep ? <button type="button" className="btn btn btn-headline prev-step" onClick={prevStep}>Előző</button> : null}
      {nextStep ? <button type="button" className={`btn btn-headline next-step ${nextStepInvalid ? 'disabled' : ''}`} onClick={nextStep}>{nextButtonName}</button> : null}

      {firstStep ? <button type="button" className="btn btn-headline first-step" onClick={firstStep}><FontAwesomeIcon icon={faEdit} /> Javítom</button> : null}

      {children}
    </div>
  )
}
