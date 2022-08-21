import React from 'react'
import SimpleRadio from './elements/SimpleRadio'
import FormPaginator from './elements/FormPaginator'

export default function IdeaCategory({ nextStep, prevStep, handleChange, values }) {
  return (
    <div>
      <h3>Ötlet kategóriája</h3>

      <div className="form-group form-group-category">
        <p>Válaszd ki az ötlet <b>témáját</b> *</p>

        <div className="row">
          <div className="col-xs-12 col-sm-12">
            <div className="input-wrapper">
              <h4>Kategória *</h4>
              <div className="tipp">A közösségi költségvetés az Otthon Budapesten programmal összhangban három kategóriában kínál lehetőséget az ötletek beadására. Kérjük, válassz, hogy a te ötleted melyik kategóriába tartozik az alábbiak közül!</div>

              <SimpleRadio
                id="theme_GREEN"
                name="theme"
                value="4"
                radioValue={values.theme}
                title="Zöld Budapest"
                tipp="A Zöld Budapest azt jelenti, hogy a főváros szerepet vállal abban, hogy városunk zöldebbé váljon és segíti a budapestieket, hogy környezettudatosan éljenek. Közös célunk, hogy a főváros felkészüljön a 21. század egyik legnagyobb kihívására, a klímaváltozásra."
                handleChange={handleChange}
              />

              <SimpleRadio
                id="theme_CARE"
                name="theme"
                value="5"
                radioValue={values.theme}
                title="Esélyteremtő Budapest"
                handleChange={handleChange}
              />

              <SimpleRadio
                id="theme_WHOLE"
                name="theme"
                value="6"
                radioValue={values.theme}
                title="Nyitott Budapest"
                tipp="A Nyitott Budapest kategória célja az együttműködés fejlesztése a város közösségeiben, illetve a budapestiek és a főváros, valamint annak intézményei között. Ennek megvalósítása érdekében keresünk új, kísérleti megoldásokat, közösségépítő ötleteket és mindenki által könnyen használható és elérhető digitális fejlesztéseket. Ezzel a főváros célja, hogy gyorsabb, okosabb és praktikusabb megoldásokat nyújtson a budapestieknek."
                handleChange={handleChange}
              />

            </div>
          </div>
        </div>

        <FormPaginator prevStep={prevStep} nextStep={nextStep} />
      </div>
    </div>
  )
}
