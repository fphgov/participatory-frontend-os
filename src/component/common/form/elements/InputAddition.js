import React, { useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons"

export default function InputAddition({ id, name, placeholder, value, invalid, onAdd, onRemove, onChange, onBlur }) {
  const radioRef = useRef(null)

  return (
    <div className="link-elem">
      <div className="link-elem-input-wrapper">
        {onRemove ? <>
          <div className="link-elem-result">
            <a href={value} target="_blank">{value}</a>

            <button onClick={onRemove} title="Eltávolítás"><FontAwesomeIcon icon={faTrash} /></button>
          </div>
        </> : null}

        {onAdd ? <>
          <input type="text"
            aria-describedby="links-help-text"
            aria-invalid={invalid ? true : false}
            autoCorrect="off"
            autoCapitalize="none"
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onChange={onChange} />

          <button onClick={onAdd} title="Hozzáadás"><FontAwesomeIcon icon={faPlusCircle} /></button>

          <div className="validator-info">
            <span id="links-help-text">{invalid}</span>
          </div>
        </> : null}
      </div>
    </div>
  )
}
