import React from 'react'
import CardRadio from './elements/CardRadio'
import SimpleRadio from './elements/SimpleRadio'
import FormPaginator from './elements/FormPaginator'
import InputLengthValidator from './elements/InputLengthValidator'
import CategoryIcon from '../CategoryIcon'
import Select from '../../common/form/elements/Select'

export default function IdeaCategory({ nextStep, prevStep, handleChange, values }) {
  return (
    <div>
      <h3>Ötlet kategóriája</h3>

      <div className="form-group form-group-category">
        <p className="info">Kérjük, válassz, hogy a te ötleted melyik kategóriába tartozik!</p>

        <div className="row">
          <div className="col-xs-12 col-sm-12">
            <div className="input-wrapper card-radio-wrapper">
              <div className="row">
                <div className="col-md-4">
                  <CardRadio
                    id="theme_GREEN"
                    name="theme"
                    value="7"
                    radioValue={values.theme}
                    title={<div><CategoryIcon color="blue" size={24} name="Zöld Budapest" /> Zöld Budapest</div>}
                    tipp="Zöldebb utcák, élettel teli parkok, mindenki számára elérhető, környezettudatos megoldások"
                    handleChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <CardRadio
                    id="theme_CARE"
                    name="theme"
                    value="8"
                    radioValue={values.theme}
                    title={<div><CategoryIcon color="blue" size={24} name="Esélyteremtő Budapest" /> Esélyteremtő Budapest</div>}
                    tipp="A társadalmi különbségek csökkentése, hátrányos helyzetű közösségek életének támogatása"
                    handleChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <CardRadio
                    id="theme_WHOLE"
                    name="theme"
                    value="9"
                    radioValue={values.theme}
                    title={<div><CategoryIcon color="blue" size={24} name="Nyitott Budapest" /> Nyitott Budapest</div>}
                    tipp="Együttműködések, új, kísérleti megoldások, digitális fejlesztések, rövid távú, közösségépítő ötletek"
                    handleChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <hr />
          </div>
        </div>
      </div>

      <h3>Helyszín kiválasztása *</h3>

      <div className="form-group form-group-category">
        <p className="info">Kérjük, válassz, hogy ötleted konkrét helyszínhez kötött vagy Budapest egészére vonatkozik!</p>

        <div className="row">
          <div className="col-12 col-xl-12">
            <div className="input-wrapper card-radio-wrapper">
              <div className="row">
                <div className="col-md-6">
                  <SimpleRadio
                    id="specific"
                    name="location"
                    value="1"
                    radioValue={values.location}
                    title="Konkrét helyszínhez kötődik"
                    tipp="Pl. konkrét utca, tér"
                    handleChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <SimpleRadio
                    id="unspecific"
                    name="location"
                    value="0"
                    radioValue={values.location}
                    title="Nem kötődik konkrét helyszínhez"
                    handleChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {values.location === "1" ? <>
              <InputLengthValidator
                title="Helyszín megnevezése"
                name="locationDescription"
                value={values.locationDescription}
                options={{ min: 0, max: 200 }}
                info={''}
                onChange={handleChange}
              />

              <Select
                title="Kerület"
                name="locationDistrict"
                value={values.locationDistrict}
                dataList={[
                  { name: 'Válassz egy kerületet', value: '0'},
                  { name: 'I. kerület', value: '1'},
                  { name: 'II. kerület', value: '2'},
                  { name: 'III. kerület', value: '3'},
                  { name: 'IV. kerület', value: '4'},
                  { name: 'V. kerület', value: '5'},
                  { name: 'VI. kerület', value: '6'},
                  { name: 'VII. kerület', value: '7'},
                  { name: 'VIII. kerület', value: '8'},
                  { name: 'IX. kerület', value: '9'},
                  { name: 'X. kerület', value: '10'},
                  { name: 'XI. kerület', value: '11'},
                  { name: 'XII. kerület', value: '12'},
                  { name: 'XIII. kerület', value: '13'},
                  { name: 'XIV. kerület', value: '14'},
                  { name: 'XV. kerület', value: '15'},
                  { name: 'XVI. kerület', value: '16'},
                  { name: 'XVII. kerület', value: '17'},
                  { name: 'XVIII. kerület', value: '18'},
                  { name: 'XIX. kerület', value: '19'},
                  { name: 'XX. kerület', value: '20'},
                  { name: 'XXI. kerület', value: '21'},
                  { name: 'XXII. kerület', value: '22'},
                  { name: 'XXIII. kerület', value: '23'},
                  { name: 'Margit sziget', value: '24'},
                ]}
                info={''}
                handleChange={handleChange}
              />
            </> : null}

            <hr />
          </div>
        </div>
      </div>

      <FormPaginator nextStep={nextStep} />
    </div>
  )
}
