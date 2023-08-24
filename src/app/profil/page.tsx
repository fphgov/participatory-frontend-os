import { apiProfileData, apiProfileIdeaData } from "@/lib/api-requests"
import HeroPage from '@/components/common/HeroPage'
import ProfileBox from '@/components/profile/ProfileBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCardAlt, faLightbulb } from "@fortawesome/free-solid-svg-icons"
import Link from 'next/link'
import { IUser } from '@/models/user.model'
import { IIdea } from '@/models/idea.model'
import ProfileIdeaList from '@/components/profile/ProfileIdeaList'
import ProfileDeleteButton from '@/components/profile/ProfileDeleteButton'
import { notFound } from 'next/navigation'
import PasswordChangeForm from './password-change-form'

type ProfilePageData = {
  profile: IUser|null
  ideas: IIdea[]
}

async function getData(): Promise<ProfilePageData> {
  const profile = await apiProfileData()
  const ideas = await apiProfileIdeaData({
    'username': profile.username
  })

  return {
    profile,
    ideas
  }
}

export default async function ProfilePage() {
  const { profile, ideas } = await getData()

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
                <h2><FontAwesomeIcon icon={faIdCardAlt} /> Fiók információk</h2>

                {profile ? <ProfileBox profile={profile} /> : null}

                <hr />

                <PasswordChangeForm />

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

      </div>
    </main>
  )
}
