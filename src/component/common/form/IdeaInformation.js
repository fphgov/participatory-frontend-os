import React, { useState } from 'react'
import FormPaginator from './elements/FormPaginator'
import InputLengthValidator from './elements/InputLengthValidator'

export default function IdeaInformation({ nextStep, prevStep, handleChange, values }) {
  const [ participateChoose, setParticipateChoose ] = useState('no')

  return (
    <>
      <h3>Kiegészítő információk</h3>

      <div className="form-group location">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10">
            <div className="input-wrapper">
              <label htmlFor="cost">Becsült költség</label>
              <div className="tipp">Lorem ipsum dolor sit amet consectetur adipisicing elit!</div>
              <input type="text" autoCorrect="off" autoCapitalize="none" name="cost" id="cost" value={values.cost} onChange={handleChange} />
            </div>

            <div className="input-wrapper">
              <h4>Részt venne a megvalósításban?</h4>

              <div className="tipp">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus pariatur voluptas tempore repellat, dolore praesentium, corporis voluptates blanditiis similique temporibus, molestias quam fugit eos? At beatae ad illum aliquid soluta!</div>

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
                  onChange={handleChange}
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
