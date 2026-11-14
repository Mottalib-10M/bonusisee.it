/** Calendario ISEE e bonus 2026-2027 : le date di legge e di prassi INPS che riguardano la famiglia, in .ics. */
import { T, data, yn, type L } from '../minis/_kit';
import { P } from '../engine/params';
import type { ToolSpec } from '../tool-types';
interface Evento { d: string; it: string; en: string; per: 'tutti' | 'figli' | 'mamma' | 'dedicata' }
const D = P.date;
const EVENTI: Evento[] = [
  { d: D.dedicata_primo_pagamento, it: 'Carta Dedicata a te: ultimo giorno per il primo pagamento, poi la carta si blocca', en: 'Carta Dedicata a te: last day for the first payment, after that the card is blocked', per: 'dedicata' },
  { d: D.mamme_domanda, it: 'Bonus mamme 2026: ultimo giorno per la domanda INPS', en: 'Working-mothers bonus 2026: last day to apply to INPS', per: 'mamma' },
  { d: D.dsu_2026_scade, it: 'Scade l’ISEE 2026 (DSU valida fino al 31 dicembre)', en: 'The 2026 ISEE expires (DSU valid until 31 December)', per: 'tutti' },
  { d: D.dsu_2027_dal, it: 'Si può presentare la DSU 2027', en: 'The 2027 DSU can be filed', per: 'tutti' },
  { d: D.mamme_domanda_dicembre, it: 'Bonus mamme 2026: domanda per chi matura il requisito a dicembre', en: 'Working-mothers bonus 2026: deadline if eligible from December', per: 'mamma' },
  { d: D.auu_annualita_2027, it: 'Assegno unico: inizia l’annualità marzo 2027 - febbraio 2028', en: 'Child allowance: the March 2027 - February 2028 year starts', per: 'figli' },
  { d: D.auu_arretrati_entro, it: 'Assegno unico: ultimo giorno per presentare la DSU (la dichiarazione per l’ISEE) e avere gli arretrati da marzo', en: 'Child allowance: last day to file the DSU (the ISEE form) and get arrears from March', per: 'figli' },
];
export default (l: L): ToolSpec => ({
  exemple: T(l, 'Esempio: famiglia con figli e madre lavoratrice', 'Example: family with children and a working mother'),
  inputs: [
    { id: 'figli', label: T(l, 'Hai figli a carico?', 'Do you have dependent children?'), def: 1, options: yn(l) },
    { id: 'mamma', label: T(l, 'Madre lavoratrice con due o più figli?', 'Working mother with two or more children?'), def: 1, options: yn(l) },
    { id: 'dedicata', label: T(l, 'Hai ricevuto la Carta Dedicata a te?', 'Did you receive the Carta Dedicata a te?'), def: 0, options: yn(l) },
  ],
  run: (v) => {
    const ok = (e: Evento) => e.per === 'tutti' || (e.per === 'figli' && v.figli === 1) || (e.per === 'mamma' && v.mamma === 1) || (e.per === 'dedicata' && v.dedicata === 1);
    const lista = EVENTI.filter(ok).sort((a, b) => a.d.localeCompare(b.d));
    const primo = lista[0];
    return {
      head: [T(l, 'Prima data da segnare', 'First date to note'), primo ? data(primo.d, l) : '-'],
      sub: primo ? T(l, primo.it, primo.en) : undefined,
      rows: [[T(l, 'Date nel tuo calendario', 'Dates in your calendar'), String(lista.length)]],
      table: { caption: T(l, 'Le tue scadenze ISEE e bonus 2026-2027', 'Your ISEE and bonus deadlines 2026-2027'), headers: [T(l, 'Data', 'Date'), T(l, 'Cosa succede', 'What happens')], rows: lista.map((e) => [data(e.d, l), T(l, e.it, e.en)]) },
      ics: lista.map((e) => ({ date: e.d, summary: T(l, e.it, e.en) })),
      note: T(l, 'Date fissate da legge e schede INPS e Poste rilette a novembre 2026.', 'Dates set by law and the INPS and Poste pages reread in November 2026.'),
    };
  },
});
