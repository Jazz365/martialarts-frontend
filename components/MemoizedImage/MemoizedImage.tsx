'use client';

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
    unoptimized,
    onClick=()=>{},
}: {
    className?: string;
    src: StaticImageData | string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    quality?: number;
    style?: CSSProperties;
    unoptimized?: boolean;
    onClick?: () => void;
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
        unoptimized={unoptimized}
        onClick={onClick}
    />
})

MemoizedImage.displayName = 'MemoizedImage';

export default MemoizedImage