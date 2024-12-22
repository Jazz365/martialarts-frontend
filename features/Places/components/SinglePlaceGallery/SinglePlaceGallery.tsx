'use client';


import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import useMobile from '@/hooks/useMobile';
import { useSwipeable } from 'react-swipeable';


const SinglePlaceGallery = ({
    images=[],
}: {
    images: IPlaceImage[];
}) => {
    const [ currentSlide, setCurrentSlide ] = useState(0);
    const [ imagesToDisplay, setImagesToDisplay ] = useState<IPlaceImage[]>([]);
    const isMobile = useMobile();

    const handlers = useSwipeable({
        onSwipedLeft: () => handleBackward,
        onSwipedRight: () => handleGoForward,
    });

    const handleGoForward = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }

    const handleBackward = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
    }

    useEffect(() => {
        const totalImages = images.length;
        
        const prevIndex = (currentSlide - 1 + totalImages) % totalImages;
        const nextIndex = (currentSlide + 1) % totalImages;

        setImagesToDisplay([
            images[prevIndex], 
            images[currentSlide], 
            images[nextIndex]
        ]);
    }, [currentSlide])

    return <>
        <section 
            {...handlers}
            className={styles.grid__Imgs}
        >
            {
                images.length > 3 &&
                <button 
                    className={`${styles.btn} ${styles.left}`}
                    onClick={handleBackward}
                >
                    <FiChevronLeft size={'1.4rem'} />
                </button>
            }

            {
                React.Children.toArray(
                    imagesToDisplay
                    .map((image, index) => {
                        return <Image 
                            src={image.image as string}
                            alt='place'
                            key={image.id}
                            width={0}
                            height={
                                isMobile ?
                                    250 
                                :
                                550
                            }
                            className={`${styles.image} ${index === 1 ? styles.main : ''}`}
                            quality={100}
                        />
                    })
                )
            }

            {
                images.length > 3 &&
                <button 
                    className={`${styles.btn} ${styles.right}`}
                    onClick={handleGoForward}
                >
                    <FiChevronRight size={'1.4rem'} />
                </button>
            }
        </section>
    </>
}

export default SinglePlaceGallery