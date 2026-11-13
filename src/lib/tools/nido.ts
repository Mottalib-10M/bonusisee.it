/** Bonus asilo nido 2026 (circ. INPS 29/2026) : importo secondo anno di nascita e ISEE minorenni, limite della retta. */
import { T, eur, eur2, campiIsee, iseeDi, type L } from '../minis/_kit';
import { nido } from '../engine/index';
import type { ToolSpec } from '../tool-types';
export default (l: L): ToolSpec => ({
  exemple: T(l, 'Esempio: bimba nata nel 2025, ISEE minorenni di 28.000 €, retta di 450 €', 'Example: girl born in 2025, ISEE for minors of €28,000, €450 monthly fee'),
  inputs: [
    { id: 'anno', label: T(l, 'Anno di nascita del bambino', 'Child’s year of birth'), def: 2025, options: ['2023', '2024', '2025', '2026'].map((x) => ({ value: x, label: x })) },
    ...campiIsee(l, 28000, T(l, 'ISEE minorenni (senza assegno unico)', 'ISEE for minors (without the allowance)')),
    { id: 'retta', label: T(l, 'Retta mensile del nido', 'Monthly nursery fee'), def: 450, unit: '€', max: 3000 },
    { id: 'mesi', label: T(l, 'Mesi di frequenza nell’anno', 'Months attended in the year'), def: 11, max: 11 },
  ],
  run: (v) => {
    const r = nido(v.anno, iseeDi(v), v.retta, v.mesi);
    return {
      head: [T(l, 'Bonus nido nell’anno', 'Nursery bonus for the year'), eur(r.totale, l)],
      sub: T(l, `Fino a ${eur(r.importo, l)} l’anno, in ${r.mesi} rate`, `Up to ${eur(r.importo, l)} a year, in ${r.mesi} payments`),
      alert: r.limitatoDallaRetta ? T(l, 'La retta è più bassa della rata: l’INPS rimborsa solo la retta pagata.', 'The fee is below the instalment: INPS refunds only the fee paid.') : undefined,
      rows: [
        [T(l, 'Importo annuo spettante', 'Annual entitlement'), eur(r.importo, l)],
        [T(l, 'Rata mensile massima', 'Maximum monthly payment'), eur2(r.rata, l)],
        [T(l, 'Rimborso al mese', 'Refund per month'), eur2(r.perMese, l)],
      ],
      note: T(l, 'Il bonus non si somma alla detrazione fiscale per la retta del nido.', 'The bonus cannot be combined with the tax deduction for nursery fees.'),
    };
  },
});
