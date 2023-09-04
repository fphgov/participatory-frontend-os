"use client"

import { useEffect, useState } from "react"

type VoteLocationFilterProps = {
  baseUrl: string
  searchParams: Record<string, string>
}

export default function VoteLocationFilter({ baseUrl, searchParams }: VoteLocationFilterProps): JSX.Element {
  const [location, setLocation] = useState(searchParams?.location || '')

  const changeHandler = (e: any) => {
    const newSearchParams = { ...searchParams }

    delete newSearchParams['page']

    const params : { [x: string]: string } = { ...newSearchParams, location: e.target.value }

    const urlSearchParams = new URLSearchParams(params)

    window.location.href = baseUrl + '?' + urlSearchParams.toString()
  }

  useEffect(() => {
    setLocation(searchParams?.location || '')
  }, [searchParams])

  return (
    <div className="custom-select-wrapper vote-order-filter-wrapper">
      <label htmlFor="order">Kerület:</label>

      <select id="order" name="order" onChange={changeHandler} value={location}>
        <option value="">Szűrés kerület alapján</option>
        <option value="AREA1">I. kerület</option>
        <option value="AREA2">II. kerület</option>
        <option value="AREA3">III. kerület</option>
        <option value="AREA4">IV. kerület</option>
        <option value="AREA5">V. kerület</option>
        <option value="AREA6">VI. kerület</option>
        <option value="AREA7">VII. kerület</option>
        <option value="AREA8">VIII. kerület</option>
        <option value="AREA9">IX. kerület</option>
        <option value="AREA10">X. kerület</option>
        <option value="AREA11">XI. kerület</option>
        <option value="AREA12">XII. kerület</option>
        <option value="AREA13">XIII. kerület</option>
        <option value="AREA14">XIV. kerület</option>
        <option value="AREA15">XV. kerület</option>
        <option value="AREA16">XVI. kerület</option>
        <option value="AREA17">XVII. kerület</option>
        <option value="AREA18">XVIII. kerület</option>
        <option value="AREA19">XIX. kerület</option>
        <option value="AREA20">XX. kerület</option>
        <option value="AREA21">XXI. kerület</option>
        <option value="AREA22">XXII. kerület</option>
        <option value="AREA23">XXIII. kerület</option>
      </select>
    </div>
  )
}
