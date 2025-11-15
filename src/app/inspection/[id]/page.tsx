import Link from 'next/link'
import { notFound } from 'next/navigation'
import { apiClient } from '@/lib/api-client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, User, Calendar, FileText } from 'lucide-react'
import InspectionImageGallery from '@/components/InspectionImageGallery'

// Force dynamic rendering since we're fetching data from an API
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const dynamicParams = true
export const runtime = 'nodejs'
export const fetchCache = 'force-no-store'

interface InspectionPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: InspectionPageProps) {
  const { id } = await params

  try {
    const inspection = await apiClient.getInspection(id)
    return {
      title: `${inspection?.inspectionId || id} - Inspection Report`,
      description: `Inspection report ${inspection?.inspectionId || id}`,
    }
  } catch {
    return {
      title: 'Inspection Report Not Found',
    }
  }
}

export default async function InspectionPage({ params }: InspectionPageProps) {
  const { id } = await params

  const inspection = await apiClient.getInspection(id).catch(() => null)
  if (!inspection) {
    notFound()
  }

  // Extract data from inspection based on API response structure
  const inspectionData = inspection as Record<string, unknown>
  const reportNumber = String(inspectionData.inspectionId || id)
  const title = String(inspectionData.title || '')
  const inspectorName = String(inspectionData.inspectorName || 'N/A')
  const customerName = String(inspectionData.customerName || '')
  const createdAt = inspectionData.createdAt 
    ? new Date(String(inspectionData.createdAt)).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) 
    : 'N/A'
  const images = Array.isArray(inspectionData.images) 
    ? inspectionData.images.map((img: unknown) => String(img)) 
    : []
  
  // Description is JSONB, handle as string or EditorJS format
  const descriptionData = inspectionData.description as Record<string, unknown> | string | null | undefined
  let descriptionText = ''
  
  if (typeof descriptionData === 'string') {
    descriptionText = descriptionData
  } else if (descriptionData && typeof descriptionData === 'object') {
    // Check if it's EditorJS format (has blocks array)
    if ('blocks' in descriptionData && Array.isArray(descriptionData.blocks)) {
      // Extract text from EditorJS blocks
      const blocks = descriptionData.blocks as Array<Record<string, unknown>>
      const textParts: string[] = []
      
      for (const block of blocks) {
        const blockType = block.type as string
        const blockData = block.data as Record<string, unknown>
        
        if (blockType === 'paragraph' && blockData.text) {
          textParts.push(String(blockData.text))
        } else if (blockType === 'header' && blockData.text) {
          textParts.push(String(blockData.text))
        } else if (blockType === 'list' && Array.isArray(blockData.items)) {
          const items = blockData.items as Array<string>
          items.forEach((item) => {
            textParts.push(`• ${item}`)
          })
        } else if (blockType === 'quote' && blockData.text) {
          textParts.push(`"${blockData.text}"`)
        } else if (blockData.text) {
          // Fallback for any other block type with text
          textParts.push(String(blockData.text))
        }
      }
      
      descriptionText = textParts.join('\n\n')
    } else if ('text' in descriptionData) {
      // Simple text object
      descriptionText = String(descriptionData.text || '')
    } else if ('en' in descriptionData) {
      // If it's a localized object, use English as default
      descriptionText = String(descriptionData.en || '')
    } else if ('description' in descriptionData) {
      descriptionText = String(descriptionData.description || '')
    } else if ('summary' in descriptionData) {
      descriptionText = String(descriptionData.summary || '')
    } else {
      // Try to get any string value from the object
      const values = Object.values(descriptionData).filter(v => typeof v === 'string')
      if (values.length > 0) {
        descriptionText = values[0]
      } else {
        // If all values are objects, try to recursively extract text
        for (const value of Object.values(descriptionData)) {
          if (value && typeof value === 'object' && !Array.isArray(value)) {
            const nestedValues = Object.values(value).filter(v => typeof v === 'string')
            if (nestedValues.length > 0) {
              descriptionText = nestedValues[0]
              break
            }
          }
        }
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className="pt-20">
        {/* Header Section */}
        <div className="border-b border-white/10 bg-gradient-to-b from-black via-black/95 to-black">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-gray-400 transition-all duration-300 hover:text-amber-500 hover:gap-3"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </Link>

            {/* Report Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                {title && (
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                    {title}
                  </h1>
                )}
                <p className="text-sm font-mono text-gray-400">
                  Report Number: {reportNumber}
                </p>
              </div>
            </div>

            {/* Inspector and Date Info */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-gray-300">
                <User className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="text-xs text-gray-400">Inspector</p>
                  <p className="font-medium">{inspectorName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="text-xs text-gray-400">Inspection Date</p>
                  <p className="font-medium">{createdAt}</p>
                </div>
              </div>
              {customerName && customerName !== 'N/A' && customerName !== '' && (
                <div className="flex items-center gap-3 text-gray-300">
                  <User className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="text-xs text-gray-400">Customer</p>
                    <p className="font-medium">{customerName}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-6">
              {/* Images Gallery */}
              <InspectionImageGallery images={images} />

              {/* Description/Summary Card */}
              <Card className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="h-1 w-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"></div>
                    <FileText className="h-5 w-5 text-amber-500" />
                    Description
                  </h2>
                  {descriptionText ? (
                    <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {descriptionText}
                    </div>
                  ) : (
                    <div className="text-gray-500 italic">
                      No description available
                    </div>
                  )}
                </CardContent>
              </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

