import { defineGuide } from '../../lib/guide-types';

const base = { minori: 2, under1: 0, tra1e3: 0, maggiorenni: 0, entrambiLavorano: false, madreUnder21: false };

export default defineGuide({
  id: 'assegno-unico-importo',
  group: 'assegno',
  order: 1,
  tool: 'auu',
  related: ['assegno-unico-2027', 'assegno-unico-senza-isee', 'assegno-unico-pagamento', 'calcolo-isee'],
  sources: ['inpsAuu', 'dlgs230', 'l199'],
  it: {
    slug: 'assegno-unico-importo',
    nav: 'Importo assegno unico',
    card: 'Quanto spetta al mese per ogni figlio con il tuo ISEE, maggiorazioni comprese, e la tabella delle fasce 2026.',
    title: 'Assegno unico 2026: importo per figlio e tabella per ISEE',
    description: 'Assegno unico 2026: da 203,80 € a 58,30 € al mese per figlio minorenne secondo l’ISEE, più le maggiorazioni. Calcolo dell’importo e tabella delle fasce INPS.',
    h1: 'Assegno unico 2026: quanto spetta per ogni figlio',
    intro: 'L’assegno unico si calcola sull’ISEE e sul numero di figli: inserisci i tuoi dati e vedi l’importo mensile, le maggiorazioni e quanto perderesti senza ISEE.',
    resume: (h) => {
      const a = h.M.auu({ ...base, isee: 25000 });
      const m = h.M.auu({ ...base, isee: null });
      return `L’assegno unico e universale spetta per ogni figlio a carico fino a 21 anni, e senza limiti di età per i figli con disabilità. L’importo dipende dall’ISEE: per il 2026 l’INPS paga ${h.eur(h.P.auu.minore_max, 2)} al mese per ogni figlio minorenne con un ISEE fino a ${h.eur(h.P.auu.soglia_min, 2)}, e ${h.eur(h.P.auu.minore_min, 2)} con un ISEE di ${h.eur(h.P.auu.soglia_max, 2)} o più, oppure senza ISEE. Tra le due soglie l’importo scende in modo lineare. A questo si aggiungono maggiorazioni per i figli dal terzo in poi, per i bambini sotto un anno, per le famiglie in cui lavorano entrambi i genitori, per le madri sotto i 21 anni e per i nuclei con quattro o più figli. Una famiglia con due figli minorenni e un ISEE di ${h.eur(25000)} riceve circa ${h.eur(a.mensile, 2)} al mese, ${h.eur(a.annuo)} all’anno; senza ISEE scenderebbe a ${h.eur(m.mensile, 2)} al mese.`;
    },
    faqs: (h) => [
      { q: 'Perché l’importo calcolato è una stima?', a: `L’INPS pubblica solo le soglie e gli importi di base rivalutati: ${h.eur(h.P.auu.minore_max, 2)} e ${h.eur(h.P.auu.minore_min, 2)} per i minorenni. Le maggiorazioni sono calcolate qui applicando agli importi del decreto legislativo n. 230 del 2021 lo stesso coefficiente di rivalutazione delle soglie. Le cifre al centesimo restano quelle dell’INPS, visibili nel dettaglio della domanda.` },
      { q: 'Quale ISEE conta per l’assegno unico?', a: `L’ISEE per le prestazioni ai minorenni, che dal 2026 segue le regole del comma 208 della legge n. 199 del 2025: la casa di abitazione pesa solo oltre ${h.eur(h.P.isee.casa_soglia_fam)} e la scala cresce già con due figli. Per questo l’ISEE dell’assegno unico può essere più basso di quello ordinario stampato sull’attestazione.` },
      { q: 'Come si calcola la maggiorazione per i genitori che lavorano?', a: 'Spetta per ogni figlio minorenne quando entrambi i genitori hanno redditi da lavoro, ed è piena con un ISEE fino alla soglia minima, poi scende fino ad azzerarsi alla soglia massima. Il simulatore la calcola sulla base dei 30 euro previsti dalla legge, rivalutati. Non spetta al genitore solo, salvo i casi specifici chiariti dall’INPS.' },
      { q: 'L’assegno unico conta come reddito?', a: 'Non è tassato e non entra nel reddito ai fini IRPEF. Entra invece nel calcolo dell’ISEE come trattamento assistenziale, ma il bonus asilo nido e il bonus nuovi nati usano un ISEE da cui l’assegno unico viene tolto. Chi presenta la DSU nel 2027 vedrà quindi l’assegno del 2025 tra i trattamenti del nucleo.' },
    ],
    body: (h) => {
      const A = h.P.auu;
      const righe = [A.soglia_min, 20000, 25000, 30000, 35000, 40000, A.soglia_max].map((x: number) => [h.eur(x, 2), h.eur(h.M.auu({ ...base, minori: 1, isee: x }).perMinore, 2)]);
      return `<h2>Assegno unico: la tabella per fasce di ISEE</h2>
<p>La ${h.src('inpsAuu', 'scheda INPS dell’assegno unico')} fissa per il 2026 le due soglie e gli importi agli estremi. Tra ${h.eur(A.soglia_min, 2)} e ${h.eur(A.soglia_max, 2)} l’importo per figlio minorenne cala in modo lineare: la tabella mostra i valori intermedi stimati con questa regola.</p>
${h.table(['ISEE', 'Importo per figlio minorenne, al mese'], righe, 'Assegno unico 2026 per figlio minorenne: estremi INPS, valori intermedi stimati per interpolazione', ['r', 'r'])}
<h2>Le maggiorazioni che cambiano l’importo</h2>
<p>L’articolo 4 del ${h.src('dlgs230', 'decreto legislativo n. 230 del 2021')} prevede importi aggiuntivi: una quota per ogni figlio dopo il secondo, il ${h.pct(A.incremento_under1, 0)} in più per i figli sotto un anno e, nei nuclei con tre o più figli e ISEE fino alla soglia massima, anche per quelli tra uno e tre anni. Ci sono poi la maggiorazione per i genitori entrambi lavoratori, quella per le madri con meno di ${h.num(A.maggiorenne_eta_max)} anni e una somma forfettaria di ${h.eur(A.legge_quattro_figli)} al mese per le famiglie con almeno quattro figli. I figli tra 18 e 20 anni danno diritto a un importo più basso, se studiano, lavorano con un reddito fino a ${h.eur(A.maggiorenne_reddito_max)}, cercano lavoro o fanno il servizio civile.</p>
<h2>Come ottenere l’importo pieno</h2>
<p>Senza un ISEE valido l’INPS paga solo gli importi minimi. L’ISEE per i minorenni è più favorevole di quello ordinario dal 2026, grazie al comma 208 della ${h.src('l199', 'legge n. 199 del 2025')}: per stimarlo c’è il ${h.a('calcolo-isee', 'calcolo dell’ISEE')}. Chi ha già la domanda attiva non deve ripresentarla ogni anno, ma deve rinnovare la DSU: le regole del ${h.a('assegno-unico-2027', 'rinnovo per il 2027')} spiegano perché conviene farlo entro giugno.</p>`;
    },
  },
  en: {
    slug: 'child-allowance-amount',
    nav: 'Child allowance amount',
    card: 'How much is paid per child each month with your ISEE, supplements included, and the 2026 band table.',
    title: 'Assegno unico 2026: amount per child and table by ISEE',
    description: 'Assegno unico 2026 (child allowance): from €203.80 to €58.30 a month per child under 18 depending on ISEE, plus supplements. Calculator and table of INPS bands.',
    h1: 'Assegno unico 2026: how much you get per child',
    intro: 'The assegno unico is worked out on your ISEE and number of children: enter your details to see the monthly amount, the supplements and what you would lose without an ISEE.',
    resume: (h) => {
      const a = h.M.auu({ ...base, isee: 25000 });
      const m = h.M.auu({ ...base, isee: null });
      return `The universal child allowance (assegno unico e universale) is paid for each dependent child up to age 21, with no age limit for disabled children. The amount depends on the ISEE: for 2026 INPS pays ${h.eur(h.P.auu.minore_max, 2)} a month per child under 18 with an ISEE up to ${h.eur(h.P.auu.soglia_min, 2)}, and ${h.eur(h.P.auu.minore_min, 2)} with an ISEE of ${h.eur(h.P.auu.soglia_max, 2)} or more, or with no ISEE. Between the two limits the amount falls in a straight line. Supplements are added for the third and later children, for babies under one, for families where both parents work, for mothers under 21 and for households with four or more children. A family with two children under 18 and an ISEE of ${h.eur(25000)} receives about ${h.eur(a.mensile, 2)} a month, ${h.eur(a.annuo)} a year; without an ISEE it would drop to ${h.eur(m.mensile, 2)} a month.`;
    },
    faqs: (h) => [
      { q: 'Why is the calculated amount an estimate?', a: `INPS publishes only the revalued limits and base amounts: ${h.eur(h.P.auu.minore_max, 2)} and ${h.eur(h.P.auu.minore_min, 2)} for children under 18. Supplements are worked out here by applying to the amounts in Legislative Decree 230 of 2021 the same revaluation factor as the limits. The exact figures are those INPS shows in the claim details.` },
      { q: 'Which ISEE counts for the child allowance?', a: `The ISEE for benefits to minors, which from 2026 follows paragraph 208 of Law 199 of 2025: the family home only counts above ${h.eur(h.P.isee.casa_soglia_fam)} and the scale rises from two children. That is why the child-allowance ISEE can be lower than the standard one printed on the certificate.` },
      { q: 'How is the working-parents supplement worked out?', a: 'It is paid for each child under 18 when both parents have earned income. It is full with an ISEE up to the lower limit, then falls to zero at the upper limit. The calculator bases it on the €30 set in the law, revalued. It is not paid to single parents, except in the specific cases clarified by INPS.' },
      { q: 'Does the child allowance count as income?', a: 'It is not taxed and is not part of income for IRPEF. It does count in the ISEE as a welfare benefit, but the nursery bonus and the newborn bonus use an ISEE with the allowance taken out. A DSU filed in 2027 will therefore list the 2025 allowance among the household’s benefits.' },
    ],
    body: (h) => {
      const A = h.P.auu;
      const righe = [A.soglia_min, 20000, 25000, 30000, 35000, 40000, A.soglia_max].map((x: number) => [h.eur(x, 2), h.eur(h.M.auu({ ...base, minori: 1, isee: x }).perMinore, 2)]);
      return `<h2>Assegno unico: the table by ISEE band</h2>
<p>The ${h.src('inpsAuu', 'INPS child-allowance page')} sets the two 2026 limits and the amounts at each end. Between ${h.eur(A.soglia_min, 2)} and ${h.eur(A.soglia_max, 2)} the amount per child under 18 falls in a straight line: the table shows intermediate values estimated with that rule.</p>
${h.table(['ISEE', 'Amount per child under 18, per month'], righe, '2026 child allowance per child under 18: INPS end points, intermediate values estimated by interpolation', ['r', 'r'])}
<h2>Supplements that change the amount</h2>
<p>Article 4 of ${h.src('dlgs230', 'Legislative Decree 230 of 2021')} provides extra amounts: one for each child after the second, ${h.pct(A.incremento_under1, 0)} more for children under one and, in households with three or more children and an ISEE up to the upper limit, also for those aged one to three. There is also a supplement when both parents work, one for mothers under ${h.num(A.maggiorenne_eta_max)} and a flat ${h.eur(A.legge_quattro_figli)} a month for families with at least four children. Children aged 18 to 20 give a lower amount if they study, work earning up to ${h.eur(A.maggiorenne_reddito_max)}, are looking for work or are in civil service.</p>
<h2>How to get the full amount</h2>
<p>Without a valid ISEE, INPS pays only the minimum amounts. Since 2026 the ISEE for minors is more favourable than the standard one, thanks to paragraph 208 of ${h.src('l199', 'Law 199 of 2025')}: the ${h.a('calcolo-isee', 'ISEE calculator')} estimates it. If your claim is already active you do not file it again each year, but you must renew the DSU: the rules for the ${h.a('assegno-unico-2027', '2027 renewal')} explain why June is the date to beat.</p>`;
    },
  },
});
