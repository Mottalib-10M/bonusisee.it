import { defineGuide } from '../../lib/guide-types';

const es = { figli: 2, etaPiuPiccolo: 4, mesi: 12, cdi: false, reddito: 22000 };

export default defineGuide({
  id: 'bonus-mamme',
  group: 'bonus',
  order: 3,
  tool: 'mamme',
  related: ['legge-di-bilancio-2027', 'isee-2027', 'assegno-unico-importo', 'bonus-asilo-nido'],
  sources: ['inpsMamme', 'l199', 'ddl2027'],
  it: {
    slug: 'bonus-mamme',
    nav: 'Bonus mamme',
    card: '60 euro per ogni mese di lavoro nel 2026, domanda entro il 31 dicembre; 100 euro dal 2027 se il DDL passa.',
    title: 'Bonus mamme 2026: 60 euro al mese, domanda e requisiti',
    description: 'Bonus mamme 2026: 60 euro per ogni mese di lavoro alle madri con almeno due figli e reddito fino a 40.000 euro, domanda entro il 31 dicembre. Dal 2027 100 euro.',
    h1: 'Bonus mamme 2026: quanto spetta e entro quando chiederlo',
    intro: 'Il bonus mamme 2026 vale 60 euro per ogni mese di lavoro e va chiesto all’INPS entro il 31 dicembre: il simulatore calcola l’importo e mostra quanto cambierebbe nel 2027 con il DDL di bilancio.',
    resume: (h) => {
      const M = h.P.mamme2026;
      const a = h.M.mamme(es, 2026);
      const b = h.M.mamme(es, 2027);
      return `Il comma 207 della legge n. 199 del 2025 riconosce per il 2026 alle lavoratrici madri ${h.eur(M.mensile)} per ogni mese di lavoro, fino a ${h.num(M.mesi_max)} mesi. Spetta a dipendenti, anche del settore pubblico, e autonome iscritte a una gestione previdenziale, escluso il lavoro domestico, con un reddito da lavoro fino a ${h.eur(M.reddito_max)} all’anno. Con due figli spetta fino al mese in cui il secondo compie ${h.num(M.eta_secondo_figlio_max)} anni; con tre o più figli fino ai ${h.num(M.eta_piu_piccolo_max)} anni del più piccolo, ma in questo caso le madri con contratto a tempo indeterminato sono escluse. Le mensilità da gennaio a novembre sono pagate in un’unica soluzione a dicembre. La domanda va presentata all’INPS entro il ${h.date(M.domanda_entro)}, o entro il ${h.date(M.domanda_entro_se_dicembre)} per chi matura i requisiti a dicembre. Una madre con due figli, il più piccolo di 4 anni, e dodici mesi di lavoro riceve ${h.eur(a.totale)}; con l’articolo 57 del DDL di bilancio 2027 riceverebbe ${h.eur(b.totale)} nel 2027.`;
    },
    faqs: (h) => [
      { q: 'Quale reddito conta per il bonus mamme 2026?', a: `No. Il requisito economico è il reddito da lavoro della madre, che non deve superare ${h.eur(h.P.mamme2026.reddito_max)} all’anno; l’ISEE della famiglia non conta. Il bonus non entra nel reddito imponibile, non incide sull’ISEE ed è compatibile con l’assegno unico, come conferma la scheda INPS dell’assegno.` },
      { q: 'Cosa cambia nel 2027?', a: `L’articolo 57 del disegno di legge di bilancio 2027 porta il bonus a ${h.eur(h.P.ddl2027.mamme_mensile)} al mese, pagato ogni tre mesi invece che una volta all’anno, e lo estende alle madri con tre o più figli assunte a tempo indeterminato, abrogando lo sgravio contributivo che le riguardava. È un testo non ancora votato: gli importi possono cambiare fino all’approvazione.` },
      { q: 'Perché con tre figli e un contratto a tempo indeterminato non spetta?', a: 'Perché per il 2026 la legge riserva a queste madri un altro strumento, l’esonero dei contributi previdenziali a loro carico, che il DDL 2027 propone di abrogare. Il bonus da 60 euro va quindi alle madri con due figli, qualunque sia il contratto, e alle madri con tre o più figli con contratti diversi dal tempo indeterminato.' },
      { q: 'Come si conta il mese di lavoro?', a: 'Si conta ogni mese, o frazione di mese, in cui c’è stato un rapporto di lavoro o un’attività autonoma con iscrizione previdenziale. Per i figli che compiono il limite di età nell’anno, il bonus si ferma al mese del compleanno. Il simulatore chiede quindi i mesi di lavoro dell’anno: la scheda INPS indica come trattare i casi particolari, come i contratti iniziati o finiti nel corso del mese.' },
    ],
    body: (h) => {
      const M = h.P.mamme2026;
      const righe = [[2, 4], [2, 9], [3, 12], [4, 17]].map(([f, e]: number[]) => { const a = h.M.mamme({ ...es, figli: f, etaPiuPiccolo: e }, 2026); const b = h.M.mamme({ ...es, figli: f, etaPiuPiccolo: e, cdi: true }, 2027); return [`${f} figli, il più piccolo di ${e} anni`, h.eur(a.totale), h.eur(b.totale)]; });
      return `<h2>Bonus mamme 2026: chi ne ha diritto</h2>
<p>La ${h.src('inpsMamme', 'scheda INPS del nuovo bonus mamme')}, con la circolare n. 106 del 16 ottobre 2026, attua il comma 207 della ${h.src('l199', 'legge n. 199 del 2025')}. Servono almeno due figli, un rapporto di lavoro dipendente o un’attività autonoma con iscrizione previdenziale, escluso il lavoro domestico, e un reddito da lavoro fino a ${h.eur(M.reddito_max)}. Il bonus è esente da imposte e non conta per l’ISEE.</p>
${h.table(['Famiglia (12 mesi di lavoro)', 'Bonus 2026', '2027 secondo il DDL, con contratto a tempo indeterminato'], righe, 'Bonus mamme 2026 per legge e 2027 secondo il disegno di legge di bilancio, non ancora votato', ['l', 'r', 'r'])}
<h2>Bonus mamme: domanda e pagamento</h2>
<p>La domanda si presenta sul sito INPS con SPID, CIE o CNS, tramite il Contact Center o un patronato, entro il ${h.date(M.domanda_entro)}. Le mensilità maturate da gennaio a novembre sono pagate in un’unica soluzione a dicembre; chi matura il diritto a dicembre ha tempo fino al ${h.date(M.domanda_entro_se_dicembre)}. Il ${h.a('isee-2027', 'calendario ISEE 2027')} permette di salvare la scadenza nel telefono.</p>
<h2>Il bonus mamme nel DDL di bilancio 2027</h2>
<p>L’articolo 57 del ${h.src('ddl2027', 'DDL di bilancio 2027')} porta l’importo a ${h.eur(h.P.ddl2027.mamme_mensile)} al mese con pagamento trimestrale e include le madri con contratto a tempo indeterminato. Sono cifre di un testo in discussione: le altre misure sono nella pagina sulla ${h.a('legge-di-bilancio-2027', 'manovra 2027 per le famiglie')}.</p>`;
    },
  },
  en: {
    slug: 'working-mothers-bonus',
    nav: 'Working-mothers bonus',
    card: '€60 for each month worked in 2026, claim by 31 December; €100 from 2027 if the bill passes.',
    title: 'Bonus mamme 2026: €60 a month, who qualifies and deadline',
    description: 'Bonus mamme 2026: €60 for each month worked for mothers of two or more with earned income up to €40,000, claim from INPS by 31 December. €100 from 2027.',
    h1: 'Bonus mamme 2026: how much and the deadline to claim it',
    intro: 'The bonus mamme 2026 is worth €60 for each month worked and must be claimed from INPS by 31 December: the calculator works out the amount and shows how it would change in 2027 under the budget bill.',
    resume: (h) => {
      const M = h.P.mamme2026;
      const a = h.M.mamme(es, 2026);
      const b = h.M.mamme(es, 2027);
      return `Paragraph 207 of Law 199 of 2025 grants working mothers ${h.eur(M.mensile)} for each month worked in 2026, up to ${h.num(M.mesi_max)} months. It covers employees, public sector included, and self-employed women registered with a social-security fund, but not domestic workers, with earned income up to ${h.eur(M.reddito_max)} a year. With two children it runs until the month the second turns ${h.num(M.eta_secondo_figlio_max)}; with three or more until the youngest turns ${h.num(M.eta_piu_piccolo_max)}, but in that case mothers on permanent contracts are excluded. The months from January to November are paid in a single sum in December. The claim goes to INPS by ${h.date(M.domanda_entro)}, or by ${h.date(M.domanda_entro_se_dicembre)} for those who qualify in December. A mother with two children, the youngest aged 4, and twelve months worked gets ${h.eur(a.totale)}; under article 57 of the 2027 budget bill she would get ${h.eur(b.totale)} in 2027.`;
    },
    faqs: (h) => [
      { q: 'Which income counts for the 2026 working-mothers bonus?', a: `No. The financial condition is the mother’s earned income, which must not exceed ${h.eur(h.P.mamme2026.reddito_max)} a year; the household ISEE does not matter. The bonus is not taxable income, does not affect the ISEE and is compatible with the child allowance, as the INPS child-allowance page confirms.` },
      { q: 'What changes in 2027?', a: `Article 57 of the 2027 budget bill raises the bonus to ${h.eur(h.P.ddl2027.mamme_mensile)} a month, paid every three months instead of once a year, and extends it to mothers of three or more on permanent contracts, repealing the contribution relief that applied to them. The text has not been voted yet: amounts can change until it is approved.` },
      { q: 'Why is it not paid with three children and a permanent contract?', a: 'Because for 2026 the law gives these mothers a different measure: relief from their own social-security contributions, which the 2027 bill proposes to repeal. The €60 bonus therefore goes to mothers of two, whatever their contract, and to mothers of three or more on contracts other than permanent ones.' },
      { q: 'How is a month of work counted?', a: 'Every month, or part of a month, with an employment relationship or self-employment with social-security registration counts. If a child reaches the age limit during the year, the bonus stops in the birthday month. The calculator therefore asks for the months worked in the year: the INPS page explains special cases, such as contracts starting or ending mid-month.' },
    ],
    body: (h) => {
      const M = h.P.mamme2026;
      const righe = [[2, 4], [2, 9], [3, 12], [4, 17]].map(([f, e]: number[]) => { const a = h.M.mamme({ ...es, figli: f, etaPiuPiccolo: e }, 2026); const b = h.M.mamme({ ...es, figli: f, etaPiuPiccolo: e, cdi: true }, 2027); return [`${f} children, youngest aged ${e}`, h.eur(a.totale), h.eur(b.totale)]; });
      return `<h2>Bonus mamme 2026: who qualifies</h2>
<p>The ${h.src('inpsMamme', 'INPS page on the new working-mothers bonus')}, with circular 106 of 16 October 2026, implements paragraph 207 of ${h.src('l199', 'Law 199 of 2025')}. You need at least two children, an employment relationship or self-employment with social-security registration, excluding domestic work, and earned income up to ${h.eur(M.reddito_max)}. The bonus is tax-free and does not count for the ISEE.</p>
${h.table(['Family (12 months worked)', '2026 bonus', '2027 under the bill, permanent contract'], righe, 'Working-mothers bonus: 2026 under the law and 2027 under the budget bill, not yet voted', ['l', 'r', 'r'])}
<h2>Bonus mamme: claim and payment</h2>
<p>Claim on the INPS website with SPID, CIE or CNS, through the contact centre or a patronato, by ${h.date(M.domanda_entro)}. Months accrued from January to November are paid in one sum in December; those who qualify in December have until ${h.date(M.domanda_entro_se_dicembre)}. The ${h.a('isee-2027', '2027 ISEE calendar')} lets you save the deadline to your phone.</p>
<h2>The bonus mamme in the 2027 budget bill</h2>
<p>Article 57 of the ${h.src('ddl2027', '2027 budget bill')} raises the amount to ${h.eur(h.P.ddl2027.mamme_mensile)} a month, paid quarterly, and includes mothers on permanent contracts. These figures come from a text still under debate: the other measures are on the page about the ${h.a('legge-di-bilancio-2027', '2027 budget for families')}.</p>`;
    },
  },
});
