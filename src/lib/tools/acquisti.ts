/** Carta acquisti (MEF, soglie 2026) : 80 € a bimestre per over 65 e bambini sotto i 3 anni. */
import { T, eur, type L } from '../minis/_kit';
import { cartaAcquisti, type FasciaAcquisti } from '../engine/index';
import { P } from '../engine/params';
import type { ToolSpec } from '../tool-types';
const FASCE: FasciaAcquisti[] = ['bimbo', '65', '70'];
export default (l: L): ToolSpec => ({
  exemple: T(l, 'Esempio: pensionato di 72 anni, ISEE di 7.000 € e 9.500 € di pensione', 'Example: 72-year-old pensioner, ISEE of €7,000 and €9,500 pension'),
  inputs: [
    { id: 'fascia', label: T(l, 'Chi chiede la carta', 'Who applies for the card'), def: 2, options: [
      { value: '0', label: T(l, 'Genitore di un bimbo sotto i 3 anni', 'Parent of a child under 3') },
      { value: '1', label: T(l, 'Persona tra 65 e 69 anni', 'Person aged 65 to 69') },
      { value: '2', label: T(l, 'Persona dai 70 anni', 'Person aged 70 or over') }] },
    { id: 'isee', label: T(l, 'ISEE', 'ISEE'), def: 7000, unit: '€', max: 100000 },
    { id: 'reddito', label: T(l, 'Pensioni e altri trattamenti annui', 'Annual pensions and other benefits'), def: 9500, unit: '€', max: 200000, showIf: (v) => v.fascia !== 0 },
  ],
  run: (v) => {
    const f = FASCE[v.fascia] ?? 'bimbo';
    const r = cartaAcquisti(f, v.isee, v.reddito);
    const C = P.carta_acquisti;
    const sogliaRed = f === '70' ? C.reddito_70_max : C.reddito_65_70_max;
    return {
      head: [T(l, 'Carta acquisti all’anno', 'Shopping card per year'), eur(r.annuo, l)],
      sub: r.spetta ? T(l, `${eur(r.bimestre, l)} ogni due mesi`, `${eur(r.bimestre, l)} every two months`) : T(l, 'Requisiti non raggiunti', 'Requirements not met'),
      alert: !r.iseeOk ? T(l, `L’ISEE supera ${eur(C.isee_max, l, 2)}.`, `The ISEE is above ${eur(C.isee_max, l, 2)}.`) : !r.redditoOk ? T(l, `I trattamenti superano ${eur(sogliaRed, l, 2)}.`, `Benefits are above ${eur(sogliaRed, l, 2)}.`) : undefined,
      rows: [
        [T(l, 'Soglia ISEE 2026', '2026 ISEE limit'), eur(C.isee_max, l, 2)],
        ...(f === 'bimbo' ? [] : [[T(l, 'Soglia trattamenti 2026', '2026 benefits limit'), eur(sogliaRed, l, 2)] as [string, string]]),
        [T(l, 'Ricarica', 'Top-up'), T(l, `${eur(C.bimestre, l)} a bimestre`, `${eur(C.bimestre, l)} every two months`)],
      ],
      note: T(l, 'La domanda si presenta alla posta con il modulo del MEF.', 'You apply at a post office with the Ministry form.'),
    };
  },
});
