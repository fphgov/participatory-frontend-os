import React from 'react'

type CheckboxProps = {
  id: string
  name: string
  label: string|React.ReactNode
  tipp?: string
}

export default function CheckboxUncontrolled({ id, name, label, tipp }: CheckboxProps) {
  return (
    <div className={`checkbox-inline`}>
      <div className="checkbox-inline-symbol formatted-checkbox formatted-checkbox-grid">
        <label htmlFor={name} className="checkbox-switch">
          <input
            type="checkbox"
            id={id}
            name={name}
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
