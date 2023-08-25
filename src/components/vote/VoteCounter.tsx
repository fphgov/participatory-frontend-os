import React from "react"
import Image from 'next/image'

type VoteCounterProps = {
  count: number
}

export default function VoteCounter({ count }: VoteCounterProps): JSX.Element {
  return (
    <div className="vote-counter">
      <Image
        src="/images/icon-vote.svg"
        width={24}
        height={24}
        alt="Szavazás ikon"
        aria-hidden={true}
      />
      {count} szavazat
    </div>
  )
}
