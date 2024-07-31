import HeroPage from "@/components/common/HeroPage"
import { getToken } from "@/lib/actions"
import { RedirectType } from "next/dist/client/components/redirect"
import { redirect } from "next/navigation"
import { IdeaContextProvider } from "./idea-store"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const token = (await getToken())?.value

  if (!token) {
    redirect('/bejelentkezes?from=bekuldes', RedirectType.replace)
  }

  return (
    <main className="page page-page">
      <div className="page-idea-single-section">
        <HeroPage title="Ötlet beküldése">
          <p>Köszönjük, hogy megosztod velünk ötleted! A kitöltési folyamat nem szakítható meg!</p>
        </HeroPage>

        <IdeaContextProvider>
          {children}
        </IdeaContextProvider>
      </div>
    </main>
  )
}
