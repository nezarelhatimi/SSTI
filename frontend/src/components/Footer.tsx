'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/context/LanguageContext'
import { useTranslations } from '@/lib/translations'
import { SITE } from '@/lib/config'

export default function Footer() {
  const { lang, isRTL } = useLang()
  const tr = useTranslations(lang)
  const f = tr.footer

  const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${SITE.email}&su=${encodeURIComponent(lang === 'FR' ? 'Demande depuis le site' : 'Enquiry from website')}`

  return (
    <footer
      style={{
        background: `
  radial-gradient(circle at 75% 50%, rgba(200,75,49,0.08), transparent 60%),
  linear-gradient(135deg, #1C2B3A 0%, #101923 100%)
`,
        borderTop: '3px solid #C84B31',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      {/* Main grid */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '48px 32px 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '40px',
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1px' }}>
            <Image src={SITE.logo} alt={SITE.name} width={0} height={0} sizes="100vw" style={{ height: '55px', width: 'auto' }} priority />
          </div>
          <p style={{ color: '#9CA3AF', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', lineHeight: '1.7', maxWidth: '260px' }}>
            {f.tagline}
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '17px', fontWeight: 600, color: '#C84B31', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>
            {f.navigation}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: tr.nav.home, href: '/' },
              { label: tr.nav.products, href: '/products' },
              { label: tr.nav.contact, href: '/contact' },
            ].map(({ label, href }) => (
              <Link key={href} href={href} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'white', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Products */}
        <div>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '17px', fontWeight: 600, color: '#C84B31', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>
            {f.products}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="/products?category_id=1" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'white', textDecoration: 'none' }}>
              {f.electric}
            </Link>
            <Link href="/products?category_id=2" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'white', textDecoration: 'none' }}>
              {f.dryer}
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '17px', fontWeight: 600, color: '#C84B31', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>
            {f.contact}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href={SITE.phoneHref} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'white', textDecoration: 'none' }}>
              {SITE.phone}
            </a>
            <a href={gmailUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'white', textDecoration: 'none' }}>
              {SITE.email}
            </a>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'white' }}>
              {SITE.address}
            </span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'white' }}>
              {f.hours}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <p style={{ color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', margin: 0 }}>
            &copy; {new Date().getFullYear()} {SITE.name}. {f.copyright}
          </p>
          <p style={{ color: '#374151', fontFamily: 'DM Mono, monospace', fontSize: '11px', margin: 0 }}>
            {SITE.city}
          </p>
        </div>
      </div>
    </footer>
  )
}