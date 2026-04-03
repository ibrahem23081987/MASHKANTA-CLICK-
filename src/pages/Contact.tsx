import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'
import { DEFAULT_FAQS } from '../data/faqs'

export function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <SEO
        title="צור קשר | משכנתא-קליק"
        description="יצירת קשר עם משכנתא-קליק — מחשבון משכנתא AI בעברית."
        faqs={DEFAULT_FAQS}
      />
      <div className="mx-auto max-w-lg px-4 py-10 sm:py-14">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-mash-navy"
        >
          צור קשר
        </motion.h1>
        <p className="mt-2 text-slate-600">
          שאלות הומלצות על האתר, שיתופי פעולה או הערות למוצר
        </p>
        {sent ? (
          <p className="mt-8 rounded-2xl border border-mash-gold/40 bg-mash-gold/10 p-6 text-center font-medium text-mash-navy">
            תודה! ההודעה נשלחה (הדגמה).
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <label className="block">
              <span className="text-sm font-medium text-slate-700">שם</span>
              <input
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-right focus:border-mash-gold focus:outline-none focus:ring-2 focus:ring-mash-gold/30"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">אימייל</span>
              <input
                required
                type="email"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-right focus:border-mash-gold focus:outline-none focus:ring-2 focus:ring-mash-gold/30"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">הודעה</span>
              <textarea
                required
                rows={4}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-right focus:border-mash-gold focus:outline-none focus:ring-2 focus:ring-mash-gold/30"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-xl bg-mash-navy py-3 font-bold text-white hover:bg-mash-navy/90"
            >
              שלח
            </button>
          </form>
        )}
      </div>
    </>
  )
}
