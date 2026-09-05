'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

export type Lang = 'EN' | 'FR'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  isRTL: boolean
}

const Ctx = createContext<LangCtx>({
  lang: 'EN',
  setLang: () => {},
  isRTL: false,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
 const [lang, setLang] = useState<Lang>('FR')
  return (
<Ctx.Provider value={{ lang, setLang, isRTL: false }}>      {children}
    </Ctx.Provider>
  )
}

export function useLang() {
  return useContext(Ctx)
}