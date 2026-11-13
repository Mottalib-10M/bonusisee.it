/** Bonus mamme : 2026 in vigore contro 2027 del DDL. */
import { T, eur, type L } from './_kit';
import { mamme } from '../engine/index';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Bonus mamme: 2026 contro 2027', 'Working-mothers bonus: 2026 versus 2027'),
  cta: T(l, 'Il bonus mamme nel dettaglio', 'The working-mothers bonus in detail'),
  exemple: T(l, 'Esempio: due figli, il più piccolo di 4 anni, 12 mesi di lavoro', 'Example: two children, youngest aged 4, 12 months worked'),
  inputs: [
    { id: 'figli', label: T(l, 'Figli', 'Children'), def: 2, max: 12 },
    { id: 'mesi', label: T(l, 'Mesi di lavoro', 'Months worked'), def: 12, max: 12 },
  ],
  run: (v) => {
    const m = { figli: v.figli, etaPiuPiccolo: 4, mesi: v.mesi, cdi: false, reddito: 28000 };
    const a = mamme(m, 2026), b = mamme(m, 2027);
    return {
      head: [T(l, '2027 se il DDL passa così', '2027 if the bill passes as is'), eur(b.totale, l)],
      rows: [[T(l, '2026, in vigore', '2026, in force'), eur(a.totale, l)], [T(l, 'Differenza', 'Difference'), eur(b.totale - a.totale, l)]],
    };
  },
});
