import React from 'react'
import { ProductGrid } from './ProductGrid'
import { Calculator } from './Calculator'
import { LightboxProvider } from './lightbox'

export function App() {
  return (
    <LightboxProvider>
      <section className="ehps-section">
        <div className="container">
          <div className="hero">
            <h2 className="headline">Nettoyage professionnel <span className="gradient">rapide, efficace et écoresponsable</span></h2>
            <p className="subhead">Découvrez nos autolaveuses adaptées à chaque type d’espace avec des rendements m²/h réels, une tarification claire (ponctuel ou régulier) et un calculateur intégré pour estimer vos coûts.</p>
            <div className="hero-points">
              <span className="chip">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="#0284c7" strokeWidth="2"/><path d="M12 12l4-2" stroke="#0284c7" strokeWidth="2" strokeLinecap="round"/></svg>
                Rendements mesurés m²/h
              </span>
              <span className="chip">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" stroke="#16a34a" strokeWidth="2" strokeLinejoin="round"/></svg>
                Matériels certifiés
              </span>
              <span className="chip">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M20 4c-5.5 0-9 2.5-11 6-1.5 2.6-2 6-2 10 4 0 7.4-.5 10-2 3.5-2 6-5.5 6-11" stroke="#22c55e" strokeWidth="2"/><path d="M9 15c1-2 3-4 6-5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/></svg>
                Respect de l’environnement
              </span>
              <span className="chip">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13 2L4 14h7l-2 8 9-12h-7l2-8z" stroke="#0ea5e9" strokeWidth="2" strokeLinejoin="round"/></svg>
                Interventions rapides
              </span>
            </div>
          </div>

          <ProductGrid />
          <Calculator />
        </div>
      </section>
    </LightboxProvider>
  )
}
