import React, { useEffect, useState } from "react"

export default function CountDown({ endDate, finalText, beforeText, afterText }) {
  const calculateTimeLeft = () => {
    const difference = +endDate - new Date()

    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        "nap": Math.floor(difference / (1000 * 60 * 60 * 24)),
        "óra": Math.floor((difference / (1000 * 60 * 60)) % 24),
        "perc": Math.floor((difference / 1000 / 60) % 60),
        "mp": Math.floor((difference / 1000) % 60)
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  const timerComponents = []

  timerComponents.push(beforeText)

  Object.keys(timeLeft).forEach((interval, i) => {
    if (interval === 'nap' && !timeLeft[interval]) {
      return
    }

    timerComponents.push(
      <span key={i}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    )
  })

  timerComponents.push(afterText)

  return (
    <div className="countdown">
      {timerComponents.length ? timerComponents : <span>{finalText}</span>}
    </div>
  )
}
