/** Con questo ISEE, quali soglie restano sotto ? Une ligne par seuil compté (testeurs naïfs du 2026-11-14 : « 4 / 6 » avec 4 lignes). */
import { T, eur, type L } from './_kit';
import { P } from '../engine/params';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Sotto quali soglie sta il tuo ISEE', 'Which limits your ISEE is under'),
  cta: T(l, 'A cosa ho diritto, misura per misura', 'What I am entitled to, measure by measure'),
  // Même ISEE que le calculateur principal de l'accueil (18.000 €).
  exemple: T(l, 'Esempio con ISEE di 18.000 €, come il calcolo in cima alla pagina', 'Example with a €18,000 ISEE, as in the calculator at the top of the page'),
  inputs: [{ id: 'isee', label: T(l, 'Il tuo ISEE', 'Your ISEE'), def: 18000, unit: '€', max: 200000 }],
  run: (v) => {
    const s: Array<[number, string, string]> = [
      [P.carta_acquisti.isee_max, 'Carta acquisti', 'Shopping card'],
      [P.adi.isee_max, 'Assegno di inclusione', 'Inclusion allowance'],
      [P.auu.soglia_min, 'Assegno unico, importo pieno', 'Child allowance, full amount'],
      [P.nido.fascia1_soglia, 'Bonus nido 3.000 € (nati prima del 2024)', 'Nursery bonus €3,000 (born before 2024)'],
      [P.nuovi_nati.soglia, 'Bonus nuovi nati e bonus nido 3.600 €', 'Newborn bonus and €3,600 nursery bonus'],
      [P.auu.soglia_max, 'Assegno unico sopra il minimo', 'Child allowance above the minimum'],
    ];
    const ok = s.filter(([x]) => v.isee <= x).length;
    const yes = T(l, 'sì', 'yes'), no = T(l, 'no', 'no');
    return {
      head: [T(l, 'Soglie sotto cui stai', 'Limits you are under'), T(l, `${ok} su ${s.length}`, `${ok} of ${s.length}`)],
      rows: s.map(([x, it, en]) => [T(l, `${it} (fino a ${eur(x, l)})`, `${en} (up to ${eur(x, l)})`), v.isee <= x ? yes : no]),
    };
  },
});
