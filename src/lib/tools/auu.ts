/** Importo mensile dell'assegno unico 2026 (D.Lgs. 230/2021 art. 4, soglie INPS 2026). `confronto` : con e senza ISEE. */
import { T, eur, eur2, campiIsee, iseeDi, type L } from '../minis/_kit';
import { auu } from '../engine/index';
import { campiFigli, auuInput, rigaLavoratori } from './_figli';
import type { ToolSpec } from '../tool-types';
export default (l: L, opts?: Record<string, unknown>): ToolSpec => ({
  exemple: (v) => (v.hai === 1 ? T(l, `Esempio: ${v.minori} figli minorenni, ISEE di ${eur(v.isee, l)}`, `Example: ${v.minori} children under 18, ISEE of ${eur(v.isee, l)}`) : T(l, `Esempio: ${v.minori} figli minorenni, nessun ISEE`, `Example: ${v.minori} children under 18, no ISEE`)),
  inputs: [...campiIsee(l, opts?.isee ? Number(opts.isee) : 25000).map((i) => (i.id === 'hai' && opts?.senza ? { ...i, def: 0 } : i)), ...campiFigli(l)],
  run: (v) => {
    const i = iseeDi(v);
    const r = auu(auuInput(v, i));
    const min = auu(auuInput(v, null));
    const figli = v.minori + v.maggiorenni;
    const rows: Array<[string, string]> = [
      [T(l, 'Per ogni figlio minorenne', 'Per child under 18'), eur2(r.perMinore, l)],
    ];
    if (v.maggiorenni > 0) rows.push([T(l, 'Per ogni figlio 18-20 anni (stima)', 'Per child aged 18-20 (estimate)'), eur2(r.perMaggiorenne, l)]);
    if (r.oltreSecondo > 0) rows.push([T(l, 'Maggiorazione dal terzo figlio (stima)', 'Third-child supplement (estimate)'), eur2(r.oltreSecondo, l)]);
    if (r.incrementoUnder1 + r.incremento1e3 > 0) rows.push([T(l, 'Più 50% per i bimbi piccoli', '50% extra for young children'), eur2(r.incrementoUnder1 + r.incremento1e3, l)]);
    if (r.lavoratori > 0) rows.push([T(l, 'Genitori entrambi lavoratori (stima)', 'Both parents working (estimate)'), eur2(r.lavoratori, l)]);
    if (r.madre > 0) rows.push([T(l, 'Madre sotto i 21 anni (stima)', 'Mother under 21 (estimate)'), eur2(r.madre, l)]);
    if (r.quattroFigli > 0) rows.push([T(l, 'Quattro o più figli', 'Four or more children'), eur2(r.quattroFigli, l)]);
    const extra = rigaLavoratori(l, v, i);
    if (extra) rows.push(extra);
    rows.push([T(l, 'In un anno (12 mensilità)', 'Over a year (12 payments)'), eur(r.annuo, l)]);
    if (i !== null) rows.push([T(l, 'Senza ISEE (importi minimi)', 'Without an ISEE (minimum amounts)'), `${eur2(min.mensile, l)} ${T(l, 'al mese', 'a month')}`]);
    return {
      head: [T(l, 'Assegno unico stimato al mese', 'Estimated monthly child allowance'), eur2(r.mensile, l)],
      sub: i === null ? T(l, `Senza ISEE: importi minimi per ${figli} figli`, `Without an ISEE: minimum amounts for ${figli} children`) : T(l, `Con ISEE di ${eur(i, l)} e ${figli} figli`, `With an ISEE of ${eur(i, l)} and ${figli} children`),
      alert: i === null && r.mensile > 0 ? T(l, `Con un ISEE basso prenderesti fino a ${eur2(auu(auuInput(v, 0)).mensile - min.mensile, l)} in più al mese.`, `With a low ISEE you could get up to ${eur2(auu(auuInput(v, 0)).mensile - min.mensile, l)} more a month.`) : undefined,
      rows,
      // Pas de tableau ici (testeurs naïfs du 2026-11-14) : la page en a déjà un, plus complet, juste en dessous.
      note: T(l, 'Estremi 203,8 € e 58,3 € confermati da INPS; valori intermedi e maggiorazioni stimati con la rivalutazione 2026. Fa fede l’importo INPS.', 'The €203.80 and €58.30 end points are confirmed by INPS; values in between and supplements are estimated with the 2026 revaluation. The INPS amount prevails.'),
    };
  },
});
