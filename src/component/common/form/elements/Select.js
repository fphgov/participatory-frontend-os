import React from 'react'

export default function Select({ id, name, value, title, tipp, defaultValue = '0', dataList, handleChange }) {
  return (
    <div className="input-wrapper">
      <label htmlFor="title">{title}</label>

      <div className="tipp">{tipp}</div>

      <select className={(value.length === 0) ? "" : "valid"} defaultValue={defaultValue} name={name} id={id} value={value} onChange={handleChange}>
        {dataList.map((option, i) => {
          return (
            <option key={i} value={option.value}>{option.name}</option>
          )
        })}
      </select>
    </div>
  )
}
