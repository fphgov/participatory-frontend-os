"use server"

import type { Metadata } from 'next'
import { getToken } from "@/lib/actions"
import { notFound } from 'next/navigation'
import Error from '@/components/common/Error'
import { apiProjectData, apiCheckPhase, apiCheckVote } from '@/lib/api-requests'
import HeroPage from '@/components/common/HeroPage'
import Link from 'next/link'
import ProjectWrapper from '@/components/idea/ProjectWrapper'
import NewsletterArea from '@/components/home/NesletterArea'
import { OkResponse } from '@/lib/types'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let pageData

  try {
    pageData = await apiProjectData(params.id)
  } catch (e: any) {
    return {}
  }

  return {
    title: pageData?.title,
  }
}

export default async function ProjectPage({ params }: Props) {
  let pageData, phaseStatus, voteable, error, errorVoteable

  try {
    pageData = await apiProjectData(params.id)
    phaseStatus = await apiCheckPhase()
  } catch (e: any) {
    error = e.message
  }

  const token = (await getToken())?.value

  if (token && phaseStatus?.code === "VOTE") {
    try {
      voteable = await apiCheckVote(params.id)
    } catch (e: any) {
      errorVoteable = e.message
    }
  }

  const enabledVoteButton = (
    token === undefined ||
    (token !== undefined && (voteable as OkResponse)?.data?.code === "OK")
  )

  if (!pageData) {
    return notFound()
  }

  const projectVoteable = phaseStatus?.code === "VOTE" && pageData?.campaign?.id === phaseStatus?.campaign && pageData?.workflowState?.code === 'VOTING_LIST'
  const backHref = phaseStatus?.code === "VOTE" ? `/szavazas${pageData?.campaignTheme?.code ? `?theme=${pageData?.campaignTheme?.code}` : ''}` : "/projektek"

  return (
    <>
      <main className="page page-idea">
        <div className="prop">
          <HeroPage title={pageData.title} link={<Link className="link-back" href={backHref}>Vissza</Link>} />

          <div className="container">
            {error ? <Error message={error} /> : null}

            <ProjectWrapper
              project={pageData}
              token={token}
              disableVoteButton={! enabledVoteButton}
              voteable={projectVoteable}
              errorVoteable={errorVoteable}
              backHref={backHref}
            />
          </div>
        </div>
      </main>

      <NewsletterArea />
    </>
  )
}
