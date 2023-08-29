import type { Metadata } from 'next'
import PasswordChangeForm from './password-change-form'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Jelszó módosítás',
  }
}

type PasswordChangePageProps = {
  params: { hash: string }
}

export default async function PasswordChangePage({ params }: PasswordChangePageProps) {
  return (
    <main className="page page-reset-password page-full-dark">
      <div className="page-reset-password-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <PasswordChangeForm params={params} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
