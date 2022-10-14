import React, { useRef } from 'react'

export default function CardRadio({ id, name, value, radioValue, title, tipp, handleChange }) {
  const radioRef = useRef(null)

  return (
    <div className={`radio-card ${radioValue === value ? "active" : ""}`} onClick={() => { if (radioRef && radioRef.current) radioRef.current.click() }}>
      <div className="radio-card-content">
        <label htmlFor={id}>{title}</label>

        {tipp ? <p className="tipp">{tipp}</p> : null}
      </div>

      <div className="radio-card-symbol-wrapper">
        <div className="radio-card-symbol">
          <div className="radio-card-hide"></div>
          <input
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={radioValue === value}
            ref={radioRef}
            onChange={handleChange} />
        </div>
      </div>
    </div>
  )
}
