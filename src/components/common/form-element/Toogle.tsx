import React from 'react'

type ToggleProps = {
  id: string
  name: string
  value: boolean
  tipp?: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
}

export default function Toggle({ id, name, value, tipp, handleChange }: ToggleProps) {
  const isToggled = value.toString() === "true"

  return (
    <div className={`toggle-inline`}>
      <div className="toggle-inline-symbol">
        <label htmlFor={name} className="toggle-switch">
          <input
            type="checkbox"
            id={id}
            name={name}
            value={value.toString()}
            checked={isToggled}
            onChange={handleChange}
          />
          <span className="toggle-slider toggle-round"></span>
        </label>
      </div>

      <div className="toggle-inline-content">
        {tipp ? <>{tipp}</> : null}
      </div>
    </div>
  )
}
