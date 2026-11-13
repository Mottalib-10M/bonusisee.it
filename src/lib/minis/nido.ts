/** Bonus nido secondo anno di nascita e ISEE minorenni. */
import { T, eur, type L } from './_kit';
import { nido } from '../engine/index';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Il bonus nido con il tuo ISEE minorenni', 'The nursery bonus with your ISEE for minors'),
  cta: T(l, 'Il calcolo del bonus nido con la retta', 'The nursery bonus with your fee'),
  exemple: T(l, 'Esempio: bimbo nato nel 2025, ISEE minorenni di 30.000 €', 'Example: child born in 2025, ISEE for minors of €30,000'),
  inputs: [
    { id: 'isee', label: T(l, 'ISEE minorenni (0 se non ce l’hai)', 'ISEE for minors (0 if none)'), def: 30000, unit: '€', max: 200000 },
    { id: 'anno', label: T(l, 'Anno di nascita', 'Year of birth'), def: 2025, options: ['2023', '2024', '2025', '2026'].map((x) => ({ value: x, label: x })) },
  ],
  run: (v) => {
    const r = nido(v.anno, v.isee > 0 ? v.isee : null, 10000, 11);
    return { head: [T(l, 'Bonus nido all’anno', 'Nursery bonus per year'), eur(r.importo, l)], rows: [[T(l, 'Rata mensile massima', 'Maximum monthly payment'), eur(r.rata, l, 2)]] };
  },
});
