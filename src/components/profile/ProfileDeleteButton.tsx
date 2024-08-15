"use client"

import { useState } from "react"
import { apiProfileDelete } from "@/lib/api-requests";
import {useModalHardContext} from "@/context/modalHard";

export default function ProfileDeleteButton(): JSX.Element {
  const [ error, setError ] = useState()
  const { openModalHard, setOpenModalHard, setDataModalHard } = useModalHardContext()

  const deleteAccount = async () => {
    if (! confirm("Biztos törölni szeretnéd a fiókod?")) {
      return
    }

    try {
      const response = await apiProfileDelete()

      setDataModalHard({
        title: '',
        content: response?.message,
        showCancelButton: true
      })
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
    <button className="btn btn-primary-solid btn-solid-underline btn-trash" onClick={deleteAccount}>Fiók törlése</button>
  )
}
