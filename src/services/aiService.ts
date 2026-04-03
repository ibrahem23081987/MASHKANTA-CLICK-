import type { MortgageTrack } from '../types/mortgage'
import { formatCurrency } from '../utils/formatCurrency'

const TRACK_LABELS: Record<MortgageTrack, string> = {
  fixed_unindexed: 'קבועה לא צמודה',
  fixed_indexed: 'קבועה צמודה',
  prime: 'פריים',
  variable_5y: 'משתנה כל 5 שנים',
}

export interface ExplainMortgageInput {
  amount: number
  years: number
  rate: number
  track: MortgageTrack
  monthlyPayment: number
  totalInterest: number
}

function buildUserPrompt(input: ExplainMortgageInput): string {
  const trackName = TRACK_LABELS[input.track]
  return `אתה יועץ משכנתא ישראלי מנוסה.
הסבר בעברית פשוטה וברורה את המשכנתא הבאה:
סכום: ${formatCurrency(input.amount)}
תקופה: ${input.years} שנה
ריבית: ${input.rate}%
מסלול: ${trackName}
תשלום חודשי: ${formatCurrency(input.monthlyPayment)}
סה"כ ריבית: ${formatCurrency(input.totalInterest)}

כתוב 3-4 משפטים שמסבירים:
1. מה התשלום החודשי אומר
2. כמה ריבית תשלם בסך הכל
3. האם המסלול מתאים
4. המלצה אחת פרקטית`
}

const DEMO_TEXT =
  'התשלום החודשי משקף את סכום הקרן בתוספת הריבית, מחולק לאורך כל תקופת ההלוואה — כך יודעים מה יוצא מהחשבון כל חודש. ' +
  'סך הריבית שתשלם הוא ההפרש בין כל התשלומים לבין הסכום שנלווית בהתחלה; זה ה"מחיר" של הכסף לאורך זמן. ' +
  'המסלול שבחרת מתאים בדרך כלל למי שמעדיף יציבות בתקציב החודשי, אבל חשוב לבדוק גם מחזור וריביות עתידיות. ' +
  'המלצה פרקטית אחת: השוו הצעה מול 2–3 בנקים או יועץ משכנתאות, ובקשו פירוק מדויק של עמלות ומסלולי משנה לפני חתימה.'

export async function explainMortgageWithAI(
  input: ExplainMortgageInput,
): Promise<string> {
  if (import.meta.env.VITE_DEMO_MODE === 'true') {
    return DEMO_TEXT
  }

  const userPrompt = buildUserPrompt(input)
  const body = {
    model: 'claude-3-5-haiku-20241022',
    max_tokens: 512,
    messages: [{ role: 'user', content: userPrompt }],
  }

  const res = await fetch('/api/claude/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => res.statusText)
    throw new Error(errText || `שגיאת שרת: ${res.status}`)
  }

  const data = (await res.json()) as {
    content?: Array<{ type: string; text?: string }>
  }
  const text = data.content?.find((c) => c.type === 'text')?.text?.trim()
  if (text) return text
  throw new Error('תשובה ריקה מה-AI')
}

export { TRACK_LABELS }
