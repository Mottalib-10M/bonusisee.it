/** Scala di equivalenza e ISEE da ISE : quanto « pesa » la famiglia. */
import { T, eur, num, yn, type L } from './_kit';
import { scala } from '../engine/index';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Dal reddito all’ISEE in un passaggio', 'From income to ISEE in one step'),
  cta: T(l, 'La stima completa dell’ISEE', 'The full ISEE estimate'),
  exemple: T(l, 'Esempio: 4 persone, 2 figli minori, ISE di 30.000 €', 'Example: 4 people, 2 children, ISE of €30,000'),
  inputs: [
    { id: 'ise', label: T(l, 'ISE (redditi + 20% del patrimonio)', 'ISE (income + 20% of assets)'), def: 30000, unit: '€', max: 2000000 },
    { id: 'componenti', label: T(l, 'Persone nel nucleo', 'People in the household'), def: 4, max: 12 },
    { id: 'figli', label: T(l, 'Figli', 'Children'), def: 2, max: 10 },
    { id: 'lavoro', label: T(l, 'Figli minori e genitori al lavoro?', 'Minor children and working parents?'), def: 1, options: yn(l), avance: true },
  ],
  run: (v) => {
    const base = { componenti: Math.max(1, v.componenti), figli: v.figli, minori: v.figli > 0, under3: false, lavoro: v.lavoro === 1, disabili: 0 };
    const s = scala(base), sf = scala(base, true);
    return {
      head: [T(l, 'ISEE per i bonus famiglia', 'ISEE for family bonuses'), eur(v.ise / sf, l)],
      rows: [[T(l, 'Scala per i bonus famiglia', 'Scale for family bonuses'), num(sf, l, 2)], [T(l, 'ISEE ordinario', 'Standard ISEE'), eur(v.ise / s, l)]],
    };
  },
});
