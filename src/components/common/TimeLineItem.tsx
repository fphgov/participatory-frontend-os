import Image from 'next/image'

type TimeLineItemProps = {
  icon: string
  date: string
  description: string
}

export default function TimeLineItem({ icon, date, description }: TimeLineItemProps): JSX.Element|null {
  return (
    <div className="timeline-item">
      <div className="timeline-image">
        <Image
          src={`/images/${icon}`}
          width={60}
          height={60}
          alt={description}
          aria-hidden={true}
        />
      </div>

      <div className="timeline-date">{date}</div>
      <div className="timeline-description">{description}</div>
    </div>
  )
}
