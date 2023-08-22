type SidebarCardProps = {
  children: React.ReactNode
}

export default function SidebarCard({ children }: SidebarCardProps): JSX.Element|null {
  return (
    <div className="sidebar-card">
      {children}
    </div>
  )
}
