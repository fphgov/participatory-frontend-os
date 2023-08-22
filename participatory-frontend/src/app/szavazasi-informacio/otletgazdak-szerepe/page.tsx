import type { Metadata } from 'next'
import SideTabs from '@/app/szavazasi-informacio/SideTabs'
import { Mastermind } from '@/app/szavazasi-informacio/content'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Hogyan tudsz szavazatot leadni?",
  }
}

export default async function VoteInfoMastermindPage() {
  return (
    <>
      <SideTabs contentName="otletgazdak-szerepe">
        <Mastermind />
      </SideTabs>
    </>
  )
}
