'use client'

import { useState } from "react"
import Error from "@/components/common/Error"
import ErrorMini from '@/components/common/ErrorMini'
import { profileHearAboutForm } from '@/app/actions'
import { IUserPreference } from '@/models/userPreference.model'
import {useModalHardContext} from "@/context/modalHard";

type HearAboutFormProps = {
  profilePreference: IUserPreference
}

export default function HearAboutForm({ profilePreference }: HearAboutFormProps): JSX.Element {
  const [error, setError] = useState('')
  const [errorObject, setErrorObject] = useState<Record<string, string>|undefined>(undefined)
  const [formData, setFormData] = useState(profilePreference)
  const { openModalHard, setOpenModalHard, setDataModalHard } = useModalHardContext()

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    setFormData({ ...formData, [e.target.name]: value })
  }

  async function onChangeHearAbout(e: any) {
    setError('')
    setErrorObject(undefined)

    const res = await profileHearAboutForm(formData)

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

      setDataModalHard({
        title: '',
        content: '⛔️ Sikertelen módosítás',
        showCancelButton: true
      })
    }

    setOpenModalHard(true)
  }

  return <>
    <form className="form-horizontal" action={onChangeHearAbout}>
      <fieldset>
        {error ? <Error message={error} /> : null}

        <div className="form-wrapper">
          <div className="input-inline-wrapper">
            <div className="input-wrapper">
              <label htmlFor="hearAbout">Honnan értesültél a közösségi költségvetésről?</label>

              {errorObject?.hearAbout ? Object.values(errorObject.hearAbout).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`hearAbout-${i}`} />
              }) : null}

              <div className="form-group form-group-hear-about">
                <select name="hearAbout" value={formData.hearAbout} onChange={handleChangeInput}>
                  <option value="">Válassz a lehetőségek közül</option>
                  <option disabled>---</option>
                  <option value="friend">Családtól / baráttól / ismerőstől (személyesen)</option>
                  <option value="street">Utcai plakátról</option>
                  <option value="news">Híroldalon olvastam</option>
                  <option value="news_ads">Híroldalon hirdetésből</option>
                  <option value="transport">Közösségi közlekedési eszközön láttam</option>
                  <option value="facebook_municipatory">Budapest Városháza Facebook oldalról</option>
                  <option value="facebook_im_in_budapest">Énbudapestem Facebook oldalról</option>
                  <option value="facebook">Facebook csoportból</option>
                  <option value="facebook_firend">Ismerős / barát / szervezet Facebook posztjából</option>
                  <option value="civil">Civil szervezet hírleveléből, civil szervezettől</option>
                  <option value="library">Fővárosi Szabó Ervin Könyvtárban</option>
                  <option value="other">Egyéb</option>
                </select>
              </div>
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
