import Image from "next/image"

type NavigationIconProps = {
  icon: string
}

export default function NavigationIcon({ icon }: NavigationIconProps): JSX.Element|null {
  return (
    <Image
      src={`/images/font-${icon}.svg`}
      width={18}
      height={18}
      alt={icon}
      aria-hidden={true}
    />
  )
}
