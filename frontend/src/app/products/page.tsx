'use client'
import Link from 'next/link'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLang } from '@/context/LanguageContext'
import { useTranslations } from '@/lib/translations'
import { productName } from '@/lib/product'

function ProductsContent() {
  const { lang, isRTL } = useLang()
  const tr = useTranslations(lang)
  const p = tr.products
  const sp = useSearchParams()
  const categoryId = sp.get('category_id')
  const search = sp.get('search')

  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.ssti.space/api/categories').then(r => r.json()).then(setCategories).catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (categoryId) params.set('category_id', categoryId)
    if (search) params.set('search', search)
    fetch(`https://api.ssti.space/api/products?${params}`)
      .then(r => r.json())
      .then(r => { setProducts(r.data ?? []); setTotal(r.total ?? 0) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [categoryId, search])

  const activeCategory = categories.find((c: any) => String(c.id) === String(categoryId))

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <section style={{ backgroundColor: '#1C2B3A', borderBottom: '3px solid #C84B31' }}>
        <div className="header-container">
          <p style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: '#C84B31', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '10px' }}>
            {activeCategory ? activeCategory.name : p.allProducts}
          </p>
          <h1 className="page-title" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: '48px', color: 'white', textTransform: 'uppercase', lineHeight: 1 }}>
            {activeCategory ? activeCategory.name : p.ourProducts}
          </h1>
        </div>
      </section>

      <div className="page-container">
        <div className="grid-sidebar">
          <aside>
            <div className="sidebar-sticky" style={{ position: 'sticky', top: '80px' }}>
              <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '11px', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid #E5E7EB' }}>
                {p.categories}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <Link href="/products" style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '14px', textDecoration: 'none', padding: '8px 12px', borderLeft: !categoryId ? '2px solid #C84B31' : '2px solid transparent', color: !categoryId ? '#1C2B3A' : '#6B7280', fontWeight: !categoryId ? 600 : 400, backgroundColor: !categoryId ? '#F2F4F6' : 'transparent' }}>
                  {p.allProducts}
                </Link>
                {categories.map((cat: any) => {
                  const isActive = String(categoryId) === String(cat.id)
                  return (
                    <Link key={cat.id} href={`/products?category_id=${cat.id}`} style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '14px', textDecoration: 'none', padding: '8px 12px', borderLeft: isActive ? '2px solid #C84B31' : '2px solid transparent', color: isActive ? '#1C2B3A' : '#6B7280', fontWeight: isActive ? 600 : 400, backgroundColor: isActive ? '#F2F4F6' : 'transparent', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{cat.name}</span>
                      <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '10px', color: '#9CA3AF' }}>{cat.products_count}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </aside>

          <main>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #E5E7EB', flexWrap: 'wrap', gap: '8px' }}>
              <p style={{ fontFamily: 'DM Mono,monospace', fontSize: '12px', color: '#9CA3AF' }}>
                {total} {total === 1 ? p.foundOne : p.found}
              </p>
              {search && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '13px', color: '#6B7280' }}>{p.resultsFor} <strong style={{ color: '#1C2B3A' }}>{search}</strong></span>
                  <Link href="/products" style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: '#C84B31', textDecoration: 'none' }}>{p.clear}</Link>
                </div>
              )}
            </div>

            {loading ? (
              <div style={{ padding: '80px 0', textAlign: 'center' }}>
                <p style={{ fontFamily: 'DM Mono,monospace', fontSize: '12px', color: '#9CA3AF' }}>Loading...</p>
              </div>
            ) : products.length === 0 ? (
              <div style={{ padding: '80px 0', textAlign: 'center' }}>
                <p style={{ fontFamily: 'Barlow Condensed,sans-serif', fontSize: '24px', color: '#1C2B3A', textTransform: 'uppercase', marginBottom: '8px' }}>{p.noTitle}</p>
                <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '14px', color: '#9CA3AF' }}>{p.noSub}</p>
              </div>
            ) : (
              <div className="grid-3">
                {products.map((prod: any) => {
                  const thumb = prod.image_urls?.[0]
                  return (
                    <Link key={prod.id} href={`/products/${prod.slug}`} style={{ textDecoration: 'none', display: 'block', backgroundColor: '#F2F4F6' }}>
                      <div style={{ height: '200px', overflow: 'hidden', borderLeft: isRTL ? 'none' : '3px solid #C84B31', borderRight: isRTL ? '3px solid #C84B31' : 'none', position: 'relative', backgroundColor: '#E5E7EB' }}>
                        {thumb ? (
                          <img src={thumb} alt={productName(prod, lang)} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', transition: 'transform 0.3s ease', backgroundColor: 'white', padding: '12px' }}
                            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '10px', color: '#9CA3AF', textTransform: 'uppercase' }}>{prod.category?.name}</span>
                          </div>
                        )}
                      </div>

                      <div style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '10px', backgroundColor: '#1C2B3A', color: 'white', padding: '2px 7px', textTransform: 'uppercase' }}>{prod.category?.name}</span>
                          {prod.model_number && <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '10px', color: '#9CA3AF' }}>{prod.model_number}</span>}
                        </div>
                        <h3 style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: '20px', color: '#1C2B3A', textTransform: 'uppercase', marginBottom: '12px' }}>{productName(prod, lang)}</h3>
                        {prod.specs?.length > 0 && (
                          <div style={{ borderLeft: isRTL ? 'none' : '2px solid #C84B31', borderRight: isRTL ? '2px solid #C84B31' : 'none', paddingLeft: isRTL ? '0' : '10px', paddingRight: isRTL ? '10px' : '0', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
                            {prod.specs.slice(0, 3).map((s: any) => (
                              <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '10px', color: '#9CA3AF' }}>{s.label}</span>
                                <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '10px', color: '#1C2B3A', fontWeight: 600 }}>{s.value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '12px', color: '#C84B31', fontWeight: 600, textTransform: 'uppercase' }}>{p.view} &rarr;</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div style={{ padding: '80px 0', textAlign: 'center' }}>
        <p style={{ fontFamily: 'DM Mono,monospace', fontSize: '12px', color: '#9CA3AF' }}>Loading...</p>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
