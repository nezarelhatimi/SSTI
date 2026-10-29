import { categories, getProductsByCategory, getProductBySlug } from './data'

export async function getProducts(params?: Record<string, string>) {
  return getProductsByCategory(params?.category_id, params?.search)
}

export async function getProduct(slug: string) {
  return getProductBySlug(slug)
}

export async function getCategories() {
  return categories
}

export async function sendContact(data: Record<string, string>) {
  const subject = encodeURIComponent(data.subject || 'Enquiry from website')
  const body = encodeURIComponent(
    `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || '—'}\n\n${data.message}`
  )
  window.location.href = `mailto:ing.ssti@gmail.com?subject=${subject}&body=${body}`
  return { success: true }
}