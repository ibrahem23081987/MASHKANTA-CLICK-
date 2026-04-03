import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'
import { DEFAULT_FAQS } from '../data/faqs'

const badges = [
  { icon: '🤖', text: 'AI מסביר בעברית' },
  { icon: '📊', text: 'השוואת מסלולים' },
  { icon: '🏠', text: 'כמה דירה אני יכול לקנות' },
]

export function Home() {
  return (
    <>
      <SEO
        title="משכנתא-קליק | מחשבון משכנתא AI"
        description="חשב משכנתא בקלות — AI מסביר בעברית פשוטה"
        faqs={DEFAULT_FAQS}
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-mash-gold">
            משכנתא-קליק
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-mash-navy sm:text-4xl">
            מחשבון משכנתא AI — הראשון בישראל
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
            הכנס פרטים ו-AI יסביר לך הכל בעברית פשוטה
          </p>
        </motion.div>

        <motion.ul
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {badges.map((b) => (
            <motion.li
              key={b.text}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-mash-navy shadow-sm"
            >
              <span aria-hidden="true">{b.icon}</span>
              {b.text}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.35 }}
        >
          <Link
            to="/calculator"
            className="inline-flex items-center justify-center rounded-2xl bg-mash-navy px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:bg-mash-navy/90"
          >
            התחל לחשב עכשיו
          </Link>
        </motion.div>
      </div>
    </>
  )
}
