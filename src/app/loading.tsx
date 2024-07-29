import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

export default function Loading() {
  return <>
    <div className="loading-overlayer">
      <div className="loader">
        <div className="loader-spinner">
          <FontAwesomeIcon icon={faSpinner} pulse size="2x" />
        </div>
      </div>
    </div>

    <main className="page"></main>
  </>
}
