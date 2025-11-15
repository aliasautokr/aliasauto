import { getLocalizedValue } from '@/lib/translation'
import type { Locale } from 'next-intl'

interface SpecsTableProps {
  specs: Record<string, unknown>
  text: Record<string, unknown>
  locale: Locale
}

const fuelTypeLabels: Record<string, Record<string, string>> = {
  en: {
    gasoline: 'Gasoline',
    diesel: 'Diesel',
    hybrid: 'Hybrid',
    electric: 'Electric',
  },
  ru: {
    gasoline: 'Бензин',
    diesel: 'Дизель',
    hybrid: 'Гибрид',
    electric: 'Электро',
  },
  uz: {
    gasoline: 'Benzin',
    diesel: 'Dizel',
    hybrid: 'Gibrid',
    electric: 'Elektrik',
  },
  kz: {
    gasoline: 'Бензин',
    diesel: 'Дизель',
    hybrid: 'Гибрид',
    electric: 'Электр',
  },
  ko: {
    gasoline: '가솔린',
    diesel: '디젤',
    hybrid: '하이브리드',
    electric: '전기',
  },
}

const transmissionLabels: Record<string, Record<string, string>> = {
  en: {
    automatic: 'Automatic',
    manual: 'Manual',
    cvt: 'CVT',
    dct: 'Dual Clutch',
  },
  ru: {
    automatic: 'Автомат',
    manual: 'Механика',
    cvt: 'Вариатор',
    dct: 'Робот',
  },
  uz: {
    automatic: 'Avtomat',
    manual: 'Mexanika',
    cvt: 'Variator',
    dct: 'Robot',
  },
  kz: {
    automatic: 'Автомат',
    manual: 'Механика',
    cvt: 'Вариатор',
    dct: 'Робот',
  },
  ko: {
    automatic: '자동',
    manual: '수동',
    cvt: 'CVT',
    dct: '듀얼 클러치',
  },
}

export default function SpecsTable({ specs, text, locale }: SpecsTableProps) {
  const lang = locale as 'ru' | 'en' | 'uz' | 'kz' | 'ko'

  const rows = [
    {
      label: 'Make',
      value: getLocalizedValue(text?.make as Record<string, unknown> | string | null | undefined, lang),
    },
    {
      label: 'Model',
      value: getLocalizedValue(text?.model as Record<string, unknown> | string | null | undefined, lang),
    },
    ...(text?.trim
      ? [
          {
            label: 'Trim',
            value: getLocalizedValue(text.trim as Record<string, unknown> | string | null | undefined, lang),
          },
        ]
      : []),
    ...(specs?.year
      ? [
          {
            label: 'Year',
            value: String(specs.year),
          },
        ]
      : []),
    ...(specs?.mileageKm
      ? [
          {
            label: 'Mileage',
            value: `${specs.mileageKm.toLocaleString()} km`,
          },
        ]
      : []),
    ...(specs?.fuelType
      ? [
          {
            label: 'Fuel Type',
            value: fuelTypeLabels[locale]?.[String(specs.fuelType)] || String(specs.fuelType),
          },
        ]
      : []),
    ...(specs?.transmission
      ? [
          {
            label: 'Transmission',
            value: transmissionLabels[locale]?.[String(specs.transmission)] || String(specs.transmission),
          },
        ]
      : []),
    ...(specs?.engineDisplacementCc
      ? [
          {
            label: 'Engine',
            value: `${String(specs.engineDisplacementCc)} cc`,
          },
        ]
      : []),
    ...(text?.color
      ? [
          {
            label: 'Exterior Color',
            value: getLocalizedValue(text.color as Record<string, unknown> | string | null | undefined, lang),
          },
        ]
      : []),
    ...(text?.interiorColor
      ? [
          {
            label: 'Interior Color',
            value: getLocalizedValue(text.interiorColor as Record<string, unknown> | string | null | undefined, lang),
          },
        ]
      : []),
    ...(specs?.priceKRW
      ? [
          {
            label: 'Price',
            value: `${Number(specs.priceKRW).toLocaleString()} ${String(specs.currency || 'KRW')}`,
          },
        ]
      : []),
  ].filter((row) => row.value && row.value !== '')

  if (rows.length === 0) {
    return null
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-800 bg-black/50">
      <table className="w-full">
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className={`border-b border-gray-800 ${
                index % 2 === 0 ? 'bg-black/30' : 'bg-transparent'
              }`}
            >
              <td className="px-4 py-3 text-sm font-medium text-gray-400">{row.label}</td>
              <td className="px-4 py-3 text-sm text-white">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

