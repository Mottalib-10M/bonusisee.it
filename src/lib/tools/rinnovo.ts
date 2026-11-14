/** Assegno unico 2027 : mese della DSU 2027, arretrati e mesi pagati al minimo. */
import { T, eur, eur2, MESI, type L } from '../minis/_kit';
import { rinnovoAuu } from '../engine/index';
import { campiFigli, auuInput, rigaLavoratori } from './_figli';
import type { ToolSpec } from '../tool-types';
export default (l: L): ToolSpec => ({
  exemple: (v) => T(l, `Esempio: DSU presentata a ${MESI(l)[v.mese - 1].label} 2027, ISEE di ${eur(v.isee, l)}`, `Example: DSU filed in ${MESI(l)[v.mese - 1].label} 2027, ISEE of ${eur(v.isee, l)}`),
  inputs: [
    { id: 'mese', label: T(l, 'Mese in cui presenti la DSU 2027 (la dichiarazione per l’ISEE)', 'Month you file the 2027 DSU'), def: 2, options: MESI(l) },
    { id: 'isee', label: T(l, 'ISEE atteso per il 2027', 'Expected 2027 ISEE'), def: 20000, unit: '€', max: 200000 },
    ...campiFigli(l),
  ],
  run: (v) => {
    const r = rinnovoAuu(auuInput(v, v.isee), v.mese);
    return {
      head: r.arretrati ? [T(l, 'Arretrati recuperati da marzo 2027', 'Arrears paid back from March 2027'), T(l, 'Sì', 'Yes')] : [T(l, 'Perdita stimata sull’annualità 2027', 'Estimated loss over the 2027 allowance year'), eur(r.perdita, l)],
      sub: r.arretrati ? T(l, 'DSU entro il 30 giugno: l’INPS paga la differenza dei mesi già pagati al minimo', 'DSU by 30 June: INPS pays the difference for months paid at the minimum') : T(l, `${r.mesiMinimo} mesi pagati con l’importo minimo`, `${r.mesiMinimo} months paid at the minimum amount`),
      alert: r.arretrati ? undefined : T(l, 'Dopo il 30 giugno gli arretrati non spettano: presenta la DSU prima.', 'After 30 June there are no arrears: file the DSU earlier.'),
      rows: [
        [T(l, 'Al mese con l’ISEE', 'Per month with the ISEE'), eur2(r.con, l)],
        [T(l, 'Al mese senza ISEE', 'Per month without an ISEE'), eur2(r.senza, l)],
        [T(l, 'Differenza al mese', 'Difference per month'), eur2(r.differenza, l)],
        ...(rigaLavoratori(l, v, v.isee) ? [rigaLavoratori(l, v, v.isee)!] : []),
        [T(l, 'Totale marzo 2027 - febbraio 2028', 'Total March 2027 - February 2028'), eur(r.annuo, l), true],
      ],
      note: T(l, 'Importi 2026 usati come stima: le soglie 2027 escono a inizio anno con la rivalutazione.', '2026 amounts used as an estimate: the 2027 thresholds are published early in the year.'),
    };
  },
});
