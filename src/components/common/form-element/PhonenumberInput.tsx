import React from 'react'
import ReactIntlTelInput from 'react-intl-tel-input-v2';
import 'intl-tel-input/build/css/intlTelInput.css';

export type PhonenumberValue = {
  iso2: string
  dialCode: string
  phone: string
}

type PhonenumberInputProps = {
  id: string
  name: string
  value: PhonenumberValue
  label?: string|React.ReactNode
  tipp?: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
}

export default function PhonenumberInput({ id, name, value, label, tipp,  handleChange }: PhonenumberInputProps) {
  const inputProps = {
    placeholder: '0011112222',
  };

  const intlTelOpts = {
    preferredCountries: ['hu'],
    autoPlaceholder: "aggressive"
  };

  return (
    <div className={`phone-inline`}>
      <div className="phone-inline-symbol formatted-phone">
        {label ? <label htmlFor={name} className="phone-switch">
          {label}
        </label> : null}

        <ReactIntlTelInput
          inputProps={inputProps}
          intlTelOpts={intlTelOpts}
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
