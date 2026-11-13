import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'carta-acquisti',
  group: 'bonus',
  order: 4,
  tool: 'acquisti',
  related: ['calcolo-isee', 'isee-2027', 'isee-corrente', 'bonus-nuovi-nati'],
  sources: ['mefCarta', 'mefCarta2026', 'inpsAdi', 'poste', 'l199'],
  it: {
    slug: 'carta-acquisti',
    nav: 'Carta acquisti e Carta Dedicata a te',
    card: '80 euro ogni due mesi con ISEE fino a 8.230,81 euro, e cosa sapere sulla Carta Dedicata a te da 500 euro.',
    title: 'Carta acquisti 2026: requisiti ISEE e 80 euro a bimestre',
    description: 'Carta acquisti 2026: 80 euro ogni due mesi per over 65 e bimbi sotto i 3 anni con ISEE fino a 8.230,81 euro. Requisiti e regole della Carta Dedicata a te.',
    h1: 'Carta acquisti 2026: chi la riceve e con quale ISEE',
    intro: 'La carta acquisti ricarica 80 euro ogni due mesi a chi ha più di 65 anni o un figlio sotto i 3 anni e un ISEE molto basso: verifica i requisiti 2026 con il tuo ISEE e le tue pensioni.',
    resume: (h) => {
      const C = h.P.carta_acquisti;
      return `La carta acquisti è una carta di pagamento del Ministero dell’economia e delle finanze, emessa da Poste Italiane, che viene ricaricata con ${h.eur(C.bimestre)} ogni due mesi, cioè ${h.eur(C.bimestre * 6)} all’anno. Si usa per la spesa alimentare e sanitaria e per pagare le bollette di luce e gas. Spetta a due categorie: ai cittadini dai ${h.num(C.eta_min)} anni in su e ai genitori di bambini sotto i ${h.num(C.bambino_eta_max)} anni. Dal 1° gennaio 2026 la soglia ISEE è di ${h.eur(C.isee_max, 2)}; per chi ha tra 65 e 69 anni anche i trattamenti pensionistici e assistenziali non devono superare ${h.eur(C.reddito_65_70_max, 2)} all’anno, per chi ha 70 anni o più il limite sale a ${h.eur(C.reddito_70_max, 2)}. La Carta Dedicata a te è un’altra misura: ${h.eur(h.P.dedicata.importo)} una tantum per la spesa, che non si chiede ma viene assegnata dai Comuni sulla base degli elenchi INPS, con un primo pagamento da fare entro il ${h.date(h.P.dedicata.primo_pagamento_entro)}.`;
    },
    faqs: (h) => [
      { q: 'Dove si chiede la carta acquisti?', a: 'Negli uffici postali, presentando il modulo di richiesta con la documentazione prevista: lo indica il MEF, che rimanda alle Poste e all’INPS per le informazioni sui requisiti di ciascuna fascia di età. Per i bambini la domanda la presenta il genitore. Dopo i controlli dell’INPS la carta, se i requisiti ci sono, viene consegnata allo sportello e ricaricata ogni due mesi.' },
      { q: 'La carta acquisti si rinnova ogni anno?', a: `Sì, nel senso che i requisiti vanno mantenuti: serve un ISEE aggiornato ogni anno sotto ${h.eur(h.P.carta_acquisti.isee_max, 2)}. Per i bambini la carta smette di essere ricaricata al compimento dei tre anni. Le soglie si aggiornano ogni anno con l’inflazione: quelle del 2027 saranno pubblicate dal MEF a inizio anno.` },
      { q: 'Come si riceve la Carta Dedicata a te?', a: `Non si fa domanda. L’INPS seleziona i nuclei con un ISEE basso che non ricevono altri sostegni come l’Assegno di inclusione, e i Comuni compilano le liste dei beneficiari e li avvisano. La legge n. 199 del 2025 finanzia la misura anche per il 2027. Chi riceve la carta deve fare il primo acquisto entro il ${h.date(h.P.dedicata.primo_pagamento_entro)}.` },
      { q: 'Carta acquisti e Assegno di inclusione si possono avere insieme?', a: `Per l’Assegno di inclusione serve un ISEE fino a ${h.eur(h.P.adi.isee_max)} e un componente minorenne, con disabilità, con almeno 60 anni o in condizione di svantaggio. Le due misure seguono regole diverse e l’INPS verifica la compatibilità caso per caso. Chi riceve l’ADI resta invece escluso dalla Carta Dedicata a te.` },
    ],
    body: (h) => {
      const C = h.P.carta_acquisti;
      return `<h2>Carta acquisti: i requisiti 2026</h2>
<p>Le soglie aggiornate sono pubblicate dal ${h.src('mefCarta2026', 'MEF con le variazioni ISTAT in vigore dal 1° gennaio 2026')}. Per tutti serve un ISEE fino a ${h.eur(C.isee_max, 2)}. Chi ha tra 65 e 69 anni deve avere trattamenti pensionistici e assistenziali fino a ${h.eur(C.reddito_65_70_max, 2)}; dai 70 anni il limite è di ${h.eur(C.reddito_70_max, 2)}. La ${h.src('mefCarta', 'pagina del MEF sulla carta acquisti')} rimanda poi alle schede per fascia di età, anziani e bambini, che elencano gli altri requisiti specifici da verificare prima della domanda; le stesse informazioni si possono avere alle Poste o all’INPS.</p>
<h2>Carta acquisti: cosa si compra</h2>
<p>Secondo il MEF la carta sostiene la spesa alimentare e sanitaria e il pagamento delle bollette di luce e gas, e vale ${h.eur(C.bimestre / 2)} al mese caricati a bimestre. Dà accesso anche a sconti nei negozi convenzionati che sostengono il programma e, direttamente, alla tariffa elettrica agevolata. Per il saldo e il blocco della carta ci sono numeri verdi dedicati, indicati sulla pagina del MEF.</p>
<h2>Carta Dedicata a te: cosa sapere</h2>
<p>La Carta Dedicata a te vale ${h.eur(h.P.dedicata.importo)} ed è finanziata dal comma 5 della ${h.src('l199', 'legge n. 199 del 2025')} con ${h.num(h.P.dedicata.fondo_annuo_milioni)} milioni all’anno per il 2026 e il 2027. Il decreto attuativo, ${h.P.dedicata.decreto}, affida all’INPS la selezione dei nuclei e ai Comuni le liste definitive. ${h.src('poste', 'Poste Italiane')} avverte che la carta va usata per un primo pagamento entro il ${h.date(h.P.dedicata.primo_pagamento_entro)}, altrimenti il contributo si perde. Per controllare in quale fascia si cade, il ${h.a('calcolo-isee', 'calcolo dell’ISEE')} parte dai redditi di due anni fa; se la situazione è peggiorata, c’è l’${h.a('isee-corrente', 'ISEE corrente')}.</p>`;
    },
  },
  en: {
    slug: 'shopping-card',
    nav: 'Shopping card and Carta Dedicata a te',
    card: '€80 every two months with an ISEE up to €8,230.81, and what to know about the €500 Carta Dedicata a te.',
    title: 'Carta acquisti 2026: ISEE limit and €80 every two months',
    description: 'Carta acquisti 2026 (shopping card): €80 every two months for over-65s and children under 3 with an ISEE up to €8,230.81. Plus the Carta Dedicata a te.',
    h1: 'Carta acquisti 2026: who gets it and with what ISEE',
    intro: 'The carta acquisti tops up €80 every two months for people over 65 or with a child under 3 and a very low ISEE: check the 2026 conditions with your ISEE and pensions.',
    resume: (h) => {
      const C = h.P.carta_acquisti;
      return `The carta acquisti is a payment card from the Ministry of Economy and Finance, issued by Poste Italiane, topped up with ${h.eur(C.bimestre)} every two months, that is ${h.eur(C.bimestre * 6)} a year. It is used for food and health spending and to pay electricity and gas bills. It goes to two groups: people aged ${h.num(C.eta_min)} or over and parents of children under ${h.num(C.bambino_eta_max)}. From 1 January 2026 the ISEE limit is ${h.eur(C.isee_max, 2)}; for people aged 65 to 69, pensions and welfare benefits must also not exceed ${h.eur(C.reddito_65_70_max, 2)} a year, and from 70 the limit rises to ${h.eur(C.reddito_70_max, 2)}. The Carta Dedicata a te is a different measure: a one-off ${h.eur(h.P.dedicata.importo)} for shopping, which you do not apply for but which the comuni assign from INPS lists, with a first payment to make by ${h.date(h.P.dedicata.primo_pagamento_entro)}.`;
    },
    faqs: (h) => [
      { q: 'Where do I apply for the shopping card?', a: 'At post offices, handing in the application form with the documents required: so says the Ministry, which refers people to Poste Italiane and INPS for the conditions of each age group. For children the parent applies. After INPS checks, if the conditions are met the card is handed over at the counter and topped up every two months.' },
      { q: 'Does the shopping card have to be renewed every year?', a: `Yes, in the sense that the conditions must still be met: you need an updated ISEE each year below ${h.eur(h.P.carta_acquisti.isee_max, 2)}. For children, top-ups stop when the child turns three. The limits are updated every year for inflation: the 2027 ones will be published by the Ministry early in the year.` },
      { q: 'How do you get the Carta Dedicata a te?', a: `There is no application. INPS selects households with a low ISEE that receive no other support such as the inclusion allowance, and the comuni draw up the final lists and notify recipients. Law 199 of 2025 also funds the measure for 2027. Recipients must make a first purchase by ${h.date(h.P.dedicata.primo_pagamento_entro)}.` },
      { q: 'Can I have the shopping card and the inclusion allowance?', a: `The inclusion allowance (ADI) needs an ISEE up to ${h.eur(h.P.adi.isee_max)} and a member who is under 18, disabled, at least 60 or in a disadvantaged situation. The two measures follow different rules and INPS checks compatibility case by case. ADI recipients are, however, excluded from the Carta Dedicata a te.` },
    ],
    body: (h) => {
      const C = h.P.carta_acquisti;
      return `<h2>Carta acquisti: the 2026 conditions</h2>
<p>The updated limits are published by the ${h.src('mefCarta2026', 'Ministry with the ISTAT adjustments in force from 1 January 2026')}. Everyone needs an ISEE up to ${h.eur(C.isee_max, 2)}. People aged 65 to 69 must have pensions and welfare benefits up to ${h.eur(C.reddito_65_70_max, 2)}; from 70 the limit is ${h.eur(C.reddito_70_max, 2)}. The ${h.src('mefCarta', 'Ministry page on the shopping card')} then points to separate pages for each age group, older people and children, which list the other specific conditions to check before applying; Poste Italiane and INPS give the same information.</p>
<h2>Carta acquisti: what you can buy</h2>
<p>According to the Ministry the card supports food and health spending and the payment of electricity and gas bills, and is worth ${h.eur(C.bimestre / 2)} a month loaded every two months. It also gives access to discounts in shops that support the scheme and, directly, to the reduced electricity tariff. There are freephone numbers for the balance and for blocking the card, listed on the Ministry page.</p>
<h2>Carta Dedicata a te: what to know</h2>
<p>The Carta Dedicata a te is worth ${h.eur(h.P.dedicata.importo)} and is funded by paragraph 5 of ${h.src('l199', 'Law 199 of 2025')} with ${h.num(h.P.dedicata.fondo_annuo_milioni)} million euros a year for 2026 and 2027. The implementing decree, ${h.P.dedicata.decreto}, gives INPS the job of selecting households and the comuni the final lists. ${h.src('poste', 'Poste Italiane')} warns that the card must be used for a first payment by ${h.date(h.P.dedicata.primo_pagamento_entro)}, or the money is lost. To see which band you fall in, the ${h.a('calcolo-isee', 'ISEE calculator')} starts from income two years ago; if things have got worse, there is the ${h.a('isee-corrente', 'current ISEE')}.</p>`;
    },
  },
});
