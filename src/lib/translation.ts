type Locale = 'ru' | 'en' | 'uz' | 'kz' | 'ko'

type LocalizedString = string | { [key in Locale]?: string }

/**
 * Get localized value from a localized string object
 * Fallback chain: requested locale → ru → en → first available → empty string
 */
export function getLocalizedValue(
  localizedString: LocalizedString | null | undefined,
  locale: Locale
): string {
  if (!localizedString) return ''

  // If it's already a string, return it
  if (typeof localizedString === 'string') {
    return localizedString.trim()
  }

  // If it's an object with locale keys
  if (typeof localizedString === 'object') {
    // Try requested locale first
    if (localizedString[locale] && typeof localizedString[locale] === 'string') {
      return localizedString[locale]!.trim()
    }

    // Fallback to ru
    if (locale !== 'ru' && localizedString.ru && typeof localizedString.ru === 'string') {
      return localizedString.ru.trim()
    }

    // Fallback to en
    if (localizedString.en && typeof localizedString.en === 'string') {
      return localizedString.en.trim()
    }

    // Fallback to first available
    const fallbackOrder: Locale[] = ['uz', 'kz', 'ko']
    for (const fallbackLocale of fallbackOrder) {
      if (localizedString[fallbackLocale] && typeof localizedString[fallbackLocale] === 'string') {
        return localizedString[fallbackLocale]!.trim()
      }
    }

    // Last resort: get first non-empty value
    const values = Object.values(localizedString).filter((v) => typeof v === 'string' && v.trim())
    if (values.length > 0) {
      return String(values[0]).trim()
    }
  }

  return ''
}

/**
 * Get localized value with a custom fallback
 */
export function getLocalizedValueWithFallback(
  localizedString: LocalizedString | null | undefined,
  locale: Locale,
  fallback: string
): string {
  const value = getLocalizedValue(localizedString, locale)
  return value || fallback
}

