import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { DEFAULT_FAQS } from '../data/faqs'

export function AccessibilityPage() {
  return (
    <>
      <SEO
        title="הצהרת נגישות | משכנתא-קליק"
        description="הצהרת נגישות — יעדי WCAG 2.1 רמה AA וכלים באתר."
        faqs={DEFAULT_FAQS}
      />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <h1 className="text-3xl font-bold text-mash-navy">הצהרת נגישות</h1>
        <p className="mt-2 text-sm text-slate-500">
          עודכן לאחרונה: אפריל 2026
        </p>

        <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-mash-navy">מחויבות</h2>
            <p className="mt-3">
              משכנתא-קליק פועל לקידום נגישות דיגיטלית לכלל המשתמשים, כולל אנשים
              עם מוגבלויות. <strong>יעד הציות שלנו הוא תקן WCAG 2.1 ברמה AA</strong>{' '}
              (הנחיות הנגישות לתוכן אינטרנט), ככל הניתן בהתאם לטכנולוגיה ולמשאבים
              הזמינים.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-mash-navy">מה באתר</h2>
            <ul className="mt-3 list-disc space-y-2 pr-5">
              <li>מבנה כותרות היררכי, שפה עברית וכיוון RTL.</li>
              <li>ניגודיות צבעים מודגשת בממשק הבסיסי.</li>
              <li>
                כלי נגישות צף: הגדלה והקטנת גודל טקסט, מצב ניגודיות גבוהה,
                והדגשת קישורים (קו תחתון).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-mash-navy">מגבלות ידועות</h2>
            <p className="mt-3">
              ייתכן שחלקים באתר או תכנים מצד שלישי (למשל הטמעות) לא יעמדו בכל
              הדרישות. אנו פועלים לשפר זאת בהדרגה. אם נתקלתם בבעיה ספציפית,
              נשמח לפרטים.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-mash-navy">פניות בנושא נגישות</h2>
            <p className="mt-3">
              לבקשות, הערות או דיווח על מחסום נגישות:{' '}
              <Link
                to="/contact"
                className="font-semibold text-mash-navy underline underline-offset-2"
              >
                צור קשר
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </>
  )
}
