import { motion } from 'framer-motion'
import { formatCurrency } from '../utils/formatCurrency'
import {
  summarizeLoan,
  trackRateAdjustment,
} from '../services/calculateMortgage'

interface MortgageExplainerProps {
  amount: number
  years: number
  baseRate: number
}

type Row = {
  id: string
  label: string
  monthly: number
  interest: number
  stability: string
}

export function MortgageExplainer({
  amount,
  years,
  baseRate,
}: MortgageExplainerProps) {
  const rows: Row[] = [
    {
      id: 'fixed',
      label: 'קבועה',
      ...(() => {
        const r = summarizeLoan(amount, years, trackRateAdjustment('fixed', baseRate))
        return { monthly: r.monthlyPayment, interest: r.totalInterest }
      })(),
      stability: 'גבוהה',
    },
    {
      id: 'prime',
      label: 'פריים',
      ...(() => {
        const r = summarizeLoan(amount, years, trackRateAdjustment('prime', baseRate))
        return { monthly: r.monthlyPayment, interest: r.totalInterest }
      })(),
      stability: 'נמוכה',
    },
    {
      id: 'variable',
      label: 'משתנה',
      ...(() => {
        const r = summarizeLoan(amount, years, trackRateAdjustment('variable', baseRate))
        return { monthly: r.monthlyPayment, interest: r.totalInterest }
      })(),
      stability: 'בינונית',
    },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="border-b border-slate-100 bg-mash-navy/5 px-5 py-4">
        <h2 className="text-lg font-bold text-mash-navy">השוואת מסלולים</h2>
        <p className="mt-1 text-sm text-slate-600">
          השוואה המחושבת לפי הריבית שהזנת, עם הנחות הדגמה למסלולי פריים ומשתנה
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] text-right text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-slate-700">
              <th className="px-4 py-3 font-semibold">מסלול</th>
              <th className="px-4 py-3 font-semibold">תשלום חודשי</th>
              <th className="px-4 py-3 font-semibold">סה״כ ריבית</th>
              <th className="px-4 py-3 font-semibold">יציבות</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="px-4 py-3 font-medium text-mash-navy">
                  {row.label}
                </td>
                <td className="px-4 py-3 tabular-nums">
                  {formatCurrency(row.monthly)}
                </td>
                <td className="px-4 py-3 tabular-nums">
                  {formatCurrency(row.interest)}
                </td>
                <td className="px-4 py-3 text-slate-700">{row.stability}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  )
}
