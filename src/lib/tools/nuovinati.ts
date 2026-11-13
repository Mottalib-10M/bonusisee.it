/** Bonus nuovi nati (L. 207/2024 c. 206) : 1.000 €, ISEE fino a 40.000 €, domanda entro 120 giorni. */
import { T, eur, data, MESI, campiIsee, iseeDi, type L } from '../minis/_kit';
import { nuoviNati } from '../engine/index';
import { P } from '../engine/params';
import type { ToolSpec } from '../tool-types';
const pad = (n: number) => String(n).padStart(2, '0');
export default (l: L): ToolSpec => ({
  exemple: T(l, 'Esempio: bimbo nato il 15 ottobre 2026, ISEE di 25.000 €', 'Example: baby born on 15 October 2026, ISEE of €25,000'),
  inputs: [
    { id: 'giorno', label: T(l, 'Giorno di nascita', 'Day of birth'), def: 15, max: 31 },
    { id: 'mese', label: T(l, 'Mese di nascita', 'Month of birth'), def: 10, options: MESI(l) },
    { id: 'anno', label: T(l, 'Anno di nascita', 'Year of birth'), def: 2026, options: ['2025', '2026', '2027'].map((x) => ({ value: x, label: x })) },
    ...campiIsee(l, 25000, T(l, 'ISEE per le prestazioni familiari (senza AUU)', 'ISEE for family benefits (without the allowance)')),
  ],
  run: (v) => {
    const g = Math.min(Math.max(1, Math.round(v.giorno)), new Date(Date.UTC(v.anno, v.mese, 0)).getUTCDate());
    const nascita = `${v.anno}-${pad(v.mese)}-${pad(g)}`;
    const r = nuoviNati(iseeDi(v), nascita);
    return {
      head: [T(l, 'Bonus nuovi nati', 'Newborn bonus'), eur(r.importo, l)],
      sub: T(l, `Domanda entro il ${data(r.termine, l)}`, `Apply by ${data(r.termine, l)}`),
      alert: !r.sotto ? T(l, `Serve un ISEE fino a ${eur(P.nuovi_nati.soglia, l)}: senza ISEE il bonus non spetta.`, `You need an ISEE up to ${eur(P.nuovi_nati.soglia, l)}: without one there is no bonus.`) : undefined,
      rows: [
        [T(l, 'Data di nascita', 'Date of birth'), data(nascita, l)],
        [T(l, 'Ultimo giorno per la domanda', 'Last day to apply'), data(r.termine, l), true],
        [T(l, 'Soglia ISEE', 'ISEE limit'), eur(P.nuovi_nati.soglia, l)],
      ],
      ics: r.spetta ? [{ date: r.termine, summary: T(l, 'Ultimo giorno domanda bonus nuovi nati (INPS)', 'Last day for the newborn bonus application (INPS)') }] : undefined,
      note: T(l, 'Una domanda per ogni figlio, sul sito INPS, al Contact Center o con un patronato.', 'One application per child, on the INPS website, via the contact centre or a patronato.'),
    };
  },
});
