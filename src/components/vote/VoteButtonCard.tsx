"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useModalHardContext } from "@/context/modalHard"
import { sendVoteProject } from '@/app/actions'
import { IVoteStatus } from "@/models/voteableProject.model"

type VoteButtonCardProps = {
  showVoteButton: boolean
  disableVoteButton: boolean
  errorVoteable: string
  token: string
  projectId: number|string
  onClickVote?: () => void
  voteStatus: IVoteStatus
}

export default function VoteButtonCard({
  showVoteButton,
  disableVoteButton,
  token, errorVoteable,
  projectId,
  voteStatus
}: VoteButtonCardProps): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const { openModalHard, setOpenModalHard, setDataModalHard } = useModalHardContext()
  const [voted, setVoted] = useState(false)

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
      localStorage.setItem('vote', projectId.toString())

      appendAuthParam()

      return
    }

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
