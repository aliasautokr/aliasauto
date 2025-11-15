'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { getLocalizedValue } from '@/lib/translation'
import type { Locale } from 'next-intl'

interface CollectionCardProps {
  id: number
  listingId: string
  data: Record<string, unknown>
  locale: Locale
}

export default function CollectionCard({ id, listingId, data, locale }: CollectionCardProps) {
  const t = useTranslations('collections')
  const text = (data?.text ?? data ?? {}) as Record<string, unknown>
  const images = Array.isArray(data?.images) ? data.images : []
  const primaryImage = images[0] || '/placeholder-car.jpg'
  const specs = data?.specs as Record<string, unknown> | undefined

  const make = getLocalizedValue(text?.make as Record<string, unknown> | string | null | undefined, locale as 'ru' | 'en' | 'uz' | 'kz' | 'ko')
  const model = getLocalizedValue(text?.model as Record<string, unknown> | string | null | undefined, locale as 'ru' | 'en' | 'uz' | 'kz' | 'ko')
  const carLabel = [make, model].filter(Boolean).join(' ').trim() || '—'
  
  // Get price with full number formatting
  const priceKRW = specs?.priceKRW ? Number(specs.priceKRW) : null
  const currency = specs?.currency ? String(specs.currency) : 'KRW'
  const formattedPrice = priceKRW ? `${priceKRW.toLocaleString()} ${currency}` : null

  return (
    <Link href={`/${locale}/collections/${listingId}`}>
      <div className="group relative overflow-hidden rounded-lg border border-gray-800 bg-black/50 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/20">
        {/* Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-900">
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={carLabel}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-800 text-gray-600">
              No Image
            </div>
          )}
          {/* Image count badge */}
          {images.length > 1 && (
            <div className="absolute top-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm">
              {images.length} photos
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-white line-clamp-1">{carLabel}</h3>
          {formattedPrice && (
            <p className="text-sm font-semibold text-amber-500">{formattedPrice}</p>
          )}

          {/* Quick specs */}
          {specs && (
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-400">
              {specs.year ? <span>Year: {String(specs.year)}</span> : null}
              {specs.fuelType ? (
                <span className="capitalize">Fuel: {String(specs.fuelType)}</span>
              ) : null}
              {specs.transmission ? (
                <span className="capitalize">Trans: {String(specs.transmission)}</span>
              ) : null}
            </div>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="rounded bg-amber-500/20 px-3 py-2 text-center text-sm font-medium text-white backdrop-blur-sm">
              {t('viewDetails')}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

