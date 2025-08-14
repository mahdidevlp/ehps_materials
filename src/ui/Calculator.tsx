import React from 'react'
import { MACHINES, PRODUCT_CATALOG } from './catalog'

function formatTND(amount: number) {
  try {
    return new Intl.NumberFormat('fr-TN', { style: 'currency', currency: 'TND', maximumFractionDigits: 2 }).format(amount)
  } catch {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'TND', maximumFractionDigits: 2 }).format(amount)
  }
}

export function Calculator() {
  const [machineKey, setMachineKey] = React.useState(PRODUCT_CATALOG[0]?.key ?? '')
  const [surface, setSurface] = React.useState<number>(1)
  const [frequency, setFrequency] = React.useState<'ponctuel' | 'regulier'>('ponctuel')
  const [visits, setVisits] = React.useState<number | ''>('')
  const machine = MACHINES[machineKey]

  const floorTypes = machine?.floorTypes ?? []
  const [floorKey, setFloorKey] = React.useState<string>(floorTypes[0]?.key ?? '')

  React.useEffect(() => {
    const list = MACHINES[machineKey]?.floorTypes ?? []
    setFloorKey(list[0]?.key ?? '')
  }, [machineKey])

  const selectedFloor = (machine?.floorTypes ?? []).find(ft => ft.key === floorKey) ?? null
  const pricePerM2 = selectedFloor ? (selectedFloor.min + selectedFloor.max) / 2 : 0
  const pricePerVisit = surface > 0 ? surface * pricePerM2 : 0
  const monthly = frequency === 'regulier' && typeof visits === 'number' && visits > 0 ? visits * pricePerVisit : null

  React.useEffect(() => {
    const handler = (e: Event) => {
      if (!(e.target instanceof HTMLSelectElement)) return
      const list = MACHINES[machineKey]?.floorTypes ?? []
      setFloorKey(list[0]?.key ?? '')
    }
    document.getElementById('calc-floorType')?.addEventListener('rebuild-floor', handler as any)
    return () => document.getElementById('calc-floorType')?.removeEventListener('rebuild-floor', handler as any)
  }, [machineKey])

  return (
    <div className="calc-wrapper container" id="calculator">
      <div className="calc-card">
        <div className="calc-header">
          <h3 className="calc-title">
            <span>Calculez votre <span className="gradient">tarif</span></span>
          </h3>
          <span className="help">Basé sur les prix indiqués ci-dessus</span>
        </div>

        <div className="form-grid">
          <div className="input-group">
            <label htmlFor="calc-machine">Type de machine</label>
            <select id="calc-machine" className="select" value={machineKey} onChange={e => setMachineKey(e.target.value)}>
              {PRODUCT_CATALOG.map(p => (
                <option key={p.key} value={p.key}>{p.title}</option>
              ))}
            </select>
          </div>

          <div className="input-group" id="floorType-group" style={{ display: floorTypes.length ? undefined : 'none' }}>
            <label htmlFor="calc-floorType">Type de sol</label>
            <select id="calc-floorType" className="select" value={floorKey} onChange={e => setFloorKey(e.target.value)}>
              {floorTypes.map(ft => (
                <option key={ft.key} value={ft.key}>{ft.label}</option>
              ))}
            </select>
            <span className="help">Sélectionnez le revêtement à traiter</span>
          </div>

          <div className="input-group">
            <label htmlFor="calc-surface">Surface à nettoyer (m²)</label>
            <input id="calc-surface" className="input" type="number" inputMode="decimal" min={1} step={1} placeholder="Ex. 1" value={surface}
                   onChange={e => setSurface(Math.max(0, Number(e.target.value)))} />
            <span className="help">Indiquez la surface par intervention</span>
          </div>

          <div className="input-group">
            <label htmlFor="calc-frequency">Fréquence</label>
            <select id="calc-frequency" className="select" value={frequency} onChange={e => setFrequency(e.target.value as any)}>
              <option value="ponctuel">Ponctuel</option>
              <option value="regulier">Régulier</option>
            </select>
          </div>

          <div className="input-group" id="calc-visits-group" style={{ display: frequency === 'regulier' ? undefined : 'none' }}>
            <label htmlFor="calc-visits">Visites par mois (optionnel)</label>
            <input id="calc-visits" className="input" type="number" min={1} step={1} placeholder="Ex. 8" value={visits}
                   onChange={e => setVisits(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))} />
            <span className="help">Utilisé pour estimer un coût mensuel</span>
          </div>
        </div>

        <div className="results">
          <div className="result-tile" id="tile-m2">
            <div className="result-label">Tarif m² (DT)</div>
            <div className="result-value" id="price-m2-range">{selectedFloor ? `${selectedFloor.min.toFixed(2)} – ${selectedFloor.max.toFixed(2)}` : '—'}</div>
            <div className="help" id="remark" style={{ marginTop: 6 }}>{selectedFloor?.remark ?? '\u00A0'}</div>
          </div>
          <div className="result-tile">
            <div className="result-label">Prix par intervention</div>
            <div className="result-value" id="price-per-visit">{pricePerVisit > 0 ? formatTND(pricePerVisit) : '—'}</div>
          </div>
          <div className="result-tile" id="monthly-tile" style={{ display: monthly ? undefined : 'none' }}>
            <div className="result-label">Estimation mensuelle</div>
            <div className="result-value" id="monthly">{monthly ? formatTND(monthly) : '—'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
