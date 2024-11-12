'use client';

import Link from 'next/link';

const styles = {
  container: {
    minHeight: '50vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorBox: {
    maxWidth: '50vw',
    width: '100%',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  errorDetails: {
    fontSize: '14px',
  },
};

export default function Error({ error }: { error: Error }) {
  return (
    <div style={styles.container}>
      <div style={styles.errorBox}>
        <h1 style={styles.heading}>Váratlan hiba történt!</h1>
        <p>Elnézést kérünk a kellemetlenségért. Hiba történt a kérés feldolgozása közben.</p>
        {error.message && (
          <p style={styles.errorDetails}>Error details: {error.message}</p>
        )}
        <Link href="/">Vissza a főoldalra</Link>
      </div>
    </div>
  );
}
