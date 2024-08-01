"use server"

import type { Metadata } from 'next'
import { getToken } from "@/lib/actions"
import { notFound } from 'next/navigation'
import Error from '@/components/common/Error'
import { apiProjectData, apiCheckPhase, apiCheckVote } from '@/lib/api-requests'
import HeroPage from '@/components/common/HeroPage'
import ProjectWrapperSimple from '@/components/idea/ProjectWrapperSimple'
import { OkResponse } from '@/lib/types'
import { generateRandomValue } from '@/utilities/generateRandomValue'
import BannerArea from '@/components/home/BannerArea'
import VoteButton from '@/components/vote/VoteButton'

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
    description: pageData?.description,
    openGraph: {
      title: pageData?.title,
      description: pageData?.description,
      type: 'website',
      locale: 'hu_HU',
      images: ['/opengraph-image.png'],
    }
  }
}

export default async function ProjectPage({ params }: Props) {
  const rand = generateRandomValue().toString()

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
  const backHref = projectVoteable ? `/szavazas${pageData?.campaignTheme?.code ? `?theme=${pageData?.campaignTheme?.code}&rand=${rand}` : `?rand=${rand}`}` : `/projektek?rand=${rand}`

  return (
    <>
      <main className="page page-idea page-project">
        <div className="prop">
          <HeroPage title={pageData.title} link={null}>
            <VoteButton
              style="hero"
              showVoteButton={projectVoteable}
              disableVoteButton={! enabledVoteButton}
              projectId={pageData.id}
              token={token}
              errorVoteable={errorVoteable}
            />
          </HeroPage>

          <div className="container">
            {error ? <Error message={error} /> : null}

            <ProjectWrapperSimple
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

      <div className="container">
        <BannerArea />
      </div>
    </>
  )
}
