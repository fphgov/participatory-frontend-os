import type { Metadata } from 'next'
import LoginForm from "./login-form"

type LoginPageProps = {
  searchParams: Record<string, string>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Bejelentkezés',
    openGraph: {
      title: 'Bejelentkezés',
      type: 'website',
      locale: 'hu_HU',
      images: ['/opengraph-image.png'],
    }
  }
}

export default function LoginPage({ searchParams } : LoginPageProps) {
  return (
    <main className="page page-login page-full-dark">
      <div className="page-login-section">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <LoginForm searchParams={searchParams} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
