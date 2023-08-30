"use client"

import { apiVote } from "@/lib/api-requests"
import { useState } from "react"
import Error from "@/components/common/Error"

type VoteButtonProps = {
  showVoteButton: boolean
  disableVoteButton: boolean
  errorVoteable: string
  token: string
  projectId: number|string
  onClickVote?: () => void
}

export default function VoteButton({ showVoteButton, disableVoteButton, token, errorVoteable, projectId }: VoteButtonProps): JSX.Element {
  const [error, setError] = useState('')

  const sendVoteHandler = async (_token: string) => {
    if (! _token) {
      window.location.href = '/bejelentkezes?project=' + projectId
    }

    setError('')

    try {
      const response = await apiVote(projectId)

      if (response.message) {
        window.location.href = '/szavazas-sikeres'
      }
    } catch (e: any) {
      if (typeof e?.message === "string") {
        setError(e.message)
      }
    }
  }

  return (
    <>
      {showVoteButton ? <>
        {error ? <Error message={error} /> : null}

        <div className="vote-button-wrapper">
          <button className={`btn btn-primary btn-headline btn-next btn-vote ${disableVoteButton ? 'btn-disable' : ''}`} onClick={() => { if (!disableVoteButton) sendVoteHandler(token) }}>Szavazok erre az ötletre</button>

          {errorVoteable ? <div className="vote-button-info-label">{errorVoteable}</div> : ''}
        </div>
      </> : null}
    </>
  )
}
