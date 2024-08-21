import Share from "@/components/common/Share"

type ShareInfoProps = {
  title?: string
  type?: 'simple' | 'sidebar'
}

export default function ShareInfo({ title = "Oszd meg másokkal is!", type = 'sidebar' }: ShareInfoProps): JSX.Element|null {
  return (
    <div className={`prop-single-wrapper prop-single-${type} prop-single-${type}-info`}>
      <div className="prop-single-content">
        <h6>{title}</h6>

        <div className="prop-info-content prop-info-share">
          <Share iconColor={type === 'simple' ? 'blue' : ''} />
        </div>
      </div>
    </div>
  )
}
