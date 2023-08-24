"use client"

import { useState } from "react"

type VoteSearchInputProps = {
  searchParams: Record<string, string>
  baseUrl: string
}

export default function VoteSearchInput({ baseUrl, searchParams }: VoteSearchInputProps): JSX.Element {
  const [query, setQuery] = useState('')

  const submitForm = (e: any) => {
    e.preventDefault()

    const urlSearchParams = new URLSearchParams(searchParams)

    urlSearchParams.append('query', query)

    window.location.href = baseUrl + '?' + urlSearchParams.toString()
  }

  return (
    <div className="vote-search-input-wrapper">
      <form onClick={submitForm}>
        <input type="text" name="search" placeholder="Keresés..." value={query} onChange={(e) => { setQuery(e.target.value) }} />
        <input type="submit" value=" " />
      </form>
    </div>
  )
}
