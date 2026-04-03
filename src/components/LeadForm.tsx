import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'

interface LeadFormProps {
  defaultAmount?: number
}

export function LeadForm({ defaultAmount = 0 }: LeadFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState(
    defaultAmount > 0 ? String(Math.round(defaultAmount)) : '',
  )
  const [city, setCity] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
      className="rounded-2xl bg-mash-navy p-6 text-white shadow-xl sm:p-8"
    >
      <h2 className="text-xl font-bold text-mash-gold sm:text-2xl">
        רוצה יועץ משכנתא שיחסוך לך עשרות אלפי שקלים?
      </h2>
      <p className="mt-2 text-sm text-white/85 sm:text-base">
        השאר פרטים וייעוץ חינם תוך 24 שעות
      </p>
      {sent ? (
        <p className="mt-6 rounded-xl bg-white/10 p-4 text-center font-medium">
          תודה! פרטיך התקבלו — נחזור אליך בהקדם.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-4 sm:grid-cols-2"
        >
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm text-white/80">שם מלא</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:border-mash-gold focus:outline-none focus:ring-2 focus:ring-mash-gold/40"
              placeholder="לדוגמה: דני כהן"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm text-white/80">טלפון</span>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:border-mash-gold focus:outline-none focus:ring-2 focus:ring-mash-gold/40"
              placeholder="050-0000000"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm text-white/80">
              סכום משכנתא
            </span>
            <input
              required
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:border-mash-gold focus:outline-none focus:ring-2 focus:ring-mash-gold/40"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm text-white/80">עיר</span>
            <input
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:border-mash-gold focus:outline-none focus:ring-2 focus:ring-mash-gold/40"
              placeholder="תל אביב"
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-mash-gold py-4 text-base font-bold text-mash-navy shadow-lg transition hover:brightness-105 active:scale-[0.99]"
            >
              קבל ייעוץ חינם ←
            </button>
          </div>
        </form>
      )}
    </motion.div>
  )
}
