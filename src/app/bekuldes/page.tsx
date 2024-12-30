import type { Metadata } from 'next'
import Link from 'next/link'
import IdeaSubmissionForm from './idea-submisison-form'
import {getProfileData} from "@/lib/api-requests";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Beküldés',
    openGraph: {
      title: 'Beküldés',
      type: 'website',
      locale: 'hu_HU',
      images: ['/opengraph-image.png'],
    }
  }
}

export default async function IdeaSubmissionPage() {
  const { profile, profilePreference } = await getProfileData()

  const baseUrl = "/bekuldes";

  return (
    <>
      <div className="form-status-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
              <ul className="form-status">
                <li><Link href={`${baseUrl}`}><span className="active">1</span> <div className="description">Részletek megadása</div></Link></li>
                <li><Link href={`${baseUrl}/attekintes`}><span>2</span> <div className="description">Áttekintés és beküldés</div></Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
            <IdeaSubmissionForm profile={profile} profilePreference={profilePreference} />
          </div>
        </div>
      </div>
    </>
  )
}
