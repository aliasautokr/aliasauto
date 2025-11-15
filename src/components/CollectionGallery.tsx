'use client'

import { useState } from 'react'
import Image from 'next/image'

interface CollectionGalleryProps {
  images: string[]
  title?: string
}

export default function CollectionGallery({ images, title }: CollectionGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center rounded-lg bg-gray-900 text-gray-600">
        No images available
      </div>
    )
  }

  const selectedImage = images[selectedIndex]

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-900">
        <Image
          src={selectedImage}
          alt={title || `Collection image ${selectedIndex + 1}`}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Thumbnail grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                selectedIndex === index
                  ? 'border-amber-500 ring-2 ring-amber-500/50'
                  : 'border-gray-800 hover:border-gray-600'
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 16vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

