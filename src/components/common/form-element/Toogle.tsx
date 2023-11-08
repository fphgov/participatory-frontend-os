import React, { useRef } from 'react'

type ToggleProps = {
  id: string
  name: string
  value: string
  toggleValue: string|boolean|number
  tipp?: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
}

export default function Toggle({ id, name, value, toggleValue, tipp, handleChange }: ToggleProps) {
  const toggleRef = useRef(null)

  return (
    <div className={`toggle-inline ${toggleValue === value ? "active" : ""}`} onClick={() => { if (toggleRef && toggleRef.current) toggleRef.current.click() }}>
      <div className="toggle-inline-symbol">
        <div className="toggle-inline-hide"></div>

        <label htmlFor={name} className="toggle-switch">
          <span className="toggle-slider toggle-round"></span>
          <input
            type="checkbox"
            id={id}
            name={name}
            value={value}
            checked={toggleValue === value}
            ref={toggleRef}
            onChange={handleChange} />
        </label>
      </div>

      <div className="toggle-inline-content">
        {tipp ? <p>{tipp}</p> : null}
      </div>
    </div>
  )
}
