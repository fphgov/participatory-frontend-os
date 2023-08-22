import type { Metadata } from 'next'
import SideTabs from '@/app/szavazasi-informacio/SideTabs'
import { Realization } from '@/app/szavazasi-informacio/content'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Hogyan tudsz szavazatot leadni?",
  }
}

export default async function VoteInfoRealizationPage() {
  return (
    <>
      <SideTabs contentName="mikor">
        <Realization />
      </SideTabs>
    </>
  )
}
