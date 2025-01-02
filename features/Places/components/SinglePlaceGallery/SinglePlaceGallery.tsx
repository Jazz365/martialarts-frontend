import Image from 'next/image';
import React from 'react'
import styles from './styles.module.css'
import Carousel from "react-multi-carousel";

const SinglePlaceGallery = ({
    images=[],
}: {
    images: IPlaceImage[];
}) => {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        }
    };

    return <>
        <Carousel 
            containerClass={styles.carousel__Wrap} 
            responsive={responsive}
            swipeable={true}
            draggable={true}
            showDots={false}
            infinite={true}
            // autoPlay={true}
            // autoPlaySpeed={1000}
            customTransition="all .5"
            transitionDuration={500}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            ssr={true}
        >
            {
                React.Children.toArray(
                    images
                    .map((image, index) => {
                        return <Image
                            src={image.image as string}
                            alt='place'
                            key={image.id}
                            width={505}
                            height={600}
                            className={`${styles.image} ${index === 1 ? styles.main : ''}`}
                            quality={100}
                            priority
                        />
                    })
                )
            }
        </Carousel>
    </>
}

export default SinglePlaceGallery