"use client"

import { useCallback, useEffect, useState } from "react"
import Error from "@/components/common/Error"
import { useModalHardContext } from "@/context/modalHard"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { sendVoteProject } from "@/app/actions"
import { IVoteStatus } from "@/models/voteableProject.model"

type VoteButtonProps = {
  showVoteButton: boolean
  disableVoteButton: boolean
  errorVoteable: string
  token: string
  projectId: number|string
  style?: 'default' | 'background' | 'hero'
  onClickVote?: () => void
  voteStatus: IVoteStatus
}

export default function VoteButton({
  showVoteButton,
  disableVoteButton,
  token,
  errorVoteable,
  projectId,
  voteStatus,
  style = 'default'
}: VoteButtonProps): JSX.Element {
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

  const appendAuthParam = () => {
    router.replace(`${pathname}?${createQueryString('auth', 'authentication')}`)
  }

  function handleOpenModal(title: string, count: number|string) {
    const content = count === 0 ?
      (
        <>
          <div>Ebben a kategóriában az összes szavazatodat leadtad</div>
          <button type="button" className="btn btn-secondary" onClick={() => {
            setOpenModalHard(false)
            router.replace(`/szavazas-inditasa`)
          }}>
            Kategóriát választok
          </button>
        </>
      ) :
      (
        <>Ebben a kategóriában még ennyi szavazatod maradt: {count}</>
      )

    setDataModalHard({
      title,
      content,
      showCancelButton: (count !== 0)
    })

    setOpenModalHard(true)
    setVoted(true)
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
      localStorage.setItem('vote', projectId.toString())

      appendAuthParam()

      return
    }

    setError('')

    try {
      const response = await sendVoteProject(projectId)

      if (response.successMessage) {
        const voteablesCount: number = typeof voteStatus === 'object' ? (voteStatus?.data?.voteables_count ?? 2) - 1 : 1

        if (voteablesCount === 0) {
          setDataModalHard({
            title: 'Köszönjük',
            content: (
              <>
                <div>Köszönjük, hogy részt vettél a közösségi költségvetés szavazásában!</div>
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setOpenModalHard(false)
                  router.replace(`/`)
                }}>
                  Vissza a főoldalra
                </button>
              </>
            ),
            showCancelButton: false
          })

          setOpenModalHard(true)
        } else {
          handleOpenModal(response.successMessage, response?.data?.remainingVote?.[0]?.votes)
        }
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
