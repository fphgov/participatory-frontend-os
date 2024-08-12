"use client"

import { useEffect, useState } from "react"
import { useModalHardContext } from "@/context/modalHard"
import { useRouter } from "next/navigation";
import { sendVoteProject } from '@/app/actions'

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
  const router = useRouter()
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

  const sendVoteHandler = async () => {
    if (! token) {
      const urlParams = new URLSearchParams(window.location.search)

      urlParams.append('auth', 'authentication')

      window.location.href = window.location.pathname + '?' + urlParams.toString()
    }

    try {
      const response = await sendVoteProject(projectId)

      if (response.successMessage) {
        handleOpenModal(response.successMessage, response?.data?.remainingVote?.[0]?.votes)
      } else if (response.error) {
        handleOpenErrorModal(response.error)
      } else if (response.message) {
        handleOpenErrorModal(response.message)
      }
    } catch (e: any) {
      if (typeof e?.response?.error === "string") {
        handleOpenErrorModal(e.response.error)
      }
    }
  }

  useEffect(() => {
    if (! disableVoteButton && openModalHard) {
      setVoted(true)
    }
  }, [openModalHard, disableVoteButton])

  return (
    <>
      {showVoteButton ? <>
        <button className={`btn btn-secondary ${disableVoteButton ? 'btn-disable' : ''}`} onClick={() => { if (!disableVoteButton) sendVoteHandler() }}>Szavazok</button>

        {errorVoteable ? <div className="vote-button-info-label">{errorVoteable}</div> : ''}
      </> : null}
    </>
  )
}
