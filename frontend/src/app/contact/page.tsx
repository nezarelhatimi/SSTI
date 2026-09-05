'use client'
import { useState } from 'react'
import { useLang } from '@/context/LanguageContext'
import { useTranslations } from '@/lib/translations'
import { SITE } from '@/lib/config'

export default function ContactPage() {
  const { lang, isRTL } = useLang()
  const tr = useTranslations(lang)
  const c = tr.contact

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${SITE.email}&su=${encodeURIComponent(lang === 'FR' ? 'Demande depuis le site' : 'Enquiry from website')}`

  const inputStyle: React.CSSProperties = {
    width: '100%',
    fontFamily: 'DM Sans,sans-serif',
    fontSize: '14px',
    color: '#1C2B3A',
    padding: '10px 12px',
    border: '1px solid #E5E7EB',
    outline: 'none',
    backgroundColor: '#F9FAFB',
    boxSizing: 'border-box',
    direction: isRTL ? 'rtl' : 'ltr',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'DM Sans,sans-serif',
    fontSize: '11px',
    fontWeight: 600,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    display: 'block',
    marginBottom: '6px',
  }

  const contactItems = [
    { label: c.phone, value: SITE.phone, sub: c.phoneSub, href: SITE.phoneHref, icon: 'phone' },
    { label: c.email, value: SITE.email, sub: c.emailSub, href: gmailUrl, icon: 'email' },
    { label: c.address, value: c.addressVal, sub: c.addressSub, href: null, icon: 'map' },
  ]

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>

      {/* PAGE HEADER */}
      <section style={{ backgroundColor: '#1C2B3A', borderBottom: '3px solid #C84B31' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 32px' }}>
          <p style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: '#C84B31', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '10px' }}>{c.tag}</p>
          <h1 style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: '48px', color: 'white', textTransform: 'uppercase', lineHeight: 1 }}>{c.title}</h1>
        </div>
      </section>

      {/* CONTENT */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'start' }}>

        {/* Info column */}
        <div>
          <h2 style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: '28px', color: '#1C2B3A', textTransform: 'uppercase', marginBottom: '12px' }}>{c.letsTalk}</h2>
          <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '15px', color: '#6B7280', lineHeight: 1.7, marginBottom: '40px' }}>{c.sub}</p>

          {contactItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', padding: '20px 0', borderBottom: i < 2 ? '1px solid #E5E7EB' : 'none' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#F2F4F6', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#C84B31' }}>
                {item.icon === 'phone' && (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                )}
                {item.icon === 'email' && (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                )}
                {item.icon === 'map' && (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '11px', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '4px' }}>{item.label}</p>
                {item.href
                  ? <a href={item.href} style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '15px', color: '#1C2B3A', fontWeight: 500, textDecoration: 'none', display: 'block', marginBottom: '2px' }}>{item.value}</a>
                  : <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '15px', color: '#1C2B3A', fontWeight: 500, marginBottom: '2px' }}>{item.value}</p>
                }
                <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '13px', color: '#9CA3AF', marginBottom: item.icon !== 'map' ? '12px' : '0' }}>{item.sub}</p>

                {item.icon === 'phone' && (
                  <a href={item.href!} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', backgroundColor: '#C84B31', color: 'white', fontFamily: 'DM Sans,sans-serif', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', padding: '8px 16px' }}>
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    {c.ctaCall}
                  </a>
                )}

                {item.icon === 'email' && (
                  <a href={gmailUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', backgroundColor: 'transparent', color: '#C84B31', fontFamily: 'DM Sans,sans-serif', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', padding: '8px 16px', border: '1px solid #C84B31' }}>
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                    {c.ctaEmail}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Form column */}
        <div style={{ backgroundColor: 'white', border: '1px solid #E5E7EB', padding: '40px' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="20" height="20" fill="none" stroke="#16A34A" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: '24px', color: '#1C2B3A', textTransform: 'uppercase', marginBottom: '8px' }}>{c.successTitle}</h3>
              <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>{c.successSub}</p>
              <button onClick={() => setStatus('idle')} style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '13px', color: '#C84B31', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, textTransform: 'uppercase' }}>
                {c.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: '22px', color: '#1C2B3A', textTransform: 'uppercase' }}>{c.formTitle}</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>{c.name} <span style={{ color: '#C84B31' }}>*</span></label>
                  <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} placeholder={c.namePlaceholder} />
                </div>
                <div>
                  <label style={labelStyle}>{c.emailField} <span style={{ color: '#C84B31' }}>*</span></label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required style={inputStyle} placeholder={c.emailPlaceholder} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>{c.phoneField}</label>
                  <input name="phone" value={form.phone} onChange={handleChange} style={inputStyle} placeholder={c.phonePlaceholder} />
                </div>
                <div>
                  <label style={labelStyle}>{c.subject}</label>
                  <select name="subject" value={form.subject} onChange={handleChange} style={{ ...inputStyle, appearance: 'none', color: form.subject ? '#1C2B3A' : '#9CA3AF' }}>
                    <option value="">{c.subjectPlaceholder}</option>
                    {c.subjects.map((s: string) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>{c.message} <span style={{ color: '#C84B31' }}>*</span></label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5} style={{ ...inputStyle, resize: 'vertical' }} placeholder={c.messagePlaceholder} />
              </div>

              {status === 'error' && (
                <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '13px', color: '#DC2626', padding: '10px 12px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
                  {c.errorMsg}
                </p>
              )}

              <button type="submit" disabled={status === 'loading'} style={{ backgroundColor: status === 'loading' ? '#9CA3AF' : '#C84B31', color: 'white', padding: '13px 32px', fontFamily: 'DM Sans,sans-serif', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer', width: '100%' }}>
                {status === 'loading' ? c.sending : c.sendBtn}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}