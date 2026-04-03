import { useEffect } from 'react'
import type { FaqItem } from '../data/faqs'

interface SEOProps {
  title: string
  description: string
  faqs?: FaqItem[]
}

const FAQ_SCRIPT_ID = 'mashkanta-faq-schema'

export function SEO({ title, description, faqs }: SEOProps) {
  useEffect(() => {
    document.title = title

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)

    const existing = document.getElementById(FAQ_SCRIPT_ID)
    if (existing) existing.remove()

    if (faqs?.length) {
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
      const script = document.createElement('script')
      script.id = FAQ_SCRIPT_ID
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }
  }, [title, description, faqs])

  return null
}
