export type FloorType = { key: string; label: string; min: number; max: number; remark?: string }
export type Product = {
  key: string
  title: string
  subtitle?: string
  description?: string
  imageFiles: string[]
  capacityM2H: number
  floorTypes?: FloorType[]
  specs?: string[]
}

export const PRODUCT_CATALOG: Product[] = [
  {
    key: 'monobrosse_standard',
    title: 'Monobrosse standard',
    subtitle: 'Entretien régulier des sols durs',
    description: 'Machine polyvalente pour l’entretien courant des carrelages, marbres bruts et bétons lisses. Idéale pour des prestations régulières.',
    imageFiles: ['monobrosse_standard/5.png'],
    capacityM2H: 400,
    floorTypes: [
      { key: 'carrelage', label: 'Carrelage', min: 0.80, max: 1.00, remark: 'Idéale pour entretien régulier' },
      { key: 'marbre_brut', label: 'Marbre brut', min: 1.20, max: 1.50, remark: 'Nécessite plus de passage et produit spécial' },
      { key: 'marbre_poli', label: 'Marbre poli', min: 1.50, max: 2.00, remark: 'Comprend polissage léger' },
      { key: 'beton_lisse', label: 'Béton lisse', min: 1.00, max: 1.30, remark: 'Entretien industriel' }
    ],
  },
  {
    key: 'monobrosse_hv',
    title: 'Monobrosse haute vitesse (lustrage)',
    subtitle: 'Finition brillante et lustrage',
    description: 'Pour obtenir un effet miroir sur marbre poli et entretenir les parquets vitrifiés avec des disques doux.',
    imageFiles: ['monobrosse_hv/12.png'],
    capacityM2H: 500,
    floorTypes: [
      { key: 'marbre_poli', label: 'Marbre poli', min: 2.00, max: 2.50, remark: 'Effet miroir' },
      { key: 'parquet_vitrifie', label: 'Parquet vitrifié', min: 1.80, max: 2.20, remark: 'Utilisation disques doux' }
    ],
  },
  {
    key: 'compacte',
    title: 'Autolaveuse compacte',
    subtitle: 'Petites et moyennes surfaces encombrées',
    description: 'Maniable pour bureaux, couloirs et boutiques. Nettoyage et aspiration en un seul passage.',
    imageFiles: ['compacte/3.png','compacte/4.png','compacte/11.png'],
    capacityM2H: 1200,
    floorTypes: [
      { key: 'carrelage', label: 'Carrelage', min: 1.00, max: 1.20, remark: 'Petites/moyennes surfaces' },
      { key: 'beton_lisse', label: 'Béton lisse', min: 1.20, max: 1.50, remark: 'Zones industrielles' }
    ],
  },
  {
    key: 'autoportee',
    title: 'Autolaveuse autoportée',
    subtitle: 'Très grands espaces > 1 000 m²',
    description: 'Performance accrue pour centres commerciaux, entrepôts et parkings. Réduction du temps d’intervention.',
    imageFiles: ['autoportee/1.png','autoportee/2.png'],
    capacityM2H: 6000,
    floorTypes: [
      { key: 'carrelage', label: 'Carrelage', min: 0.80, max: 1.00, remark: 'Grande surface > 1000 m²' },
      { key: 'beton_lisse', label: 'Béton lisse', min: 1.00, max: 1.20, remark: 'Entrepôts, parkings' }
    ],
  },
  {
    key: 'injecteur_extracteur',
    title: 'Injecteur-extracteur',
    subtitle: 'Textiles, moquettes et tapis',
    description: 'Injection de solution puis extraction en profondeur. Idéal pour moquettes et tapis haute densité.',
    imageFiles: ['injecteur_extracteur/8.png','injecteur_extracteur/9.png'],
    capacityM2H: 200,
    floorTypes: [
      { key: 'moquette', label: 'Moquette', min: 2.00, max: 3.00, remark: 'Inclut séchage rapide' },
      { key: 'tapis_hd', label: 'Tapis haute densité', min: 2.50, max: 3.50, remark: 'Traitement anti-acariens possible' }
    ],
  },
  {
    key: 'aspirateur_industriel',
    title: 'Aspirateur industriel eau/poussière',
    subtitle: 'Préparation et fin de chantier',
    description: 'Aspiration eau et poussières pour préparation avant lavage et après travaux.',
    imageFiles: ['aspirateur_industriel/6.png','aspirateur_industriel/7.png','aspirateur_industriel/12.png'],
    capacityM2H: 600,
    floorTypes: [
      { key: 'beton_brut', label: 'Béton brut', min: 0.50, max: 0.80, remark: 'Préparation avant lavage' },
      { key: 'carrelage', label: 'Carrelage', min: 0.60, max: 0.90, remark: 'Après travaux' }
    ],
  },
  {
    key: 'balayeuse_manuelle',
    title: 'Balayeuse manuelle',
    subtitle: 'Balayage mécanique des surfaces extérieures et chantiers',
    description: 'Solution économique pour le balayage des parkings, cours et zones très encrassées de petits chantiers.',
    imageFiles: ['balayeuse_manuelle/10.png'],
    capacityM2H: 3000,
    floorTypes: [
      { key: 'exterieur_parking', label: 'Extérieur / parking', min: 0.40, max: 0.70, remark: 'Balayage courant, prestation standard' },
      { key: 'tres_sale_chantier', label: 'Sol très sale / petits chantiers', min: 0.80, max: 1.20, remark: 'Encrassement, accès difficile, quantité élevée' }
    ],
  },
]

export const MACHINES = Object.fromEntries(
  PRODUCT_CATALOG.map(p => [p.key, { label: p.title, capacityM2H: p.capacityM2H, floorTypes: p.floorTypes ?? [] }])
) as Record<string, { label: string; capacityM2H: number; floorTypes: FloorType[] }>
