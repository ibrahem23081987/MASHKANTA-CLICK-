import { useCallback, useEffect, useState } from 'react'

const FONT_KEY = 'mashkanta-a11y-font'
const CONTRAST_KEY = 'mashkanta-a11y-contrast'
const LINKS_KEY = 'mashkanta-a11y-links'

type FontLevel = '0' | '1' | '2'

function readStored(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStored(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* ignore */
  }
}

function initialFontLevel(): FontLevel {
  const f = readStored(FONT_KEY)
  return f === '1' || f === '2' ? f : '0'
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [fontLevel, setFontLevel] = useState<FontLevel>(initialFontLevel)
  const [highContrast, setHighContrast] = useState(
    () => readStored(CONTRAST_KEY) === '1',
  )
  const [linkUnderline, setLinkUnderline] = useState(
    () => readStored(LINKS_KEY) === '1',
  )

  const applyDom = useCallback(
    (font: FontLevel, contrast: boolean, links: boolean) => {
      const root = document.documentElement
      root.dataset.a11yFont = font
      root.classList.toggle('a11y-high-contrast', contrast)
      root.classList.toggle('a11y-links-underline', links)
    },
    [],
  )

  useEffect(() => {
    applyDom(fontLevel, highContrast, linkUnderline)
    writeStored(FONT_KEY, fontLevel)
    writeStored(CONTRAST_KEY, highContrast ? '1' : '0')
    writeStored(LINKS_KEY, linkUnderline ? '1' : '0')
  }, [fontLevel, highContrast, linkUnderline, applyDom])

  function incFont() {
    setFontLevel((prev) => (prev === '0' ? '1' : prev === '1' ? '2' : '2'))
  }

  function decFont() {
    setFontLevel((prev) => (prev === '2' ? '1' : prev === '1' ? '0' : '0'))
  }

  return (
    <div
      className="fixed bottom-4 left-4 z-[100] flex flex-col items-start gap-2"
      dir="rtl"
    >
      <div
        id="a11y-panel"
        className={`w-64 rounded-xl border-2 border-mash-navy bg-white p-4 shadow-xl ${open ? '' : 'hidden'}`}
        role="dialog"
        aria-label="תפריט נגישות"
        aria-hidden={!open}
      >
        <p className="mb-3 text-sm font-bold text-mash-navy">נגישות</p>
        <div className="flex flex-col gap-3 text-sm">
          <div>
            <span className="mb-1 block text-slate-600">גודל טקסט</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={decFont}
                className="flex-1 rounded-lg border border-slate-300 bg-slate-50 py-2 font-semibold hover:bg-slate-100"
                aria-label="הקטן גודל טקסט"
              >
                א−
              </button>
              <button
                type="button"
                onClick={incFont}
                className="flex-1 rounded-lg border border-slate-300 bg-slate-50 py-2 font-semibold hover:bg-slate-100"
                aria-label="הגדל גודל טקסט"
              >
                א+
              </button>
            </div>
          </div>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              className="size-4 accent-mash-navy"
            />
            <span>מצב ניגודיות גבוהה</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={linkUnderline}
              onChange={(e) => setLinkUnderline(e.target.checked)}
              className="size-4 accent-mash-navy"
            />
            <span>קו תחתון לכל הקישורים</span>
          </label>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex size-12 items-center justify-center rounded-full border-2 border-mash-navy bg-mash-gold text-lg font-bold text-mash-navy shadow-lg transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        aria-expanded={open}
        aria-controls="a11y-panel"
        title="נגישות"
      >
        ♿
      </button>
    </div>
  )
}
