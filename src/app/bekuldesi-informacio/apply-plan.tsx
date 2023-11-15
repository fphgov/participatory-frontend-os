'use client'

import { useState } from "react"
import Checkbox from "@/components/common/form-element/Checkbox"

export default function AppyPlan() {
  const [checked, setChecked] = useState(false)

  const handleChangeInput = () => {
    setChecked(!checked)
  }

  return (
    <div className="light-section apply-plan info-zig-zag-bg-blue">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Checkbox
              id="guide"
              name="guide"
              label="Elolvastam és megértettem, hogy milyen ötletekkel lehet pályázni."
              handleChange={handleChangeInput}
              value={checked}
            />

            <a className={`btn btn-tertiary btn-big ${!checked && 'disabled'}`} href="/bekuldes">Beadok egy ötletet</a>
          </div>
        </div>
      </div>
    </div>
  )
}
