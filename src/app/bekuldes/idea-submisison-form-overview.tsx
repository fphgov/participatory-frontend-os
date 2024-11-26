'use client'

import Error from "@/components/common/Error"
import ErrorMini from "@/components/common/ErrorMini"
// @ts-ignore
import { ReCaptcha, loadReCaptcha } from "@icetee/react-recaptcha-v3"
import { rmAllCharForName, rmAllCharForTitle } from "@/utilities/removeSpecialCharacters"
import React, { FormEvent, useEffect, useState } from "react"
import ScrollTo from "@/components/common/ScrollTo"
import { ideaSubmissionForm } from "@/app/actions"
import Select from "@/components/common/form-element/Select"
import InputLengthValidator from "@/components/common/form-element/InputLengthValidator"
import TextareaLengthValidator from "@/components/common/form-element/TextareaLengthValidator"
import FileArea from "@/components/common/form-element/FileArea"
import Checkbox from "@/components/common/form-element/Checkbox"
import 'intl-tel-input/build/css/intlTelInput.css';
import PhonenumberInput from "@/components/common/form-element/PhonenumberInput"
import { useIdeaContext } from "./idea-store"
import { districtDataList } from "@/models/district.model"
import MediaList from "@/components/common/form-element/MediaList"
import Link from "next/link"
import { generateRandomValue } from "@/utilities/generateRandomValue"
import { useModalHardContext } from "@/context/modalHard"
import {locationDataList} from "@/models/location.model";
import ReactSelect, {MultiValue} from "react-select";
import {E164Number} from "libphonenumber-js";

