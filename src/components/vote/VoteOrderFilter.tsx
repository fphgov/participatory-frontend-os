"use client"

import { useEffect, useState } from "react"

type VoteOrderFilterProps = {
  baseUrl: string
  searchParams: Record<string, string>
}

export default function VoteOrderFilter({ baseUrl, searchParams }: VoteOrderFilterProps): JSX.Element {
  const [orderBy, setOrderBy] = useState(searchParams?.orderBy || '')

  const changeHandler = (e: any) => {
    const newSearchParams = { ...searchParams }

    delete newSearchParams['page']

    const params : { [x: string]: string } = { ...newSearchParams, orderBy: e.target.value }

    if (e.target.value === 'random') {
      delete params['orderBy']
    }

    const urlSearchParams = new URLSearchParams(params)

    window.location.href = baseUrl + '?' + urlSearchParams.toString()
  }

  useEffect(() => {
    setOrderBy(searchParams?.orderBy || '')
  }, [searchParams])

  return (
    <div className="vote-order-filter-wrapper">
      <label htmlFor="order">Rendezés:</label>

      <select id="order" name="order" onChange={changeHandler} value={orderBy}>
        <option value="random"><span>Véletlenszerűen</span></option>
        <option value="vote"><span>Szavazás szerint</span></option>
      </select>
    </div>
  )
}
