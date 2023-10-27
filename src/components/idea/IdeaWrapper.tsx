import Link from "next/link"
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IIdea } from "@/models/idea.model"
import { getDocuments, getImages } from "@/utilities/helperFunctions"
import { getHungarianDateFormat } from "@/utilities/dateFormats"
import CategoryIcon from "@/components/idea/CategoryIcon"
import Comment from "@/components/idea/Comment"
import nFormatter from "@/utilities/nFormatter"
import Share from "@/components/common/Share"
import Gallery from "../common/Gallery"

type IdeasWrapperProps = {
  idea: IIdea
}

export default function IdeaWrapper({ idea }: IdeasWrapperProps): JSX.Element {
  const theme = idea.campaignTheme

  const images = idea.medias ? getImages(idea.medias) : []
  const documents = idea.medias ? getDocuments(idea.medias) : []

  return (
    <div className="prop-inner-wrapper">
      <div className="prop-inner-content">
        <div className="row">
          <div className="offset-lg-1 col-lg-7">
            <div className="prop-single-wrapper prop-single-body">
              <div className="prop-single-inner">
                <div className="prop-single-content">
                  {idea.description ? <>
                    <div className="prop-single-section">
                      <h3>Leírás</h3>

                      <div className="prop-single-description" dangerouslySetInnerHTML={{ __html: idea.description }} />
                    </div>
                  </> : null}

                  {idea.solution ? <>
                    <div className="prop-single-section">
                      <h3>Min szeretnél változtatni?</h3>

                      <div className="prop-single-solution" dangerouslySetInnerHTML={{ __html: idea.solution }} />
                    </div>
                  </> : null}

                  {idea.locationDescription ? <>
                    <div className="prop-single-section">
                      <h3>Helyszín</h3>

                      <div className="prop-single-location-description" dangerouslySetInnerHTML={{ __html: idea.locationDescription }} />
                    </div>
                  </> : null}

                  {idea.medias && idea.medias.length > 0 ? (<>
                    <div className="prop-single-section">
                      <h3>Feltöltött képek, dokumentumok</h3>

                      {idea.medias && idea.medias.length > 0 ? (
                        <>
                          <div className="media-sep">
                            {images && images.length > 0 ? <Gallery items={images} showThumbnails={true} /> : null}
                          </div>
                        </>
                      ) : null}

                      {idea.medias && idea.medias.length > 0 ? (
                        <>
                          <div className="media-sep">
                            <div className="documents">
                              {documents && documents.length > 0 && documents.map((document, i) => (
                                <a key={i} href={document.original} target="_blank" rel="noopener noreferrer">
                                  <div key={i} className="document">
                                    <FontAwesomeIcon icon={faFilePdf} />
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </>) : null}

                  {idea.links && idea.links.length > 0 ? (
                    <div className="prop-single-section prop-single-section-hidden-bottom">
                      <h3>{idea.links.length > 1 ? "Kapcsolódó hivatkozások" : "Kapcsolódó hivatkozás"}</h3>

                      <ul className="links">
                        {idea.links.map((link, i) => {
                          return (
                            <li key={`link-${i}`}><a href={link} rel="noopener noreferrer">{link}</a></li>
                          )
                        })}
                      </ul>
                    </div>
                  ) : null}

                </div>
              </div>

              {idea.answer ? <>
                <div className="prop-single-history prop-single-history-idea">
                  <div className="prop-single-inner">
                    <div className="prop-single-content">
                      <h3>Hivatal visszajelzése</h3>

                      <div className="prop-single-answer" dangerouslySetInnerHTML={{ __html: idea.answer }} />
                    </div>
                  </div>
                </div>
              </> : null}

              {idea.comments && idea.comments.length > 0 ? <>
                <div className="prop-single-history">
                  <div className="prop-single-inner">
                    <div className="prop-single-content">
                      <h3>Megjegyzések</h3>

                      <Comment comments={idea.comments} />
                    </div>
                  </div>
                </div>
              </> : null}
            </div>
          </div>

          <div className="col-lg-3">
            {idea.project ? (
              <div className="prop-single-wrapper prop-single-sidebar prop-single-sidebar-info">
                <div className="prop-single-content">
                  <div>Ismerd meg, hogy a beadott ötlet milyen formában került szavazólapra letisztázott szöveggel, adott esetben más hasonló ötletekkel összevonva.</div>
                  <div className="prop-single-elem">
                    <Link href={`/projektek/${idea.project.id}`} className="btn btn-primary btn-next">Megnézem az ötletet</Link>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="prop-single-wrapper prop-single-sidebar prop-single-sidebar-info">
              <div className="prop-single-content">
                <h6>Oszd meg másokkal is!</h6>

                <div className="prop-info-content prop-info-share">
                  <Share />
                </div>
              </div>
            </div>

            <div className="prop-single-wrapper prop-single-sidebar">
              <div className="prop-single-content">
                <div className="prop-single-side-section prop-single-id">
                  <div className="prop-info-title">Sorszám</div>
                  <div className="prop-info-content">{idea.id}</div>
                </div>

                {theme && theme.name ? (
                  <div className="prop-single-side-section prop-single-elem">
                    <div className="prop-info-title">Kategória</div>
                    <div className="prop-info-content">
                      <div className="prop-category">
                        <div className="prop-theme"><CategoryIcon name={theme.name} color="blue" />{theme.name}</div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {idea.campaignLocation && idea.campaignLocation.name ? (
                  <div className="prop-single-side-section">
                    <div className="prop-info-title">Helyszín</div>
                    <div className="prop-info-content">
                      {idea.campaignLocation.name}
                    </div>
                  </div>
                ) : null}

                {idea.campaign ? (
                  <div className="prop-single-side-section">
                    <div className="prop-info-title">Időszak</div>
                    <div className="prop-info-content">
                      {idea.campaign.shortTitle}
                    </div>
                  </div>
                ) : null}

                <div className="prop-single-side-section">
                  <div className="prop-info-title">Állapot</div>
                  <div className="prop-info-content">
                    {idea?.workflowState?.title}
                  </div>
                </div>

                <div className="prop-single-side-section prop-single-cost">
                  <div className="prop-info-title">Becsült költség</div>
                  <div className="prop-info-content">
                    {!idea.cost ? <>A költségeket nem becsülték meg</> : <>{nFormatter(idea.cost)}</>}
                  </div>
                </div>

                {idea.submitter ? (
                  <div className="prop-single-side-section prop-single-elem">
                    <div className="prop-info-title">Beküldés</div>
                    <div className="prop-info-content">
                      {idea.submitter.lastname} {idea.submitter.firstname}, {idea.createdAt ? getHungarianDateFormat(idea.createdAt) : ''}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
