/** Assegno unico al mese secondo ISEE e figli minorenni. */
import { T, eur, eur2, type L } from './_kit';
import { auu } from '../engine/index';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Quanto vale l’assegno unico per te', 'What the child allowance is worth to you'),
  cta: T(l, 'Il calcolo completo con tutte le maggiorazioni', 'The full calculation with every supplement'),
  exemple: T(l, 'Esempio con ISEE di 25.000 € e due figli', 'Example with a €25,000 ISEE and two children'),
  inputs: [
    { id: 'isee', label: T(l, 'ISEE (0 se non ce l’hai)', 'ISEE (0 if you have none)'), def: 25000, unit: '€', max: 200000 },
    { id: 'minori', label: T(l, 'Figli minorenni', 'Children under 18'), def: 2, max: 12 },
  ],
  run: (v) => {
    const i = v.isee > 0 ? v.isee : null;
    const r = auu({ isee: i, minori: v.minori, under1: 0, tra1e3: 0, maggiorenni: 0, entrambiLavorano: false, madreUnder21: false });
    return {
      head: [T(l, 'Al mese, stima', 'Per month, estimate'), eur2(r.mensile, l)],
      rows: [[T(l, 'Per figlio', 'Per child'), eur2(r.perMinore, l)], [T(l, 'In un anno', 'Over a year'), eur(r.annuo, l)]],
      note: i === null ? T(l, 'Senza ISEE: importi minimi.', 'Without an ISEE: minimum amounts.') : undefined,
    };
  },
});
