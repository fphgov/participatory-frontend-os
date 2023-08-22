import React from "react"
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

export default function Loading(): JSX.Element {
  return (
    <div className="loading-overlayer">
      <div className="loader">
        <div>
          <Image
            src="/images/logo-bp.svg"
            width={188}
            height={35}
            alt="Budapest Közösségi Költségvetés"
            aria-hidden={true}
          />
        </div>

        <div className="loader-spinner">
          <FontAwesomeIcon icon={faSpinner} pulse size="2x" />
        </div>
      </div>
    </div>
  )
}
