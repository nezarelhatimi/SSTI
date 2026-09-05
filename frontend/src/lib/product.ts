import type { Lang } from '@/context/LanguageContext'

export function productName(p: any, lang: Lang): string {
  if (lang === 'FR') return p.name_fr || p.name
  return p.name
}

export function productDescription(p: any, lang: Lang): string {
  if (lang === 'FR') return p.description_fr || p.description || ''
  return p.description || ''
}