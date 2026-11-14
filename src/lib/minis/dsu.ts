/** Mese della DSU 2027 e arretrati dell'assegno unico. */
import { T, eur, MESI, type L } from './_kit';
import { rinnovoAuu } from '../engine/index';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Se presenti la DSU 2027 in ritardo', 'If you file the 2027 DSU late'),
  cta: T(l, 'Il calcolo completo per il 2027', 'The full 2027 calculation'),
  exemple: T(l, 'Esempio: ISEE di 20.000 €, due figli, DSU a settembre', 'Example: €20,000 ISEE, two children, DSU in September'),
  inputs: [
    { id: 'mese', label: T(l, 'Mese della DSU 2027 (la dichiarazione per l’ISEE)', 'Month of the 2027 DSU'), def: 9, options: MESI(l) },
    { id: 'isee', label: T(l, 'ISEE atteso', 'Expected ISEE'), def: 20000, unit: '€', max: 200000 },
  ],
  run: (v) => {
    const r = rinnovoAuu({ isee: v.isee, minori: 2, under1: 0, tra1e3: 0, maggiorenni: 0, entrambiLavorano: false, madreUnder21: false }, v.mese);
    return {
      head: [T(l, 'Perdita stimata, due figli', 'Estimated loss, two children'), eur(r.perdita, l)],
      rows: [[T(l, 'Arretrati da marzo', 'Arrears from March'), r.arretrati ? T(l, 'sì', 'yes') : 'no'], [T(l, 'Mesi pagati al minimo', 'Months at the minimum'), String(r.mesiMinimo)]],
    };
  },
});
