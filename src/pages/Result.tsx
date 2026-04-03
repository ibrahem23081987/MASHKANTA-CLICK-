import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LeadForm } from '../components/LeadForm'
import { MortgageExplainer } from '../components/MortgageExplainer'
import { ResultCard } from '../components/ResultCard'
import { SEO } from '../components/SEO'
import { DEFAULT_FAQS } from '../data/faqs'
import { explainMortgageWithAI } from '../services/aiService'
import type { MortgageResultState } from '../types/mortgage'
import { formatCurrency } from '../utils/formatCurrency'

export function Result() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as MortgageResultState | undefined

  const [aiText, setAiText] = useState<string>('')
  const [aiError, setAiError] = useState<string>('')
  const [aiLoading, setAiLoading] = useState(true)

  useEffect(() => {
    if (!state) {
      navigate('/calculator', { replace: true })
      return
    }
    let cancelled = false
    ;(async () => {
      setAiLoading(true)
      setAiError('')
      try {
        const text = await explainMortgageWithAI({
          amount: state.amount,
          years: state.years,
          rate: state.rate,
          track: state.track,
          monthlyPayment: state.monthlyPayment,
          totalInterest: state.totalInterest,
        })
        if (!cancelled) setAiText(text)
      } catch (e) {
        if (!cancelled)
          setAiError(
            e instanceof Error ? e.message : 'שגיאה בטעינת הסבר ה-AI',
          )
      } finally {
        if (!cancelled) setAiLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [state, navigate])

  if (!state) return null

  const title = `מחשבון משכנתא AI | ${state.amount.toLocaleString('he-IL')} ל-${state.years} שנה`

  return (
    <>
      <SEO
        title={title}
        description="חשב משכנתא בקלות — AI מסביר בעברית פשוטה"
        faqs={DEFAULT_FAQS}
      />
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-8 sm:py-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-mash-navy sm:text-3xl">
            תוצאות החישוב
          </h1>
          <Link
            to="/calculator"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-mash-navy shadow-sm hover:border-mash-gold"
          >
            ← חזרה למחשבון
          </Link>
        </div>

        <ResultCard title="תשלום חודשי" delay={0}>
          <p className="text-3xl font-extrabold text-mash-gold sm:text-4xl">
            {formatCurrency(state.monthlyPayment)}
            <span className="text-lg font-bold text-mash-navy">/חודש</span>
          </p>
        </ResultCard>

        <ResultCard title="סיכום כלכלי" delay={0.05}>
          <p className="text-lg font-semibold text-mash-navy">
            תשלם סה״כ: {formatCurrency(state.totalPayments)}
          </p>
          <p className="mt-2 text-slate-700">
            מתוכם ריבית:{' '}
            <span className="font-bold text-mash-navy">
              {formatCurrency(state.totalInterest)}
            </span>
          </p>
        </ResultCard>

        <ResultCard title="AI מסביר" delay={0.1}>
          {aiLoading && (
            <p className="animate-pulse text-slate-600">טוען הסבר…</p>
          )}
          {aiError && !aiLoading && (
            <p className="text-red-700">
              {aiError}. נסו מצב הדגמה (VITE_DEMO_MODE=true) או ודאו שה-API
              מוגדר.
            </p>
          )}
          {!aiLoading && !aiError && (
            <p className="leading-relaxed text-slate-800 whitespace-pre-line">
              {aiText}
            </p>
          )}
        </ResultCard>

        <ResultCard title="כמה דירה אתה יכול לקנות?" delay={0.12}>
          <p className="text-lg leading-relaxed text-slate-800">
            עם משכורת {formatCurrency(state.salary)} והון עצמי{' '}
            {formatCurrency(state.equity)}
            <br />
            אתה יכול לרכוש דירה עד{' '}
            <span className="font-bold text-mash-navy">
              {formatCurrency(state.maxHomePrice)}
            </span>
          </p>
          <p className="mt-2 text-xs text-slate-500">
            לפי נוסחת האתר: הלוואה מקסימלית = משכורת × 30% × 12 × שנים; מחיר
            דירה = הון עצמי + הלוואה מקסימלית
          </p>
        </ResultCard>

        <MortgageExplainer
          amount={state.amount}
          years={state.years}
          baseRate={state.rate}
        />

        <LeadForm key={state.amount} defaultAmount={state.amount} />
      </div>
    </>
  )
}
