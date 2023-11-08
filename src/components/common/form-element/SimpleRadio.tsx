import React, { useRef } from 'react'

type SimpleRadioProps = {
  id: string
  name: string
  value: string
  radioValue: string|boolean|number
  title: string
  tipp?: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
}

export default function SimpleRadio({ id, name, value, radioValue, title, tipp, handleChange }: SimpleRadioProps) {
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

        {tipp ? <p>{tipp}</p> : null}
      </div>
    </div>
  )
}
