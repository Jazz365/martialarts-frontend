import React from 'react'
import Carousel from "react-multi-carousel";
import styles from "./styles.module.css"
import MemoizedImage from '@/components/MemoizedImage/MemoizedImage';
import PlaceImageSlide from '../../PlaceImageSlide';

const PlaceCardCarousel = ({
    placeName,
    images=[],
    isListView,
}: {
    placeName: string;
    images: IPlaceImage[];
    isListView: boolean;
}) => {
    
    const responsive = {
        desktop: {
            breakpoint: {
                max: 3000,
                min: 1024
            },
            items: 1,
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
            items: 1,
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
            className={`${styles.place__Card__Carousel} ${!isListView && styles.grid}`}
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
            removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
            ssr={true}
        >
            {
                React.Children.toArray(
                    images
                    .map((image) => {
                        return <PlaceImageSlide
                            image={image.image as string}
                            description={placeName}
                            key={image.id}
                            width={0}
                            height={0}
                            className={`${styles.image}`}
                            quality={100}
                            style={{
                                pointerEvents: 'none',
                            }}
                        />
                    })
                )
            }
        </Carousel>
    </>
}

export default PlaceCardCarousel