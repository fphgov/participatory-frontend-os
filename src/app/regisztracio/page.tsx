import HeroPage from "@/components/common/HeroPage"
import Link from "next/link"
import RegistrationForm from "@/app/regisztracio/registration-form"

export default function RegistrationPage() {
  return (
    <main className="page">
      <div className="page-registration-section">
        <HeroPage title="Regisztráció">
          Van már fiókod? <Link className="link-attention" href="/bejelentkezes">Jelentkezz be.</Link>
        </HeroPage>

        <div className="registration">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3">
                <RegistrationForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
