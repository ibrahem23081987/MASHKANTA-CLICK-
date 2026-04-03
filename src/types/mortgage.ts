export type MortgageTrack =
  | 'fixed_unindexed'
  | 'fixed_indexed'
  | 'prime'
  | 'variable_5y'

export type MortgagePurpose =
  | 'first_home'
  | 'investment'
  | 'refinance'

export interface MortgageFormValues {
  amount: number
  years: number
  rate: number
  track: MortgageTrack
  salary: number
  equity: number
  purpose: MortgagePurpose
}

export interface MortgageCalculation {
  monthlyPayment: number
  totalPayments: number
  totalInterest: number
  maxLoan: number
  maxHomePrice: number
}

export interface MortgageResultState extends MortgageFormValues, MortgageCalculation {
  trackLabel: string
}
