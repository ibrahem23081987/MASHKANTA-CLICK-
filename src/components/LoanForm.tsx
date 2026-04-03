import { motion } from 'framer-motion'
import type { MortgageFormValues, MortgagePurpose, MortgageTrack } from '../types/mortgage'
import { formatCurrencyNoSymbol } from '../utils/formatCurrency'

const AMOUNT_MIN = 100_000
const AMOUNT_MAX = 5_000_000
const YEARS_MIN = 5
const YEARS_MAX = 30

const TRACK_OPTIONS: { value: MortgageTrack; label: string }[] = [
  { value: 'fixed_unindexed', label: 'קבועה לא צמודה' },
  { value: 'fixed_indexed', label: 'קבועה צמודה' },
  { value: 'prime', label: 'פריים' },
  { value: 'variable_5y', label: 'משתנה כל 5 שנים' },
]

const PURPOSE_OPTIONS: { value: MortgagePurpose; label: string }[] = [
  { value: 'first_home', label: 'דירה ראשונה' },
  { value: 'investment', label: 'דירה להשקעה' },
  { value: 'refinance', label: 'מחזור משכנתא' },
]

interface LoanFormProps {
  values: MortgageFormValues
  onChange: (v: Partial<MortgageFormValues>) => void
  onSubmit: () => void
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

const NUMBER_INPUT_CLASS =
  'w-full text-right p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'

export function LoanForm({ values, onChange, onSubmit }: LoanFormProps) {
  return (
    <form
      className="space-y-10"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <h2 className="text-lg font-bold text-mash-navy">
          שלב 1 — פרטי הלוואה
        </h2>
        <div className="mt-6 space-y-6">
          <div>
            <label className="flex flex-wrap items-center justify-between gap-2 text-sm font-medium text-slate-700">
              <span>סכום משכנתא</span>
              <span className="font-bold text-mash-navy">
                ₪{formatCurrencyNoSymbol(values.amount)}
              </span>
            </label>
            <input
              type="range"
              min={AMOUNT_MIN}
              max={AMOUNT_MAX}
              step={10_000}
              value={values.amount}
              onChange={(e) =>
                onChange({ amount: Number(e.target.value) })
              }
              className="mt-2 w-full accent-mash-gold"
            />
            <input
              type="number"
              min={100_000}
              max={5_000_000}
              step={10_000}
              value={values.amount}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                const raw = e.target.value
                if (raw === '' || raw === '-') return
                const n = Number(raw)
                if (Number.isFinite(n)) onChange({ amount: n })
              }}
              onBlur={(e) => {
                const n = Number(e.target.value)
                if (!Number.isFinite(n) || e.target.value === '')
                  onChange({ amount: AMOUNT_MIN })
                else
                  onChange({
                    amount: clamp(n, AMOUNT_MIN, AMOUNT_MAX),
                  })
              }}
              className={`mt-2 ${NUMBER_INPUT_CLASS}`}
            />
            <p className="mt-1 text-xs text-slate-500">
              בין ₪100,000 ל-₪5,000,000
            </p>
          </div>
          <div>
            <label className="flex flex-wrap items-center justify-between gap-2 text-sm font-medium text-slate-700">
              <span>תקופה (שנים)</span>
              <span className="font-bold text-mash-navy">{values.years}</span>
            </label>
            <input
              type="range"
              min={YEARS_MIN}
              max={YEARS_MAX}
              step={1}
              value={values.years}
              onChange={(e) => onChange({ years: Number(e.target.value) })}
              className="mt-2 w-full accent-mash-gold"
            />
            <input
              type="number"
              min={5}
              max={30}
              step={1}
              value={values.years}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                const raw = e.target.value
                if (raw === '' || raw === '-') return
                const n = Number(raw)
                if (Number.isFinite(n)) onChange({ years: n })
              }}
              onBlur={(e) => {
                const n = Number(e.target.value)
                if (!Number.isFinite(n) || e.target.value === '')
                  onChange({ years: YEARS_MIN })
                else
                  onChange({
                    years: Math.round(clamp(n, YEARS_MIN, YEARS_MAX)),
                  })
              }}
              className={`mt-2 ${NUMBER_INPUT_CLASS}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              ריבית שנתית (%)
            </label>
            <input
              type="number"
              min={1}
              max={15}
              step={0.1}
              value={values.rate}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                const raw = e.target.value
                if (raw === '' || raw === '-' || raw === '.') return
                const n = Number(raw)
                if (Number.isFinite(n)) onChange({ rate: n })
              }}
              onBlur={(e) => {
                const n = Number(e.target.value)
                if (!Number.isFinite(n) || e.target.value === '')
                  onChange({ rate: 4.5 })
                else
                  onChange({
                    rate: Math.round(clamp(n, 1, 15) * 10) / 10,
                  })
              }}
              className={`mt-2 ${NUMBER_INPUT_CLASS}`}
            />
            <p className="mt-1 text-xs text-slate-500">ברירת מחדל מוצעת: 4.5%</p>
          </div>
          <fieldset>
            <legend className="text-sm font-medium text-slate-700">
              סוג מסלול
            </legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {TRACK_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-3 text-sm transition ${
                    values.track === opt.value
                      ? 'border-mash-gold bg-mash-gold/10 font-semibold text-mash-navy'
                      : 'border-slate-200 hover:border-mash-gold/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="track"
                    value={opt.value}
                    checked={values.track === opt.value}
                    onChange={() => onChange({ track: opt.value })}
                    className="accent-mash-gold"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <h2 className="text-lg font-bold text-mash-navy">
          שלב 2 — פרטים אישיים
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          לחישוב כמה דירה יכול לקנות (המחשה לפי הנוסחה באתר)
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">
              משכורת חודשית נטו
            </span>
            <input
              type="number"
              min={0}
              step={100}
              value={values.salary || ''}
              onChange={(e) =>
                onChange({ salary: Number(e.target.value) || 0 })
              }
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-right focus:border-mash-gold focus:outline-none focus:ring-2 focus:ring-mash-gold/30"
              placeholder="לדוגמה: 15000"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">הון עצמי</span>
            <input
              type="number"
              min={0}
              step={1000}
              value={values.equity || ''}
              onChange={(e) =>
                onChange({ equity: Number(e.target.value) || 0 })
              }
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-right focus:border-mash-gold focus:outline-none focus:ring-2 focus:ring-mash-gold/30"
              placeholder="לדוגמה: 300000"
            />
          </label>
          <fieldset className="sm:col-span-2">
            <legend className="text-sm font-medium text-slate-700">מטרה</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {PURPOSE_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-3 text-sm transition ${
                    values.purpose === opt.value
                      ? 'border-mash-gold bg-mash-gold/10 font-semibold text-mash-navy'
                      : 'border-slate-200 hover:border-mash-gold/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="purpose"
                    value={opt.value}
                    checked={values.purpose === opt.value}
                    onChange={() => onChange({ purpose: opt.value })}
                    className="accent-mash-gold"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <button
          type="submit"
          className="w-full rounded-2xl bg-mash-gold py-4 text-lg font-bold text-mash-navy shadow-lg transition hover:brightness-105 active:scale-[0.99] sm:text-xl"
        >
          חשב והמשך לתוצאות
        </button>
      </motion.div>
    </form>
  )
}
