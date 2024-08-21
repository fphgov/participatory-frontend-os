'use client'

import { useState } from "react"
import Error from "@/components/common/Error"
import ErrorMini from '@/components/common/ErrorMini'
import { profileChangePasswordForm } from '@/app/actions'
import {useModalHardContext} from "@/context/modalHard";

export default function PasswordChangeForm(): JSX.Element {
  const defaultCredential = {
    password: '',
    password_again: '',
  }

  const [error, setError] = useState('')
  const [errorObject, setErrorObject] = useState<Record<string, string>|undefined>(undefined)
  const [credential, setCredential] = useState(defaultCredential)
  const { openModalHard, setOpenModalHard, setDataModalHard } = useModalHardContext()

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    setCredential({ ...credential, [e.target.name]: value })
  }

  async function onChangePassword() {
    setError('')
    setErrorObject(undefined)

    const res = await profileChangePasswordForm(credential)

    if (res?.success) {
      setCredential(defaultCredential)

      if (res?.successMessage) {
        setDataModalHard({
          title: '',
          content: res.successMessage,
          showCancelButton: true
        })

        setOpenModalHard(true)
      }
    } else {
      if (res?.message) {
        setError(res.message)
      } else {
        setErrorObject(res.jsonError)
        setError(res.error)
      }
    }
  }

  return <>
    <form className="form-horizontal" action={onChangePassword}>
      <fieldset>
        {error ? <Error message={error} /> : null}

        <div className="form-wrapper">
          <div className="input-inline-wrapper">
            <div className="input-wrapper">
              <label htmlFor="password">Új jelszó:</label>
              <input type="password" name="password" id="password" value={credential.password} onChange={handleChangeInput} />

              {errorObject && errorObject.password ? Object.values(errorObject.password).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`password-${i}`} />
              }) : null}
            </div>

            <div className="input-wrapper">
              <label htmlFor="password_again">Új jelszó ismét:</label>
              <input type="password" name="password_again" id="password_again" value={credential.password_again} onChange={handleChangeInput} />

              {errorObject && errorObject.password_again ? Object.values(errorObject.password_again).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`password_again-${i}`} />
              }) : null}
            </div>
          </div>

          <div className="btn-wrapper" style={{ marginTop: 24 }}>
            <button type="submit" className="btn btn-primary">Módosítás</button>
          </div>
        </div>

      </fieldset>
    </form>
  </>
}
