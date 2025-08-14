import React from 'react'

const LightboxContext = React.createContext<{
  open: (images: string[], startIdx?: number, onIndexChange?: (index: number) => void) => void
} | null>(null)

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [images, setImages] = React.useState<string[]>([])
  const [index, setIndex] = React.useState(0)
  const onIndexChangeRef = React.useRef<((i: number) => void) | null>(null)

  const open = React.useCallback((imgs: string[], startIdx = 0, onIndexChange?: (i: number) => void) => {
    setImages(imgs)
    const clamped = Math.max(0, Math.min(startIdx, imgs.length - 1))
    setIndex(clamped)
    onIndexChangeRef.current = typeof onIndexChange === 'function' ? onIndexChange : null
    // call once so opener syncs immediately
    if (onIndexChangeRef.current) {
      try { onIndexChangeRef.current(clamped) } catch {}
    }
    setIsOpen(true)
  }, [])

  const close = React.useCallback(() => { setIsOpen(false); onIndexChangeRef.current = null }, [])
  const showPrev = React.useCallback(() => setIndex(i => (i - 1 + images.length) % images.length), [images.length])
  const showNext = React.useCallback(() => setIndex(i => (i + 1) % images.length), [images.length])

  React.useEffect(() => {
    if (!isOpen) return
    if (onIndexChangeRef.current) {
      try { onIndexChangeRef.current(index) } catch {}
    }
  }, [index, isOpen])

  React.useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (!isOpen) return
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKeydown)
    return () => window.removeEventListener('keydown', onKeydown)
  }, [isOpen, close, showPrev, showNext])

  const hideNav = images.length <= 1

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {isOpen && (
        <div className="lightbox open" onClick={(e) => { if (e.target === e.currentTarget) close() }}>
          <div className="lightbox-content">
            <img className="lightbox-img" src={images[index]} alt="aperçu" />
            <img className="logo-overlay" src="/icon-48.png" alt="" aria-hidden="true" />
            {!hideNav && (
              <>
                <button className="lightbox-prev" aria-label="Précédent" onClick={showPrev}>&#x2039;</button>
                <button className="lightbox-next" aria-label="Suivant" onClick={showNext}>&#x203A;</button>
              </>
            )}
            <button className="lightbox-close" aria-label="Fermer" onClick={close}>✕</button>
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  )
}

export function useLightbox() {
  const ctx = React.useContext(LightboxContext)
  if (!ctx) throw new Error('useLightbox must be used within LightboxProvider')
  return ctx
}
