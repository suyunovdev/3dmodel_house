import uz from '../locales/uz.json'
import en from '../locales/en.json'

type Locale = 'uz' | 'en'
type LocaleKey = keyof typeof uz

const locales: Record<Locale, Record<string, string>> = { uz, en }

export function t(key: LocaleKey, locale: Locale = 'uz'): string {
  return locales[locale]?.[key] ?? locales['en'][key] ?? key
}
