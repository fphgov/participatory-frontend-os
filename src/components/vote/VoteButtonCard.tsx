"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useModalHardContext } from "@/context/modalHard"
import { sendVoteProject } from '@/app/actions'
import { IVoteStatus } from "@/models/voteableProject.model"
import Link from "next/link"

type VoteButtonCardProps = {
  showVoteButton: boolean
  disableVoteButton: boolean
  errorVoteable: string
  token: string|null
  projectId: number|string
  onClickVote?: () => void
  voteStatus: IVoteStatus
  theme: string
  rand: string
}

export default function VoteButtonCard({
  showVoteButton,
  disableVoteButton,
  token,
  errorVoteable,
  projectId,
  voteStatus,
  theme,
  rand,
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
        <>
          <div>Ebben a kategóriában még ennyi szavazatod maradt: {count}</div>
          <button type="button" className="btn btn-secondary" onClick={() => {
            setOpenModalHard(false)
            router.replace(`/szavazas?theme=${theme}&rand=${rand}`)
          }}>
            Tovább szavazok
          </button>
        </>
      )

    setDataModalHard({
      title,
      content,
      showCancelButton: false
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
            title: 'Sikeresen leadtad az összes szavazatodat! Köszönjük, hogy részt vettél a szavazáson!',
            content: (
              <>
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setOpenModalHard(false)

                  window.location.href = 'https://forms.office.com/e/SwHUvaC42f?origin=lprLink'
                }}>
                  Mondd el véleményed
                </button>

                <Link href="/" className="btn btn-primary-solid btn-solid-padding">Most nem</Link>
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
