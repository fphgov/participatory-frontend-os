import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFoundPage(): JSX.Element {
  return (
    <main className="page page-full-dark page-center">
      <div className={styles.page}>
        <h1>404</h1>

        <p>Sajnáljuk, a keresett oldal nem található</p>

        <Link className="btn btn-headline" href="/">Főoldal</Link>
      </div>
    </main>
  )
}
