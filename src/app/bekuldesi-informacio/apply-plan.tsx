'use client'

import { useEffect, useState } from "react"

export default function AppyPlan() {
  const [disabled, setDisabled] = useState(true)

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisabled(!disabled)
  }

  return (
    <div className="light-section apply-plan info-zig-zag-bg-blue">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="guide-check">
              <label>
                <input type="checkbox" id="guide" name="guide" onChange={handleChangeInput}/>
                Elolvastam és megértettem, hogy milyen ötletekkel lehet pályázni.
              </label>
            </div>

            <a className={`btn btn-tertiary btn-big ${disabled && 'disabled'}`} href="/bekuldes">Beadok egy ötletet</a>
          </div>
        </div>
      </div>
    </div>
  )
}