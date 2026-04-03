import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-mash-navy/20 bg-white py-10 text-center text-sm text-slate-600">
      <p className="font-semibold text-mash-navy">
        מחשבון משכנתא AI — הראשון בישראל
      </p>
      <p className="mx-auto mt-2 max-w-xl px-4">
        האתר מיועד למטרות מידע בלבד ואינו מהווה ייעוץ פיננסי
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        <Link to="/privacy" className="text-mash-navy underline-offset-2 hover:underline">
          מדיניות פרטיות
        </Link>
        <span aria-hidden="true" className="text-slate-300">
          |
        </span>
        <Link
          to="/accessibility"
          className="text-mash-navy underline-offset-2 hover:underline"
        >
          הצהרת נגישות
        </Link>
        <span aria-hidden="true" className="text-slate-300">
          |
        </span>
        <Link to="/terms" className="text-mash-navy underline-offset-2 hover:underline">
          תנאי שימוש
        </Link>
      </div>
    </footer>
  )
}
