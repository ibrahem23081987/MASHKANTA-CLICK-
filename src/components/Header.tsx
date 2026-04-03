import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-mash-gold/20 text-mash-navy'
      : 'text-white/90 hover:bg-white/10'
  }`

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-mash-navy shadow-md"
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link
          to="/"
          className="text-lg font-bold text-white transition hover:text-mash-gold"
        >
          משכנתא-קליק 🏠
        </Link>
        <nav
          className="flex flex-wrap items-center justify-end gap-1"
          aria-label="ניווט ראשי"
        >
          <NavLink to="/" end className={linkClass}>
            דף הבית
          </NavLink>
          <NavLink to="/calculator" className={linkClass}>
            מחשבון
          </NavLink>
          <NavLink to="/articles" className={linkClass}>
            מאמרים
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            צור קשר
          </NavLink>
        </nav>
      </div>
    </motion.header>
  )
}
