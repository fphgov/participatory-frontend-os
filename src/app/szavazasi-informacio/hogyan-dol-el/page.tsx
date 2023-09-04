import type { Metadata } from 'next'
import SideTabs from '@/app/szavazasi-informacio/SideTabs'
import { HowIsItDescided } from '@/app/szavazasi-informacio/content'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Hogyan tudsz szavazatot leadni?',
    openGraph: {
      title: 'Hogyan tudsz szavazatot leadni?',
      type: 'website',
      locale: 'hu_HU',
      images: ['/opengraph-image.png'],
    }
  }
}

export default async function VoteInfoHowIsItDescidedPage() {
  return (
    <>
      <SideTabs contentName="hogyan-dol-el">
        <HowIsItDescided />
      </SideTabs>
    </>
  )
}
