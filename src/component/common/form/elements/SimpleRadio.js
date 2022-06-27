import React, { useRef } from 'react'

export default function VoteRadio({ id, name, value, radioValue, title, tipp, handleChange }) {
  const radioRef = useRef(null)

  return (
    <div className={`radio-inline ${radioValue === value ? "active" : ""}`} onClick={() => { if (radioRef && radioRef.current) radioRef.current.click() }}>
      <div className="radio-inline-symbol">
        <div className="radio-inline-hide"></div>
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={radioValue === value}
          ref={radioRef}
          onChange={handleChange} />
      </div>
      <div className="radio-inline-content">
        <label htmlFor={id}>{title}</label>

        {tipp ? <p className="tipp">{tipp}</p> : null}
      </div>
    </div>
  )
}
