import HeroPage from "@/components/common/HeroPage"
import { getToken } from "@/lib/actions"
import { RedirectType } from "next/dist/client/components/redirect"
import { redirect } from "next/navigation"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const token = (await getToken())?.value

  if (!token) {
    redirect('/bejelentkezes', RedirectType.replace)
  }

  return (
    <main className="page page-page">
      <div className="page-profile-single-section">
        <HeroPage title="Ötlet beküldése">
          <p>Köszönjük, hogy megosztod velünk ötleted! A kitöltési folyamat nem szakítható meg!</p>
        </HeroPage>

        {children}
      </div>
    </main>
  )
}
