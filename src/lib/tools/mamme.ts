/** Bonus mamme : 60 € al mese nel 2026 (L. 199/2025 c. 207), 100 € dal 2027 nel DDL di bilancio (art. 57). */
import { T, eur, data, type L } from '../minis/_kit';
import { mamme } from '../engine/index';
import { P } from '../engine/params';
import { campiMamme, mammeInput, motivo } from './_mamme';
import type { ToolSpec } from '../tool-types';
export default (l: L): ToolSpec => ({
  exemple: T(l, 'Esempio: due figli, il più piccolo di 4 anni, 12 mesi di lavoro', 'Example: two children, the youngest aged 4, 12 months worked'),
  inputs: campiMamme(l),
  run: (v) => {
    const a = mamme(mammeInput(v), 2026);
    const b = mamme(mammeInput(v), 2027);
    return {
      head: [T(l, 'Bonus mamme 2026', 'Working-mothers bonus 2026'), eur(a.totale, l)],
      sub: a.spetta ? T(l, `${a.mesi} mesi × ${eur(a.mensile, l)}, pagati a dicembre`, `${a.mesi} months × ${eur(a.mensile, l)}, paid in December`) : T(l, `Non spetta: ${motivo(l, a.motivi[0])}`, `Not due: ${motivo(l, a.motivi[0])}`),
      alert: a.compieNellAnno ? T(l, 'Se il figlio compie il limite di età nell’anno, il bonus si ferma al mese del compleanno.', 'If the child reaches the age limit during the year, the bonus stops in the birthday month.') : undefined,
      rows: [
        [T(l, 'Domanda INPS entro', 'Apply to INPS by'), data(P.mamme2026.domanda_entro, l)],
        [T(l, '2027, se il DDL passa così (100 € al mese)', '2027, if the bill passes as is (€100 a month)'), eur(b.totale, l), true],
        [T(l, 'Differenza 2027 su 2026', '2027 versus 2026'), eur(b.totale - a.totale, l)],
      ],
      note: T(l, 'Il 2027 è un disegno di legge non ancora votato: cifre da confermare alla legge di bilancio.', '2027 is a bill not yet voted: figures to be confirmed by the budget law.'),
    };
  },
});
