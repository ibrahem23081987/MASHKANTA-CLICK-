import { SEO } from '../components/SEO'
import { DEFAULT_FAQS } from '../data/faqs'

export function Terms() {
  return (
    <>
      <SEO
        title="תנאי שימוש | משכנתא-קליק"
        description="תנאי שימוש כלליים באתר משכנתא-קליק."
        faqs={DEFAULT_FAQS}
      />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <h1 className="text-3xl font-bold text-mash-navy">תנאי שימוש</h1>
        <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
          <p>
            השימוש באתר כפוף להבנה שמדובר במידע כללי וחישובים משוערים בלבד.
            התוצאות תלויות בהנחות שנקבעו במחשבון ואינן משקפות הצעת אשראי או
            אישור בנקאי.
          </p>
          <p>
            אין להסתמך על תוכן האתר כתחליף לייעוץ מקצועי מותאם אישית. המפעילים
            לא יהיו אחראים לנזק ישיר או עקיף הנובע מהסתמכות על המידע באתר.
          </p>
        </div>
      </div>
    </>
  )
}
