import { SEO } from '../components/SEO'
import { DEFAULT_FAQS } from '../data/faqs'

export function Privacy() {
  return (
    <>
      <SEO
        title="מדיניות פרטיות | משכנתא-קליק"
        description="מדיניות פרטיות כללית — שימוש במידע ומגבלות אחריות."
        faqs={DEFAULT_FAQS}
      />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <h1 className="text-3xl font-bold text-mash-navy">מדיניות פרטיות</h1>
        <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
          <p>
            האתר משכנתא-קליק מספק כלים חישוביים והסברים כלליים. איננו אוספים
            במכוון נתונים אישיים רגישים באתר זה, למעט מה שאתם בוחרים להזין
            בטפסי הדגמה — ואלו אינם נשמרים בשרת כלשהו בגרסת הדגמה זו.
          </p>
          <p>
            אם תפעילו שירות AI דרך שרת צד-שלישי, עיינו במדיניות הספק הרלוונטית.
            השימוש באתר הוא באחריות המשתמש והמידע אינו מהווה ייעוץ פיננסי.
          </p>
        </div>
      </div>
    </>
  )
}
