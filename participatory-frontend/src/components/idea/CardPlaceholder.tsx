export default function CardPlaceholder(): JSX.Element {
  return (
    <div className="prop-wrapper placeholder-item">
      <div className="prop-inner">
        <div className="prop-category placeholder-loading"></div>
        <div className="prop-content-wrapper">
          <div className="prop-content">
            <div className="prop-line placeholder-loading"></div>
            <div className="prop-line-second placeholder-loading"></div>
          </div>

          <div className="prop-more">
            <div className="btn-wrapper">
              <div className="btn btn-secondary placeholder-loading"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
