import { Metadata } from "next"
import {getProfileData} from "@/lib/api-requests"
import HeroPage from '@/components/common/HeroPage'
import ProfileBox from '@/components/profile/ProfileBox'
import Link from 'next/link'
import ProfileDeleteButton from '@/components/profile/ProfileDeleteButton'
import { notFound } from 'next/navigation'
import PasswordChangeForm from './password-change-form'
import SectionBox from "@/components/profile/SectionBox"
import SectionBoxDetails from "@/components/profile/SectionBoxDetails"
import PersonalDataForm from "./personal-data-form"
import HearAboutForm from "./hear-about-form"
import NewsletterChangeForm from "./newsletter-change-form"
import PrizeChangeForm from "./prize-change-form"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Profil',
    openGraph: {
      title: 'Profil',
      type: 'website',
      locale: 'hu_HU',
      images: ['/opengraph-image.png'],
    }
  }
}

export default async function ProfilePage() {
  const { profile, profilePreference } = await getProfileData()

  if (! (profile && profilePreference)) {
    return notFound()
  }

  return (
    <main className="page">
      <div className="page-profile-single-section">

        <HeroPage title="Fiókom" content="" />

        <div className="container">
          <div className="row">
            <div className="offset-xl-2 col-lg-12 col-xl-8">

              <SectionBox footer={
                <div className="section-newsletter"><NewsletterChangeForm profilePreference={profilePreference} /></div>
              }>
                <ProfileBox profile={profile} profilePreference={profilePreference} />
              </SectionBox>

              {0 ?
                <SectionBox footer={<div className="section-prize"><PrizeChangeForm profilePreference={profilePreference} /></div>}>
                  <div className="box-profile">
                    <div className="profile-item">
                      <div className="profile-item-name">Nyereményjáték</div>
                      <div className="profile-item-value">Nyerj értékes ajándékokat! <Link href="/hirek/szavazz-es-nyerj-belepot-furdobe-allatkertbe-szinhazba-es-mas-klassz-helyekre" target="_blank">Részletek itt</Link>.</div>
                    </div>
                  </div>
                </SectionBox> : null}

              <SectionBoxDetails summary="Jelszó beállítás">
                <p>Állíts be jelszót a profilodhoz, így a későbbiekben azzal is be tudsz lépni. Nem kötelező.</p>

                <PasswordChangeForm />
              </SectionBoxDetails>

              <SectionBoxDetails summary="Személyes adatok">
                <PersonalDataForm profilePreference={profilePreference} />
              </SectionBoxDetails>

              <SectionBoxDetails summary="Honnan hallottál rólunk?">
                <HearAboutForm profilePreference={profilePreference}/>
              </SectionBoxDetails>

              <SectionBoxDetails summary="Adatvédelem">
                <Link className="btn btn-primary-solid btn-solid-underline btn-pdf" href={`${process.env.NEXT_PUBLIC_FILES_PATH}/adatkezelesi_tajekoztato.pdf`} prefetch={false} download={true} target="_blank">Adatkezelési tájékoztató letöltése</Link>
              </SectionBoxDetails>

              <SectionBoxDetails summary="Fiók törlés">
                <p>Minden személyes adatod azonnal törlésre kerül, a törlés nem visszavonható.</p>

                <ProfileDeleteButton />
              </SectionBoxDetails>

              <div style={{ margin: '24px 0' }}>
                <Link className="btn btn-primary-solid btn-solid-underline" href="/kijelentkezes" prefetch={false}>Kijelentkezés</Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
