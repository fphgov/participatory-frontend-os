"use client"

import { useEffect } from "react"

export default function ForceRedirectPage() {
  useEffect(() => {
    window.location.href = '/'
  }, [])

  return (
    <main className="page">
    </main>
  );
}
