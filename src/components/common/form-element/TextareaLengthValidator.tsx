import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"

type InputLengthOption = {
  min: number
  max: number
}

type TextareaLengthValidatorProps = {
  title: string
  tipp?: string
  name: string
  value: string
  info?: string
  showLabel?: boolean
  options: InputLengthOption
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function TextareaLengthValidator({ title, tipp, name, value = '', onChange, info, showLabel = true, options }: TextareaLengthValidatorProps) {
  const titleIsInvalid = value.length !== 0 && (options.min > value.length || value.length > options.max)

  return (
    <div className="input-wrapper">
      {showLabel ? <label htmlFor={name}>{title}</label> : null}

      <div className="tipp">{tipp}</div>

      <textarea aria-invalid={titleIsInvalid} autoCorrect="off" autoCapitalize="none" name={name} id={name} value={value} onChange={onChange} />

      <div className="validator-info">
        <div className="validator-info-elem">
          <span className={`info-text ${value.length == 0 ? 'info-text-empty' : ''}`}>
            {options.min && titleIsInvalid ? <>Még nem érted el a minimum {options.min} karaktert</> : null}
          </span>
        </div>

        <div className="validator-info-elem">
          <span id="links-help-text">{info ?? ' '}</span>
          <span className={`info-text ${value.length == 0 ? 'info-text-empty' : ''}`}>
            {value.length}/{options.max} karakter
            {value.length ? <>
              {titleIsInvalid ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faCheck} />}
            </> : null}
          </span>
        </div>
      </div>
    </div>
  )
}
