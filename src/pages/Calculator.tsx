import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoanForm } from '../components/LoanForm'
import { SEO } from '../components/SEO'
import { DEFAULT_FAQS } from '../data/faqs'
import { fullMortgageCalculation } from '../services/calculateMortgage'
import { TRACK_LABELS } from '../services/aiService'
import type { MortgageFormValues, MortgageResultState } from '../types/mortgage'

const initialValues: MortgageFormValues = {
  amount: 900_000,
  years: 25,
  rate: 4.5,
  track: 'fixed_unindexed',
  salary: 15_000,
  equity: 300_000,
  purpose: 'first_home',
}

export function Calculator() {
  const navigate = useNavigate()
  const [values, setValues] = useState<MortgageFormValues>(initialValues)

  function patch(v: Partial<MortgageFormValues>) {
    setValues((prev) => ({ ...prev, ...v }))
  }

  function handleSubmit() {
    const calc = fullMortgageCalculation(
      values.amount,
      values.years,
      values.rate,
      values.salary,
      values.equity,
    )
    const state: MortgageResultState = {
      ...values,
      ...calc,
      trackLabel: TRACK_LABELS[values.track],
    }
    navigate('/result', { state })
  }

  const title = `מחשבון משכנתא AI | ${values.amount.toLocaleString('he-IL')} ל-${values.years} שנה`

  return (
    <>
      <SEO
        title={title}
        description="חשב משכנתא בקלות — AI מסביר בעברית פשוטה"
        faqs={DEFAULT_FAQS}
      />
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <h1 className="text-2xl font-bold text-mash-navy sm:text-3xl">
          מחשבון משכנתא
        </h1>
        <p className="mt-2 text-slate-600">
          מלא את הפרטים — נציג תשלום חודשי, סה״כ ריבית, הסבר AI והשוואת מסלולים
        </p>
        <div className="mt-8">
          <LoanForm values={values} onChange={patch} onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  )
}
