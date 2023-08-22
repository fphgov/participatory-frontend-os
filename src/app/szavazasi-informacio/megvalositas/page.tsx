import type { Metadata } from 'next'
import SideTabs from '@/app/szavazasi-informacio/SideTabs'
import { Community } from '@/app/szavazasi-informacio/content'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Hogyan tudsz szavazatot leadni?",
  }
}

export default async function VoteInfoCommunityPage() {
  return (
    <>
      <SideTabs contentName="megvalositas">
        <Community />
      </SideTabs>
    </>
  )
}
