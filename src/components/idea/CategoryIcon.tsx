import Image from 'next/image'

type CategoryIconProps = {
  name: string
  color?: string
  size?: number
}

export default function CategoryIcon({ name, color = "white", size = 18 }: CategoryIconProps): JSX.Element {
  let filename = 'category-'

  switch (name) {
    case 'Egész Budapest':
    case 'Zöld Budapest':
      filename += 'green'
      break;

    case 'Gondoskodó Budapest':
    case 'Esélyteremtő Budapest':
      filename += 'care'
      break;

    case 'Helyi - kis':
    case 'Helyi - kis ötlet':
    case 'Helyi kis ötlet':
      filename += 'local-small'
      break;

    case 'Helyi - nagy':
    case 'Helyi - nagy ötlet':
    case 'Helyi nagy ötlet':
      filename += 'local-big'
      break;

    default:
      filename += 'open'
      break;
  }

  if (color === "blue") {
    filename += '-blue'
  }

  return <Image src={`/images/${filename}.svg`} width={size} height={size} alt={name} aria-hidden={true} />
}
