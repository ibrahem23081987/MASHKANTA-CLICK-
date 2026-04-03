import { Link, useParams } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { ARTICLES } from '../data/articles'

export function Article() {
  const { slug = '' } = useParams()
  const article = ARTICLES[slug]

  if (!article) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-mash-navy">המאמר לא נמצא</h1>
        <Link
          to="/articles"
          className="mt-6 inline-block font-semibold text-mash-gold underline"
        >
          חזרה למאמרים
        </Link>
      </div>
    )
  }

  const faqs = [
    {
      question: article.title,
      answer: article.description,
    },
    {
      question: 'למי מיועד המידע?',
      answer:
        'לציבור הרחב המעוניין בהבנה כללית בלבד. אין לראות בו ייעוץ אישי.',
    },
  ]

  return (
    <>
      <SEO title={article.metaTitle} description={article.description} faqs={faqs} />
      <article className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <nav className="text-sm text-slate-600">
          <Link to="/articles" className="font-medium text-mash-navy hover:underline">
            ← מאמרים
          </Link>
        </nav>
        <header className="mt-4 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-extrabold text-mash-navy sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-slate-600">{article.description}</p>
        </header>
        <div className="prose prose-slate mt-8 max-w-none space-y-10 text-slate-800">
          {article.htmlSections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold text-mash-navy">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 leading-relaxed">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </>
  )
}
