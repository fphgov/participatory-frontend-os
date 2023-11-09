'use client'

import Error from "@/components/common/Error"
import ErrorMini from "@/components/common/ErrorMini"
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import { rmAllCharForName } from "@/utilities/removeSpecialCharacters"
import React, { useEffect, useState } from "react"
import ScrollTo from "@/components/common/ScrollTo"
import { ideaSubmissionForm } from "@/app/actions"
import SimpleRadio from "@/components/common/form-element/SimpleRadio"
import Select from "@/components/common/form-element/Select"
import InputLengthValidator from "@/components/common/form-element/InputLengthValidator"
import TextareaLengthValidator from "@/components/common/form-element/TextareaLengthValidator"
import FileArea from "@/components/common/form-element/FileArea"
import { getToken } from "@/lib/actions"
import Toggle from "@/components/common/form-element/Toogle"
import Checkbox from "@/components/common/form-element/Checkbox"
import 'intl-tel-input/build/css/intlTelInput.css';
import PhonenumberInput, { PhonenumberValue } from "@/components/common/form-element/PhonenumberInput"
import { useIdeaContext } from "./idea-store"
import { districtDataList } from "@/models/district.model"
import MediaList from "@/components/common/form-element/MediaList"
import { redirect } from "next/navigation"


export default function IdeaSubmissionFormOverview(): JSX.Element {
  const { ideaFormContextData } = useIdeaContext()

  const [ canBeSubmit, setCanBeSubmit ] = useState(false)
  const [ error, setError ] = useState('')
  const [ errorObject, setErrorObject ] = useState<Record<string, string>>()
  const [ inputComponentEdit, setInputComponentEdit ] = useState('')
  const [ scroll, setScroll ] = useState(false)
  const [ recaptcha, setRecaptcha ] = useState<ReCaptcha>()
  const [ recaptchaToken, setRecaptchaToken ] = useState('')
  const [ formData, setFormData ] = useState({
    'location': '',
    'locationDescription': '',
    'locationDistrict': '',
    'cost': false,
    'title': '',
    'description': '',
    'solution': '',
    'phone':  { iso2: 'hu', dialCode: '36', phone: '' },
    'rule_1': false,
    'rule_2': false,
    'rule_3': false,
    'medias': [],
  })

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>|React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : rmAllCharForName(e.target.value)

    setFormData({ ...formData, [e.target.name]: value })
  }

  const handlePhonenumberInput = (phoneObject: PhonenumberValue) => {
    setFormData({ ...formData, phone: phoneObject })
  }

  const handleChangeFileRaw = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value })
  }

  async function onIdeaSubmission() {
    setScroll(false)
    setErrorObject(undefined)
    setError('')

    const ideaFormData = new FormData()

    ideaFormData.append('cost', formData.cost.toString())
    ideaFormData.append('title', formData.title)
    ideaFormData.append('solution', formData.solution)
    ideaFormData.append('description', formData.description)
    ideaFormData.append('location_description', formData.locationDescription)
    ideaFormData.append('location_district', formData.locationDistrict)
    ideaFormData.append('phone', formData.phone.dialCode + formData.phone.phone)
    ideaFormData.append('rule_1', formData.rule_1.toString())
    ideaFormData.append('rule_2', formData.rule_2.toString())
    ideaFormData.append('rule_3', formData.rule_3.toString())
    ideaFormData.append('g-recaptcha-response', recaptchaToken)

    if (typeof formData['location'] === 'object') {
      ideaFormData.append('location', new URLSearchParams(formData['location']).toString())
    } else {
      ideaFormData.append('location', formData.location)
    }

    Array.from(formData.medias).forEach((file: File|undefined, i) => {
      if (file instanceof File) {
        ideaFormData.append(`medias[${i}]`, file)
      }
    })

    const token = (await getToken())?.value

    if (token) {
      const res = await ideaSubmissionForm(ideaFormData)

      if (res.success) {
        redirect('/bekuldes/sikeres')
      } else {
        setErrorObject(res.jsonError)
        setError(res.error)
      }

      setScroll(true)

      recaptcha?.execute()
    }
  }

  useEffect(() => {
    setFormData({ ...formData, ...ideaFormContextData })

    // @ts-ignore
    loadReCaptcha(process.env.NEXT_PUBLIC_SITE_KEY, (recaptchaToken: string) => {
      setRecaptchaToken(recaptchaToken)
    })
  }, [])

  useEffect(() => {
    setCanBeSubmit(false)

    if (formData.rule_1 && formData.rule_2 && formData.rule_3) {
      setCanBeSubmit(true)
    }
  }, [formData])

  const setInputComponent = (inputName: string) => {
    if (inputComponentEdit !== inputName) {
      setInputComponentEdit(inputName)
    } else {
      setInputComponentEdit('')
    }
  }

  return (
    <div className="idea-submission-form">
      {scroll && document.querySelector('.error-message-inline') ? <ScrollTo element={(document?.querySelector('.error-message-inline') as HTMLElement)?.offsetTop || 0} /> : null}

      <h2>Áttekintés</h2>

      <p>Így néz ki az ötleted. Ha szeretnéd a “Beküdöm az ötletem” gombra kattintva véglegesítheted vagy a ceruza ikonra kattintva módosíthatsz még rajta!</p>

      <form className="form-horizontal" action={onIdeaSubmission}>
        <fieldset>
          {(typeof error === 'string' && error !== '') ? <Error message={error} /> : null}

          <div className="form-wrapper">
            <div className="input-wrapper">
              <div className="input-wrapper-overview">
                <div className="input-wrapper-overview-title">
                  <h6><label htmlFor="location">Add meg, hol képzeled el az ötleted!</label></h6>

                  <button type="button" className="btn btn-overview-edit" aria-label="Szerkesztés" onClick={() => { setInputComponent('location') }} />
                </div>

                {inputComponentEdit === "location" ? <>
                  <div className="input-wrapper-content">
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
                                  radioValue={formData.location}
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
                                  radioValue={formData.location}
                                  title="Nem kötődik konkrét helyszínhez"
                                  handleChange={handleChangeInput}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {formData.location === "1" ? <>
                          <InputLengthValidator
                            title="Helyszín megnevezése"
                            name="locationDescription"
                            value={formData.locationDescription}
                            options={{ min: 0, max: 200 }}
                            onChange={handleChangeInput}
                          />

                          <div style={{ marginTop: 18 }}>
                            <Select
                              title="Kerület"
                              name="locationDistrict"
                              value={formData.locationDistrict}
                              dataList={districtDataList}
                              handleChange={handleChangeInput}
                            />
                          </div>
                        </> : null}
                      </div>
                    </div>
                  </div>
                </> : <>
                  {formData.location === "" ? <p>Nem választottál a helyszínt!</p> : <>
                    {formData.location === "0" ? <p>Nem kötődik konkrét helyszínhez</p> : <p>
                      {formData.locationDistrict === "" && formData.locationDescription === "" ? <>Konkrét helyszínhez kötödik, de nem választottál helyszínt!</> : <>
                        {formData.locationDistrict ? <>{`${districtDataList.filter(district => district.value === formData.locationDistrict)[0]?.name}, `}</> : null}
                        {formData.locationDescription ? <>{formData.locationDescription}</> : null}
                      </>}
                    </p>
                    }
                  </>}
                </>}

                {errorObject?.location ? Object.values(errorObject.location).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`location-${i}`} />
                }) : null}
              </div>
            </div>

            <hr />

            <div className="input-wrapper">
              <div className="input-wrapper-overview">
                <div className="input-wrapper-overview-title">
                  <h6><label htmlFor="cost">Becsüld meg az ötleted megvalósításához szükséges összeget!</label></h6>

                  <button type="button" className="btn btn-overview-edit" aria-label="Szerkesztés" onClick={() => { setInputComponent('cost') }} />
                </div>

                {inputComponentEdit === "cost" ? <>
                  <div className="input-wrapper-content">
                    <Toggle
                      id="cost"
                      name="cost"
                      value={formData.cost}
                      handleChange={handleChangeInput}
                      tipp={"Megértettem, hogy ötletem csak úgy kerülhet szavazólistára, ha tervezett megvalósítási költsége nem több 120 millió forintnál."}
                    />
                  </div>
                </> : <>
                  {formData.cost === true ? <p>Elfogadtad a feltételeket az ötletbeküldés összegére vonatkozóan.</p> : <p>Nem fogadtad el a feltételeket az ötletbeküldés összegére vonatkozóan. Ha azért nem fogadtad el, mert azt érzed, hogy az ötleted nem fér bele a 120 millió Ft-os keretbe, érdemes átgondolni az ötleted.</p>}
                </>}

                {errorObject?.cost ? Object.values(errorObject.cost).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`cost-${i}`} />
                }) : null}
              </div>
            </div>

            <hr />

            <div className="input-wrapper">
              <div className="input-wrapper-overview">
                <div className="input-wrapper-overview-title">
                  <h6><label htmlFor="title">Nevezd el az ötleted!</label></h6>

                  <button type="button" className="btn btn-overview-edit" aria-label="Szerkesztés" onClick={() => { setInputComponent('title') }} />
                </div>

                {inputComponentEdit === "title" ? <>
                  <div className="input-wrapper-content">
                    <p className="info">Adj ötletednek olyan címet, ami tömör, lényegretörő, kiderül, mit javasolsz. Az előző évben, már megvalósítás alatt álló ötletek listáját itt éred el, segítséget nyújthat a könnyebb kitöltésben.</p>

                    <InputLengthValidator
                        title="Ötleted címe"
                        name="title"
                        value={formData.title}
                        showLabel={false}
                        options={{ min: 4, max: 100 }}
                        onChange={handleChangeInput}
                    />
                  </div>
                </> : <>
                  {formData.title === "" ? <p>Nem nevezted el az ötleted!</p> : <p>{formData.title}</p>}
                </>}

                {errorObject?.title ? Object.values(errorObject.title).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`title-${i}`} />
                }) : null}
              </div>
            </div>

            <hr />

            <div className="input-wrapper">
              <div className="input-wrapper-overview">
                <div className="input-wrapper-overview-title">
                  <h6><label htmlFor="description">Mit valósítson meg a főváros?</label></h6>

                  <button type="button" className="btn btn-overview-edit" aria-label="Szerkesztés" onClick={() => { setInputComponent('description') }} />
                </div>

                {inputComponentEdit === "description" ? <>
                  <div className="input-wrapper-content">
                    <p className="info">Itt azt írd le, hogy mi a fejlesztés tartalma, mit valósítson meg az önkormányzat! Nem ide kell leírnod, hogy az ötleted miért jó ötlet.</p>

                    <TextareaLengthValidator
                      title="Mit valósítson meg a főváros?"
                      name="description"
                      value={formData.description}
                      showLabel={false}
                      options={{ min: 200, max: 1000 }}
                      onChange={handleChangeInput}
                    />
                  </div>
                </> : <>
                  {formData.description === "" ? <p>Nem adtál meg fejlesztési leírást az ötletednek!</p> : <p>{formData.description}</p>}
                </>}

                {errorObject?.description ? Object.values(errorObject.description).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`description-${i}`} />
                }) : null}
              </div>
            </div>

            <hr />

            <div className="input-wrapper">
              <div className="input-wrapper-overview">
                <div className="input-wrapper-overview-title">
                  <h6><label htmlFor="solution">Miért jó, ha megvalósul ötleted?</label></h6>

                  <button type="button" className="btn btn-overview-edit" aria-label="Szerkesztés" onClick={() => { setInputComponent('solution') }} />
                </div>

                {inputComponentEdit === "solution" ? <>
                  <div className="input-wrapper-content">
                    <p className="info">Írd le, hogy milyen problémát old meg. Kiknek, és miben segít, ha megvalósul az ötleted?</p>

                    <TextareaLengthValidator
                      title="Mire megoldás?"
                      name="solution"
                      value={formData.solution}
                      showLabel={false}
                      options={{ min: 20, max: 250 }}
                      onChange={handleChangeInput}
                    />
                  </div>
                </> : <>
                  {formData.solution === "" ? <p>Nem adtad meg, hogy milyen problémát old meg az ötleted!</p> : <p>{formData.solution}</p>}
                </>}

                {errorObject?.solution ? Object.values(errorObject.solution).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`solution-${i}`} />
                }) : null}
              </div>
            </div>

            <hr />

            <h5>Kiegészítő információk</h5>

            <div className="input-wrapper">
              <div className="input-wrapper-overview">
                <div className="input-wrapper-overview-title">
                  <h6><label htmlFor="phone">Telefonszám:</label></h6>

                  <button type="button" className="btn btn-overview-edit" aria-label="Szerkesztés" onClick={() => { setInputComponent('phone') }} />
                </div>

                {inputComponentEdit === "phone" ? <>
                  <div className="input-wrapper-content">
                    <p className="info">Azért szeretnénk, ha megadnád telefonos elérhetőségedet, mert sokkal gördülékenyebben tudnánk kommunikálni veled az ötleted kapcsán.</p>

                    <PhonenumberInput id="phone" name="phone" value={formData.phone} handleChange={handlePhonenumberInput} />
                  </div>
                </> : <>
                  {formData.phone.phone === "" ? <p>Nem adtál meg telefonszámot. (Nem kötelező)</p> : <p>{formData.phone.dialCode + formData.phone.phone}</p>}
                </>}

                {errorObject?.phone ? Object.values(errorObject.phone).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`phone-${i}`} />
                }) : null}
              </div>
            </div>

            <hr />

            <div className="input-wrapper">
              <div className="input-wrapper-overview">
                <div className="input-wrapper-overview-title">
                  <label htmlFor="medias">Képek, dokumentumok feltöltése</label>

                  <button type="button" className="btn btn-overview-edit" aria-label="Szerkesztés" onClick={() => { setInputComponent('medias') }} />
                </div>

                {inputComponentEdit === "medias" ? <>
                  <div className="input-wrapper-content">
                    <div className="tipp">Itt tudsz képeket vagy egyéb dokumentumokat feltölteni, amikről úgy gondolod, segítik az ötleted megértését, kapcsolódnak hozzá. Max. 5 darab fájl tölthető fel!</div>

                    <FileArea changeRaw={handleChangeFileRaw} originalMedias={formData.medias} />
                  </div>
                </> : <>
                  {formData.medias.length === 0 ? <p>Nem töltöttél fel csatolmányt. (Nem kötelező)</p> : <>
                    <MediaList originalMedias={formData.medias} />
                  </>}
                </>}

                {errorObject?.medias ? Object.values(errorObject.medias).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`medias-${i}`} />
                }) : null}
              </div>
            </div>

            <hr />

            <div className="form-group">
              <Checkbox
                id="rule_1"
                name="rule_1"
                label="Megértettem, hogy az ötletem csak akkor kerülhet szavazólistára ha az a Főváros hatáskörében megvalósítható és nem szabályozási kérdés."
                handleChange={handleChangeInput}
                value={formData.rule_1}
              />

              {errorObject?.rule_1 ? Object.values(errorObject.rule_1).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`rule_1-${i}`} />
              }) : null}
            </div>

            <div className="form-group">
              <Checkbox
                id="rule_2"
                name="rule_2"
                label="Megértettem, hogy az ötletem csak akkor kerülhet szavazólistára, ha az nem érint magán vagy állami területet, pl. iskolák, kórházak, MÁV, HÉV területek. Segítséget itt találsz."
                handleChange={handleChangeInput}
                value={formData.rule_2}
              />

              {errorObject?.rule_2 ? Object.values(errorObject.rule_2).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`rule_2-${i}`} />
              }) : null}
            </div>

            <div className="form-group">
              <Checkbox
                id="rule_3"
                name="rule_3"
                label="Megértettem, hogy az ötletem csak akkor kerülhet szavazólistára, ha tervezett megvalósítási költsége nem több 120 millió forintnál."
                handleChange={handleChangeInput}
                value={formData.rule_3}
              />

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

            <input type="submit" className="btn btn-primary btn-headline next-step" disabled={!canBeSubmit} value="Beküldöm az ötletem" />
          </div>
        </fieldset>
      </form>
    </div>
  )
}
