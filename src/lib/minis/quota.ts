/** Assegno unico diviso tra i genitori : 50% ciascuno o 100% con affidamento esclusivo. */
import { T, eur2, type L } from './_kit';
import { auu } from '../engine/index';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Quanto arriva su ciascun conto', 'How much reaches each account'),
  cta: T(l, 'Il calcolo completo dell’assegno', 'The full allowance calculation'),
  exemple: T(l, 'Esempio: ISEE di 20.000 €, due figli, pagamento diviso a metà', 'Example: €20,000 ISEE, two children, split payment'),
  inputs: [
    { id: 'isee', label: T(l, 'ISEE (0 se non ce l’hai)', 'ISEE (0 if you have none)'), def: 20000, unit: '€', max: 200000 },
    { id: 'minori', label: T(l, 'Figli minorenni', 'Children under 18'), def: 2, max: 12 },
    { id: 'split', label: T(l, 'Come è pagato', 'How it is paid'), def: 1, options: [{ value: '0', label: T(l, 'Tutto al richiedente', 'All to the applicant') }, { value: '1', label: T(l, 'Metà a ciascun genitore', 'Half to each parent') }] },
  ],
  run: (v) => {
    const r = auu({ isee: v.isee > 0 ? v.isee : null, minori: v.minori, under1: 0, tra1e3: 0, maggiorenni: 0, entrambiLavorano: false, madreUnder21: false });
    const q = v.split === 1 ? r.mensile / 2 : r.mensile;
    return {
      head: [T(l, 'Accredito per genitore, al mese', 'Credit per parent, per month'), eur2(q, l)],
      rows: [[T(l, 'Assegno del nucleo', 'Household allowance'), eur2(r.mensile, l)], [T(l, 'Conti che ricevono', 'Accounts paid'), v.split === 1 ? '2' : '1']],
    };
  },
});
