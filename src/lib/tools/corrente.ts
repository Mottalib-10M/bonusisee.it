/** ISEE corrente (art. 9 DPCM 159/2013) : variazione dei redditi oltre il 25% e stima del nuovo valore. */
import { T, eur, pct, yn, type L } from '../minis/_kit';
import { iseeCorrente } from '../engine/index';
import type { ToolSpec } from '../tool-types';
export default (l: L): ToolSpec => ({
  exemple: T(l, 'Esempio: famiglia di tre persone, redditi scesi da 30.000 a 20.000 €', 'Example: three-person household, income down from €30,000 to €20,000'),
  inputs: [
    { id: 'isee', label: T(l, 'ISEE ordinario attuale', 'Current standard ISEE'), def: 15000, unit: '€', max: 200000 },
    { id: 'componenti', label: T(l, 'Persone nel nucleo', 'People in the household'), def: 3, max: 12 },
    { id: 'dsu', label: T(l, 'Redditi del nucleo nella DSU', 'Household income in the DSU'), def: 30000, unit: '€', max: 1000000 },
    { id: 'ultimi', label: T(l, 'Redditi degli ultimi 12 mesi', 'Income over the last 12 months'), def: 20000, unit: '€', max: 1000000 },
    { id: 'perso', label: T(l, 'Hai perso il lavoro o un trattamento?', 'Have you lost a job or a benefit?'), def: 0, options: yn(l) },
  ],
  run: (v) => {
    const r = iseeCorrente(v.isee, Math.max(1, v.componenti), v.dsu, v.ultimi);
    const ok = r.ammesso || v.perso === 1;
    return {
      head: [T(l, 'ISEE corrente stimato', 'Estimated current ISEE'), ok ? eur(r.stima, l) : T(l, 'Non richiedibile', 'Not available')],
      sub: T(l, `Variazione dei redditi: ${pct(Math.max(0, r.variazione), l, 0)}`, `Change in income: ${pct(Math.max(0, r.variazione), l, 0)}`),
      alert: ok ? undefined : T(l, 'Serve un calo dei redditi oltre il 25% o la perdita del lavoro.', 'You need an income drop above 25% or a lost job.'),
      rows: [
        [T(l, 'ISEE attuale', 'Current ISEE'), eur(v.isee, l)],
        [T(l, 'Calo dei redditi', 'Income drop'), eur(Math.max(0, v.dsu - v.ultimi), l)],
        [T(l, 'Durata dell’ISEE corrente', 'Validity of the current ISEE'), T(l, `${r.validitaMesi} mesi`, `${r.validitaMesi} months`)],
      ],
      note: T(l, 'Stima che sostituisce solo i redditi: patrimonio e scala restano quelli della DSU.', 'An estimate that replaces income only: assets and scale stay as in the DSU.'),
    };
  },
});
