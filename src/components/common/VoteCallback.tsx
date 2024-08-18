"use client"

import { sendVoteProject } from "@/app/actions"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useModalHardContext } from "@/context/modalHard"
import { useCallback, useEffect } from "react"
import { IVoteStatus } from "@/models/voteableProject.model"

type VoteCallbackProps = {
  loggedIn: boolean
  voteStatus: IVoteStatus
}

export default function VoteCallback({ loggedIn, voteStatus }: VoteCallbackProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { setOpenModalHard, setDataModalHard } = useModalHardContext()
  const vote = searchParams.get('vote')

  const removeVoteParam = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete('vote')

    return params.toString()
  }, [searchParams])

  const handleVote = () => {
    setOpenModalHard(false)

    if (vote) {
      setTimeout(() => {
        closeModal()
        sendVoteHandler(vote)
      }, 10)
    }
  }

  const closeModal = () => {
    setOpenModalHard(false)

    router.replace(`${pathname}?${removeVoteParam()}`)
  }

  function handleOpenConfirmationModal() {
    localStorage.removeItem('vote')

    setDataModalHard({
      title: 'Biztosan szavazol erre az ötletre?',
      content: <>
        <button type="button" className="btn btn-secondary" onClick={() => {
          handleVote()
        }}>
          Igen
        </button>
        <button type="button" className="btn btn-secondary btn-secondary-outline" onClick={() => {
          closeModal()
        }}>
          Nem
        </button>
      </>,
      showCancelButton: false
    })

    setOpenModalHard(true)
  }

  function handleOpenModal(title: string, count: number | string) {
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
            router.refresh()
          }}>
            Rendben
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

  async function sendVoteHandler(projectId: string) {
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
    const voteNum = vote !== null && !isNaN(Number(vote)) ? Number(vote) : null

    if (voteNum !== null && Number.isInteger(voteNum) && loggedIn) {
      handleOpenConfirmationModal()
      console.log(voteNum)
    }
  }, [vote, loggedIn])

  return (<></>)
}
