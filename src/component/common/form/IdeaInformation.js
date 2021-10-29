import React, { useState } from 'react'
import FormPaginator from './elements/FormPaginator'
import InputLengthValidator from './elements/InputLengthValidator'

export default function IdeaInformation({ nextStep, prevStep, handleChange, handleChangeTitle, values }) {
  const [ participateChoose, setParticipateChoose ] = useState('no')

  return (
    <>
      <h3>Kiegészítő információk</h3>

      <div className="form-group location">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10">
            <div className="input-wrapper">
              <label htmlFor="cost">Becsült költség</label>
              <div className="tipp">Ha van elképzelésed ötleted megvalósításának költségéről, itt leírhatod. Fontos, hogy javaslatod a meghatározott keretekbe beleférjen. Kisebb projektekből több tud megvalósulni, ezért azok nagyobb eséllyel indulnak a szavazáson. A költségbecslést minden esetben a Főpolgármesteri Hivatal szakértői véglegesítik.</div>
              <input type="text" autoCorrect="off" autoCapitalize="none" name="cost" id="cost" value={values.cost} onChange={handleChange} />
            </div>

            <div className="input-wrapper">
              <h4>Részt vennél az ötlet részleteinek kidolgozásában?</h4>

              <div className="tipp">A szavazást követően a nyertes ötleteket a főváros részletesen kidolgozza, szükség esetén tervezteti. A kidolgozás során bevonjuk azokat az ötletgazdákat, akik ezt szeretnék. Kérjük, jelöld, hogy kívánsz-e az ötlet kidolgozásában részt venni, ha igen milyen tudással, háttérrel!</div>

              <div className="radio-inline">
                <input
                  type="radio"
                  id="participateChooseYes"
                  name="participateChoose"
                  value="yes"
                  checked={participateChoose === "yes"}
                  onChange={(e) => {
                    setParticipateChoose(e.target.value)
                  }} />
                <label htmlFor="participateChooseYes">Igen</label>
              </div>

              <div className="radio-inline">
                <input
                  type="radio"
                  id="participateChooseNo"
                  name="participateChoose"
                  value="no"
                  checked={participateChoose === "no"}
                  onChange={(e) => {
                    setParticipateChoose(e.target.value)
                  }} />
                <label htmlFor="participateChooseNo">Nem</label>
              </div>

              {participateChoose === 'yes' ? <>
                <InputLengthValidator
                  title="Milyen módon tudna részt venni a megvalósításban?"
                  name="participate"
                  tipp=""
                  value={values.participate}
                  options={{ min: 0, max: 100 }}
                  info={''}
                  onChange={handleChangeTitle}
                />
              </> : null}
            </div>
          </div>
        </div>
      </div>

      <FormPaginator prevStep={prevStep} nextStep={nextStep} />
    </>
  )
}
