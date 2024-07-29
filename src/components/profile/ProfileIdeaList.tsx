import IdeasWrapper from "@/components/idea/IdeasWrapper"
import { IIdea } from "@/models/idea.model"

type ProfileIdeaList = {
  ideas: IIdea[]
}

export default function ProfileIdeaList({ ideas }: ProfileIdeaList): JSX.Element|null {
  if (ideas.length === 0) {
    return (
      <div className="col-sm-12 col-md-12 col-lg-6">
        <p>Nincs beküldött ötlet</p>
      </div>
    )
  }

  return (
    <div className="row">
      {ideas.map((idea: IIdea) => (
        <IdeasWrapper
          key={idea.id}
          ideaPreLink="/otletek"
          showStatus={false}
          className="col-sm-12 col-sm-12 col-md-12 col-lg-6 col-xl-6"
          idea={idea}
          showDescription={true}
        />
      ))}
    </div>
  )
}
