'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useLang } from '@/context/LanguageContext'
import { useTranslations } from '@/lib/translations'
import { productName, productDescription } from '@/lib/product'
import { SITE } from '@/lib/config'

export default function ProductDetailPage() {
  const { lang, isRTL } = useLang()
  const tr = useTranslations(lang)
  const d = tr.detail
  const { slug } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [related, setRelated] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (!slug) return
    fetch(`http://localhost:8000/api/products/${slug}`)
      .then(r => r.json())
      .then(r => { setProduct(r.product); setRelated(r.related ?? []) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ fontFamily: 'DM Mono,monospace', fontSize: '12px', color: '#9CA3AF' }}>Loading...</p></div>
  if (!product) return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ fontFamily: 'Barlow Condensed,sans-serif', fontSize: '24px', color: '#1C2B3A' }}>Product not found</p></div>

  const images: string[] = product.image_urls ?? []
  const hasImages = images.length > 0
  const isCompressor = product.category?.name?.toLowerCase().includes('electric')

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      {/* BREADCRUMB */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <Link href="/" style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '12px', color: '#9CA3AF', textDecoration: 'none' }}>{tr.nav.home}</Link>
          <span style={{ color: '#D1D5DB' }}>/</span>
          <Link href="/products" style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '12px', color: '#9CA3AF', textDecoration: 'none' }}>{tr.nav.products}</Link>
          {product.category && (<><span style={{ color: '#D1D5DB' }}>/</span><Link href={`/products?category_id=${product.category.id}`} style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '12px', color: '#9CA3AF', textDecoration: 'none' }}>{product.category.name}</Link></>)}
          <span style={{ color: '#D1D5DB' }}>/</span>
          <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '12px', color: '#374151' }}>{productName(product, lang)}</span>
        </div>
      </div>

      <div className="page-container">
        <div className="grid-detail">

          {/* LEFT — Images */}
          <div>
            {/* Main image */}
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", borderLeft: isRTL ? "none" : "4px solid #C84B31", borderRight: isRTL ? "4px solid #C84B31" : "none", marginBottom: "12px", overflow: "hidden" }}>
              {hasImages ? (
                <img src={images[activeImage]} alt={productName(product, lang)} style={{ width: '100%', height: '400px', objectFit: 'contain', display: 'block', backgroundColor: 'white', padding: '16px' }} />
              ) : (
                <div style={{ height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                  <svg width="48" height="48" fill="none" stroke="#D1D5DB" strokeWidth="1.5" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Product Image</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid-thumbnails">
              {hasImages ? images.map((url, i) => (
                <div key={i} onClick={() => setActiveImage(i)} style={{ border: `2px solid ${activeImage === i ? '#C84B31' : '#E5E7EB'}`, overflow: 'hidden', cursor: 'pointer', height: '80px', transition: 'border-color 0.15s' }}>
                  <img src={url} alt={`${productName(product, lang)} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', backgroundColor: 'white' }} />
                </div>
              )) : [1,2,3,4].map(i => (
                <div key={i} style={{ backgroundColor: '#F2F4F6', border: '1px solid #E5E7EB', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" fill="none" stroke="#D1D5DB" strokeWidth="1.5" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              {product.category && <Link href={`/products?category_id=${product.category.id}`} style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', backgroundColor: '#1C2B3A', color: 'white', padding: '4px 10px', textTransform: 'uppercase', textDecoration: 'none' }}>{product.category.name}</Link>}
              {product.model_number && <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '12px', color: '#9CA3AF' }}>{d.ref}: {product.model_number}</span>}
            </div>

            <h1 className="product-title" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: '42px', color: '#1C2B3A', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: '24px' }}>{productName(product, lang)}</h1>

            {product.price && (
              <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #E5E7EB' }}>
                <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '24px', color: '#C84B31', fontWeight: 700 }}>{Number(product.price).toLocaleString()} MAD</span>
                <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '13px', color: '#9CA3AF', marginLeft: '8px' }}>{d.vat}</span>
              </div>
            )}

            {productDescription(product, lang) && <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '15px', color: '#6B7280', lineHeight: 1.7, marginBottom: '28px' }}>{productDescription(product, lang)}</p>}

            {product.specs?.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '11px', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #E5E7EB' }}>{d.specs}</p>
                {product.specs.map((s: any, i: number) => (
                  <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < product.specs.length - 1 ? '1px solid #F2F4F6' : 'none' }}>
                    <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '12px', color: '#9CA3AF' }}>{s.label}</span>
                    <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '12px', color: '#1C2B3A', fontWeight: 600, backgroundColor: '#F2F4F6', padding: '2px 10px' }}>{s.value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="grid-cta-btns" style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <Link href={`/contact?subject=Quote - ${productName(product, lang)}`} style={{ flex: 1, backgroundColor: '#C84B31', color: 'white', padding: '14px 24px', fontFamily: 'DM Sans,sans-serif', fontSize: '14px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', textAlign: 'center' }}>{d.quoteBtn}</Link>
              <a href={SITE.phoneHref} style={{ padding: '14px 20px', border: '1px solid #1C2B3A', color: '#1C2B3A', fontFamily: 'DM Sans,sans-serif', fontSize: '14px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                {d.callBtn}
              </a>
            </div>

            <div className="grid-trust">
              {d.trust.map((t: string) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#C84B31', fontWeight: 700 }}>✓</span>
                  <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '12px', color: '#6B7280' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* COMPATIBLE ACCESSORIES */}
      {isCompressor && related.length > 0 && (
        <section style={{ backgroundColor: 'white', borderTop: '1px solid #E5E7EB' }}>
          <div className="section-container">
            <p style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: '#C84B31', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '10px' }}>{d.recommended}</p>
            <h2 className="section-title" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: '32px', color: '#1C2B3A', textTransform: 'uppercase', marginBottom: '32px' }}>{d.compatible}</h2>
            <div className="grid-4">
              {related.slice(0, 4).map((p: any) => {
                const thumb = p.image_urls?.[0]
                return (
                  <Link key={p.id} href={`/products/${p.slug}`} style={{ textDecoration: 'none', backgroundColor: '#F2F4F6', display: 'block' }}>
                    <div style={{ height: '120px', overflow: 'hidden', borderLeft: isRTL ? 'none' : '3px solid #C84B31', borderRight: isRTL ? '3px solid #C84B31' : 'none' }}>
                      {thumb
                        ? <img src={thumb} alt={productName(p, lang)} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', backgroundColor: 'white' }} />
                        : <div style={{ width: '100%', height: '100%', backgroundColor: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="28" height="28" fill="none" stroke="#D1D5DB" strokeWidth="1.5" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></div>
                      }
                    </div>
                    <div style={{ padding: '16px' }}>
                      <h3 style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: '17px', color: '#1C2B3A', textTransform: 'uppercase', marginBottom: '8px' }}>{productName(p, lang)}</h3>
                      <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '12px', color: '#C84B31', fontWeight: 600, textTransform: 'uppercase' }}>{d.view} &rarr;</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px 48px' }}>
        <Link href="/products" style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '13px', color: '#6B7280', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          {d.back}
        </Link>
      </div>
    </div>
  )
}