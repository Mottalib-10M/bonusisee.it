/** Con questo ISEE, quali soglie restano sotto ? */
import { T, eur, type L } from './_kit';
import { P } from '../engine/params';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Sotto quali soglie sta il tuo ISEE', 'Which limits your ISEE is under'),
  cta: T(l, 'A cosa ho diritto, misura per misura', 'What I am entitled to, measure by measure'),
  exemple: T(l, 'Esempio con ISEE di 12.000 €', 'Example with a €12,000 ISEE'),
  inputs: [{ id: 'isee', label: T(l, 'Il tuo ISEE', 'Your ISEE'), def: 12000, unit: '€', max: 200000 }],
  run: (v) => {
    const s = [P.carta_acquisti.isee_max, P.adi.isee_max, P.auu.soglia_min, P.nido.fascia1_soglia, P.nuovi_nati.soglia, P.auu.soglia_max];
    const ok = s.filter((x) => v.isee <= x).length;
    const yes = T(l, 'sì', 'yes'), no = T(l, 'no', 'no');
    return {
      head: [T(l, 'Soglie rispettate', 'Limits met'), `${ok} / ${s.length}`],
      rows: [
        [T(l, `Carta acquisti (${eur(P.carta_acquisti.isee_max, l)})`, `Shopping card (${eur(P.carta_acquisti.isee_max, l)})`), v.isee <= P.carta_acquisti.isee_max ? yes : no],
        [T(l, `Assegno di inclusione (${eur(P.adi.isee_max, l)})`, `Inclusion allowance (${eur(P.adi.isee_max, l)})`), v.isee <= P.adi.isee_max ? yes : no],
        [T(l, `Assegno unico pieno (${eur(P.auu.soglia_min, l)})`, `Full child allowance (${eur(P.auu.soglia_min, l)})`), v.isee <= P.auu.soglia_min ? yes : no],
        [T(l, `Nido e nuovi nati (${eur(P.nuovi_nati.soglia, l)})`, `Nursery and newborn (${eur(P.nuovi_nati.soglia, l)})`), v.isee <= P.nuovi_nati.soglia ? yes : no],
      ],
    };
  },
});
