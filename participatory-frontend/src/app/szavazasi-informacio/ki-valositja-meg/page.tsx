import type { Metadata } from 'next'
import SideTabs from '@/app/szavazasi-informacio/SideTabs'
import { Who } from '@/app/szavazasi-informacio/content'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Hogyan tudsz szavazatot leadni?",
  }
}

export default async function VoteInfoWhoPage() {
  return (
    <>
      <SideTabs contentName="ki-valositja-meg">
        <Who />
      </SideTabs>
    </>
  )
}
