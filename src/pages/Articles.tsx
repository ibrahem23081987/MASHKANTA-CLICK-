import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'
import { DEFAULT_FAQS } from '../data/faqs'
import { ARTICLES } from '../data/articles'

export function Articles() {
  const list = Object.values(ARTICLES)
  return (
    <>
      <SEO
        title="מאמרים על משכנתא | משכנתא-קליק"
        description="מדריכים בעברית: משכנתא ראשונה, מסלולים, מחזור משכנתא והבנה פיננסית."
        faqs={DEFAULT_FAQS}
      />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <h1 className="text-3xl font-bold text-mash-navy">מאמרים</h1>
        <p className="mt-2 text-slate-600">
          תוכן מעמיק לשיפור ההבנה לפני פגישה בבנק או מול יועץ
        </p>
        <ul className="mt-8 space-y-4">
          {list.map((a, i) => (
            <motion.li
              key={a.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i }}
            >
              <Link
                to={`/article/${a.slug}`}
                className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-mash-gold hover:shadow-md"
              >
                <h2 className="text-lg font-bold text-mash-navy">{a.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{a.description}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-mash-gold">
                  לקריאה ←
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </>
  )
}
