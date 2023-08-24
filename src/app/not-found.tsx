import Image from 'next/image'
import styles from './not-found.module.css'

export default function NotFoundPage(): JSX.Element {
  return (
    <main className="page">
      <div className={styles.page}>
        <Image
          src="/images/kozossegi_koltsegvetes.svg"
          width={240}
          height={140}
          alt="Budapest Közösségi Költségvetés"
          aria-hidden={true}
        />

        <p>404 - Az oldal nem található</p>
      </div>
    </main>
  )
}
