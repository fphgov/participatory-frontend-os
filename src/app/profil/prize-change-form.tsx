'use client'

import { ToastContainer, toast } from 'react-toastify'
import { useRef, useState } from "react"
import Error from "@/components/common/Error"
import ErrorMini from '@/components/common/ErrorMini'
import { profileChangePrizeForm } from '@/app/actions'
import Checkbox from '@/components/common/form-element/Checkbox'
import { IUserPreference } from '@/models/userPreference.model'

type PrizeChangeFormmProps = {
  profilePreference: IUserPreference
}

export default function PrizeChangeForm({ profilePreference }: PrizeChangeFormmProps): JSX.Element {
  const defaultFormData = {
    prize: profilePreference.prize,
  }

  const formRef = useRef<HTMLFormElement>(null)

  const [error, setError] = useState('')
  const [errorObject, setErrorObject] = useState<Record<string, string>|undefined>(undefined)
  const [formData, setFormData] = useState(defaultFormData)

  const notify = (message: string) => toast.dark(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    setFormData({ ...formData, [e.target.name]: value })

    if (formRef.current) {
      formRef.current.requestSubmit()
    }
  }

  async function onChangePrize() {
    setError('')
    setErrorObject(undefined)

    const res = await profileChangePrizeForm(formData)

    if (res?.success && res?.successMessage) {
      notify(res.successMessage)
    } else {
      if (res?.message) {
        setError(res.message)
      } else {
        setErrorObject(res.jsonError)
        setError(res.error)
      }

      notify('⛔️ Sikertelen nyereményjáték részvétel módosítás')
    }
  }

  return <>
    <form ref={formRef} className="" action={onChangePrize}>
      <fieldset>
        {error ? <Error message={error} /> : null}

        <div className="form-wrapper">
          <div className="input-inline-wrapper">
            <div className="input-wrapper">
              <Checkbox
                id="prize"
                name="prize"
                label="Szeretnék részt venni a nyereményjátékban"
                handleChange={handleChangeInput}
                value={formData.prize}
              />

              {errorObject && errorObject.prize ? Object.values(errorObject.prize).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`prize-${i}`} />
              }) : null}
            </div>
          </div>
        </div>
      </fieldset>
    </form>

    <ToastContainer />
  </>
}
