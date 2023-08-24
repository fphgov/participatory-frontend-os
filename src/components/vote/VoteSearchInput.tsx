"use client"

import { useEffect, useState } from "react"

type VoteSearchInputProps = {
  searchParams: Record<string, string>
  baseUrl: string
}

export default function VoteSearchInput({ baseUrl, searchParams }: VoteSearchInputProps): JSX.Element {
  const [query, setQuery] = useState(searchParams?.query || '')

  const submitForm = (e: any) => {
    e.preventDefault()

    const newSearchParams = { ...searchParams }

    delete newSearchParams['page']

    const urlSearchParams = new URLSearchParams({ ...newSearchParams, query })

    window.location.href = baseUrl + '?' + urlSearchParams.toString()
  }

  useEffect(() => {
    setQuery(searchParams?.query || '')
  }, [searchParams])

  return (
    <div className="vote-search-input-wrapper">
      <form onSubmit={submitForm}>
        <input type="text" name="search" placeholder="Keresés..." value={query} onChange={(e) => { setQuery(e.target.value) }} />

        <input type="submit" value=" " />
      </form>
    </div>
  )
}
