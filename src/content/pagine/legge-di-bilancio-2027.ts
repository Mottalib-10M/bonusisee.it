import { defineGuide } from '../../lib/guide-types';

const es = { figli: 3, etaPiuPiccolo: 2, mesi: 12, cdi: true, reddito: 30000 };

export default defineGuide({
  id: 'legge-di-bilancio-2027',
  group: 'manovra',
  order: 1,
  tool: 'manovra',
  related: ['bonus-mamme', 'bonus-nuovi-nati', 'assegno-unico-2027', 'isee-2027'],
  sources: ['ddl2027', 'l199', 'inpsMamme'],
  it: {
    slug: 'legge-di-bilancio-2027',
    nav: 'Legge di bilancio 2027',
    card: 'Bonus mamme a 100 euro, fondo per i nati dal 2027, congedo all’80% più lungo: cosa cambia se il DDL passa.',
    title: 'Legge di bilancio 2027: bonus famiglie nel DDL, cosa cambia',
    description: 'Legge di bilancio 2027 per le famiglie: nel DDL bonus mamme a 100 euro al mese, fondo da 100 euro l’anno per i nati dal 2027, congedo all’80% più lungo.',
    h1: 'Legge di bilancio 2027: cosa cambia per le famiglie',
    intro: 'La legge di bilancio 2027 è ancora un disegno di legge: il simulatore stima quanto riceverebbe la tua famiglia con il testo presentato, confrontandolo con le regole in vigore nel 2026.',
    resume: (h) => {
      const D = h.P.ddl2027;
      const r = h.M.manovra2027(es, 1, 500);
      return `Il disegno di legge di bilancio 2027 è stato presentato al Parlamento a ottobre 2026 e deve essere approvato entro il ${h.date(D.voto_atteso)}: tutte le cifre di questa pagina sono del DDL e possono cambiare. Per le famiglie il testo contiene quattro misure. L’articolo 57 porta il bonus mamme da ${h.eur(h.P.mamme2026.mensile)} a ${h.eur(D.mamme_mensile)} al mese, pagato ogni tre mesi, e lo estende alle madri con tre o più figli assunte a tempo indeterminato. L’articolo 58 crea un fondo per i nati dal ${h.date(D.valore_nuovi_nati_dal)}: lo Stato versa ${h.eur(D.valore_nuovi_nati_annuo)} all’anno fino ai ${h.num(D.valore_nuovi_nati_eta)} anni, e i versamenti di parenti danno una detrazione del ${h.pct(D.detrazione_versamenti, 0)} fino a ${h.eur(D.detrazione_versamenti_max)} all’anno. L’articolo 59 allunga il congedo parentale pagato all’80 per cento, l’articolo 60 prevede per i genitori lavoratori autonomi un contributo fino a ${h.eur(D.voucher_autonomi_mensile)} al mese per i servizi per l’infanzia, al termine del congedo. Una madre di tre figli, assunta a tempo indeterminato, con un bimbo in arrivo nel 2027, avrebbe circa ${h.eur(r.differenzaMamme + r.fondo + r.detrazione)} in più nel primo anno.`;
    },
    faqs: (h) => [
      { q: 'Quando diventa legge la manovra 2027?', a: `La legge di bilancio deve essere approvata dalle due Camere e pubblicata in Gazzetta Ufficiale entro il ${h.date(h.P.ddl2027.voto_atteso)}, per entrare in vigore dal 1° gennaio 2027. Durante l’esame parlamentare gli emendamenti possono cambiare importi e requisiti: questo sito aggiorna i calcoli dopo il voto finale, sul testo pubblicato.` },
      { q: 'Come funziona il fondo per i nuovi nati?', a: `Secondo l’articolo 58 del DDL, per ogni bambino nato dal ${h.date(h.P.ddl2027.valore_nuovi_nati_dal)} lo Stato versa ${h.eur(h.P.ddl2027.valore_nuovi_nati_annuo)} all’anno su un conto dedicato fino ai ${h.num(h.P.ddl2027.valore_nuovi_nati_eta)} anni. Genitori, nonni e altri parenti possono aggiungere versamenti, con una detrazione del 19 per cento fino a 1.000 euro all’anno. A 18 anni la somma può confluire in una pensione complementare.` },
      { q: 'Cosa cambia per il congedo parentale?', a: 'Oggi tre mesi di congedo parentale sono pagati all’80 per cento della retribuzione. L’articolo 59 del DDL aggiunge uno, due o tre mesi all’80 per cento secondo i casi, portando il totale a quattro, cinque o sei mesi, per i congedi che terminano dopo il 31 dicembre 2026. Le regole di dettaglio arriveranno con le circolari INPS dopo l’approvazione.' },
      { q: 'La manovra 2027 cambia assegno unico e ISEE?', a: 'Il testo presentato non modifica gli importi o le soglie dell’assegno unico, né le regole dell’ISEE introdotte dal comma 208 della legge n. 199 del 2025, che restano in vigore. Per l’assegno unico nel 2027 conta quindi soprattutto presentare la nuova DSU entro giugno, per non perdere gli arretrati da marzo.' },
    ],
    body: (h) => {
      const D = h.P.ddl2027;
      const righe = [
        ['Bonus mamme (art. 57)', `${h.eur(h.P.mamme2026.mensile)} al mese, pagati a dicembre`, `${h.eur(D.mamme_mensile)} al mese, ogni tre mesi`],
        ['Fondo nuovi nati (art. 58)', 'non esiste', `${h.eur(D.valore_nuovi_nati_annuo)} all’anno fino a ${h.num(D.valore_nuovi_nati_eta)} anni`],
        ['Congedo all’80% (art. 59)', `${h.num(D.congedo_80_attuale_mesi)} mesi`, `${D.congedo_80_mesi.map((x: number) => h.num(x)).join(', ')} mesi secondo i casi`],
        ['Voucher infanzia autonomi (art. 60)', 'non esiste', `fino a ${h.eur(D.voucher_autonomi_mensile)} al mese per ${h.num(D.voucher_autonomi_mesi)} mesi`],
      ];
      return `<h2>Legge di bilancio 2027: le misure del DDL per le famiglie</h2>
<p>La tabella confronta le regole in vigore con il ${h.src('ddl2027', 'testo del disegno di legge di bilancio 2027')} pubblicato dalla Ragioneria generale dello Stato. Le cifre della colonna di destra non sono ancora legge.</p>
${h.table(['Misura', 'Nel 2026', 'Dal 2027 secondo il DDL'], righe, 'Misure per le famiglie: regole 2026 e disegno di legge di bilancio 2027, non ancora votato', ['l', 'l', 'l'])}
<h2>Il bonus mamme da 60 a 100 euro</h2>
<p>Il bonus del 2026 è previsto dal comma 207 della ${h.src('l199', 'legge n. 199 del 2025')} e la ${h.src('inpsMamme', 'scheda INPS')} ne fissa la domanda entro il ${h.date(h.P.mamme2026.domanda_entro)}. Il DDL lo porta a ${h.eur(D.mamme_mensile)} al mese con pagamento trimestrale e abroga l’esonero contributivo per le madri con tre o più figli a tempo indeterminato, che rientrano così nel bonus. Il calcolo per il 2026 è nella pagina sul ${h.a('bonus-mamme', 'bonus mamme')}.</p>
<h2>Cosa resta uguale nel 2027</h2>
<p>Il DDL non tocca l’${h.a('assegno-unico-2027', 'assegno unico')}, il bonus asilo nido e il ${h.a('bonus-nuovi-nati', 'bonus nuovi nati')} da ${h.eur(h.P.nuovi_nati.importo)}, che continua per i nati del 2027 e si somma al nuovo fondo. Quando la legge sarà pubblicata in Gazzetta Ufficiale, questa pagina passerà dalle cifre del DDL a quelle definitive.</p>`;
    },
  },
  en: {
    slug: '2027-budget-families',
    nav: '2027 budget law',
    card: 'Working-mothers bonus at €100, a fund for children born from 2027, longer 80% parental leave: what changes if the bill passes.',
    title: 'Legge di bilancio 2027: family measures in the budget bill',
    description: 'Legge di bilancio 2027 for families: the bill sets the mothers’ bonus at €100 a month, €100 a year for babies born from 2027 and longer 80% parental leave.',
    h1: 'Legge di bilancio 2027: what changes for families',
    intro: 'The legge di bilancio 2027 is still a bill: the calculator estimates what your family would get under the text presented, compared with the rules in force in 2026.',
    resume: (h) => {
      const D = h.P.ddl2027;
      const r = h.M.manovra2027(es, 1, 500);
      return `The 2027 budget bill was presented to Parliament in October 2026 and must be approved by ${h.date(D.voto_atteso)}: every figure on this page comes from the bill and may change. For families the text holds four measures. Article 57 raises the working-mothers bonus from ${h.eur(h.P.mamme2026.mensile)} to ${h.eur(D.mamme_mensile)} a month, paid every three months, and extends it to mothers of three or more on permanent contracts. Article 58 creates a fund for children born from ${h.date(D.valore_nuovi_nati_dal)}: the state pays in ${h.eur(D.valore_nuovi_nati_annuo)} a year until age ${h.num(D.valore_nuovi_nati_eta)}, and payments by relatives earn a ${h.pct(D.detrazione_versamenti, 0)} tax deduction on up to ${h.eur(D.detrazione_versamenti_max)} a year. Article 59 extends parental leave paid at 80 per cent, and article 60 gives self-employed parents up to ${h.eur(D.voucher_autonomi_mensile)} a month towards childcare services once their leave ends. A mother of three on a permanent contract, with a baby due in 2027, would get about ${h.eur(r.differenzaMamme + r.fondo + r.detrazione)} more in the first year.`;
    },
    faqs: (h) => [
      { q: 'When does the 2027 budget become law?', a: `The budget law must be passed by both chambers and published in the Official Gazette by ${h.date(h.P.ddl2027.voto_atteso)} to take effect from 1 January 2027. During the parliamentary debate amendments can change amounts and conditions: this site updates its calculations after the final vote, on the published text.` },
      { q: 'How does the fund for newborns work?', a: `Under article 58 of the bill, for every child born from ${h.date(h.P.ddl2027.valore_nuovi_nati_dal)} the state pays ${h.eur(h.P.ddl2027.valore_nuovi_nati_annuo)} a year into a dedicated account until age ${h.num(h.P.ddl2027.valore_nuovi_nati_eta)}. Parents, grandparents and other relatives can add payments, with a 19 per cent tax deduction on up to €1,000 a year. At 18 the money can move into a supplementary pension.` },
      { q: 'What changes for parental leave?', a: 'Today three months of parental leave are paid at 80 per cent of pay. Article 59 of the bill adds one, two or three months at 80 per cent depending on the case, for a total of four, five or six months, for leave ending after 31 December 2026. Detailed rules will follow in INPS circulars after approval.' },
      { q: 'Does the 2027 budget change the child allowance or ISEE?', a: 'The text presented does not change child-allowance amounts or limits, nor the ISEE rules brought in by paragraph 208 of Law 199 of 2025, which remain in force. For the child allowance in 2027 what matters most is filing the new DSU by June, so as not to lose arrears from March.' },
    ],
    body: (h) => {
      const D = h.P.ddl2027;
      const righe = [
        ['Working-mothers bonus (art. 57)', `${h.eur(h.P.mamme2026.mensile)} a month, paid in December`, `${h.eur(D.mamme_mensile)} a month, every three months`],
        ['Newborn fund (art. 58)', 'does not exist', `${h.eur(D.valore_nuovi_nati_annuo)} a year until ${h.num(D.valore_nuovi_nati_eta)}`],
        ['Leave at 80% (art. 59)', `${h.num(D.congedo_80_attuale_mesi)} months`, `${D.congedo_80_mesi.map((x: number) => h.num(x)).join(', ')} months depending on the case`],
        ['Childcare voucher, self-employed (art. 60)', 'does not exist', `up to ${h.eur(D.voucher_autonomi_mensile)} a month for ${h.num(D.voucher_autonomi_mesi)} months`],
      ];
      return `<h2>Legge di bilancio 2027: the bill’s family measures</h2>
<p>The table compares the rules in force with the ${h.src('ddl2027', 'text of the 2027 budget bill')} published by the State General Accounting Office. The figures in the right-hand column are not law yet.</p>
${h.table(['Measure', 'In 2026', 'From 2027 under the bill'], righe, 'Family measures: 2026 rules and the 2027 budget bill, not yet voted', ['l', 'l', 'l'])}
<h2>The working-mothers bonus from €60 to €100</h2>
<p>The 2026 bonus comes from paragraph 207 of ${h.src('l199', 'Law 199 of 2025')} and the ${h.src('inpsMamme', 'INPS page')} sets the claim deadline at ${h.date(h.P.mamme2026.domanda_entro)}. The bill raises it to ${h.eur(D.mamme_mensile)} a month paid quarterly and repeals the contribution relief for mothers of three or more on permanent contracts, who thus come within the bonus. The 2026 calculation is on the ${h.a('bonus-mamme', 'working-mothers bonus')} page.</p>
<h2>What stays the same in 2027</h2>
<p>The bill does not touch the ${h.a('assegno-unico-2027', 'child allowance')}, the nursery bonus or the ${h.eur(h.P.nuovi_nati.importo)} ${h.a('bonus-nuovi-nati', 'newborn bonus')}, which continues for children born in 2027 and adds to the new fund. Once the law is published in the Official Gazette, this page will switch from the bill’s figures to the final ones.</p>`;
    },
  },
});
