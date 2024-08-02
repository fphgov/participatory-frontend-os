"use client"

import { useState } from "react"
import { toast } from "react-toastify";
import { apiProfileDelete } from "@/lib/api-requests";

export default function ProfileDeleteButton(): JSX.Element {
  const [ error, setError ] = useState()

  const notify = (message: string) => toast.dark(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const deleteAccount = async () => {
    if (! confirm("Biztos törölni szeretnéd a fiókod?")) {
      return
    }

    try {
      const response = await apiProfileDelete()

      notify(response?.message)
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.errors) {
        setError(e.response.data.errors)
      }

      notify('⛔️ Sikertelen fiók törlés')
    }
  }

  return (
    <button className="btn btn-primary-solid btn-solid-underline btn-trash" onClick={deleteAccount}>Fiók törlése</button>
  )
}
