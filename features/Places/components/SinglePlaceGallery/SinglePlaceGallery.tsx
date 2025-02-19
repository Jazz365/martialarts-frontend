import React, { memo } from 'react'
import styles from './styles.module.css'
import Carousel from "react-multi-carousel";
import MemoizedImage from '@/components/common/MemoizedImage/MemoizedImage';

const SinglePlaceGallery = memo(({
  images=[],
  className,
  ssr=true,
}: {
  images: IPlaceImage[];
  className?: string;
  ssr?: boolean;
}) => {
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 3,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 2,
      partialVisibilityGutter: 30
    }
  };

  return <>
    <Carousel
      responsive={responsive}
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={2000}
      centerMode={false}
      className={`${styles.carouselll} ${className ?? ''}`}
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={true}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
      autoPlay
      transitionDuration={500}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      ssr={ssr}
    >
      {
        React.Children.toArray(
          images
          .map((image, index) => {
            return <MemoizedImage
              src={image.image as string}
              alt='place'
              key={image.id}
              width={0}
              height={500}
              className={`${styles.image} ${index === 1 ? styles.main : ''}`}
              quality={100}
              priority={true}
              unoptimized={true}
              style={{
                pointerEvents: 'none',
                contain: 'unset',
                contentVisibility: 'unset',
                willChange: 'unset',
              }}
            />
          })
        )
      }
    </Carousel>
  </>
})

export default SinglePlaceGallery