"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useModalHardContext } from "@/context/modalHard"
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
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const { openModalHard, setOpenModalHard, setDataModalHard } = useModalHardContext()
  const [voted, setVoted] = useState(false)

  const createQueryString = useCallback(
    (projectId: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('vote', projectId)
      params.set('auth', 'authentication')

      return params.toString()
    },
    [searchParams]
  )

  const appendAuthParam = (projectId: string|number) => {
    router.replace(`${pathname}?${createQueryString(String(projectId))}`)
  }

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
      appendAuthParam(projectId)

      return
    }

    try {
      const response = await sendVoteProject(projectId)

      if (response.successMessage) {
        handleOpenModal(response.successMessage, response?.data?.remainingVote?.[0]?.votes)

        router.refresh()
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
