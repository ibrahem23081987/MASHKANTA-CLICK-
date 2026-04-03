import type { MortgageCalculation } from '../types/mortgage'

/** PMT: תשלום חודשי קבוע לפריסה שווה */
export function calculateMonthlyPayment(
  amount: number,
  years: number,
  annualRatePercent: number,
): number {
  if (amount <= 0 || years <= 0) return 0
  const n = Math.round(years * 12)
  const r = annualRatePercent / 100 / 12
  if (r === 0) return amount / n
  const factor = (1 + r) ** n
  return (amount * r * factor) / (factor - 1)
}

export function summarizeLoan(
  amount: number,
  years: number,
  annualRatePercent: number,
): { monthlyPayment: number; totalPayments: number; totalInterest: number } {
  const monthlyPayment = calculateMonthlyPayment(
    amount,
    years,
    annualRatePercent,
  )
  const months = Math.round(years * 12)
  const totalPayments = monthlyPayment * months
  const totalInterest = Math.max(0, totalPayments - amount)
  return { monthlyPayment, totalPayments, totalInterest }
}

/**
 * לפי הגדרת המשתמש: הלוואה מקסימלית = משכורת × 30% × 12 × שנים
 * מחיר דירה מקסימלי = הון עצמי + הלוואה מקסימלית
 */
export function calculateMaxLoan(salary: number, years: number): number {
  if (salary <= 0 || years <= 0) return 0
  return salary * 0.3 * 12 * years
}

export function calculateMaxHomePrice(
  salary: number,
  years: number,
  equity: number,
): { maxLoan: number; maxHomePrice: number } {
  const maxLoan = calculateMaxLoan(salary, years)
  return {
    maxLoan,
    maxHomePrice: Math.max(0, equity) + maxLoan,
  }
}

export function fullMortgageCalculation(
  amount: number,
  years: number,
  rate: number,
  salary: number,
  equity: number,
): MortgageCalculation {
  const { monthlyPayment, totalPayments, totalInterest } = summarizeLoan(
    amount,
    years,
    rate,
  )
  const { maxLoan, maxHomePrice } = calculateMaxHomePrice(salary, years, equity)
  return {
    monthlyPayment,
    totalPayments,
    totalInterest,
    maxLoan,
    maxHomePrice,
  }
}

/** הפרשי ריבית לצורך השוואת מסלולים (המחשה בלבד) */
export function trackRateAdjustment(
  track: 'fixed' | 'prime' | 'variable',
  baseRate: number,
): number {
  if (track === 'fixed') return baseRate
  if (track === 'prime') return Math.max(0.1, baseRate - 0.8)
  return Math.max(0.1, baseRate - 0.45)
}
