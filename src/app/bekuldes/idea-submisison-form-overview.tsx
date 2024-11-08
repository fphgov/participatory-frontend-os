'use client'

import Error from "@/components/common/Error"
import ErrorMini from "@/components/common/ErrorMini"
// @ts-ignore
import { ReCaptcha, loadReCaptcha } from "@icetee/react-recaptcha-v3"
import { rmAllCharForName, rmAllCharForTitle } from "@/utilities/removeSpecialCharacters"
import React, { FormEvent, useEffect, useState } from "react"
import ScrollTo from "@/components/common/ScrollTo"
import { ideaSubmissionForm } from "@/app/actions"
import SimpleRadio from "@/components/common/form-element/SimpleRadio"
import Select from "@/components/common/form-element/Select"
import InputLengthValidator from "@/components/common/form-element/InputLengthValidator"
import TextareaLengthValidator from "@/components/common/form-element/TextareaLengthValidator"
import FileArea from "@/components/common/form-element/FileArea"
import Toggle from "@/components/common/form-element/Toogle"
import Checkbox from "@/components/common/form-element/Checkbox"
import 'intl-tel-input/build/css/intlTelInput.css';
import PhonenumberInput, { PhonenumberValue } from "@/components/common/form-element/PhonenumberInput"
import { useIdeaContext } from "./idea-store"
import { districtDataList } from "@/models/district.model"
import MediaList from "@/components/common/form-element/MediaList"
import Link from "next/link"
import { generateRandomValue } from "@/utilities/generateRandomValue"
import { useModalHardContext } from "@/context/modalHard"

