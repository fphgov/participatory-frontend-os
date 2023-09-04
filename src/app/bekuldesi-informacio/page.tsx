import type { Metadata } from 'next'
import SideTabs from '@/app/bekuldesi-informacio/SideTabs'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Mi történik most?',
    openGraph: {
      title: 'Mi történik most?',
      type: 'website',
      locale: 'hu_HU',
      images: ['/opengraph-image.png'],
    }
  }
}

export default async function IdeaInfoPage() {
  return (
    <>
      <SideTabs contentName="">
        <p><b>ALAPELV:</b></p>

        <p>Az ötletek legyenek közérdekűek. Egyéni érdekeket támogató ötleteket nem fogadunk be.</p>

        <p><b>MIRE KÖLTHETŐ?</b></p>

        <p>A közösségi költségvetésből egyaránt megvalósíthatóak beruházások, (pl.: építés, ültetés, informatikai fejlesztések)  szolgáltatások (pl.: közösségi programok, szociális segítségnyújtás is ide tartozik), valamint az új beruházások üzemeltetése. A közösségi költségvetésből legfeljebb 5 évig biztosítható a működés.</p>

        <p><b>HATÁSKÖR / JOGSZABÁLYOK:</b></p>

        <p>A közösségi költségvetésen javasolt projekteknek a Fővárosi Önkormányzat hatáskörébe kell tartozniuk. Ezen belül az ötlet fejleszthet fővárosi vagy kerületi területet, utóbbi esetben a kerület hozzájárulása is szükséges. Az egyeztetéseket a Fővárosi Önkormányzat intézi. A projekteknek meg kell felelniük a mindenkori jogszabályoknak.</p>

        <p><b>HELYSZÍNEK:</b></p>

        <p>Helyszínek szempontjából két kategóriában várjuk az ötleteket:</p>

        <p><b>Egész Budapest ötletek:</b> Egész Budapestre vonatkozó ötletek azok, amelyek a város vagy az itt lakók nagyobb részét érintik, de nem kötődnek konkrét helyszínekhez, vagy sok helyszínes mikrofejlesztések.</p>

        <p><b>Helyi ötletek:</b> Helyi ötletek kategóriában olyan ötletek indulhatnak, amelyek jellemzően egy, kivételes esetben több konkrét helyszínen valósíthatóak meg. A helyi ötleteken belül vannak kis és nagy ötletek.</p>
      </SideTabs>
    </>
  )
}
