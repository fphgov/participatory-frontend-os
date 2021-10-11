import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretRight, faCaretLeft, faEdit } from "@fortawesome/free-solid-svg-icons"

export default function FormPaginator({ children, prevStep, nextStep, firstStep }) {
  return (
    <div className="navigation-wrapper">
      {prevStep ? <button className="prev-step" onClick={prevStep}><FontAwesomeIcon icon={faCaretLeft} />Előző</button> : null}
      {nextStep ? <button className="next-step" onClick={nextStep}>Következő <FontAwesomeIcon icon={faCaretRight} /></button> : null}

      {firstStep ? <button className="first-step" onClick={firstStep}><FontAwesomeIcon icon={faEdit} /> Javítom</button> : null}

      {children}
    </div>
  )
}
