import { getTranslations } from 'next-intl/server'
import { apiClient } from '@/lib/api-client'
import CollectionCard from '@/components/CollectionCard'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Locale } from 'next-intl'

// Force dynamic rendering since we're fetching data from an API
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface CollectionsPageProps {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: CollectionsPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'collections' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function CollectionsPage({ params, searchParams }: CollectionsPageProps) {
  const { locale } = await params
  const { page } = await searchParams
  const currentPage = parseInt(page || '1')

  const data = await apiClient.getCollections({
    page: currentPage,
    limit: 20,
  }).catch(() => null)

  const collections = data?.items || []
  const pagination = data?.pagination || { page: 1, limit: 20, total: 0, totalPages: 1 }

  const t = await getTranslations({ locale, namespace: 'collections' })

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-400">{t('description')}</p>
        </div>

        {/* Collections Grid */}
        {collections.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">{t('noCollections')}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {collections.map((collection: Record<string, unknown>) => (
                <CollectionCard
                  key={String(collection.listingId)}
                  id={Number(collection.id)}
                  listingId={String(collection.listingId)}
                  data={(collection.data as Record<string, unknown>) || {}}
                  locale={locale}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                {currentPage > 1 && (
                  <a
                    href={`/${locale}/collections?page=${currentPage - 1}`}
                    className="rounded-lg border border-gray-800 bg-black/50 px-4 py-2 text-white transition-colors hover:border-amber-500/50 hover:bg-black/70"
                  >
                    {t('previous')}
                  </a>
                )}
                <span className="px-4 py-2 text-gray-400">
                  {t('page', { current: currentPage, total: pagination.totalPages })}
                </span>
                {currentPage < pagination.totalPages && (
                  <a
                    href={`/${locale}/collections?page=${currentPage + 1}`}
                    className="rounded-lg border border-gray-800 bg-black/50 px-4 py-2 text-white transition-colors hover:border-amber-500/50 hover:bg-black/70"
                  >
                    {t('next')}
                  </a>
                )}
              </div>
            )}
          </>
        )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

