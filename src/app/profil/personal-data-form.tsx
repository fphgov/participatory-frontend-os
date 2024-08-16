'use client'

import { useState } from "react"
import Error from "@/components/common/Error"
import ErrorMini from '@/components/common/ErrorMini'
import { profilePersonalForm } from '@/app/actions'
import { IUserPreference } from '@/models/userPreference.model'
import {useModalHardContext} from "@/context/modalHard";

type PersonalDataFormProps = {
  profilePreference: IUserPreference
}

export default function PersonalDataForm({ profilePreference }: PersonalDataFormProps): JSX.Element {
  const [error, setError] = useState('')
  const [errorObject, setErrorObject] = useState<Record<string, string>|undefined>(undefined)
  const [formData, setFormData] = useState(profilePreference)
  const { openModalHard, setOpenModalHard, setDataModalHard } = useModalHardContext()

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    setFormData({ ...formData, [e.target.name]: value })
  }

  async function onChangePersonalData(e: any) {
    setError('')
    setErrorObject(undefined)

    const res = await profilePersonalForm(formData)

    if (res?.success) {
      if (res?.successMessage) {
        setDataModalHard({
          title: '',
          content: res.successMessage,
          showCancelButton: true
        })
      }
    } else {
      if (res?.message) {
        setError(res.message)
      } else {
        setErrorObject(res.jsonError)
        setError(res.error)
      }
    }

    setOpenModalHard(true)
  }

  return <>
    <form className="form-horizontal" action={onChangePersonalData}>
      <fieldset>
        {error ? <Error message={error} /> : null}

        <div className="form-wrapper">
          <div className="input-inline-wrapper">
            <div className="input-wrapper">
              <label htmlFor="birthyear">Születési év:</label>
              <input type="text" name="birthyear" id="birthyear" placeholder="ÉÉÉÉ" value={formData.birthyear} onChange={handleChangeInput} />

              {errorObject && errorObject.birthyear ? Object.values(errorObject.birthyear).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`birthyear-${i}`} />
              }) : null}
            </div>

            <div className="input-wrapper">
              <label htmlFor="postalCode">Irányítószám:</label>
              <input type="text" name="postalCode" id="postalCode" placeholder="Pl.: 1234" value={formData.postalCode} onChange={handleChangeInput} />

              {errorObject && errorObject.postal_code ? Object.values(errorObject.postal_code).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`postal_code-${i}`} />
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