export default function IdeaSubmissionFormOverview(): JSX.Element {
  const { ideaFormContextData, updateIdeaFormContextData } = useIdeaContext()
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

    updateIdeaFormContextData({ [e.target.name]: value })
  }

  const handleChangeInputTitle = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>|React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : rmAllCharForTitle(e.target.value)

    updateIdeaFormContextData({ [e.target.name]: value })
  }

  const handleLocationDistrictsInput = (locationDistricts: MultiValue<any>) => {
    updateIdeaFormContextData({ ...ideaFormContextData, locationDistricts: locationDistricts })
  }

  const handlePhonenumberInput = (phoneObject?: E164Number | undefined) => {
    updateIdeaFormContextData({ phone: phoneObject })
  }

  const handleChangeFileRaw = (name: string, value: any) => {
    updateIdeaFormContextData({ [name]: value })
  }

  async function onIdeaSubmission(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setScroll(false)
    setErrorObject(undefined)
    setError('')

    const ideaFormData = new FormData()

    ideaFormData.append('fullName', ideaFormContextData.fullName)
    ideaFormData.append('birthYear', ideaFormContextData.birthYear)
    ideaFormData.append('postalCode', ideaFormContextData.postalCode)
    ideaFormData.append('cost', ideaFormContextData.cost.toString())
    ideaFormData.append('title', ideaFormContextData.title)
    ideaFormData.append('solution', ideaFormContextData.solution)
    ideaFormData.append('description', ideaFormContextData.description)
    ideaFormData.append('location_description', ideaFormContextData.locationDescription)
    ideaFormData.append(
      'location_districts',
      ideaFormContextData.locationDistricts.map((item: { value: string }) => item.value)
    )
    ideaFormData.append('phone', ideaFormContextData.phone)
    ideaFormData.append('rule_1', ideaFormContextData.rule_1.toString())
    ideaFormData.append('rule_2', ideaFormContextData.rule_2.toString())
    ideaFormData.append('rule_3', ideaFormContextData.rule_3.toString())
    ideaFormData.append('rule_4', ideaFormContextData.rule_4.toString())
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
    window?.grecaptcha?.ready(() => {
      loadReCaptcha(process.env.NEXT_PUBLIC_SITE_KEY, (recaptchaToken: string) => {
        setRecaptchaToken(recaptchaToken)
      })
    })
  }, [])

  useEffect(() => {
    setCanBeSubmit(false)

    if (ideaFormContextData.rule_1 && ideaFormContextData.rule_2 && ideaFormContextData.rule_3 && ideaFormContextData.rule_4) {
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

      <h2>Áttekintés és beküldés</h2>

      <p>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        A lap alján a "Beküldöm az ötletem" gombra kattitnva véglegesítheted,
        vagy a ceruza ikonra kattintva módosíthatsz még rajta.
      </p>

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
                  <h6><label htmlFor="fullName">Név</label></h6>

                  <button type="button" className="btn btn-overview-edit" aria-label="Szerkesztés" onClick={() => {
                    setInputComponent('fullName')
                  }}/>
                </div>

                {inputComponentEdit === "fullName" ? <>
                  <div className="input-wrapper-content">
                    <input type="text" name="fullName" id="fullName" placeholder="Családnév Utónév"
                           value={ideaFormContextData.fullName}
                           onChange={handleChangeInput}/>
                  </div>
                </> : <>
                  {ideaFormContextData.fullName === "" || ideaFormContextData.fullName === undefined ?
                    <p>Nem adtad meg a neved!</p> : <p>{ideaFormContextData.fullName}</p>}
                </>}

                {errorObject?.fullName ? Object.values(errorObject.fullName).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`fullName-${i}`}/>
                }) : null}
              </div>

              <hr/>

              <div className="input-wrapper-overview">
                <div className="input-wrapper-overview-title">
                  <h6><label htmlFor="birthYear">Születési év</label></h6>

                  <button type="button" className="btn btn-overview-edit" aria-label="Szerkesztés" onClick={() => {
                    setInputComponent('birthYear')
                  }}/>
                </div>

                {inputComponentEdit === "birthYear" ? <>
                  <div className="input-wrapper-content">
                    <input type="text" name="birthYear" id="birthYear" placeholder="ÉÉÉÉ." maxLength={4} minLength={4}
                           value={ideaFormContextData.birthYear}
                           onChange={handleChangeInput}/>
                  </div>
                </> : <>
                  {ideaFormContextData.birthYear === "" || ideaFormContextData.birthYear === undefined ?
                    <p>Nem adtad meg a születési éved!</p> : <p>{ideaFormContextData.birthYear}</p>}
                </>}

                {errorObject?.birthYear ? Object.values(errorObject.birthYear).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`birthYear-${i}`}/>
                }) : null}
              </div>

              <hr/>

              <div className="input-wrapper-overview">
                <div className="input-wrapper-overview-title">
                  <h6><label htmlFor="postalCode">Irányítószám</label></h6>

                  <button type="button" className="btn btn-overview-edit" aria-label="Szerkesztés" onClick={() => {
                    setInputComponent('postalCode')
                  }}/>
                </div>

                {inputComponentEdit === "postalCode" ? <>
                  <div className="input-wrapper-content">
                    <input type="text" name="postalCode" id="postalCode" placeholder="Pl.: 1234" maxLength={4}
                           minLength={4}
                           value={ideaFormContextData.postalCode}
                           onChange={handleChangeInput}/>
                  </div>
                </> : <>
                  {ideaFormContextData.postalCode === "" || ideaFormContextData.postalCode === undefined ?
                    <p>Nem adtad meg az irányítószámod!</p> : <p>{ideaFormContextData.postalCode}</p>}
                </>}

                {errorObject?.postalCode ? Object.values(errorObject.postalCode).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`postalCode-${i}`}/>
                }) : null}
              </div>

              <hr/>

              <div className="input-wrapper-overview">
                <div className="input-wrapper-overview-title">
                  <h6><label htmlFor="location">Ötlet helyszíne</label></h6>

                  <button type="button" className="btn btn-overview-edit" aria-label="Szerkesztés" onClick={() => {
                    setInputComponent('location')
                  }}/>
                </div>

                {inputComponentEdit === "location" ? <>
                  <div className="input-wrapper-content">
                    <div className="input-wrapper">
                      <div className="row">
                        <div className="col-12 col-xl-12">
                          <Select
                            title="Ötlet helyszíne *"
                            name="location"
                            value={ideaFormContextData.location}
                            dataList={locationDataList}
                            handleChange={handleChangeInputTitle}
                          />
                        </div>
                      </div>

                      {ideaFormContextData.location === "1" ?
                        <div style={{marginTop: 18}}>
                          <div className="row">
                            <div className="col-6 col-xl-6">
                              <div className="input-wrapper">
                                <h6><label htmlFor="birthyear">Közterület megnevezése *</label></h6>
                                <input type="text" name="locationDescription" id="locationDescription"
                                       placeholder="Pl. utca, tér"
                                       value={ideaFormContextData.locationDescription}
                                       onChange={handleChangeInputTitle}/>
                              </div>
                            </div>
                            <div className="col-6 col-xl-6">
                              <h6><label htmlFor="birthyear">Kerület *</label></h6>
                              <ReactSelect
                                isMulti
                                options={districtDataList}
                                value={ideaFormContextData.locationDistricts}
                                onChange={handleLocationDistrictsInput}
                              />
                            </div>
                          </div>
                        </div>
                        : null}
                    </div>
                  </div>
                </> : <>
                  {ideaFormContextData.location === undefined || ideaFormContextData.location === "" || ideaFormContextData.location === "0" ?
                    <p>Nem választottál a helyszínt!</p> :
                    <>
                      {ideaFormContextData.location === "1" ? <p>Konkrét helyszínhez kötödik</p> : null}
                      {ideaFormContextData.location === "2" ? <p>Nem kötődik konkrét helyszínhez</p> : null}
                      <p>{ideaFormContextData.locationDescription}</p>
                      {ideaFormContextData.location === "1" ?
                        <p>{ideaFormContextData.locationDistricts.map((district: any) => {
                          return district.label + ' '
                        })}</p> : null}
                    </>
                  }
                </>}
              </div>
            </div>

            <hr/>

            <div className="input-wrapper">
              <div className="input-wrapper-overview">
                <div className="input-wrapper-overview-title">
                  <h6><label htmlFor="title">Ötlet címe</label></h6>

                  <button type="button" className="btn btn-overview-edit" aria-label="Szerkesztés" onClick={() => {
                    setInputComponent('title')
                  }}/>
                </div>

                {inputComponentEdit === "title" ? <>
                  <div className="input-wrapper-content">
                    <p className="info">
                      <span>
                        Adj ötletednek olyan címet, ami tömör, lényegretörő, kiderül, mit javasolsz.
                        Az előző évek nyertes, már megvalósítás alatt álló ötleteinek listáját&nbsp;
                        <Link href={`/projektek?rand=${rand}`} target={'_blank'}>itt</Link>
                        &nbsp;éred el, ez segítséget nyújthat a könnyebb kitöltésben.
                      </span>
                    </p>

                    <InputLengthValidator
                      title="Ötleted címe"
                      name="title"
                      value={ideaFormContextData.title}
                      showLabel={false}
                      options={{min: 4, max: 100}}
                      onChange={handleChangeInputTitle}
                    />
                  </div>
                </> : <>
                  {ideaFormContextData.title === "" || ideaFormContextData.title === undefined ?
                    <p>Nem nevezted el az ötleted!</p> : <p>{ideaFormContextData.title}</p>}
                </>}

                {errorObject?.title ? Object.values(errorObject.title).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`title-${i}`}/>
                }) : null}
              </div>
            </div>

            <hr/>

            <div className="input-wrapper">
              <div className="input-wrapper-overview">
                <div className="input-wrapper-overview-title">
                  <h6><label htmlFor="description">Ötlet leírása</label></h6>

                  <button type="button" className="btn btn-overview-edit" aria-label="Szerkesztés" onClick={() => {
                    setInputComponent('description')
                  }}/>
                </div>

                {inputComponentEdit === "description" ? <>
                  <div className="input-wrapper-content">
                    <p className="info">
                      <span>Itt azt írd le, hogy mi a fejlesztés tartalma, mit valósítson meg az önkormányzat! Nem ide kell leírnod, hogy az ötleted miért jó ötlet.</span>
                    </p>

                    <TextareaLengthValidator
                      title="Mit valósítson meg a Főváros?"
                      name="description"
                      value={ideaFormContextData.description}
                      showLabel={false}
                      options={{min: 100, max: 1000}}
                      onChange={handleChangeInputTitle}
                    />
                  </div>
                </> : <>
                  {ideaFormContextData.description === "" || ideaFormContextData.description === undefined ?
                    <p>Nem adtál meg fejlesztési leírást az ötletednek!</p> :
                    <p style={{wordBreak: 'break-all'}}>{ideaFormContextData.description}</p>}
                </>}

                {errorObject?.description ? Object.values(errorObject.description).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`description-${i}`}/>
                }) : null}
              </div>
            </div>

            <hr/>

            <div className="input-wrapper">
              <div className="input-wrapper-overview">
                <div className="input-wrapper-overview-title">
                  <h6><label htmlFor="solution">Miért jó, ha megvalósul ötleted?</label></h6>

                  <button type="button" className="btn btn-overview-edit" aria-label="Szerkesztés" onClick={() => {
                    setInputComponent('solution')
                  }}/>
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
                      options={{min: 20, max: 1000}}
                      onChange={handleChangeInputTitle}
                    />
                  </div>
                </> : <>
                  {ideaFormContextData.solution === "" || ideaFormContextData.solution === undefined ?
                    <p>Nem adtad meg, hogy milyen problémát old meg az ötleted!</p> :
                    <p style={{wordBreak: 'break-all'}}>{ideaFormContextData.solution}</p>}
                </>}

                {errorObject?.solution ? Object.values(errorObject.solution).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`solution-${i}`}/>
                }) : null}
              </div>
            </div>

            <hr/>

            <div className="input-wrapper">
              <div className="input-wrapper-overview">
                <div className="input-wrapper-overview-title">
                  <h6><label htmlFor="phone">Telefonszám</label></h6>

                  <button type="button" className="btn btn-overview-edit" aria-label="Szerkesztés" onClick={() => {
                    setInputComponent('phone')
                  }}/>
                </div>

                {inputComponentEdit === "phone" ? <>
                  <div className="input-wrapper-content">
                    <p className="info">
                      <span>Telefonos elérhetőség megadása nem kötelező. Ha megadod, gördülékenyebben tudunk kommunikálni veled az ötleted kapcsán.</span>
                    </p>

                    <PhonenumberInput id="phone" name="phone" value={ideaFormContextData.phone}
                                      handleChange={handlePhonenumberInput}/>
                  </div>
                </> : <>
                  {ideaFormContextData.phone === "" || ideaFormContextData.phone === undefined ?
                    <p>Nem adtál meg telefonszámot. (Nem kötelező)</p> :
                    <p>{ideaFormContextData.phone}</p>}
                </>}

                {errorObject?.phone ? Object.values(errorObject.phone).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`phone-${i}`}/>
                }) : null}
              </div>
            </div>

            <hr/>

            <div className="input-wrapper">
              <div className="input-wrapper-overview">
                <div className="input-wrapper-overview-title">
                  <label htmlFor="medias">Képek, dokumentumok feltöltése</label>

                  <button type="button" className="btn btn-overview-edit" aria-label="Szerkesztés" onClick={() => {
                    setInputComponent('medias')
                  }}/>
                </div>

                {inputComponentEdit === "medias" ? <>
                  <div className="input-wrapper-content">
                    <div className="tipp">Itt tudsz képeket vagy egyéb dokumentumokat feltölteni, amikről úgy gondolod,
                      segítik az ötleted megértését, kapcsolódnak hozzá. Max. 5 darab fájl tölthető fel!
                    </div>

                    <FileArea changeRaw={handleChangeFileRaw} originalMedias={ideaFormContextData.medias}/>
                  </div>
                </> : <>
                  {ideaFormContextData.medias?.length === 0 || ideaFormContextData.medias === undefined ?
                    <p>Nem töltöttél fel csatolmányt. (Nem kötelező)</p> : <>
                      <MediaList originalMedias={ideaFormContextData.medias}/>
                    </>}
                </>}

                {errorObject?.medias ? Object.values(errorObject.medias).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`medias-${i}`}/>
                }) : null}
              </div>
            </div>

            <hr/>

            <div className="form-group">
              <Checkbox
                id="rule_1"
                name="rule_1"
                label="Megértettem, hogy az ötletem csak akkor kerülhet szavazólistára, ha az a Főváros hatáskörében megvalósítható vagy karbantartási kérdés."
                handleChange={handleChangeInput}
                value={ideaFormContextData.rule_1}
              />

              {errorObject?.rule_1 ? Object.values(errorObject.rule_1).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`rule_1-${i}`}/>
              }) : null}
            </div>

            <div className="form-group">
              <Checkbox
                id="rule_2"
                name="rule_2"
                label="Megértettem, hogy az ötletem csak akkor kerülhet szavazólistára, ha az nem érint magán- vagy állami területet, pl. iskolák, kórházak, a MÁV vagy a HÉV területei."
                handleChange={handleChangeInput}
                value={ideaFormContextData.rule_2}
              />

              {errorObject?.rule_2 ? Object.values(errorObject.rule_2).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`rule_2-${i}`}/>
              }) : null}
            </div>

            <div className="form-group">
              <Checkbox
                id="rule_3"
                name="rule_3"
                label="Megértettem, hogy az ötletem csak akkor kerülhet szavazólistára, ha a tervezett megvalósítási költsége nem több 120 millió forintnál."
                handleChange={handleChangeInput}
                value={ideaFormContextData.rule_3}
              />

              {errorObject?.rule_3 ? Object.values(errorObject.rule_3).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`rule_3-${i}`}/>
              }) : null}
            </div>

            <div className="form-group">
              <Checkbox
                id="rule_4"
                name="rule_4"
                label="Tudomásul veszem, hogy az ötlet hivatali szakmai értékelésének előfeltétele a lakossági támogatáson való továbbjutás."
                handleChange={handleChangeInput}
                value={ideaFormContextData.rule_4}
              />

              {errorObject?.rule_4 ? Object.values(errorObject.rule_4).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`rule_4-${i}`}/>
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

            <input type="submit" className="btn btn-primary btn-headline next-step" disabled={!canBeSubmit}
                   value="Beküldöm az ötletem"/>
          </div>
        </fieldset>
      </form>
    </div>
  )
}
