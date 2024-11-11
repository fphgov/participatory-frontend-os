import React from 'react'

type SelectOption = {
  value: string
  name: string
}

type SelectProps = {
  id?: string
  name: string
  value: any
  radioValue?: string|boolean|number
  title: string
  tipp?: string
  defaultValue?: string
  showLabel?: boolean
  dataList: SelectOption[]
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
  multiple?: boolean
}

export default function Select({ id, name, value = '', title, tipp, defaultValue = '0', showLabel = true, dataList, handleChange, multiple = false }: SelectProps) {
  return (
    <div className="input-wrapper">
      {showLabel ? <label htmlFor={name}>{title}</label> : null}

      {tipp && <div className="tipp">{tipp}</div>}

      <select multiple={multiple} className={(value.length === 0) ? "" : "valid"} defaultValue={defaultValue} name={name} id={id} value={value} onChange={handleChange}>
        {dataList.map((option, i) => {
          return (
            <option key={i} value={option.value}>{option.name}</option>
          )
        })}
      </select>
    </div>
  )
}
