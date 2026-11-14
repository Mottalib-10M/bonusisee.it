/** « A cosa ho diritto » : assegno unico, nido, nuovi nati, bonus mamme, carta acquisti e ADI per una famiglia, 2026 e DDL 2027. */
import { T, eur, yn, campiIsee, iseeDi, type L } from '../minis/_kit';
import { auu, nido, nuoviNati, mamme, cartaAcquisti, adiPossibile } from '../engine/index';
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
    { id: 'mamma', label: T(l, 'Mesi di lavoro della mamma nel 2026 (0 se non lavora)', 'Months the mother works in 2026 (0 if she does not work)'), def: 12, max: 12 },
    // Défaut « No » comme sur toutes les pages de l'assegno unico (testeurs naïfs du 2026-11-14) : la maggiorazione s'affiche à part.
    { id: 'lavorano', label: T(l, 'Lavorano entrambi i genitori?', 'Do both parents work?'), def: 0, options: yn(l), avance: true },
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
    const aLav = v.lavorano === 1 ? null : auu({ isee: i, minori: v.minori, under1: eta === 0 && v.minori > 0 ? 1 : 0, tra1e3: (eta === 1 || eta === 2) && v.minori > 0 ? 1 : 0, maggiorenni: v.maggiorenni, entrambiLavorano: true, madreUnder21: false });
    const nidoMax = eta <= 2 && v.minori > 0 ? nido(2026 - eta, i, 1e6, 11).importo : 0;
    const tot = a.annuo + (n?.totale ?? 0) + (nn?.importo ?? 0) + mm.totale + (ca?.annuo ?? 0);
    const no = T(l, 'no', 'no');
    const rows: Array<[string, string] | [string, string, boolean]> = [
      [T(l, 'Assegno unico (12 mesi)', 'Child allowance (12 months)'), eur(a.annuo, l)],
      ...(aLav && aLav.lavoratori > 0 ? [[T(l, 'Non compreso: se lavorano entrambi i genitori (stima)', 'Not included: if both parents work (estimate)'), `+${eur(aLav.lavoratori * 12, l)}`] as [string, string]] : []),
      [T(l, 'Bonus asilo nido', 'Nursery bonus'), n ? eur(n.totale, l) : eta <= 2 ? T(l, `fino a ${eur(nidoMax, l)} se va al nido: scrivi la retta negli altri dati`, `up to ${eur(nidoMax, l)} if at nursery: enter the fee in the other details`) : no],
      [T(l, 'Bonus nuovi nati (una volta)', 'Newborn bonus (one-off)'), nn ? eur(nn.importo, l) : no],
      [T(l, 'Bonus mamme 2026', 'Working-mothers bonus 2026'), eur(mm.totale, l)],
      [T(l, 'Carta acquisti', 'Shopping card'), ca ? eur(ca.annuo, l) : no],
      [T(l, 'Assegno di inclusione', 'Inclusion allowance'), adi ? T(l, 'da verificare', 'worth checking') : no],
      [T(l, 'Bonus mamme 2027 (proposta di legge, non ancora approvata; fuori dal totale)', 'Working-mothers bonus 2027 (bill, not yet passed; not in the total)'), eur(m27.totale, l), true],
    ];
    return {
      head: [T(l, 'Totale stimato nel 2026', 'Estimated total for 2026'), eur(tot, l)],
      sub: i === null ? T(l, 'Senza ISEE: assegno unico al minimo, niente nuovi nati né carta acquisti', 'Without an ISEE: minimum allowance, no newborn bonus or shopping card') : T(l, `Con ISEE di ${eur(i, l)}`, `With an ISEE of ${eur(i, l)}`),
      alert: i === null ? T(l, 'Con l’ISEE molti di questi importi salgono: presentare la DSU, la dichiarazione che serve per avere l’ISEE, è gratis.', 'With an ISEE many of these amounts go up: filing the DSU is free.') : undefined,
      rows,
      // Tableau des seuils retiré du résultat (testeurs naïfs du 2026-11-14 : doublon du tableau « soglie che contano » plus bas).
      note: T(l, 'Stima indicativa sulle regole in vigore e sulla proposta di legge di bilancio 2027: decidono l’INPS, il Ministero dell’Economia e i Comuni.', 'Indicative estimate based on the rules in force and the 2027 budget bill: INPS, the Ministry and comuni decide.'),
    };
  },
});
