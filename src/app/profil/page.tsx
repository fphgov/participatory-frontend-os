// import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { apiProfileData, apiProfileIdeaData } from "@/lib/api-requests"
// import { AuthPageInvisible } from "@/lib/protect-page"
import HeroPage from '@/components/common/HeroPage'
import ProfileBox from '@/components/profile/ProfileBox'
import Error from '@/components/common/Error'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCardAlt, faLightbulb } from "@fortawesome/free-solid-svg-icons"
import Link from 'next/link'
import { IUser } from '@/models/user.model'
import { IIdea } from '@/models/idea.model'
import ProfileIdeaList from '@/components/profile/ProfileIdeaList'
import ProfileDeleteButton from '@/components/profile/ProfileDeleteButton'
import { notFound } from 'next/navigation'

type ProfilePageData = {
  profile: IUser|null
  ideas: IIdea[]
}

async function getData(): Promise<ProfilePageData> {
  const profile = await apiProfileData()
  const ideas = await apiProfileIdeaData({
    'username': profile.username
  })

  // return Promise.all([profile, ideas])
  return {
    profile,
    ideas
  }
}

export default async function ProfilePage() {
  const { profile, ideas } = await getData()

  const error = ''

  // const [loadIdeas, setLoadIdeas] = useState(false)
  // const [error, setError] = useState('')
  // const [redirectLogout, setRedirectLogout] = useState(false)
  // const [redirectLogin, setRedirectLogin] = useState(false)
  // const [credential, setCredential] = useState({
  //   password: '',
  //   password_again: '',
  // })

  if (! (profile && ideas)) {
    return notFound()
  }

  return (
    <main className="page">
      <div className="page-profile-single-section">

        <HeroPage title="Fiókom" content="" />

        <div className="container">
          <div className="row">
            <div className="offset-xl-2 col-lg-12 col-xl-8">

              <div className="section section-block">
                {(typeof error === 'string' && error !== '') ? <Error message={error} /> : null}

                <h2><FontAwesomeIcon icon={faIdCardAlt} /> Fiók információk</h2>

                {profile ? <ProfileBox profile={profile} /> : null}

                <hr />

                {/* <form onSubmit={submitPassword}>
                  <fieldset>
                    <div className="form-wrapper">

                      <div className="input-inline-wrapper">
                        <div className="input-wrapper">
                          <label htmlFor="password">Új jelszó</label>
                          <input type="password" name="password" id="password" value={credential.password} onChange={handleChangeInput} />

                          {error && error.password ? Object.values(error.password).map((err, i) => {
                            return <ErrorMini key={i} error={err} increment={`password-${i}`} />
                          }) : null}
                        </div>

                        <div className="input-wrapper">
                          <label htmlFor="password_again">Új jelszó ismét</label>
                          <input type="password" name="password_again" id="password_again" value={credential.password_again} onChange={handleChangeInput} />

                          {error && error.password_again ? Object.values(error.password_again).map((err, i) => {
                            return <ErrorMini key={i} error={err} increment={`password_again-${i}`} />
                          }) : null}
                        </div>
                      </div>

                      <div className="btn-wrapper" style={{ marginTop: 24 }}>
                        <button type="submit" className="btn btn-gray">Módosítás</button>
                      </div>
                    </div>
                  </fieldset>
                </form> */}

                <div className="btn-wrapper btn-wrapper-flex">
                  <ProfileDeleteButton profile={profile} />

                  <Link className="btn btn-primary-solid" href="/kijelentkezes">Kijelentkezés</Link>
                </div>
              </div>

              <div className="section">
                <h2><FontAwesomeIcon icon={faLightbulb} /> Beküldött ötletek ({ideas.length})</h2>

                <ProfileIdeaList ideas={ideas} />
              </div>
            </div>
          </div>
        </div>

        {/* <AuthPageInvisible /> */}
        <ToastContainer />
      </div>
    </main>
  )
}
