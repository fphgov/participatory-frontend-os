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
  voteStatus: any
}

export default function VoteButtonCard({ showVoteButton, disableVoteButton, token, errorVoteable, projectId, voteStatus }: VoteButtonCardProps): JSX.Element {
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
    const content = count === 0 ?
      (
        <>
          <p>Ebben a kategóriában az összes szavazatodat leadtad</p>
          <button type="button" className="btn btn-secondary" onClick={() => {
            setOpenModalHard(false)
            router.replace(`/szavazas-inditasa`)
          }}>
            Kategóriát választok
          </button>
        </>
      ) :
      (
        <>
          <p>Ebben a kategóriában még ennyi szavazatod maradt: {count}</p>
        </>
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
      appendAuthParam(projectId)

      return
    }

    try {
      const response = await sendVoteProject(projectId)

      if (response.successMessage) {
        const voteablesCount: number = (voteStatus?.data?.voteables_count ?? 2) -1
        if (voteablesCount === 0) {
          setDataModalHard({
            title: 'Köszönjük',
            content: (
              <>
                <p>Az utolsó szavazatodat is leadtad. Köszönjük.</p>
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
