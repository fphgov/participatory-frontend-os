"use client"

import { apiVote } from "@/lib/api-requests"
import { useEffect, useState } from "react"
import { useModalHardContext } from "@/context/modalHard"

type VoteButtonCardProps = {
  showVoteButton: boolean
  disableVoteButton: boolean
  errorVoteable: string
  token: string
  projectId: number|string
  onClickVote?: () => void
}

export default function VoteButtonCard({ showVoteButton, disableVoteButton, token, errorVoteable, projectId }: VoteButtonCardProps): JSX.Element {
  const { openModalHard, setOpenModalHard, setDataModalHard } = useModalHardContext()

  const [voted, setVoted] = useState(false)

  function handleOpenModal(title: string, count: number|string) {
    setDataModalHard({
      title,
      content: `Ebben a kategóriában még ennyi szavazatod maradt: ${count}`,
      showCancelButton: true
    })

    setOpenModalHard(true)
  }

  function handleOpenErrorModal(title: string, content: string = '') {
    setDataModalHard({
      title,
      content,
      showCancelButton: true
    })

    setOpenModalHard(true)
  }

  const sendVoteHandler = async (_token: string) => {
    if (! _token) {
      window.location.href = '/bejelentkezes?project=' + projectId
    }


    try {
      const response = await apiVote(projectId)

      if (response.message) {
        handleOpenModal(response.message, response?.data?.remainingVote?.[0]?.votes)
      }
    } catch (e: any) {
      console.log(e)

      if (typeof e?.message === "string") {
        handleOpenErrorModal(e.message)
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
        <button className={`btn btn-secondary ${disableVoteButton ? 'btn-disable' : ''}`} onClick={() => { if (!disableVoteButton) sendVoteHandler(token) }}>Szavazok</button>

        {errorVoteable ? <div className="vote-button-info-label">{errorVoteable}</div> : ''}
      </> : null}
    </>
  )
}
