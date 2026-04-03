const ils = new Intl.NumberFormat('he-IL', {
  style: 'currency',
  currency: 'ILS',
  maximumFractionDigits: 0,
})

export function formatCurrency(value: number): string {
  return ils.format(Math.round(value))
}

export function formatCurrencyNoSymbol(value: number): string {
  return new Intl.NumberFormat('he-IL', {
    maximumFractionDigits: 0,
  }).format(Math.round(value))
}
