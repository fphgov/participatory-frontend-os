'use client'

import {useEffect, useRef, useState} from "react"
import Error from "@/components/common/Error"
import ErrorMini from '@/components/common/ErrorMini'
import { profileChangeNewsletterForm } from '@/app/actions'
import Checkbox from '@/components/common/form-element/Checkbox'
import { IUserPreference } from '@/models/userPreference.model'
import {useModalHardContext} from "@/context/modalHard";

type NewsletterChangeFormProps = {
  profilePreference: IUserPreference
}

export default function NewsletterChangeForm({ profilePreference }: NewsletterChangeFormProps): JSX.Element {
  const defaultFormData = {
    newsletter: profilePreference.newsletter,
  }

  const formRef = useRef<HTMLFormElement>(null)

  const [error, setError] = useState('')
  const [errorObject, setErrorObject] = useState<Record<string, string>|undefined>(undefined)
  const [formData, setFormData] = useState(defaultFormData)
  const { openModalHard, setOpenModalHard, setDataModalHard } = useModalHardContext()

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    setFormData({ ...formData, [e.target.name]: value })

    if (formRef.current) {
      if (formRef.current.requestSubmit) {
        formRef.current.requestSubmit()
      } else {
        formRef.current.submit()
      }
    }
  }

  async function onChangeNewsletter() {
    setError('')
    setErrorObject(undefined)

    formData.newsletter = !formData.newsletter;

    const res = await profileChangeNewsletterForm(formData)

    if (res?.success && res?.successMessage) {
      setDataModalHard({
        title: '',
        content: res.successMessage,
        showCancelButton: true
      })
    } else {
      if (res?.message) {
        setError(res.message)
      } else {
        setErrorObject(res.jsonError)
        setError(res.error)
      }

      setDataModalHard({
        title: '',
        content: '⛔️ Sikertelen hírlevél feliratkozás',
        showCancelButton: true
      })
    }

    setOpenModalHard(true)
  }

  return <>
    <form ref={formRef} className="" action={onChangeNewsletter}>
      <fieldset>
        {error ? <Error message={error} /> : null}

        <div className="form-wrapper">
          <div className="input-inline-wrapper">
            <div className="input-wrapper">
              <Checkbox
                id="newsletter"
                name="newsletter"
                label="Szeretnék feliratkozni a hírlevélre"
                handleChange={handleChangeInput}
                value={formData.newsletter}
              />

              {errorObject && errorObject.newsletter ? Object.values(errorObject.newsletter).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`newsletter-${i}`} />
              }) : null}
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  </>
}
