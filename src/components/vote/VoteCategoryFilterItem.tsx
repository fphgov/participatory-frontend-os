import { categoryResolver } from "@/utilities/categoryResolver"
import Link from "next/link"
import React from "react"

type VoteCategoryFilterItemProps = {
  theme: string
  currentTheme: string
  href: string
  ready?: boolean
}

export default function VoteCategoryFilterItem({
  theme,
  currentTheme,
  href,
  ready = false,
}: VoteCategoryFilterItemProps): JSX.Element {
  const isCurrentTheme = (themeId: string, theme: string) => {
    return themeId.toUpperCase() === theme.toUpperCase()
  }

  const active = isCurrentTheme(theme, currentTheme)

  return (
    <Link href={href} className={`vote-filter-item${active ? ' active' : ''} vote-filter-item-status-${ready ? 'unavailable' : 'available'}`}>
      <div className="vote-filter-item-name">
        <div className={`vote-filter-item-icon vote-filter-item-icon-${theme.toLowerCase()}`}></div>

        {categoryResolver(theme)}
      </div>
      <div className={`vote-filter-item-status`}></div>
    </Link>
  )
}
