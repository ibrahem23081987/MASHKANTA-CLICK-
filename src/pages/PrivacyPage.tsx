import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { DEFAULT_FAQS } from '../data/faqs'

export function PrivacyPage() {
  return (
    <>
      <SEO
        title="מדיניות פרטיות | משכנתא-קליק"
        description="מדיניות פרטיות — איסוף מידע, שימוש, זכויות וחוק הגנת הפרטיות."
        faqs={DEFAULT_FAQS}
      />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <h1 className="text-3xl font-bold text-mash-navy">מדיניות פרטיות</h1>
        <p className="mt-2 text-sm text-slate-500">
          עודכן לאחרונה: אפריל 2026
        </p>

        <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-mash-navy">מבוא</h2>
            <p className="mt-3">
              מסמך זה מתאר כיצד משכנתא-קליק (&quot;האתר&quot;, &quot;אנחנו&quot;)
              מטפל במידע בעת השימוש באתר. השימוש באתר מהווה הסכמה לעקרונות
              המפורטים כאן, בכפוף להוראות{' '}
              <strong>חוק הגנת הפרטיות, התשמ״א–1981</strong> ולתיקוניו
              ולעקרונות הנלווים לו (להלן: &quot;החוק&quot;).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-mash-navy">
              איזה מידע נאסף?
            </h2>
            <ul className="mt-3 list-disc space-y-2 pr-5">
              <li>
                <strong>מידע שאתם מזינים בטפסים</strong> (למשל שם, טלפון, עיר
                או פרטים בטופס יצירת קשר / טופס לידים): נשלח רק אם שלחתם את
                הטופס. בגרסת הדגמה של האתר ייתכן שהמידע לא יישמר בשרת; בפריסה
                מלאה יישמר לפי מטרות המפורטות להלן.
              </li>
              <li>
                <strong>נתוני חישוב משכנתא</strong> שהוזנו במחשבון נשמרים
                בדפדפן שלכם לצורך מעבר בין מסכים (למשל לדף תוצאות) ואינם נשלחים
                לשרת שלנו לצורך אחסון קבוע, אלא אם הופעל שירות נוסף שמחייב זאת.
              </li>
              <li>
                <strong>מידע טכני אוטומטי</strong>: כתובת IP, סוג דפדפן ונתוני
                גלישה בסיסיים עשויים להיאסף על ידי ספק האחסון או שירותי ניתוח
                תעבורה אם יופעלו — בהתאם להגדרות הפריסה.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-mash-navy">
              כיצד משתמשים במידע?
            </h2>
            <ul className="mt-3 list-disc space-y-2 pr-5">
              <li>מתן שירותי המחשבון והצגת תוצאות באתר.</li>
              <li>יצירת קשר עמכם בעקבות בקשה ששלחתם (למשל ייעוץ משכנתא).</li>
              <li>שיפור חוויית המשתמש, אבטחה ותפעול תקין של האתר.</li>
              <li>
                שליחת בקשות לשירותי בינה מלאכותית (למשל Anthropic) לצורך יצירת
                הסבר טקסטואלי — רק את התוכן הנדרש לבקשה, ללא שימוש לפרסום ישיר
                אליכם על ידי ספק ה-AI.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-mash-navy">
              שיתוף עם צדדים שלישיים
            </h2>
            <p className="mt-3">
              <strong>איננו מוכרים את המידע האישי שלכם.</strong> המידע{' '}
              <strong>לא יימסר לצדדים שלישיים לצורכי שיווק</strong>. העברת מידע
              תתבצע רק ככל הנדרש לצורך אספקת השירות (למשל ספק אחסון, ספק
              הודעות או API של AI לפי בקשתכם בעת שימוש בתכונה), או כאשר הדין
              מחייב.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-mash-navy">
              אבטחה ושמירת מידע
            </h2>
            <p className="mt-3">
              נפעל באמצעים סבירים להגנה על מידע שנאסף בהתאם לאופי השירות.
              אין מערכת חסינה לחלוטין; אם יש לכם חשש לדליפה, פנו אלינו.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-mash-navy">
              זכות עיון, תיקון ומחיקה
            </h2>
            <p className="mt-3">
              בהתאם לחוק, רשאים לבקש <strong>עיון</strong> במידע האישי הנוגע
              אליכם, <strong>תיקון</strong> אם אינו מדויק, וכן בקשה למחיקה או
              להפסקת שימוש, ככל שהדבר חל על המידע שבאחזקתנו. נענה לבקשות תוך
              זמן סביר ובכפוף להוכחת זהות סבירה.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-mash-navy">יצירת קשר</h2>
            <p className="mt-3">
              לשאלות בנוגע למדיניות פרטיות או למימוש זכויות: ניתן לפנות דרך{' '}
              <Link
                to="/contact"
                className="font-semibold text-mash-navy underline underline-offset-2"
              >
                דף צור קשר
              </Link>{' '}
              באתר. ציינו בבקשה את נושא הפנייה (&quot;פרטיות&quot; / &quot;מחיקת
              מידע&quot;) לטיפול מהיר.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-mash-navy">שינויים</h2>
            <p className="mt-3">
              ייתכן שנעדכן מדיניות זו מעת לעת. התאריך בראש העמוד יעודכן
              בהתאם. מומלץ לעיין במסמך מחדש לאחר עדכון מהותי.
            </p>
          </section>
        </div>
      </article>
    </>
  )
}