export default function IdeaSubmissionFormOverview(): JSX.Element {
  const { ideaFormContextData, setIdeaFormContextData } = useIdeaContext()
  const { openModalHard, setOpenModalHard, setDataModalHard } = useModalHardContext()

  const [ canBeSubmit, setCanBeSubmit ] = useState(false)
  const [ error, setError ] = useState('')
  const [ errorObject, setErrorObject ] = useState<Record<string, string>>()
  const [ inputComponentEdit, setInputComponentEdit ] = useState('')
  const [ scroll, setScroll ] = useState(false)
  const [ recaptcha, setRecaptcha ] = useState<ReCaptcha>()
  const [ recaptchaToken, setRecaptchaToken ] = useState('')

  const rand = generateRandomValue().toString()

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>|React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : rmAllCharForName(e.target.value)

    setIdeaFormContextData({ ...ideaFormContextData, [e.target.name]: value })
  }

  const handleChangeInputTitle = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>|React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : rmAllCharForTitle(e.target.value)

    setIdeaFormContextData({ ...ideaFormContextData, [e.target.name]: value })
  }

  const handlePhonenumberInput = (phoneObject: PhonenumberValue) => {
    setIdeaFormContextData({ ...ideaFormContextData, phone: phoneObject })
  }

  const handleChangeFileRaw = (name: string, value: any) => {
    setIdeaFormContextData({ ...ideaFormContextData, [name]: value })
  }

  async function onIdeaSubmission(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setScroll(false)
    setErrorObject(undefined)
    setError('')

    const ideaFormData = new FormData()

    ideaFormData.append('cost', ideaFormContextData.cost.toString())
    ideaFormData.append('title', ideaFormContextData.title)
    ideaFormData.append('solution', ideaFormContextData.solution)
    ideaFormData.append('description', ideaFormContextData.description)
    ideaFormData.append('location_description', ideaFormContextData.locationDescription)
    ideaFormData.append('location_district', ideaFormContextData.locationDistrict)
    ideaFormData.append('phone', ideaFormContextData.phone.dialCode + ideaFormContextData.phone.phone)
    ideaFormData.append('rule_1', ideaFormContextData.rule_1.toString())
    ideaFormData.append('rule_2', ideaFormContextData.rule_2.toString())
    ideaFormData.append('rule_3', ideaFormContextData.rule_3.toString())
    ideaFormData.append('g-recaptcha-response', recaptchaToken)

    if (typeof ideaFormContextData['location'] === 'object') {
      ideaFormData.append('location', new URLSearchParams(ideaFormContextData['location']).toString())
    } else {
      ideaFormData.append('location', ideaFormContextData.location)
    }

    if (ideaFormContextData?.medias && (Array.isArray(ideaFormContextData.medias) || ideaFormContextData.medias instanceof FileList)) {
      Array.from(ideaFormContextData.medias).forEach(async (file: File|undefined, i: number) => {
        if (file instanceof File) {
          ideaFormData.append(`medias[${i}]`, file)
        }
      })
    }

    const res = await ideaSubmissionForm(ideaFormData)

    if (res.success) {
      handleOpenModal()
    } else {
      setErrorObject(res?.jsonError)
      setError(res.error)
    }

    setScroll(true)

    recaptcha?.execute()
  }

  useEffect(() => {
    // @ts-ignore
    loadReCaptcha(process.env.NEXT_PUBLIC_SITE_KEY, (recaptchaToken: string) => {
      setRecaptchaToken(recaptchaToken)
    })
  }, [])

  useEffect(() => {
    setCanBeSubmit(false)

    if (ideaFormContextData.rule_1 && ideaFormContextData.rule_2 && ideaFormContextData.rule_3) {
      setCanBeSubmit(true)
    }
  }, [ideaFormContextData])

  const setInputComponent = (inputName: string) => {
    if (inputComponentEdit !== inputName) {
      setInputComponentEdit(inputName)
    } else {
      setInputComponentEdit('')
    }
  }

  function handleOpenModal() {
  const content = <div className="modal-content-center">
      <p>Megkaptuk az ötleted, rövid ellenőrzést követően közzétesszük a honlapon, erről értesíteni fogunk. A lakossági támogatásra január 20. és február 3. között kerül sor, erről e-mailben küldünk még tájékoztatást.</p>
      <p><b>Ha van további ötleted, add be azt is most!</b></p>

      <button type="button" className="btn btn-headline btn-next" onClick={() => {
        setOpenModalHard(false)
        window.location.href = '/bekuldes'
      }}>
        Új ötletet adok be 
      </button>

      <Link href="/" onClick={() => { setOpenModalHard(false)}}>
        Vissza a főoldalra
      </Link>
    </div>

    setDataModalHard({
      title: 'Köszönjük, hogy megosztottad velünk ötleted! Január 20-tól gyűjts hozzá támogatókat!',
      content,
      showCancelButton: false,
    })

    setOpenModalHard(true)
  }

  return (
    <div className="idea-submission-form">
      {scroll && document.querySelector('.error-message-inline') ? <ScrollTo element={(document?.querySelector('.error-message-inline') as HTMLElement)?.offsetTop || 0} /> : null}

      <h2>Áttekintés</h2>

      <p>Így néz ki az ötleted. Az oldal alján a “Beküldöm az ötletem” gombra kattintva véglegesítheted, vagy bármelyik ceruza ikonra kattintva módosíthatsz még rajta!</p>

      <form className="form-horizontal" onSubmit={onIdeaSubmission}>
        <fieldset>
          {(typeof error === 'string' && error !== '') ? <Error message={error} /> : null}

          {errorObject?.form ? Object.values(errorObject.form).map((err, i) => {
            return <Error key={i} message={err} />
          }) : null}

          <div className="form-wrapper">
            <div className="input-wrapper">
              <div className="input-wrapper-overview">
                <div className="input-wrapper-overview-title">
                  <h6><label htmlFor="location">Add meg, hol képzeled el az ötleted!</label></h6>

                  <button type="button" className="btn btn-overview-edit" aria-label="Szerkesztés" onClick={() => { setInputComponent('location') }} />
                </div>

                {inputComponentEdit === "location" ? <>
                  <div className="input-wrapper-content">
                    <p className="info">
                      <span>Kérjük, válassz, hogy az ötleted konkrét helyszínre vonatkozik vagy nem!</span>
                    </p>

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
                                  radioValue={ideaFormContextData.location}
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
                                  radioValue={ideaFormContextData.location}
                                  title="Nem kötődik konkrét helyszínhez"
                                  handleChange={handleChangeInput}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {ideaFormContextData.location === "1" ? <>
                          <InputLengthValidator
                            title="Helyszín megnevezése"
                            name="locationDescription"
                            value={ideaFormContextData.locationDescription}
                            options={{ min: 0, max: 200 }}
                            onChange={handleChangeInputTitle}
                          />

                          <div style={{ marginTop: 18 }}>
                            <Select
                              title="Kerület"
                              name="locationDistrict"
                              value={ideaFormContextData.locationDistrict}
                              dataList={districtDataList}
                              handleChange={handleChangeInputTitle}
                            />
                          </div>
                        </> : null}
                      </div>
                    </div>
                  </div>
                </> : <>
                  {ideaFormContextData.location === "" || ideaFormContextData.location === undefined ? <p>Nem választottál a helyszínt!</p> : <>
                    {ideaFormContextData.location === "0" ? <p>Nem kötődik konkrét helyszínhez</p> : <p>
                      {ideaFormContextData.locationDistrict === "" && ideaFormContextData.locationDescription === "" ? <>Konkrét helyszínhez kötödik, de nem választottál helyszínt!</> : <>
                        {ideaFormContextData.locationDistrict ? <>{`${districtDataList.filter(district => district.value === ideaFormContextData.locationDistrict)[0]?.name}, `}</> : null}
                        {ideaFormContextData.locationDescription ? <>{ideaFormContextData.locationDescription}</> : null}
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
                      value={ideaFormContextData.cost}
                      handleChange={handleChangeInput}
                      tipp={"Megértettem, hogy ötletem csak úgy kerülhet szavazólistára, ha tervezett megvalósítási költsége nem több 120 millió forintnál."}
                    />
                  </div>
                </> : <>
                  {ideaFormContextData.cost === true ? <p>Elfogadtad a feltételeket az ötletbeküldés összegére vonatkozóan.</p> : <p>Nem fogadtad el a feltételeket az ötletbeküldés összegére vonatkozóan. Ha azért nem fogadtad el, mert azt érzed, hogy az ötleted nem fér bele a 120 millió Ft-os keretbe, érdemes átgondolni az ötleted.</p>}
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
                    <p className="info">
                      <span>Adj az ötletednek olyan címet, ami tömör, lényegretörő, kiderül, mit javasolsz. Így többen szavaznak rá! Az előző években nyertes, már megvalósítás alatt álló ötletek listáját <Link href={`/projektek?rand=${rand}`} target="_blank">itt éred el</Link>, ez segítséget nyújthat a kitöltésben.</span>
                    </p>

                    <InputLengthValidator
                        title="Ötleted címe"
                        name="title"
                        value={ideaFormContextData.title}
                        showLabel={false}
                        options={{ min: 4, max: 100 }}
                        onChange={handleChangeInputTitle}
                    />
                  </div>
                </> : <>
                  {ideaFormContextData.title === "" || ideaFormContextData.title === undefined ? <p>Nem nevezted el az ötleted!</p> : <p>{ideaFormContextData.title}</p>}
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
                    <p className="info">
                      <span>Itt azt írd le, hogy mi a fejlesztés tartalma, mit valósítson meg az önkormányzat! Nem ide kell leírnod, hogy az ötleted miért jó ötlet.</span>
                    </p>

                    <TextareaLengthValidator
                      title="Mit valósítson meg a főváros?"
                      name="description"
                      value={ideaFormContextData.description}
                      showLabel={false}
                      options={{ min: 100, max: 1000 }}
                      onChange={handleChangeInputTitle}
                    />
                  </div>
                </> : <>
                  {ideaFormContextData.description === "" || ideaFormContextData.description === undefined ? <p>Nem adtál meg fejlesztési leírást az ötletednek!</p> : <p>{ideaFormContextData.description}</p>}
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
                    <p className="info">
                      <span>Írd le, hogy milyen problémát old meg. Kiknek, és miben segít, ha megvalósul az ötleted?</span>
                    </p>

                    <TextareaLengthValidator
                      title="Mire megoldás?"
                      name="solution"
                      value={ideaFormContextData.solution}
                      showLabel={false}
                      options={{ min: 20, max: 1000 }}
                      onChange={handleChangeInputTitle}
                    />
                  </div>
                </> : <>
                  {ideaFormContextData.solution === "" || ideaFormContextData.solution === undefined ? <p>Nem adtad meg, hogy milyen problémát old meg az ötleted!</p> : <p>{ideaFormContextData.solution}</p>}
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
                    <p className="info">
                      <span>Telefonos elérhetőség megadása nem kötelező. Ha megadod, gördülékenyebben tudunk kommunikálni veled az ötleted kapcsán.</span>
                    </p>

                    <PhonenumberInput id="phone" name="phone" value={ideaFormContextData.phone} handleChange={handlePhonenumberInput} />
                  </div>
                </> : <>
                  {ideaFormContextData.phone?.phone === "" || ideaFormContextData.phone === undefined ? <p>Nem adtál meg telefonszámot. (Nem kötelező)</p> : <p>+{ideaFormContextData.phone?.dialCode + ideaFormContextData.phone?.phone}</p>}
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

                    <FileArea changeRaw={handleChangeFileRaw} originalMedias={ideaFormContextData.medias} />
                  </div>
                </> : <>
                  {ideaFormContextData.medias?.length === 0 || ideaFormContextData.medias === undefined ? <p>Nem töltöttél fel csatolmányt. (Nem kötelező)</p> : <>
                    <MediaList originalMedias={ideaFormContextData.medias} />
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
                label="Megértettem, hogy az ötletem csak akkor kerülhet szavazólistára, ha az a főváros hatáskörében megvalósítható és nem szabályozási kérdés."
                handleChange={handleChangeInput}
                value={ideaFormContextData.rule_1}
              />

              {errorObject?.rule_1 ? Object.values(errorObject.rule_1).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`rule_1-${i}`} />
              }) : null}
            </div>

            <div className="form-group">
              <Checkbox
                id="rule_2"
                name="rule_2"
                label="Megértettem, hogy az ötletem csak akkor kerülhet szavazólistára, ha az nem érint állami vagy magántulajdonú területet, pl. iskolák, kórházak, MÁV, HÉV területek."
                handleChange={handleChangeInput}
                value={ideaFormContextData.rule_2}
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
                value={ideaFormContextData.rule_3}
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
