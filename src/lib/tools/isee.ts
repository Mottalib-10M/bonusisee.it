/** Stima dell'ISEE ordinario e di quello per le prestazioni familiari (DPCM 159/2013, L. 199/2025 c. 208). */
import { T, eur, num, yn, type L } from '../minis/_kit';
import { isee } from '../engine/index';
import type { ToolSpec } from '../tool-types';
export default (l: L): ToolSpec => ({
  exemple: T(l, 'Esempio: due genitori dipendenti, due figli, casa in affitto', 'Example: two employed parents, two children, renting'),
  inputs: [
    { id: 'componenti', label: T(l, 'Persone nel nucleo familiare', 'People in the household'), def: 4, max: 12 },
    { id: 'figli', label: T(l, 'Di cui figli', 'Of whom children'), def: 2, max: 10 },
    { id: 'reddito', label: T(l, 'Redditi lordi da lavoro dipendente (anno 2024 per la DSU 2026)', 'Gross employment income (2024 for a 2026 DSU)'), def: 38000, unit: '€', max: 1000000 },
    { id: 'affitto', label: T(l, 'Affitto annuo registrato (0 se casa tua)', 'Registered annual rent (0 if you own)'), def: 7800, unit: '€', max: 100000 },
    { id: 'mobiliare', label: T(l, 'Conti, depositi e investimenti', 'Bank balances, savings and investments'), def: 12000, unit: '€', max: 5000000 },
    { id: 'casa', label: T(l, 'Valore IMU della casa in cui vivi, meno il mutuo', 'IMU value of your home, minus the mortgage'), def: 0, unit: '€', max: 5000000 },
    { id: 'minori', label: T(l, 'Ci sono figli minorenni?', 'Any children under 18?'), def: 1, options: yn(l), avance: true },
    { id: 'lavoro', label: T(l, 'Entrambi i genitori hanno lavorato 6 mesi (o genitore solo)?', 'Both parents worked 6 months (or a single parent)?'), def: 1, options: yn(l), avance: true },
    { id: 'under3', label: T(l, 'Un figlio ha meno di 3 anni?', 'A child under 3?'), def: 0, options: yn(l), avance: true },
    { id: 'percettori', label: T(l, 'Persone con reddito da lavoro dipendente', 'People with employment income'), def: 2, max: 6, avance: true },
    { id: 'pensione', label: T(l, 'Pensioni lorde del nucleo', 'Household gross pensions'), def: 0, unit: '€', max: 1000000, avance: true },
    { id: 'altri', label: T(l, 'Altri redditi (autonomo, affitti incassati)', 'Other income (self-employed, rent received)'), def: 0, unit: '€', max: 1000000, avance: true },
    { id: 'immobili', label: T(l, 'Altri immobili (valore IMU)', 'Other property (IMU value)'), def: 0, unit: '€', max: 10000000, avance: true },
    { id: 'disabili', label: T(l, 'Componenti con disabilità media, grave o non autosufficienti', 'Members with a medium or severe disability'), def: 0, max: 6, avance: true },
    { id: 'metro', label: T(l, 'Vivi in un capoluogo di città metropolitana?', 'Do you live in a metropolitan-city capital?'), def: 0, options: yn(l), avance: true },
  ],
  run: (v) => {
    const r = isee({ componenti: Math.max(1, v.componenti), figli: Math.min(v.figli, v.componenti), minori: v.minori === 1 && v.figli > 0, under3: v.under3 === 1, lavoro: v.lavoro === 1, disabili: v.disabili, redditoDip: v.reddito, percettoriDip: v.percettori, redditoPensione: v.pensione, altriRedditi: v.altri, affitto: v.affitto, mobiliare: v.mobiliare, casa: v.casa, altriImmobili: v.immobili, metro: v.metro === 1 });
    return {
      head: [T(l, 'ISEE stimato per assegno unico e bonus famiglia', 'Estimated ISEE for the child allowance and family bonuses'), eur(r.iseeFam, l)],
      sub: T(l, `ISEE ordinario stimato: ${eur(r.isee, l)}`, `Estimated standard ISEE: ${eur(r.isee, l)}`),
      rows: [
        [T(l, 'Indicatore dei redditi (ISR)', 'Income indicator (ISR)'), eur(r.isr, l)],
        [T(l, 'Patrimonio contato (ISP, prestazioni familiari)', 'Assets counted (ISP, family benefits)'), eur(r.ispFam, l)],
        [T(l, 'Scala di equivalenza (prestazioni familiari)', 'Equivalence scale (family benefits)'), num(r.scalaFam, l, 2)],
        [T(l, 'Scala di equivalenza ordinaria', 'Standard equivalence scale'), num(r.scala, l, 2)],
      ],
      note: T(l, 'Stima indicativa: fa fede l’attestazione rilasciata dall’INPS dopo la DSU.', 'Indicative estimate: only the certificate INPS issues after the DSU counts.'),
    };
  },
});
