'use client'

import { ToastContainer, toast } from 'react-toastify'
import { useState } from "react"
import { apiProfileChangePassword } from "@/lib/api-requests"
import Error from "@/components/common/Error"
import ErrorMini from '@/components/common/ErrorMini'

export default function PasswordChangeForm(): JSX.Element {
  const defaultCredential = {
    password: '',
    password_again: '',
  }

  const [error, setError] = useState('')
  const [errorObject, setErrorObject] = useState<Record<string, string>|undefined>(undefined)
  const [credential, setCredential] = useState(defaultCredential)

  const notify = (message: string) => toast.dark(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    setCredential({ ...credential, [e.target.name]: value })
  }

  async function submitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setError('')
    setErrorObject(undefined)

    try {
      const response = await apiProfileChangePassword(credential)

      setCredential(defaultCredential)

      notify(response?.message)
    } catch (e: any) {
      try {
        const jsonError = JSON.parse(e.message)

        setErrorObject(jsonError)
      } catch (jError: any) {
        if (typeof e?.message === "string") {
          setError(e.message)
        }
      }

      notify('⛔️ Sikertelen jelszó módosítás')
    }
  }

  return <>
    <form className="form-horizontal" onSubmit={submitLogin}>
      <fieldset>
        {error ? <Error message={error} /> : null}

        <div className="form-wrapper">
          <div className="input-inline-wrapper">
            <div className="input-wrapper">
              <label htmlFor="password">Új jelszó</label>
              <input type="password" name="password" id="password" value={credential.password} onChange={handleChangeInput} />

              {errorObject && errorObject.password ? Object.values(errorObject.password).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`password-${i}`} />
              }) : null}
            </div>

            <div className="input-wrapper">
              <label htmlFor="password_again">Új jelszó ismét</label>
              <input type="password" name="password_again" id="password_again" value={credential.password_again} onChange={handleChangeInput} />

              {errorObject && errorObject.password_again ? Object.values(errorObject.password_again).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`password_again-${i}`} />
              }) : null}
            </div>
          </div>

          <div className="btn-wrapper" style={{ marginTop: 24 }}>
            <button type="submit" className="btn btn-gray">Módosítás</button>
          </div>
        </div>

      </fieldset>
    </form>

    <ToastContainer />
  </>
}
