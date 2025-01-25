import MemoizedImage from '@/components/MemoizedImage/MemoizedImage'
import React, { CSSProperties, memo } from 'react'

const PlaceImageSlide = memo(({
    width,
    height,
    description,
    image,
    className,
    quality,
    style={},
}: {
    width: number;
    height: number;
    description: string;
    image: string;
    className?: string;
    quality?: number;
    style?: CSSProperties;
}) => {
    return <>
        <MemoizedImage
            width={width}
            height={height}
            alt={description}
            src={image}
            className={className}
            quality={quality}
            priority={true}
            unoptimized={true}
            style={style}
        />
    </>
})

export default PlaceImageSlide