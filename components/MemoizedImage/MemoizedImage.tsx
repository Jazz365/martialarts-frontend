import Image, { StaticImageData } from 'next/image'
import React, { memo } from 'react'

const MemoizedImage = memo(({
    className,
    src,
    alt,
    width=0,
    height=0,
    priority=false,
}: {
    className?: string;
    src: StaticImageData;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
}) => {
    return <Image 
        className={className}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
    />
})

MemoizedImage.displayName = 'MemoizedImage';

export default MemoizedImage