'use client'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { useLang } from '@/context/LanguageContext'
import { useTranslations } from '@/lib/translations'
import { productName } from '@/lib/product'
import { categoryName } from '@/lib/category'

export default function HomePage() {
  const { lang, isRTL } = useLang()
  const tr = useTranslations(lang)
  const h = tr.home
  const [categories, setCategories] = useState<any[]>([])
  
  const [slides, setSlides] = useState<any[]>([])
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<any>(null)

  useEffect(() => {
    fetch('https://api.ssti.space/api/categories').then(r => r.json()).then(setCategories).catch(() => {})
    
  }, [])

  useEffect(() => {
    fetch('https://api.ssti.space/api/products?per_page=100')
      .then(r => r.json())
      .then(data => setSlides(data.data ?? []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (slides.length === 0 || paused) return
    intervalRef.current = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4000)
    return () => clearInterval(intervalRef.current)
  }, [slides.length, paused])

  const goTo = (i: number) => {
    setCurrent(i)
    setPaused(true)
    clearInterval(intervalRef.current)
    setTimeout(() => setPaused(false), 6000)
  }
  const prev = () => goTo((current - 1 + slides.length) % slides.length)
  const next = () => goTo((current + 1) % slides.length)
  const slide = slides[current]

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>

      {/* HERO SLIDESHOW */}
      <section
        style={{ background: `
  radial-gradient(circle at 75% 50%, rgba(200,75,49,0.08), transparent 60%),
  linear-gradient(135deg, #1C2B3A 0%, #101923 100%)
`, position: 'relative', overflow: 'hidden', minHeight: '480px', display: 'flex', alignItems: 'center' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        
        {/* Change 1: added className="slide-grid" */}
        <div className="slide-grid" style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 32px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div>
            {slide ? (
              <div key={current} style={{ animation: 'fadeSlide 0.5s ease' }}>
                <p style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: '#C84B31', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>
                  {slide.category ? categoryName(slide.category, lang) : ''}
                </p>
                <h1 style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: 'clamp(36px,5vw,64px)', color: 'white', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: '16px' }}>
                  {productName(slide, lang)}
                </h1>
                {slide.model_number && (
                  <p style={{ fontFamily: 'DM Mono,monospace', fontSize: '12px', color: '#6B7280', marginBottom: '12px' }}>REF: {slide.model_number}</p>
                )}
                {slide.specs?.length > 0 && (
                  <div style={{ borderLeft: '2px solid #C84B31', paddingLeft: '14px', marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {slide.specs.slice(0, 3).map((s: any) => (
                      <div key={s.id} style={{ display: 'flex', gap: '10px' }}>
                        <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: '#6B7280' }}>{s.label}</span>
                        <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: '#9CA3AF', fontWeight: 600 }}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Link href={`/products/${slide.slug}`} style={{ backgroundColor: '#C84B31', color: 'white', padding: '12px 28px', fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '13px', textDecoration: 'none', textTransform: 'uppercase' }}>
                    {h.learnMore} →
                  </Link>
                  <Link href="/products" style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#9CA3AF', padding: '12px 28px', fontFamily: 'DM Sans,sans-serif', fontWeight: 500, fontSize: '13px', textDecoration: 'none', textTransform: 'uppercase' }}>
                    {h.browseBtn}
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <p style={{ fontFamily: 'DM Mono,monospace', color: '#C84B31', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '24px' }}>{h.tag}</p>
                <h1 style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: 'clamp(36px,5vw,64px)', color: 'white', textTransform: 'uppercase', lineHeight: 1, marginBottom: '28px' }}>
                  {h.h1[0]}<br /><span style={{ color: '#C84B31' }}>{h.h1[1]}</span><br />{h.h1[2]}
                </h1>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Link href="/products" style={{ backgroundColor: '#C84B31', color: 'white', padding: '12px 28px', fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '14px', textDecoration: 'none', textTransform: 'uppercase' }}>{h.browseBtn}</Link>
                  <Link href="/contact" style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#9CA3AF', padding: '12px 28px', fontFamily: 'DM Sans,sans-serif', fontWeight: 500, fontSize: '14px', textDecoration: 'none', textTransform: 'uppercase' }}>{h.quoteBtn}</Link>
                </div>
              </div>
            )}
          </div>

          {/* Change 2: added className="slide-image" */}
          {slide && (
            <div className="slide-image" key={`img-${current}`} style={{ animation: 'fadeSlide 0.5s ease' }}>
              {slide.image_urls?.[0] ? (
                <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderLeft: '4px solid #C84B31', height: '320px', overflow: 'hidden', backgroundColor: 'white' }}>
                  <img src={slide.image_urls[0]} alt={productName(slide, lang)} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', padding: '16px' }} />
                </div>
              ) : (
                <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderLeft: '4px solid #C84B31', height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '10px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{slide.category ? categoryName(slide.category, lang) : ''}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {slides.length > 1 && (
          <>
            {/* Change 4: added className="hero-nav-btn prev" and className="hero-nav-btn next" */}
            <button className="hero-nav-btn prev" onClick={prev} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="hero-nav-btn next" onClick={next} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </>
        )}
        {slides.length > 1 && (
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px' }}>
            {slides.map((_: any, i: number) => (
              <button key={i} onClick={() => goTo(i)} style={{ width: i === current ? '24px' : '6px', height: '6px', backgroundColor: i === current ? '#C84B31' : 'rgba(255,255,255,0.25)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
            ))}
          </div>
        )}
        {slides.length > 1 && (
          <div style={{ position: 'absolute', bottom: '20px', right: '32px', fontFamily: 'DM Mono,monospace', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
            {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '120px', height: '3px', backgroundColor: '#C84B31' }} />
      </section>

      
      {/* CATEGORIES — full bleed image cards */}
      <section style={{ backgroundColor: 'white', padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <p style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: '#C84B31', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '10px' }}>{h.catTag}</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: '44px', color: '#1C2B3A', textTransform: 'uppercase', margin: 0 }}>{h.catTitle}</h2>
            <Link href="/products" style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '13px', color: '#C84B31', textDecoration: 'none', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {h.catViewAll} →
            </Link>
          </div>
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '3px' }}>
          {(categories.length > 0 ? categories : [
            { id: 1, name: 'Electric Compressors', products_count: '—', image_url: null },
            { id: 2, name: 'Refrigerant Dryer', products_count: '—', image_url: null },
          ]).map((cat: any) => (
            <Link
              key={cat.id}
              href={`/products?category_id=${cat.id}`}
              className="cat-card"
              style={{ textDecoration: 'none', display: 'block', position: 'relative', height: '460px', overflow: 'hidden' }}
            >
              {cat.image_url ? (
                <img
                  src={cat.image_url}
                  alt={categoryName(cat, lang)}
                  className="cat-img"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                />
              ) : (
                <div style={{ position: 'absolute', inset: 0, backgroundColor: '#1C2B3A' }} />
              )}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,16,24,0.95) 0%, rgba(8,16,24,0.55) 45%, rgba(8,16,24,0.1) 100%)' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: '#C84B31' }} />

              {/* Top badge */}
              <div style={{ position: 'absolute', top: '24px', left: '28px' }}>
                <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                  {cat.products_count ?? 0} {h.catProducts}
                </span>
              </div>

              {/* Bottom content */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '36px 32px 36px 36px' }}>
                <h3 style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: '42px', color: 'white', textTransform: 'uppercase', lineHeight: 1, marginBottom: '24px' }}>
                  {categoryName(cat, lang)}
                </h3>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: '#C84B31', padding: '10px 22px' }}>
                  <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '12px', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h.catViewAll}</span>
                  <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      

      {/* WHY US */}
