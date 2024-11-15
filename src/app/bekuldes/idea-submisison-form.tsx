'use client'

import { rmAllCharForName, rmAllCharForTitle } from "@/utilities/removeSpecialCharacters"
import Select from "@/components/common/form-element/Select"
import InputLengthValidator from "@/components/common/form-element/InputLengthValidator"
import TextareaLengthValidator from "@/components/common/form-element/TextareaLengthValidator"
import FileArea from "@/components/common/form-element/FileArea"
import 'intl-tel-input/build/css/intlTelInput.css';
import PhonenumberInput, { PhonenumberValue } from "@/components/common/form-element/PhonenumberInput"
import Link from "next/link"
import { useIdeaContext } from "./idea-store"
import { districtDataList } from "@/models/district.model"
import { locationDataList } from "@/models/location.model"
import { generateRandomValue } from "@/utilities/generateRandomValue"
import React from 'react'
import ReactSelect, {MultiValue} from 'react-select'

export default function IdeaSubmissionForm(): JSX.Element {
  const { ideaFormContextData, updateIdeaFormContextData } = useIdeaContext()

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
    setIdeaFormContextData({ ...ideaFormContextData, locationDistricts: locationDistricts })
  }

  const handlePhonenumberInput = (phoneObject: PhonenumberValue) => {
    updateIdeaFormContextData({ phone: phoneObject })
  }

  const handleChangeFileRaw = (name: string, value: any) => {
    updateIdeaFormContextData({ [name]: value })
  }

  return (
    <div className="idea-submission-form">
      <form className="form-horizontal">
        <fieldset>
          <div className="form-wrapper">

            <h2>Személyes adatok ötletbeküldéshez</h2>

            <div className="input-wrapper">
              <h6><label htmlFor="fullName">Teljes név *</label></h6>
              <p className="info">Ez a név fog megjelenni a beadott ötleted mellett a honlapon.</p>
              <input type="text" name="fullName" id="fullName" placeholder="Családnév Utónév"
                     value={ideaFormContextData.fullName}
                     onChange={handleChangeInput}/>
            </div>

            <br/>

            <div className="input-wrapper">
              <h6><label htmlFor="birthYear">Születési év *</label></h6>
              <input type="text" name="birthYear" id="birthYear" placeholder="ÉÉÉÉ" maxLength={4} minLength={4}
                     value={ideaFormContextData.birthYear}
                     onChange={handleChangeInput}/>
            </div>

            <br/>

            <div className="input-wrapper">
              <h6><label htmlFor="postalCode">Irányítószám *</label></h6>
              <p className="info">Budapesti lakóhelyed vagy budapesti munkahelyed/iskolád irányítószáma</p>
              <input type="text" name="postalCode" id="postalCode" placeholder="Pl.: 1234" maxLength={4} minLength={4}
                     value={ideaFormContextData.postalCode}
                     onChange={handleChangeInput}/>
            </div>

            <hr/>

            <h2>Ötlet helyszíne</h2>
            <p className="info">
              <span>
                Figyelj arra, hogy ha kerékpáros insfrastruktúrára, közvécére, zebrára vagy zöldítésre vontakozó ötletet
                adsz be, ahhoz helyszínt is adj meg.
              </span>
            </p>

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

            <hr/>

            <h2>Ötlet címe</h2>
            <p>
              Adj ötletednek olyan címet, ami tömör, lényegretörő, kiderül, mit javasolsz.
              Az előző évek nyertes, már megvalósítás alatt álló ötleteinek listáját&nbsp;
              <Link href={`/projektek?rand=${rand}`} target={'_blank'}>itt</Link>
              &nbsp;éred el, ez segítséget nyújthat a könnyebb kitöltésben.
            </p>

            <div className="input-wrapper">
              <h6><label htmlFor="title">Ötlet címe *</label></h6>

              <InputLengthValidator
                title="Ötleted címe"
                name="title"
                value={ideaFormContextData.title}
                showLabel={false}
                options={{min: 4, max: 100}}
                onChange={handleChangeInputTitle}
              />
            </div>

            <hr/>

            <h2>Ötlet leírása</h2>
            <p>
              Itt azt írd le, hogy mi a fejlesztés tartalma, mit valósítson meg az önkormányzat! Nem ide kell leírnod,
              hogy az ötleted miért jó ötlet. Egyszerre csak egy ötletet adj be!
              Ha egy ötlet leírásánál korábban sokféle javaslat szerepelt,
              pl. legyen valahol játszótér, de ott legyen wc, meg sportpálya is,
              akkor nehéz eldönteni, hogy melyik valósuljon meg.
              Az egy ötletre fordítható összeg arra általában nem elég,
              hogy egy ötleten belül több fejlesztés is megvalósuljon.
            </p>

            <div className="input-wrapper">
              <h6><label htmlFor="description">Ötlet leírása *</label></h6>

              <TextareaLengthValidator
                title="Mit valósítson meg a Főváros?"
                name="description"
                value={ideaFormContextData.description}
                showLabel={false}
                options={{min: 100, max: 1000}}
                onChange={handleChangeInputTitle}
              />
            </div>

            <hr/>

            <h2>Miért jó, ha megvalósul az ötleted?</h2>
            <p>Milyen problémát old meg, kinek és miben segít?</p>

            <div className="input-wrapper">
              <h6><label htmlFor="solution">Ötlet indoklása *</label></h6>

              <TextareaLengthValidator
                title="Mire megoldás?"
                name="solution"
                value={ideaFormContextData.solution}
                showLabel={false}
                options={{min: 20, max: 1000}}
                onChange={handleChangeInputTitle}
              />
            </div>

            <hr/>

            <h2>Kiegészítő információk</h2>

            <div className="input-wrapper">
              <h6><label htmlFor="phone">Telefonszám</label></h6>
              <p><span>
                Ha megadod a telefonos elérhetőségedet, gördülékenyebben tudunk kommunikálni veled,
                ha kérdésünk van az ötleted kapcsán.
              </span>
              </p>

              <PhonenumberInput id="phone" name="phone" value={ideaFormContextData.phone}
                                handleChange={handlePhonenumberInput}/>
            </div>

            <hr/>

            <div className="input-wrapper">
              <label htmlFor="medias">Képek, dokumentumok feltöltése</label>
              <div className="tipp">Itt tudsz képeket vagy egyéb dokumentumokat feltölteni, amikről úgy gondolod,
                segítik az ötleted megértését, kapcsolódnak hozzá. Max. 5 darab fájl tölthető fel!
              </div>

              <FileArea changeRaw={handleChangeFileRaw} originalMedias={ideaFormContextData.medias}/>
            </div>

            <Link href="/bekuldes/attekintes" className="btn btn-primary btn-headline next-step"
                  style={{marginTop: 36}}>Következő lépés</Link>
          </div>
        </fieldset>
      </form>
    </div>
  )
}
