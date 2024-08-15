"use client"

import { apiVote } from "@/lib/api-requests"
import { useCallback, useEffect, useState } from "react"
import Error from "@/components/common/Error"
import { useModalHardContext } from "@/context/modalHard"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

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
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const { openModalHard, setOpenModalHard, setDataModalHard } = useModalHardContext()

  const [voted, setVoted] = useState(false)
  const [error, setError] = useState('')

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set(name, value)

    return params.toString()
  }, [searchParams])

  const appendAuthParam = (projectId: number|string) => {
    router.replace(`${pathname}?${createQueryString('vote', String(projectId))}&${createQueryString('auth', 'authentication')}`)
  }

  function handleOpenModal(title: string, count: number|string) {
    setDataModalHard({
      title,
      content: `Ebben a kategóriában még ennyi szavazatod maradt: ${count}`,
      showCancelButton: true
    })

    setOpenModalHard(true)
    setVoted(true)
  }

  const sendVoteHandler = async (_token: string) => {
    if (! _token) {
      appendAuthParam(projectId)

      return
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
    if (voted && ! openModalHard) {
      router.refresh()
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
