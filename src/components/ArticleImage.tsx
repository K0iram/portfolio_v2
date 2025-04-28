'use client'

import Image from 'next/image'

interface ArticleImageProps {
  src: string
  alt: string
  width: number
  height: number
}

export function ArticleImage({ src, alt, width, height }: ArticleImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="my-8 rounded-lg"
    />
  )
}
