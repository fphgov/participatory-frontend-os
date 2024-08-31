"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { apiProfileDelete } from "@/lib/api-requests"
import { useModalHardContext } from "@/context/modalHard"

export default function ProfileDeleteButton(): JSX.Element {
  const router = useRouter()
  const [ error, setError ] = useState()
  const { openModalHard, setOpenModalHard, setDataModalHard } = useModalHardContext()

  const confirmDeleteAccount = async () => {
    setDataModalHard({
      title: 'Biztosan szeretnéd törölni a profilodat?',
      content: <>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => { deleteAccount() }}
        >
          Igen
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-secondary-outline"
          onClick={() => { setOpenModalHard(false) }}
        >
          Nem
        </button>
      </>,
      showCancelButton: false
    })

    setOpenModalHard(true)
  }

  const deleteAccount = async () => {
    try {
      const response = await apiProfileDelete()

      setDataModalHard({
        title: response?.message,
        content: 'Hamarosan átirányítunk',
        showCancelButton: true
      })

      setTimeout(() => {
        router.replace('/kijelentkezes')
      }, 3 * 1000)
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.errors) {
        setError(e.response.data.errors)
      }

      setDataModalHard({
        title: '',
        content: '⛔️ Sikertelen fiók törlés',
        showCancelButton: true
      })
    }

    setOpenModalHard(true)
  }

  return (
    <button
      className="btn btn-primary-solid btn-solid-underline btn-trash"
      onClick={confirmDeleteAccount}
    >
      Fiók törlése
    </button>
  )
}
