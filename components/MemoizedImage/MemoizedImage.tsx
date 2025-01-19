import Image, { StaticImageData } from 'next/image'
import React, { CSSProperties, memo } from 'react'

const MemoizedImage = memo(({
    className,
    src,
    alt,
    width=0,
    height=0,
    priority=false,
    quality,
    style={},
}: {
    className?: string;
    src: StaticImageData | string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    quality?: number;
    style?: CSSProperties;
}) => {
    return <Image 
        className={className}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        style={style}
    />
})

MemoizedImage.displayName = 'MemoizedImage';

export default MemoizedImage