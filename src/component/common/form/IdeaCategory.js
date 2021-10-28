import React, { useRef } from 'react'
import FormPaginator from './elements/FormPaginator'

export default function IdeaCategory({ nextStep, prevStep, handleChange, values }) {
  const category4 = useRef(null)
  const category5 = useRef(null)
  const category6 = useRef(null)

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

              <div className="radio-inline-block">
                <div className={`radio-inline ${values.theme === "4" ? "active" : ""}`} onClick={() => { if (category4 && category4.current) category4.current.click() }}>
                  <div className="radio-inline-symbol">
                    <div className="radio-inline-hide"></div>
                    <input
                      type="radio"
                      id="theme_GREEN"
                      name="theme"
                      value="4"
                      checked={values.theme === "4"}
                      ref={category4}
                      onChange={handleChange} />
                  </div>
                  <div className="radio-inline-content">
                    <label htmlFor="theme_GREEN">Zöld Budapest</label>

                    <p className="tipp">A Zöld Budapest azt jelenti, hogy a főváros szerepet vállal abban, hogy városunk zöldebbé váljon és segíti a budapestieket, hogy környezettudatosan éljenek. Közös célunk, hogy a főváros felkészüljön a 21. század egyik legnagyobb kihívására, a klímaváltozásra.</p>
                  </div>
                </div>

                <div className={`radio-inline ${values.theme === "5" ? "active" : ""}`} onClick={() => { if (category5 && category5.current) category5.current.click() }}>
                  <div className="radio-inline-symbol">
                    <div className="radio-inline-hide"></div>
                    <input
                      type="radio"
                      id="theme_CARE"
                      name="theme"
                      value="5"
                      checked={values.theme === "5"}
                      ref={category5}
                      onChange={handleChange} />
                  </div>
                  <div className="radio-inline-content">
                    <label htmlFor="theme_CARE">Esélyteremtő Budapest</label>

                    <p className="tipp">Az Esélyteremtő Budapest kategória célja, hogy az önkormányzat csökkenteni tudja a társadalmi különbségeket, segítse a hátrányos helyzetű közösségek életét.</p>
                  </div>
                </div>

                <div className={`radio-inline ${values.theme === "6" ? "active" : ""}`} onClick={() => { if (category6 && category6.current) category6.current.click() }}>
                  <div className="radio-inline-symbol">
                    <div className="radio-inline-hide"></div>
                    <input
                      type="radio"
                      id="theme_WHOLE"
                      name="theme"
                      value="6"
                      checked={values.theme === "6"}
                      ref={category6}
                      onChange={handleChange} />
                  </div>
                  <div className="radio-inline-content">
                    <label htmlFor="theme_WHOLE">Nyitott Budapest</label>

                    <p className="tipp">A Nyitott Budapest kategória célja az együttműködés fejlesztése a város közösségeiben, illetve a budapestiek és a főváros, valamint annak intézményei között. Ennek megvalósítása érdekében keresünk új, kísérleti megoldásokat, közösségépítő ötleteket és mindenki által könnyen használható és elérhető digitális fejlesztéseket. Ezzel a főváros célja, hogy gyorsabb, okosabb és praktikusabb megoldásokat nyújtson a budapestieknek.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FormPaginator prevStep={prevStep} nextStep={nextStep} />
      </div>
    </div>
  )
}
