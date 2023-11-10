import React from 'react'

type CheckboxProps = {
  id: string
  name: string
  value: boolean
  label: string|React.ReactNode
  tipp?: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
}

export default function Checkbox({ id, name, value, label, tipp, handleChange }: CheckboxProps) {
  const isChecked = value?.toString() === "true"

  return (
    <div className={`checkbox-inline`}>
      <div className="checkbox-inline-symbol formatted-checkbox">
        <label htmlFor={name} className="checkbox-switch">
          <input
            type="checkbox"
            id={id}
            name={name}
            value={value?.toString()}
            checked={isChecked}
            onChange={handleChange}
          />
          <span className="checkbox-tick tick"></span>
          {label}
        </label>
      </div>

      <div className="checkbox-inline-content">
        {tipp ? <p>{tipp}</p> : null}
      </div>
    </div>
  )
}
