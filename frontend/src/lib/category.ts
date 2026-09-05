import type { Lang } from '@/context/LanguageContext'

export function categoryName(c: any, lang: Lang): string {
  if (lang === 'FR') return c.name_fr || c.name
  if (lang === 'EN') return c.name_ar || c.name
  return c.name
}

export function categoryDescription(c: any, lang: Lang): string {
  if (lang === 'FR') return c.description_fr || c.description || ''
  if (lang === 'EN') return c.description_ar || c.description || ''
  return c.description || ''
}