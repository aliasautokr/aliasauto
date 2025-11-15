import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { apiClient } from '@/lib/api-client'
import { getLocalizedValue } from '@/lib/translation'
import CollectionGallery from '@/components/CollectionGallery'
import SpecsTable from '@/components/SpecsTable'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import type { Locale } from 'next-intl'

// Force dynamic rendering since we're fetching data from an API
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface CollectionDetailPageProps {
  params: Promise<{ locale: Locale; listingId: string }>
}

export async function generateMetadata({ params }: CollectionDetailPageProps) {
  const { locale, listingId } = await params

  try {
    const collection = await apiClient.getCollection(listingId)
    const text = (collection?.data?.text ?? collection?.data ?? {}) as Record<string, unknown>
    const lang = locale as 'ru' | 'en' | 'uz' | 'kz' | 'ko'
    const make = getLocalizedValue(text?.make as string | Record<string, unknown> | null | undefined, lang)
    const model = getLocalizedValue(text?.model as string | Record<string, unknown> | null | undefined, lang)
    const title = [make, model].filter(Boolean).join(' ') || 'Collection'
    const collectionListingId = String(collection?.listingId || '')

    return {
      title: `${title} - ${collectionListingId}`,
      description: getLocalizedValue(text?.description as string | Record<string, unknown> | null | undefined, lang) || title,
    }
  } catch {
    return {
      title: 'Collection Not Found',
    }
  }
}

export default async function CollectionDetailPage({ params }: CollectionDetailPageProps) {
  const { locale, listingId } = await params

  const collection = await apiClient.getCollection(listingId).catch(() => null)
  if (!collection) {
    notFound()
  }

  const t = await getTranslations({ locale, namespace: 'collections' })
  const lang = locale as 'ru' | 'en' | 'uz' | 'kz' | 'ko'

  const data = collection.data || {}
  const text = (data.text || data) as Record<string, unknown>
  const specs = (data.specs || {}) as Record<string, unknown>
  const images = Array.isArray(data.images) ? data.images.map((img: unknown) => String(img)) : []
  const additionalOptions = Array.isArray(data.additionalOptions) ? data.additionalOptions : []
  const inspectionHistory = (data.inspectionHistory || {}) as Record<string, unknown>

  const make = getLocalizedValue(text?.make as string | Record<string, unknown> | null | undefined, lang)
  const model = getLocalizedValue(text?.model as string | Record<string, unknown> | null | undefined, lang)
  const carLabel = [make, model].filter(Boolean).join(' ') || String(collection.listingId || '')
  
  // Get price
  const priceKRW = specs?.priceKRW ? Number(specs.priceKRW) : null
  const currency = specs?.currency ? String(specs.currency) : 'KRW'
  const formattedPrice = priceKRW ? `${priceKRW.toLocaleString()} ${currency}` : null

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-20">
        {/* Hero Header Section */}
        <div className="border-b border-white/10 bg-gradient-to-b from-black via-black/95 to-black">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link
              href={`/${locale}/collections`}
              className="mb-6 inline-flex items-center gap-2 text-gray-400 transition-all duration-300 hover:text-amber-500 hover:gap-3"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">{t('back')}</span>
            </Link>

            {/* Title and Price */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {carLabel}
                </h1>
                <p className="text-sm font-mono text-gray-400">ID: {collection.listingId}</p>
              </div>
              {formattedPrice && (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-gray-400 mb-1">Price</p>
                    <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                      {formattedPrice}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Images (2/3 width) */}
            <div className="lg:col-span-2">
              <CollectionGallery images={images} title={carLabel} />
            </div>

            {/* Right Column - Key Info (1/3 width) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Specifications Card */}
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <div className="h-1 w-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"></div>
                      {t('specs')}
                    </h2>
                    <SpecsTable specs={specs as Record<string, unknown>} text={text as Record<string, unknown>} locale={locale} />
                  </CardContent>
                </Card>

                {/* Inspection History Card */}
                {inspectionHistory && (
                  <Card className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <div className="h-1 w-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"></div>
                        {t('inspectionHistory')}
                      </h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-2 border-b border-white/10">
                          <span className="text-sm text-gray-400">Accidents</span>
                          <div className="flex items-center gap-2">
                            {inspectionHistory.accidents ? (
                              <>
                                <XCircle className="h-4 w-4 text-red-500" />
                                <span className="text-sm text-red-400">{t('accidents')}</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-400">{t('noAccidents')}</span>
                              </>
                            )}
                          </div>
                        </div>
                        {(() => {
                          const maintenanceHistoryText = getLocalizedValue(
                            inspectionHistory.maintenanceHistory as string | Record<string, unknown> | null | undefined,
                            lang
                          )
                          return maintenanceHistoryText ? (
                            <div>
                              <span className="text-sm text-gray-400 block mb-2">
                                {t('maintenanceHistory')}:
                              </span>
                              <p className="text-sm whitespace-pre-wrap text-gray-300 leading-relaxed">
                                {maintenanceHistoryText}
                              </p>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500 italic">{t('noMaintenanceHistory')}</p>
                          )
                        })()}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Section - Description and Options */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Description Card */}
            {(() => {
              if (!text?.description) return null
              const description = getLocalizedValue(text.description as string | Record<string, unknown> | null | undefined, lang)
              if (!description) return null
              return (
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <div className="h-1 w-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"></div>
                      {t('descriptionLabel')}
                    </h2>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {description}
                    </p>
                  </CardContent>
                </Card>
              )
            })()}

            {/* Additional Options Card */}
            {additionalOptions.length > 0 && (
              <Card className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="h-1 w-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"></div>
                    {t('additionalOptions')}
                  </h2>
                  <ul className="space-y-3">
                    {additionalOptions.map((option: unknown, index: number) => {
                      const optionText = getLocalizedValue(option as Record<string, unknown> | string | null, lang)
                      if (!optionText) return null
                      return (
                        <li key={index} className="flex items-start gap-3 group">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 group-hover:scale-150 transition-transform duration-300"></div>
                          <span className="text-gray-300 flex-1 leading-relaxed">{optionText}</span>
                        </li>
                      )
                    })}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

