import type { Metadata } from 'next'
import SideTabs from '@/app/bekuldesi-informacio/SideTabs'
import { Amount } from '@/app/bekuldesi-informacio/content'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Mi történik most?",
  }
}

export default async function IdeaInfoAmountPage() {
  return (
    <>
      <SideTabs contentName="osszeg">
        <Amount />
      </SideTabs>
    </>
  )
}
