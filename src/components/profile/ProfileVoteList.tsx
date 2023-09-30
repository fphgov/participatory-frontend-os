import IdeasWrapper from "@/components/idea/IdeasWrapper"
import { IProject } from "@/models/project.model"

type ProfileVoteList = {
  projects: IProject[]
}

export default function ProfileVoteList({ projects }: ProfileVoteList): JSX.Element|null {
  if (projects.length === 0) {
    return (
      <div className="col-sm-12 col-md-12 col-lg-6">
        <p>Nem adtál le szavazatot</p>
      </div>
    )
  }

  return (
    <div className="row">
      {projects.map((project: IProject) => (
        <IdeasWrapper
          key={project.id}
          ideaPreLink="/projektek"
          className="col-sm-12 col-sm-12 col-md-12 col-lg-6 col-xl-6"
          showStatus={false}
          showVoted={false}
          showCampaign={true}
          idea={project}
        />
      ))}
    </div>
  )
}
