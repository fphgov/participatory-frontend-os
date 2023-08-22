
import { IComment } from '@/models/comment.model'
import ta from '@/utilities/timeAgo'

type CommentProps = {
  comments: IComment[]
}

export default function Comment({ comments }: CommentProps): JSX.Element {
  const renderComment = (comment: IComment) => {
    return (
      <>
        <div className="comment-heading">
          <div className="comment-info">
            <span className="comment-submitter">{comment.submitter.lastname} {comment.submitter.firstname}</span>
            <span className="comment-time">{ta.ago(new Date(comment.createdAt))}</span>
          </div>
        </div>

        <div className="comment-body">
          {comment.content}
        </div>

        <div className="comment-replies">
          {comments && comments.filter((c) => c.parentComment != null && c.parentComment.id == comment.id).map((replyComment, key) => (
            <div key={key} className="comment-item">
              {renderComment(replyComment)}
            </div>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className="comment-wrapper">
      {comments && comments.filter((c) => c.parentComment == null).map((comment, key) => (
        <div key={key} className="comment-item">
          { renderComment(comment) }
        </div>
      ))}
    </div>
  )
}
