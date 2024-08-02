"use client"

import { apiVote } from "@/lib/api-requests"
import { useEffect, useState } from "react"
import Error from "@/components/common/Error"
import { useModalHardContext } from "@/context/modalHard"

type VoteButtonProps = {
  showVoteButton: boolean
  disableVoteButton: boolean
  errorVoteable: string
  token: string
  projectId: number|string
  style?: 'default' | 'background' | 'hero'
  onClickVote?: () => void
}

export default function VoteButton({ showVoteButton, disableVoteButton, token, errorVoteable, projectId, style = 'default' }: VoteButtonProps): JSX.Element {
  const { openModalHard, setOpenModalHard, setDataModalHard } = useModalHardContext()

  const [voted, setVoted] = useState(false)
  const [error, setError] = useState('')

  function handleOpenModal(title: string, count: number|string) {
    setDataModalHard({
      title,
      content: `Ebben a kategóriában még ennyi szavazatod maradt: ${count}`,
    })

    setOpenModalHard(true)
  }

  const sendVoteHandler = async (_token: string) => {
    if (! _token) {
      window.location.href = '/bejelentkezes?project=' + projectId
    }

    setError('')

    try {
      const response = await apiVote(projectId)

      if (response.message) {
        handleOpenModal(response.message, response?.data?.remainingVote?.[0]?.votes)
      }
    } catch (e: any) {
      if (typeof e?.message === "string") {
        setError(e.message)
      }
    }
  }

  useEffect(() => {
    if (! disableVoteButton && openModalHard) {
      setVoted(true)
    }
  }, [openModalHard, disableVoteButton])

  useEffect(() => {
    if (voted && ! openModalHard) {
      window.location.reload();
    }
  }, [voted, openModalHard])

  return (
    <>
      {showVoteButton ? <>
        {error ? <Error message={error} /> : null}

        <div className={`vote-button-wrapper vote-wrapper-style-${style} ${disableVoteButton ? 'vote-wrapper-disable' : ''}`}>
          <button className={`btn btn-primary btn-headline btn-next btn-vote ${disableVoteButton ? 'btn-disable' : ''}`} onClick={() => { if (!disableVoteButton) sendVoteHandler(token) }}>Szavazok</button>

          {errorVoteable ? <div className="vote-button-info-label">{errorVoteable}</div> : ''}
        </div>
      </> : null}
    </>
  )
}
