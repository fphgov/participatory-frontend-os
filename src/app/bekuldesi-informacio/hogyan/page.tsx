import type { Metadata } from 'next'
import SideTabs from '@/app/bekuldesi-informacio/SideTabs'
import { How } from '@/app/bekuldesi-informacio/content'

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

export default async function IdeaInfoAmountPage() {
  return (
    <>
      <SideTabs contentName="hogyan">
        <How />
      </SideTabs>
    </>
  )
}
