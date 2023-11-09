'use client'

import { rmAllCharForName } from "@/utilities/removeSpecialCharacters"
import { useEffect, useState } from "react"
import SimpleRadio from "@/components/common/form-element/SimpleRadio"
import Select from "@/components/common/form-element/Select"
import InputLengthValidator from "@/components/common/form-element/InputLengthValidator"
import TextareaLengthValidator from "@/components/common/form-element/TextareaLengthValidator"
import FileArea from "@/components/common/form-element/FileArea"
import Toggle from "@/components/common/form-element/Toogle"
import Checkbox from "@/components/common/form-element/Checkbox"
import 'intl-tel-input/build/css/intlTelInput.css';
import PhonenumberInput, { PhonenumberValue } from "@/components/common/form-element/PhonenumberInput"
import Link from "next/link"
import { useIdeaContext } from "./idea-store"

export default function IdeaSubmissionForm(): JSX.Element {
  const { setIdeaFormContextData } = useIdeaContext()

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

  useEffect(() => {
    setIdeaFormContextData(formData)

    localStorage.setItem('idea', JSON.stringify(formData))
  }, [formData, setIdeaFormContextData])

  return (
    <div className="idea-submission-form">
      <h2>Kötelezően kitöltendő mezők</h2>

      <p>Minden fontos információt itt tudsz megadni az ötleteddel kapcsolatban, minden mező kitöltése kötelező.</p>

      <form className="form-horizontal">
        <fieldset>
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
                    </div>
                  </> : null}
                </div>
              </div>
            </div>

            <hr />

            <div className="form-wrapper">
              <div className="input-wrapper">
                <h6><label htmlFor="cost">Becsüld meg az ötleted megvalósításához szükséges összeget!</label></h6>

                <Toggle
                  id="cost"
                  name="cost"
                  value={formData.cost}
                  handleChange={handleChangeInput}
                  tipp={"Megértettem, hogy ötletem csak úgy kerülhet szavazólistára, ha tervezett megvalósítási költsége nem több 120 millió forintnál."}
                />
              </div>
            </div>

            <hr />

            <div className="input-wrapper">
              <h6><label htmlFor="title">Nevezd el az ötleted!</label></h6>
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

            <hr />

            <div className="input-wrapper">
              <h6><label htmlFor="description">Mit valósítson meg a főváros?</label></h6>
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

            <hr />

            <div className="input-wrapper">
              <h6><label htmlFor="solution">Miért jó, ha megvalósul ötleted?</label></h6>
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

            <hr />

            <h5>Kiegészítő információk</h5>

            <div className="input-wrapper">
              <h6><label htmlFor="phone">Telefonszám:</label></h6>
              <p className="info">Azért szeretnénk, ha megadnád telefonos elérhetőségedet, mert sokkal gördülékenyebben tudnánk kommunikálni veled az ötleted kapcsán.</p>

              <PhonenumberInput id="phone" name="phone" value={formData.phone} handleChange={handlePhonenumberInput} />
            </div>

            <hr />

            <div className="input-wrapper">
              <label htmlFor="medias">Képek, dokumentumok feltöltése</label>
              <div className="tipp">Itt tudsz képeket vagy egyéb dokumentumokat feltölteni, amikről úgy gondolod, segítik az ötleted megértését, kapcsolódnak hozzá. Max. 5 darab fájl tölthető fel!</div>

              <FileArea changeRaw={handleChangeFileRaw} originalMedias={formData.medias} />
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
            </div>

            <div className="form-group">
              <Checkbox
                id="rule_2"
                name="rule_2"
                label="Megértettem, hogy az ötletem csak akkor kerülhet szavazólistára, ha az nem érint magán vagy állami területet, pl. iskolák, kórházak, MÁV, HÉV területek. Segítséget itt találsz."
                handleChange={handleChangeInput}
                value={formData.rule_2}
              />
            </div>

            <div className="form-group">
              <Checkbox
                id="rule_3"
                name="rule_3"
                label="Megértettem, hogy az ötletem csak akkor kerülhet szavazólistára, ha tervezett megvalósítási költsége nem több 120 millió forintnál."
                handleChange={handleChangeInput}
                value={formData.rule_3}
              />
            </div>

            <Link href="/bekuldes/attekintes" className="btn btn-primary btn-headline next-step">Következő lépés</Link>
          </div>
        </fieldset>
      </form>
    </div>
  )
}
