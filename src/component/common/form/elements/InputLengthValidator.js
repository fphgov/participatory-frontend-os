import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"

export default function InputLengthValidator({ title, tipp, name, value, onChange, info, options }) {
  const titleIsInvalid = value.length !== 0 && (options.min > value.length || value.length > options.max)

  return (
    <div className="input-wrapper">
      <label htmlFor="title">{title}</label>

      <div className="tipp">{tipp}</div>

      <input type="text" className={(value.length === 0 || titleIsInvalid) ? "" : "valid"} aria-invalid={titleIsInvalid} autoCorrect="off" autoCapitalize="none" name={name} id={name} value={value} onChange={onChange} />

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
