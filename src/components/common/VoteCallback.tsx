"use client"

import {sendVoteProject} from "@/app/actions";
import {usePathname, useRouter, useSearchParams} from "next/navigation"
import {useModalHardContext} from "@/context/modalHard";
import {useCallback} from "react";

type VoteCallbackProps = {
  loggedIn: boolean
}

export default function VoteCallback({loggedIn}: VoteCallbackProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const {setOpenModalHard, setDataModalHard} = useModalHardContext()
  const vote = searchParams.get('vote')

  function handleOpenModal(title: string, count: number | string) {
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

  const removeVoteParam = useCallback(
    () => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('vote')

      return params.toString()
    },
    [searchParams]
  )

  async function sendVoteHandler(projectId: string) {
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

  if (loggedIn && !vote && localStorage.getItem('vote')) {
    sendVoteHandler(localStorage.getItem('vote') || '')
    localStorage.removeItem('vote')
  }

  if (vote && !searchParams.get('auth')) {
    localStorage.setItem('vote', searchParams.get('vote') || '')
    router.push(`${pathname}?${removeVoteParam()}`)
  }

  return (<></>)
}
