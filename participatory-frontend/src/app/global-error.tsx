'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Hiba történt</h2>
        <button onClick={() => reset()}>Próbáld újra</button>
      </body>
    </html>
  )
}
