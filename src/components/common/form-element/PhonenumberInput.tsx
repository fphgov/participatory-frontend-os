import React from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {E164Number} from "libphonenumber-js";


export type PhonenumberValue = {
  iso2: string
  dialCode: string
  phone: string
}

type PhonenumberInputProps = {
  id: string
  name: string
  value: E164Number
  label?: string|React.ReactNode
  tipp?: string
  handleChange: (phoneObject?: E164Number | undefined) => void
}

export default function PhonenumberInput({ id, name, value, label, tipp,  handleChange }: PhonenumberInputProps) {
  return (
    <div className={`phone-inline`}>
      <div className="phone-inline-symbol formatted-phone">
        {label ? <label htmlFor={name} className="phone-switch">
          {label}
        </label> : null}

        <PhoneInput
          id={id}
          defaultCountry="HU"
          placeholder="001112222"
          value={value}
          onChange={handleChange}
        />
      </div>

      <div className="phone-inline-content">
        {tipp ? <p>{tipp}</p> : null}
      </div>
    </div>
  )
}
