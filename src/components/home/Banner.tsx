import Image from 'next/image'

type BannerProps = {
  id: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  children: React.ReactNode;
  col?: number;
  imageFit?: boolean;
}

export default function Banner({ id, image, imageWidth, imageHeight, children, col = 5, imageFit = false }: BannerProps): JSX.Element|null {
  const fitWidth = { width: '100%', height: 'auto' }

  return (
    <div id={id} className={`banner banner-${id}`}>
      <div className="container">
        <div className="row">
          <div className={`col-md-12 col-lg-${col + 1} col-xl-${col}`}>
            <div className="banner-image">
              <Image
                src={`/images/${image}.svg`}
                width={imageWidth}
                height={imageHeight}
                alt={'Banner'}
                aria-hidden={true}
                style={imageFit ? fitWidth : undefined}
              />
            </div>
          </div>

          <div className={`col-md-12 col-lg-${12 - col + 1} col-xl-${12 - col}`}>
            <div className="banner-content">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
