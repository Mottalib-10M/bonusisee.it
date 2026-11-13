/** « A cosa ho diritto » : assegno unico, nido, nuovi nati, bonus mamme, carta acquisti e ADI per una famiglia, 2026 e DDL 2027. */
import { T, eur, yn, campiIsee, iseeDi, type L } from '../minis/_kit';
import { auu, nido, nuoviNati, mamme, cartaAcquisti, adiPossibile } from '../engine/index';
import { P } from '../engine/params';
import type { ToolSpec } from '../tool-types';
/** Età del più piccolo : 0 = nato nel 2026, 1, 2, 5 = da 3 a 9 anni, 12 = da 10 a 17 anni. */
const ETA = [0, 1, 2, 5, 12];
export default (l: L): ToolSpec => ({
  exemple: (v) => T(l, `Esempio: ${v.minori} figli, ISEE di ${eur(v.isee, l)}, madre lavoratrice`, `Example: ${v.minori} children, ISEE of ${eur(v.isee, l)}, working mother`),
  inputs: [
    ...campiIsee(l, 18000),
    { id: 'minori', label: T(l, 'Figli minorenni', 'Children under 18'), def: 2, max: 12 },
    { id: 'piccolo', label: T(l, 'Età del figlio più piccolo', 'Age of the youngest child'), def: 1, options: [
      { value: '0', label: T(l, 'Nato nel 2026', 'Born in 2026') }, { value: '1', label: T(l, '1 anno', '1 year') }, { value: '2', label: T(l, '2 anni', '2 years') },
      { value: '3', label: T(l, 'Da 3 a 9 anni', '3 to 9 years') }, { value: '4', label: T(l, 'Da 10 a 17 anni', '10 to 17 years') }] },
    { id: 'mamma', label: T(l, 'La madre lavora? Mesi di lavoro nel 2026', 'Does the mother work? Months worked in 2026'), def: 12, max: 12 },
    { id: 'lavorano', label: T(l, 'Lavorano entrambi i genitori?', 'Do both parents work?'), def: 1, options: yn(l), avance: true },
    { id: 'nido', label: T(l, 'Il più piccolo va al nido (retta mensile)', 'The youngest attends a nursery (monthly fee)'), def: 0, unit: '€', max: 3000, avance: true },
    { id: 'maggiorenni', label: T(l, 'Figli 18-20 anni a carico', 'Dependent children aged 18-20'), def: 0, max: 6, avance: true },
    { id: 'reddito', label: T(l, 'Reddito da lavoro della madre', 'Mother’s earned income'), def: 22000, unit: '€', max: 1000000, avance: true },
    { id: 'cdi', label: T(l, 'Madre a tempo indeterminato?', 'Mother on a permanent contract?'), def: 0, options: yn(l), avance: true },
    { id: 'over65', label: T(l, 'Over 70 nel nucleo, con trattamenti annui fino a', 'Over-70 in the household, with annual benefits up to'), def: 0, unit: '€', max: 100000, avance: true },
  ],
  run: (v) => {
    const i = iseeDi(v);
    const eta = ETA[v.piccolo] ?? 5;
    const figli = v.minori + v.maggiorenni;
    const a = auu({ isee: i, minori: v.minori, under1: eta === 0 && v.minori > 0 ? 1 : 0, tra1e3: (eta === 1 || eta === 2) && v.minori > 0 ? 1 : 0, maggiorenni: v.maggiorenni, entrambiLavorano: v.lavorano === 1, madreUnder21: false });
    const n = eta <= 2 && v.nido > 0 ? nido(2026 - eta, i, v.nido, 11) : null;
    const nn = eta === 0 && v.minori > 0 ? nuoviNati(i, '2026-06-01') : null;
    const mm = mamme({ figli, etaPiuPiccolo: eta, mesi: v.mamma, cdi: v.cdi === 1, reddito: v.reddito }, 2026);
    const m27 = mamme({ figli, etaPiuPiccolo: eta + 1, mesi: v.mamma, cdi: v.cdi === 1, reddito: v.reddito }, 2027);
    const ca = eta <= 2 && v.minori > 0 ? cartaAcquisti('bimbo', i, 0) : v.over65 > 0 ? cartaAcquisti('70', i, v.over65) : null;
    const adi = adiPossibile(i);
    const tot = a.annuo + (n?.totale ?? 0) + (nn?.importo ?? 0) + mm.totale + (ca?.annuo ?? 0);
    const no = T(l, 'no', 'no');
    const rows: Array<[string, string] | [string, string, boolean]> = [
      [T(l, 'Assegno unico (12 mesi)', 'Child allowance (12 months)'), eur(a.annuo, l)],
      [T(l, 'Bonus asilo nido', 'Nursery bonus'), n ? eur(n.totale, l) : eta <= 2 ? T(l, 'se va al nido', 'if at nursery') : no],
      [T(l, 'Bonus nuovi nati (una volta)', 'Newborn bonus (one-off)'), nn ? eur(nn.importo, l) : no],
      [T(l, 'Bonus mamme 2026', 'Working-mothers bonus 2026'), eur(mm.totale, l)],
      [T(l, 'Carta acquisti', 'Shopping card'), ca ? eur(ca.annuo, l) : no],
      [T(l, 'Assegno di inclusione', 'Inclusion allowance'), adi ? T(l, 'da verificare', 'worth checking') : no],
      [T(l, 'Bonus mamme 2027 (DDL, non votato)', 'Working-mothers bonus 2027 (bill, not voted)'), eur(m27.totale, l), true],
    ];
    return {
      head: [T(l, 'Totale stimato nel 2026', 'Estimated total for 2026'), eur(tot, l)],
      sub: i === null ? T(l, 'Senza ISEE: assegno unico al minimo, niente nuovi nati né carta acquisti', 'Without an ISEE: minimum allowance, no newborn bonus or shopping card') : T(l, `Con ISEE di ${eur(i, l)}`, `With an ISEE of ${eur(i, l)}`),
      alert: i === null ? T(l, 'Con l’ISEE molti di questi importi salgono: presentare la DSU è gratis.', 'With an ISEE many of these amounts go up: filing the DSU is free.') : undefined,
      rows,
      table: { caption: T(l, 'Soglie ISEE delle misure 2026', '2026 ISEE limits'), headers: [T(l, 'Misura', 'Measure'), T(l, 'Soglia ISEE', 'ISEE limit'), T(l, 'Stato', 'Status')], align: ['l', 'r', 'l'], rows: [
        [T(l, 'Assegno unico, importo pieno', 'Child allowance, full amount'), T(l, `fino a ${eur(P.auu.soglia_min, l, 2)}`, `up to ${eur(P.auu.soglia_min, l, 2)}`), T(l, 'in vigore', 'in force')],
        [T(l, 'Bonus nido 3.600 €', 'Nursery bonus €3,600'), T(l, `fino a ${eur(P.nido.nuovi_soglia, l)}`, `up to ${eur(P.nido.nuovi_soglia, l)}`), T(l, 'in vigore', 'in force')],
        [T(l, 'Bonus nuovi nati', 'Newborn bonus'), T(l, `fino a ${eur(P.nuovi_nati.soglia, l)}`, `up to ${eur(P.nuovi_nati.soglia, l)}`), T(l, 'in vigore', 'in force')],
        [T(l, 'Assegno di inclusione', 'Inclusion allowance'), T(l, `fino a ${eur(P.adi.isee_max, l)}`, `up to ${eur(P.adi.isee_max, l)}`), T(l, 'in vigore', 'in force')],
        [T(l, 'Carta acquisti', 'Shopping card'), T(l, `fino a ${eur(P.carta_acquisti.isee_max, l, 2)}`, `up to ${eur(P.carta_acquisti.isee_max, l, 2)}`), T(l, 'in vigore', 'in force')],
        [T(l, 'Bonus mamme', 'Working-mothers bonus'), T(l, 'nessuna (reddito fino a 40.000 €)', 'none (income up to €40,000)'), T(l, '2026 in vigore, 2027 DDL', '2026 in force, 2027 bill')],
      ] },
      note: T(l, 'Stima indicativa sui testi in vigore e sul DDL di bilancio 2027: decidono INPS, MEF e Comuni.', 'Indicative estimate based on the rules in force and the 2027 budget bill: INPS, the Ministry and comuni decide.'),
    };
  },
});
