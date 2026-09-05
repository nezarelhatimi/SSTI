'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useLang } from '@/context/LanguageContext'
import { useTranslations } from '@/lib/translations'
import { SITE } from '@/lib/config'
import type { Lang } from '@/context/LanguageContext'

const LANGS: Lang[] = ['FR', 'EN']

export default function Navbar() {
  const { lang, setLang, isRTL } = useLang()
  const tr = useTranslations(lang)
  const nav = tr.nav
  const router = useRouter()
  const pathname = usePathname()
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('http://localhost:8000/api/categories')
      .then(r => r.json())
      .then(setCategories)
      .catch(() => {})
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/products?search=${encodeURIComponent(search.trim())}`)
      setSearch('')
    }
  }

  return (
    <header style={{
      backgroundColor: '#1C2B3A',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      direction: isRTL ? 'rtl' : 'ltr',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 32px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, paddingTop: '8px' }}>
          <Image src={SITE.logo} alt={SITE.name} width={0} height={0} sizes="100vw" style={{ height: '70px', width: 'auto' }} priority />
        </Link>

        {/* Nav links — absolutely centered */}
        <nav className="nav-links" style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          height: '64px',
        }}>
          <Link href="/" style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
            fontWeight: pathname === '/' ? 600 : 400,
            color: pathname === '/' ? 'white' : '#9CA3AF',
            textDecoration: 'none',
            padding: '6px 14px',
            borderBottom: pathname === '/' ? '2px solid #C84B31' : '2px solid transparent',
            display: 'inline-flex',
            alignItems: 'center',
            height: '100%',
            boxSizing: 'border-box',
          }}>
            {nav.home}
          </Link>

          {/* Products dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative', height: '64px', display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => setDropdownOpen(o => !o)}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                fontWeight: pathname.startsWith('/products') ? 600 : 400,
                color: pathname.startsWith('/products') ? 'white' : '#9CA3AF',
                background: 'none',
                border: 'none',
                borderBottom: pathname.startsWith('/products') ? '2px solid #C84B31' : '2px solid transparent',
                padding: '6px 14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                height: '100%',
                boxSizing: 'border-box',
              }}
            >
              {nav.products}
              <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ transition: 'transform 0.2s', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', marginTop: '1px' }}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: isRTL ? 'auto' : '0',
                right: isRTL ? '0' : 'auto',
                backgroundColor: '#162332',
                border: '1px solid rgba(255,255,255,0.08)',
                borderTop: '2px solid #C84B31',
                minWidth: '220px',
                zIndex: 100,
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              }}>
                <Link href="/products" onClick={() => setDropdownOpen(false)} style={{ display: 'block', padding: '12px 18px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#9CA3AF', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)', fontWeight: 600 }}>
                  {nav.allProducts}
                </Link>
                {categories.map((cat: any) => (
                  <Link key={cat.id} href={`/products?category_id=${cat.id}`} onClick={() => setDropdownOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#D1D5DB', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span>{cat.name}</span>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#6B7280', backgroundColor: 'rgba(255,255,255,0.05)', padding: '1px 6px' }}>
                      {cat.products_count}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/contact" style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
            fontWeight: pathname === '/contact' ? 600 : 400,
            color: pathname === '/contact' ? 'white' : '#9CA3AF',
            textDecoration: 'none',
            padding: '6px 14px',
            borderBottom: pathname === '/contact' ? '2px solid #C84B31' : '2px solid transparent',
            display: 'inline-flex',
            alignItems: 'center',
            height: '100%',
            boxSizing: 'border-box',
          }}>
            {nav.contact}
          </Link>
        </nav>

        {/* Right side: search + lang switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto' }}>

          {/* Search */}
          <form onSubmit={handleSearch} className="nav-search" style={{ display: 'flex', alignItems: 'center' }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={nav.search}
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRight: 'none',
                color: 'white',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                padding: '10px 16px',
                outline: 'none',
                width: '260px',
                direction: isRTL ? 'rtl' : 'ltr',
              }}
            />
            <button type="submit" style={{
              backgroundColor: '#C84B31',
              border: 'none',
              color: 'white',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              padding: '10px 18px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              letterSpacing: '0.05em',
            }}>
              {nav.searchBtn}
            </button>
          </form>

          {/* Language switcher */}
          <div className="nav-lang" style={{ display: 'flex', alignItems: 'center', gap: '2px', flexShrink: 0 }}>
            {LANGS.map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '11px',
                fontWeight: lang === l ? 700 : 400,
                color: lang === l ? 'white' : '#6B7280',
                backgroundColor: lang === l ? 'rgba(200,75,49,0.18)' : 'transparent',
                border: lang === l ? '1px solid rgba(200,75,49,0.4)' : '1px solid transparent',
                padding: '4px 9px',
                cursor: 'pointer',
                letterSpacing: '0.08em',
              }}>
                {l}
              </button>
            ))}
          </div>

        </div>

        {/* Mobile hamburger */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} style={{ display: 'none', background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px', marginLeft: '12px' }} aria-label="Menu">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ backgroundColor: '#162332', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: pathname === '/' ? 'white' : '#9CA3AF', textDecoration: 'none', fontWeight: pathname === '/' ? 600 : 400, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            {nav.home}
          </Link>
          <Link href="/products" onClick={() => setMenuOpen(false)} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#D1D5DB', textDecoration: 'none', fontWeight: 600, padding: '10px 0' }}>
            {nav.allProducts}
          </Link>
          {categories.map((cat: any) => (
            <Link key={cat.id} href={`/products?category_id=${cat.id}`} onClick={() => setMenuOpen(false)} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#6B7280', textDecoration: 'none', padding: '8px 0 8px 16px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
              {cat.name}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: pathname === '/contact' ? 'white' : '#9CA3AF', textDecoration: 'none', fontWeight: pathname === '/contact' ? 600 : 400, padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4px' }}>
            {nav.contact}
          </Link>
          <form onSubmit={handleSearch} style={{ display: 'flex', marginTop: '12px' }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={nav.search} style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRight: 'none', color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', padding: '8px 12px', outline: 'none' }} />
            <button type="submit" style={{ backgroundColor: '#C84B31', border: 'none', color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 600, padding: '8px 14px', cursor: 'pointer', textTransform: 'uppercase' }}>{nav.searchBtn}</button>
          </form>
          <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
            {LANGS.map(l => (
              <button key={l} onClick={() => { setLang(l); setMenuOpen(false) }} style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', fontWeight: lang === l ? 700 : 400, color: lang === l ? 'white' : '#6B7280', backgroundColor: lang === l ? 'rgba(200,75,49,0.18)' : 'transparent', border: lang === l ? '1px solid rgba(200,75,49,0.4)' : '1px solid rgba(255,255,255,0.1)', padding: '6px 14px', cursor: 'pointer' }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-search { display: none !important; }
          .nav-lang { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  )
}