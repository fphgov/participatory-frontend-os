'use client'

import Error from "@/components/common/Error"
import ErrorMini from "@/components/common/ErrorMini"
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import { rmAllCharForName } from "@/utilities/removeSpecialCharacters"
import { useEffect, useState } from "react"
import ScrollTo from "@/components/common/ScrollTo"
import { ideaSubmissionForm } from "@/app/actions"
import SimpleRadio from "@/components/common/form-element/SimpleRadio"
import Select from "@/components/common/form-element/Select"
import InputLengthValidator from "@/components/common/form-element/InputLengthValidator"
import TextareaLengthValidator from "@/components/common/form-element/TextareaLengthValidator"
import FileArea from "@/components/common/form-element/FileArea"
import { getToken } from "@/lib/actions"
import Toggle from "@/components/common/form-element/Toogle"

export default function IdeaSubmissionForm(): JSX.Element {
  const [ error, setError ] = useState('')
  const [ errorObject, setErrorObject ] = useState<Record<string, string>>()
  const [ success, setSuccess ] = useState(false)
  const [ scroll, setScroll ] = useState(false)
  const [ recaptcha, setRecaptcha ] = useState<ReCaptcha>()
  const [ recaptchaToken, setRecaptchaToken ] = useState('')
  const [ filterData, setFilterData ] = useState({
    'location': '',
    'locationDescription': '',
    'locationDistrict': '',
    'cost': '',
    'title': '',
    'description': '',
    'solution': '',
    'phone': '',
    'rule_1': '',
    'rule_2': '',
    'rule_3': '',
    'medias': [],
  })

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : rmAllCharForName(e.target.value)

    setFilterData({ ...filterData, [e.target.name]: value })
  }

  const handleChangeRaw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value })
  }

  async function onIdeaSubmission() {
    setScroll(false)
    setErrorObject(undefined)
    setError('')

    const ideaFormData = new FormData()

    ideaFormData.append('cost', filterData.cost)
    ideaFormData.append('title', filterData.title)
    ideaFormData.append('solution', filterData.solution)
    ideaFormData.append('description', filterData.description)
    ideaFormData.append('location_description', filterData.locationDescription)
    ideaFormData.append('location_district', filterData.locationDistrict)
    ideaFormData.append('phone', filterData.phone)
    ideaFormData.append('rule_1', filterData.rule_1)
    ideaFormData.append('rule_2', filterData.rule_2)
    ideaFormData.append('rule_3', filterData.rule_3)
    ideaFormData.append('g-recaptcha-response', recaptchaToken)

    if (typeof filterData['location'] === 'object') {
      ideaFormData.append('location', new URLSearchParams(filterData['location']).toString())
    } else {
      ideaFormData.append('location', filterData.location)
    }

    Array.from(filterData.medias).forEach((file: File|undefined, i) => {
      if (file instanceof File) {
        ideaFormData.append(`medias[${i}]`, file)
      }
    })

    const token = (await getToken())?.value

    if (token) {
      const res = await ideaSubmissionForm(ideaFormData)

      if (res.success) {
        setSuccess(true)
      } else {
        setErrorObject(res.jsonError)
        setError(res.error)
      }

      setScroll(true)

      recaptcha?.execute()
    }
  }

  useEffect(() => {
    // @ts-ignore
    loadReCaptcha(process.env.NEXT_PUBLIC_SITE_KEY, (recaptchaToken: string) => {
      setRecaptchaToken(recaptchaToken)
    })
  }, [])

  return (
    <div className="idea-submission-form">
      {scroll && document.querySelector('.error-message-inline') ? <ScrollTo element={(document?.querySelector('.error-message-inline') as HTMLElement)?.offsetTop || 0} /> : null}

      <h2>Kötelezően kitöltendő mezők</h2>

      <p>Minden fontos információt itt tudsz megadni az ötleteddel kapcsolatban, minden mező kitöltése kötelező.</p>

      <form className="form-horizontal" action={onIdeaSubmission}>
        <fieldset>
          {(typeof error === 'string' && error !== '') ? <Error message={error} /> : null}

          <div className="form-wrapper">
            <div className="input-wrapper">
              <h6>Add meg, hol képzeled el az ötleted!</h6>
              <p className="info">Kérjük, válassz, hogy ötleted konkrét helyszínhez kötött vagy Budapest egészére vonatkozik!</p>

              <div className="row">
                <div className="col-12 col-xl-12">

                  <div className="form-group">
                    <div className="input-wrapper card-radio-wrapper">
                      <div className="row">
                        <div className="col-md-6">
                          <SimpleRadio
                            id="specific"
                            name="location"
                            value="1"
                            radioValue={filterData.location}
                            title="Konkrét helyszínhez kötődik"
                            tipp="Pl. konkrét utca, tér"
                            handleChange={handleChangeInput}
                          />
                        </div>
                        <div className="col-md-6">
                          <SimpleRadio
                            id="unspecific"
                            name="location"
                            value="0"
                            radioValue={filterData.location}
                            title="Nem kötődik konkrét helyszínhez"
                            handleChange={handleChangeInput}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {filterData.location === "1" ? <>
                    <InputLengthValidator
                      title="Helyszín megnevezése"
                      name="locationDescription"
                      value={filterData.locationDescription}
                      options={{ min: 0, max: 200 }}
                      onChange={handleChangeInput}
                    />

                    <Select
                      title="Kerület"
                      name="locationDistrict"
                      value={filterData.locationDistrict}
                      dataList={[
                        { name: 'Válassz egy kerületet', value: '0'},
                        { name: 'I. kerület', value: 'AREA1'},
                        { name: 'II. kerület', value: 'AREA2'},
                        { name: 'III. kerület', value: 'AREA3'},
                        { name: 'IV. kerület', value: 'AREA4'},
                        { name: 'V. kerület', value: 'AREA5'},
                        { name: 'VI. kerület', value: 'AREA6'},
                        { name: 'VII. kerület', value: 'AREA7'},
                        { name: 'VIII. kerület', value: 'AREA8'},
                        { name: 'IX. kerület', value: 'AREA9'},
                        { name: 'X. kerület', value: 'AREA10'},
                        { name: 'XI. kerület', value: 'AREA11'},
                        { name: 'XII. kerület', value: 'AREA12'},
                        { name: 'XIII. kerület', value: 'AREA13'},
                        { name: 'XIV. kerület', value: 'AREA14'},
                        { name: 'XV. kerület', value: 'AREA15'},
                        { name: 'XVI. kerület', value: 'AREA16'},
                        { name: 'XVII. kerület', value: 'AREA17'},
                        { name: 'XVIII. kerület', value: 'AREA18'},
                        { name: 'XIX. kerület', value: 'AREA19'},
                        { name: 'XX. kerület', value: 'AREA20'},
                        { name: 'XXI. kerület', value: 'AREA21'},
                        { name: 'XXII. kerület', value: 'AREA22'},
                        { name: 'XXIII. kerület', value: 'AREA23'},
                        { name: 'Margit sziget', value: 'AREA24'},
                      ]}
                      handleChange={handleChangeInput}
                    />
                  </> : null}
                </div>
              </div>
            </div>

            <hr />

            <div className="form-wrapper">
              <div className="input-wrapper">
                <h6>Becsüld meg az ötleted megvalósításához szükséges összeget!</h6>

                {/* <Toggle id="cost" name="cost" title="" value={filterData.cost} /> */}

                <p>Megértettem, hogy ötletem csak úgy kerülhet szavazólistára, ha tervezett megvalósítási költsége nem több 120 millió forintnál.</p>
              </div>
            </div>

            <hr />

            <div className="input-wrapper">
              <h6><label htmlFor="title">Nevezd el az ötleted!</label></h6>
              <p className="info">Adj ötletednek olyan címet, ami tömör, lényegretörő, kiderül, mit javasolsz. Az előző évben, már megvalósítás alatt álló ötletek listáját itt éred el, segítséget nyújthat a könnyebb kitöltésben.</p>

              <InputLengthValidator
                  title="Ötleted címe"
                  name="title"
                  value={filterData.title}
                  showLabel={false}
                  options={{ min: 4, max: 100 }}
                  onChange={handleChangeInput}
              />

              {errorObject?.title ? Object.values(errorObject.title).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`title-${i}`} />
              }) : null}
            </div>

            <hr />

            <div className="input-wrapper">
              <h6><label htmlFor="description">Mit valósítson meg a főváros?</label></h6>
              <p className="info">Itt azt írd le, hogy mi a fejlesztés tartalma, mit valósítson meg az önkormányzat! Nem ide kell leírnod, hogy az ötleted miért jó ötlet.</p>

              <TextareaLengthValidator
                title="Mit valósítson meg a főváros?"
                name="description"
                value={filterData.description}
                showLabel={false}
                options={{ min: 200, max: 1000 }}
                onChange={handleChangeInput}
              />

              {errorObject?.description ? Object.values(errorObject.description).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`description-${i}`} />
              }) : null}
            </div>

            <hr />

            <div className="input-wrapper">
              <h6><label htmlFor="solution">Miért jó, ha megvalósul ötleted?</label></h6>
              <p className="info">Írd le, hogy milyen problémát old meg. Kiknek, és miben segít, ha megvalósul az ötleted?</p>

              <TextareaLengthValidator
                title="Mire megoldás?"
                name="solution"
                value={filterData.solution}
                showLabel={false}
                options={{ min: 20, max: 250 }}
                onChange={handleChangeInput}
              />

              {errorObject?.solution ? Object.values(errorObject.solution).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`solution-${i}`} />
              }) : null}
            </div>

            <hr />

            <h5>Kiegészítő információk</h5>

            <div className="input-wrapper">
              <h6><label htmlFor="phone">Telefonszám:</label></h6>
              <p className="info">Azért szeretnénk, ha megadnád telefonos elérhetőségedet, mert sokkal gördülékenyebben tudnánk kommunikálni veled az ötleted kapcsán.</p>

              <InputLengthValidator
                title="Telefonszám"
                name="phone"
                value={filterData.phone}
                showLabel={false}
                options={{ min: 4, max: 100 }}
                onChange={handleChangeInput}
              />

              {errorObject?.phone ? Object.values(errorObject.phone).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`phone-${i}`} />
              }) : null}
            </div>

            <hr />

            <div className="input-wrapper">
              <label htmlFor="medias">Képek, dokumentumok feltöltése</label>
              <div className="tipp">Itt tudsz képeket vagy egyéb dokumentumokat feltölteni, amikről úgy gondolod, segítik az ötleted megértését, kapcsolódnak hozzá. Max. 5 darab fájl tölthető fel!</div>

              <FileArea changeRaw={handleChangeRaw} originalMedias={filterData.medias} />
            </div>

            <hr />

            <div className="form-group">
              <label htmlFor="rule_1" className="form-group-label">
                <input className="form-control" type="checkbox" id="rule_1" name="rule_1" value={filterData.rule_1} onChange={handleChangeInput} />
                Megértettem, hogy az ötletem csak akkor kerülhet szavazólistára ha az a Főváros hatáskörében megvalósítható és nem szabályozási kérdés.
              </label>

              {errorObject?.rule_1 ? Object.values(errorObject.rule_1).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`rule_1-${i}`} />
              }) : null}
            </div>

            <div className="form-group">
              <label htmlFor="rule_2" className="form-group-label">
                <input className="form-control" type="checkbox" id="rule_2" name="rule_2" value={filterData.rule_2} onChange={handleChangeInput} />
                Megértettem, hogy az ötletem csak akkor kerülhet szavazólistára, ha az nem érint magán vagy állami területet, pl. iskolák, kórházak, MÁV, HÉV területek. Segítséget itt találsz.
              </label>

              {errorObject?.rule_2 ? Object.values(errorObject.rule_2).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`rule_2-${i}`} />
              }) : null}
            </div>

            <div className="form-group">
              <label htmlFor="rule_3" className="form-group-label">
                <input className="form-control" type="checkbox" id="rule_3" name="rule_3" value={filterData.rule_3} onChange={handleChangeInput} />
                Megértettem, hogy az ötletem csak akkor kerülhet szavazólistára, ha tervezett megvalósítási költsége nem több 120 millió forintnál.
              </label>

              {errorObject?.rule_3 ? Object.values(errorObject.rule_3).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`rule_3-${i}`} />
              }) : null}
            </div>

            <ReCaptcha
              ref={(ref: any) => setRecaptcha(ref)}
              sitekey={process.env.NEXT_PUBLIC_SITE_KEY || ''}
              action='submit'
              verifyCallback={(recaptchaToken: string) => {
                setRecaptchaToken(recaptchaToken)
              }}
            />

            <input type="submit" className="btn btn-primary btn-headline next-step" value="Beküldöm az ötletem" />
          </div>
        </fieldset>
      </form>
    </div>
  )
}
