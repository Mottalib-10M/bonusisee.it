/** Legge di bilancio 2027 per le famiglie (DDL, artt. 57-58) : cosa cambierebbe rispetto al 2026. */
import { T, eur, data, type L } from '../minis/_kit';
import { manovra2027 } from '../engine/index';
import { P } from '../engine/params';
import { campiMamme, mammeInput } from './_mamme';
import type { ToolSpec } from '../tool-types';
export default (l: L): ToolSpec => ({
  exemple: T(l, 'Esempio: madre lavoratrice con due figli e un neonato atteso nel 2027', 'Example: working mother with two children and a baby due in 2027'),
  inputs: [
    ...campiMamme(l, true),
    { id: 'nati', label: T(l, 'Figli che nasceranno nel 2027', 'Children to be born in 2027'), def: 1, max: 5 },
    { id: 'versamenti', label: T(l, 'Versamenti di nonni e parenti al fondo, all’anno', 'Yearly payments by grandparents and relatives into the fund'), def: 500, unit: '€', max: 100000, avance: true },
  ],
  run: (v) => {
    const r = manovra2027(mammeInput(v), v.nati, v.versamenti);
    const totale = r.differenzaMamme + r.fondo + r.detrazione;
    return {
      head: [T(l, 'In più nel 2027 se il DDL passa così', 'Extra in 2027 if the bill passes as is'), eur(totale, l)],
      sub: T(l, `Disegno di legge: voto atteso entro il ${data(P.ddl2027.voto_atteso, l)}`, `Bill: vote expected by ${data(P.ddl2027.voto_atteso, l)}`),
      rows: [
        [T(l, 'Bonus mamme 2026', 'Working-mothers bonus 2026'), eur(r.mamme2026, l)],
        [T(l, 'Bonus mamme 2027 (100 € al mese)', 'Working-mothers bonus 2027 (€100 a month)'), eur(r.mamme2027, l)],
        [T(l, 'Fondo «Valore nuovi nati», versamento dello Stato', '«Valore nuovi nati» fund, State payment'), T(l, `${eur(r.fondo, l)} l’anno`, `${eur(r.fondo, l)} a year`)],
        [T(l, 'Fino ai 18 anni', 'Up to age 18'), eur(r.fondo18, l)],
        [T(l, 'Detrazione del 19% sui versamenti dei parenti', '19% tax credit on relatives’ payments'), eur(r.detrazione, l)],
      ],
      note: T(l, 'Il fondo resta bloccato fino ai 18 anni e passa poi a una pensione complementare.', 'The fund stays locked until 18 and then moves to a supplementary pension.'),
    };
  },
});
