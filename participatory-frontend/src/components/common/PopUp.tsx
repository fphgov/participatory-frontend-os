"use client"

type PopUpProps = {
  url: string
  title: string
  children: React.ReactNode
}

export default function PopUp({ url, title, children }: PopUpProps): JSX.Element|null {
  const open = () => {
    window.open(url, "pop", "width=600, height=400, scrollbars=no")
  }

  return (
    <a onClick={open} title={title}>
      {children}
    </a>
  )
}
