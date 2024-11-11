'use client'

import { useState } from "react"
import Checkbox from "@/components/common/form-element/Checkbox"
import Link from "next/link"

export default function AppyPlan() {
  const [checked, setChecked] = useState(false)

  const handleChangeInput = () => {
    setChecked(!checked)
  }

  return (
    <div className="dark-section apply-plan info-zig-zag-bg-blue">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p>Ha példákra van szükséged, <Link href={`/tervek`} target="_blank">itt tudsz böngészni</Link> a korábbi években elfogadott és szavazásra bocsátott ötletek között.</p>

            <Checkbox
              id="guide"
              name="guide"
              label="Elolvastam és megértettem az ötletbeadás szabályait."
              handleChange={handleChangeInput}
              value={checked}
            />

            <a className={`btn btn-next btn-headline ${!checked && 'disabled'}`} href="/bekuldes">Beadok egy ötletet</a>
          </div>
        </div>
      </div>
    </div>
  )
}
