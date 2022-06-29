import React, { useRef, useState } from 'react'
import nFormatter from '../../../assets/nFormatter'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons"

export default function VoteRadio({ id, name, value, radioValue, title, tipp, price, details, handleChange, onClickArea }) {
  const radioRef = useRef(null)
  const isChecked = radioValue.toString() === value.toString()

  const [isOpen, setIsOpen] = useState(false)

  const handleSummary = (e) => {
    e.preventDefault()

    setIsOpen(!isOpen)
  }

  return (
    <div className={`radio-inline radio-inline-vote ${isChecked ? "active" : ""} ${isOpen ? 'open' : ""}`}>
      <div className="radio-click-area" onClick={() => {
        if (radioRef && radioRef.current && handleChange !== null) {
          radioRef.current.click()
        }

        if (typeof onClickArea === "function") {
          onClickArea()
        }
      }}>
        <div className="radio-inline-symbol">
          <div className="radio-inline-hide"></div>
          <input
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={isChecked}
            ref={radioRef}
            onChange={handleChange ? handleChange : () => {}} />
        </div>
        <div className="radio-inline-content">
          <label htmlFor={id}>{title}</label>

          <p className="tipp">Becsült költség: <b>{price ? nFormatter(price) : '-'}</b></p>
          {tipp ? <p className="tipp">{tipp}</p> : null}
        </div>
      </div>

      <div className="radio-details">
        <details open={isOpen}>
          <summary onClick={handleSummary}><FontAwesomeIcon icon={faChevronCircleDown} /> Bővebben</summary>

          {details}
        </details>
      </div>
    </div>
  )
}
