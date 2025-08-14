import React from 'react'
import { PRODUCT_CATALOG } from './catalog'
import { useLightbox } from './lightbox'

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(' ')
}

export function ProductGrid() {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const urls = PRODUCT_CATALOG.flatMap(p => (p.imageFiles ?? []).map(file => `/products/${encodeURI(file)}`))
    if (urls.length === 0) { setIsLoading(false); return }
    let isMounted = true
    const loaders = urls.map(src => new Promise(resolve => {
      const img = new Image()
      const done = () => resolve(true)
      img.onload = done
      img.onerror = done
      img.src = src
    }))
    Promise.allSettled(loaders).then(() => { if (isMounted) setIsLoading(false) })
    return () => { isMounted = false }
  }, [])

  if (isLoading) {
    const count = Math.max(6, PRODUCT_CATALOG.length)
    return (
      <div id="product-grid" className="product-grid">
        {Array.from({ length: count }).map((_, idx) => (
          <article key={idx} className="skeleton-card product-card">
            <div className="skeleton skeleton-media" />
            <div className="product-right">
              <div className="product-body">
                <div className="skeleton title" style={{ width: '70%' }} />
                <div className="skeleton subtitle" style={{ marginTop: 8, width: '50%' }} />
                <div className="card-meta" style={{ marginTop: 10 }}>
                  <div className="meta-dots" />
                </div>
                <ul className="product-specs">
                  <li><div className="skeleton text" style={{ height: 10 }} /></li>
                  <li><div className="skeleton text" style={{ height: 10 }} /></li>
                </ul>
              </div>
              <div className="product-footer">
                <div className="skeleton text" style={{ height: 36, borderRadius: 10 }} />
              </div>
            </div>
          </article>
        ))}
      </div>
    )
  }

  return (
    <div id="product-grid" className="product-grid">
      {PRODUCT_CATALOG.map(product => (
        <ProductCard key={product.key} productKey={product.key} />
      ))}
    </div>
  )
}

function ProductCard({ productKey }: { productKey: string }) {
  const product = PRODUCT_CATALOG.find(p => p.key === productKey)!
  const images = (product.imageFiles || []).map(file => `/products/${encodeURI(file)}`)
  const [current, setCurrent] = React.useState(0)
  const { open } = useLightbox()

  const hasNav = images.length > 1

  return (
    <article className="product-card" data-key={product.key}>
      <div className="carousel" data-key={product.key}>
        {images.length > 0 && (
          <>
            <img
              className="product-media"
              src={images[current]}
              alt={product.title}
              onClick={() => open(images, current, (idx) => setCurrent(idx))}
            />
            <img className="logo-overlay" src="/icon-48.png" alt="" aria-hidden="true" />
          </>
        )}
        {hasNav && (
          <>
            <button className="carousel-btn carousel-prev" aria-label="Image précédente" onClick={() => setCurrent((current - 1 + images.length) % images.length)}>&#x2039;</button>
            <button className="carousel-btn carousel-next" aria-label="Image suivante" onClick={() => setCurrent((current + 1) % images.length)}>&#x203A;</button>
            <div className="carousel-dots">
              {images.map((_, idx) => (
                <button key={idx} className={classNames('carousel-dot', idx === current && 'active')} onClick={() => setCurrent(idx)} aria-label={`Aller à l'image ${idx + 1}`}></button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="product-right">
        <div className="product-body">
          <h3 className="product-title">{product.title}</h3>
          <div className="product-subtitle">{product.subtitle}</div>
          <div className="card-meta"><div className="meta-dots"></div></div>
          <div className="product-desc">{product.description}</div>
          <div className="desc-dots"></div>
          <ul className="product-specs">
            {(product.specs ?? []).map((s, idx) => <li key={idx}>{s}</li>)}
          </ul>
        </div>
        <div className="product-footer">
          <div className="details">
            {product.floorTypes && (
              <div className="price-list">
                {product.floorTypes.map(ft => (
                  <div key={ft.key} className="price-item"><span className="muted">{ft.label}</span><strong>{ft.min.toFixed(2)} – {ft.max.toFixed(2)} DT/m²</strong></div>
                ))}
              </div>
            )}
          </div>
          <button className="ehps-button btn-calc" data-machine={product.key} onClick={() => {
            const select = document.getElementById('calc-machine') as HTMLSelectElement | null
            const floorSelect = document.getElementById('calc-floorType') as HTMLSelectElement | null
            const frequency = document.getElementById('calc-frequency') as HTMLSelectElement | null
            const visitsGroup = document.getElementById('calc-visits-group') as HTMLDivElement | null
            if (select) select.value = product.key
            if (floorSelect) {
              // trigger change to repopulate
              floorSelect.dispatchEvent(new Event('rebuild-floor', { bubbles: true }))
              floorSelect.selectedIndex = 0
            }
            if (frequency) frequency.value = 'ponctuel'
            if (visitsGroup) visitsGroup.style.display = 'none'
            document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}>Calculer le prix</button>
        </div>
      </div>
    </article>
  )
}
