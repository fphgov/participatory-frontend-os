import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretRight, faCaretLeft, faEdit } from "@fortawesome/free-solid-svg-icons"

export default function FormPaginator({ children, prevStep, nextStep, firstStep, nextStepInvalid = false, nextButtonName = 'Következő' }) {
  return (
    <div className="navigation-wrapper">
      {prevStep ? <button type="button" className="prev-step" onClick={prevStep}><FontAwesomeIcon icon={faCaretLeft} />Előző</button> : null}
      {nextStep ? <button type="button" className="next-step" onClick={nextStep} disabled={nextStepInvalid} >{nextButtonName} <FontAwesomeIcon icon={faCaretRight} /></button> : null}

      {firstStep ? <button type="button" className="first-step" onClick={firstStep}><FontAwesomeIcon icon={faEdit} /> Javítom</button> : null}

      {children}
    </div>
  )
}