<section style={{ backgroundColor: 'white', padding: '80px 0' }}>
  <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'start' }}>

      {/* Left */}
      <div>
        <p style={{ fontFamily: 'DM Mono,monospace', fontSize: '26px', color: '#C84B31', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '18px' }}>{h.whyTag}</p>
        <h2 style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: '35px', color: '#1C2B3A', textTransform: 'uppercase', marginBottom: '20px', lineHeight: 1 }}>{h.whyTitle}</h2>
        <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '17px', color: '#6B7280', lineHeight: 1.75, marginBottom: '32px' }}>{h.whySub}</p>
        <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#1C2B3A', color: 'white', padding: '13px 26px', fontFamily: 'DM Sans,sans-serif', fontSize: '25px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase' }}>
          {h.quoteBtn}
          <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </Link>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {h.whyItems.map((item: any, i: number) => (
          <div key={item.n} style={{ position: 'relative', display: 'flex', gap: '20px', padding: '32px 0', borderBottom: i < h.whyItems.length - 1 ? '1px solid #E0E2E6' : 'none', overflow: 'hidden' }}>
            <span style={{
  position: 'absolute', right: '0', top: '16px',
  fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: '96px',
  color: '#1C2B3A', opacity: 0.06, lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
  width: '120px', textAlign: 'right',
}}>
  {item.n}
</span>
            <div style={{ width: '3px', backgroundColor: '#C84B31', flexShrink: 0, alignSelf: 'stretch', minHeight: '24px' }} />
            <div>
              <h4 style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: '24px', color: '#1C2B3A', textTransform: 'uppercase', marginBottom: '10px' }}>{item.title}</h4>
              <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '15px', color: '#6B7280', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
</section>

      {/* CTA BANNER */}
      <section style={{ backgroundColor: '#C84B31' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '2px', height: '40px', backgroundColor: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
            <div>
              <h2 style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: '22px', color: 'white', textTransform: 'uppercase', margin: 0, letterSpacing: '0.04em' }}>{h.ctaTitle}</h2>
              <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.65)', margin: '3px 0 0' }}>{h.ctaSub}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <a href="tel:+212600000000" style={{ backgroundColor: 'white', color: '#C84B31', padding: '9px 22px', fontFamily: 'DM Sans,sans-serif', fontSize: '12px', fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h.ctaCall}</a>
            <Link href="/contact" style={{ border: '1px solid rgba(255,255,255,0.4)', color: 'white', padding: '9px 22px', fontFamily: 'DM Sans,sans-serif', fontSize: '12px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h.ctaMsg}</Link>
          </div>
        </div>
      </section>

      {/* Change 3: expanded media query block */}
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cat-card:hover .cat-img { transform: scale(1.05); }
        .prod-card:hover { transform: translateY(-2px); }

        @media (max-width: 768px) {
  .slide-grid {
    grid-template-columns: 1fr !important;
    padding: 32px 20px !important;
    gap: 24px !important;
    text-align: center;
  }
  .slide-image {
    order: -1;
    height: 220px !important;
  }
  .slide-image > div {
    height: 220px !important;
  }
  .hero-nav-btn {
    width: 36px !important;
    height: 36px !important;
    top: 130px !important;
    transform: none !important;
    background: #C84B31 !important;
    border: none !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.35) !important;
  }
  .hero-nav-btn.prev { left: 8px !important; }
  .hero-nav-btn.next { right: 8px !important; }

  .slide-grid > div:first-child {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }
  .slide-grid > div:first-child > div {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }
  .slide-grid .hero-cta-row {
    justify-content: center !important;
  }
  .slide-grid .hero-spec-row {
    align-items: center !important;
  }
}
      `}</style>
    </div>
  )
}
