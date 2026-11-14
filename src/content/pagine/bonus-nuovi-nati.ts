import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'bonus-nuovi-nati',
  group: 'bonus',
  order: 1,
  tool: 'nuovinati',
  related: ['bonus-asilo-nido', 'assegno-unico-importo', 'legge-di-bilancio-2027', 'isee-minorenni'],
  sources: ['l207', 'inpsNuoviNati', 'circ45', 'msg1268'],
  it: {
    slug: 'bonus-nuovi-nati',
    nav: 'Bonus nuovi nati',
    card: '1.000 euro per ogni figlio nato o adottato dal 2025 con ISEE fino a 40.000 euro, da chiedere entro 120 giorni dalla nascita.',
    title: 'Bonus nuovi nati: 1.000 euro, ISEE e scadenza domanda',
    description: 'Bonus nuovi nati: 1.000 euro una tantum per ogni figlio nato o adottato dal 2025 con ISEE fino a 40.000 euro. Calcola l’ultimo giorno utile per la domanda INPS.',
    h1: 'Bonus nuovi nati: requisiti e ultimo giorno per la domanda',
    intro: 'Il bonus nuovi nati vale 1.000 euro per ogni figlio, ma la domanda va fatta entro 120 giorni: inserisci la data di nascita e vedi la scadenza, da salvare nel calendario.',
    resume: (h) => {
      const r = h.M.nuoviNati(25000, '2026-10-15');
      return `Il bonus nuovi nati, introdotto dal comma 206 della legge n. 207 del 2024, è un importo una tantum di ${h.eur(h.P.nuovi_nati.importo)} per ogni figlio nato o adottato dal ${h.date(h.P.nuovi_nati.nati_dal)}. Spetta se il nucleo ha un ISEE per le prestazioni familiari fino a ${h.eur(h.P.nuovi_nati.soglia)}, calcolato senza contare l’assegno unico, e se il genitore che fa domanda è residente in Italia con cittadinanza italiana, europea o un titolo di soggiorno previsto dalla legge. La domanda si presenta all’INPS entro ${h.num(h.P.nuovi_nati.giorni_domanda)} giorni dalla nascita o dall’ingresso in famiglia del minore adottato. Per i bambini nati nel 2026 prima dell’apertura del servizio, il messaggio INPS n. 1268 ha fissato un termine unico al ${h.date(h.P.nuovi_nati.termine_eventi_2026_prima_apertura)}. Per un bimbo nato il ${h.date('2026-10-15')}, con un ISEE di ${h.eur(25000)}, il bonus vale ${h.eur(r.importo)} e la domanda scade il ${h.date(r.termine)}.`;
    },
    faqs: (h) => [
      { q: 'Il bonus nuovi nati c’è anche nel 2027?', a: `Sì. La legge n. 207 del 2024 lo prevede per ogni figlio nato o adottato a partire dal ${h.date(h.P.nuovi_nati.nati_dal)}, senza una data di fine, quindi vale anche per i nati del 2027 con le stesse regole. Il disegno di legge di bilancio 2027 vi affianca, per i nati dal 2027, un fondo con 100 euro all’anno dallo Stato, ancora da approvare.` },
      { q: 'Quale ISEE serve per il bonus nuovi nati?', a: `Serve l’ISEE per le prestazioni familiari, con il calcolo del comma 208 della legge n. 199 del 2025, e il valore non deve superare ${h.eur(h.P.nuovi_nati.soglia)}. Dall’ISEE si tolgono gli importi dell’assegno unico. Se al momento della domanda l’ISEE non c’è, conviene presentare la DSU subito: senza un ISEE valido la domanda viene respinta.` },
      { q: 'Si fa una domanda per ogni figlio?', a: 'Sì. Il bonus spetta per ogni figlio, quindi per i gemelli si presentano due domande distinte. Può farla un genitore, sul sito INPS con SPID, CIE o CNS, tramite il Contact Center o un patronato. L’importo viene pagato sul conto indicato nella domanda, una sola volta, e non concorre al reddito.' },
      { q: 'Cosa succede se la domanda arriva dopo 120 giorni?', a: `Il termine è previsto dalla legge e la circolare INPS n. 45 del 2026 lo conferma: una domanda presentata oltre i ${h.num(h.P.nuovi_nati.giorni_domanda)} giorni dalla nascita o dall’adozione viene respinta. Per questo il simulatore calcola il giorno esatto e permette di salvarlo nel calendario con un promemoria.` },
    ],
    body: (h) => {
      const righe = ['2026-01-20', '2026-06-01', '2026-10-15', '2027-01-10'].map((d: string) => [h.date(d), h.date(h.M.nuoviNati(20000, d).termine)]);
      return `<h2>Bonus nuovi nati: i requisiti</h2>
<p>Il ${h.src('l207', 'comma 206 della legge n. 207 del 2024')} riconosce ${h.eur(h.P.nuovi_nati.importo)} per ogni figlio nato o adottato dal 2025. La ${h.src('circ45', 'circolare INPS n. 45 del 2026')} precisa i requisiti del genitore richiedente: residenza in Italia, cittadinanza italiana o di un Paese dell’Unione europea, oppure uno dei titoli di soggiorno previsti dalla legge. Il nucleo deve avere un ISEE fino a ${h.eur(h.P.nuovi_nati.soglia)}, al netto dell’assegno unico.</p>
<h2>Entro quando si presenta la domanda</h2>
<p>Il termine è di ${h.num(h.P.nuovi_nati.giorni_domanda)} giorni dalla nascita o dall’ingresso in famiglia. Per i bambini nati nel 2026 prima che il servizio fosse disponibile, il ${h.src('msg1268', 'messaggio INPS n. 1268 del 2026')} ha fissato un termine unico al ${h.date(h.P.nuovi_nati.termine_eventi_2026_prima_apertura)}.</p>
${h.table(['Data di nascita', 'Ultimo giorno per la domanda'], righe, 'Esempi di scadenza della domanda del bonus nuovi nati', ['l', 'l'])}
<h2>Come si presenta e con quali altri bonus si cumula</h2>
<p>Si presenta sul sito INPS, alla ${h.src('inpsNuoviNati', 'scheda del bonus nuovi nati')}, con SPID, CIE o CNS, oppure con il Contact Center o un patronato. Il bonus si somma all’${h.a('assegno-unico-importo', 'assegno unico')}, che per il neonato spetta con il 50 per cento in più nel primo anno, e al ${h.a('bonus-asilo-nido', 'bonus asilo nido')}, che per i nati dal 2024 arriva fino a ${h.eur(h.P.nido.nuovi_importo)} all’anno.</p>`;
    },
  },
  en: {
    slug: 'newborn-bonus',
    nav: 'Newborn bonus',
    card: '€1,000 for each child born or adopted from 2025 with an ISEE up to €40,000, to be claimed within 120 days of the birth.',
    title: 'Bonus nuovi nati: the €1,000 newborn bonus and its deadline',
    description: 'Bonus nuovi nati (newborn bonus): a one-off €1,000 for each child born or adopted from 2025 with an ISEE up to €40,000. Work out the last day to claim it.',
    h1: 'Bonus nuovi nati: who qualifies and the last day to claim',
    intro: 'The bonus nuovi nati is worth €1,000 per child, but the claim must be made within 120 days: enter the date of birth to see the deadline and save it to your calendar.',
    resume: (h) => {
      const r = h.M.nuoviNati(25000, '2026-10-15');
      return `The newborn bonus, created by paragraph 206 of Law 207 of 2024, is a one-off payment of ${h.eur(h.P.nuovi_nati.importo)} for each child born or adopted from ${h.date(h.P.nuovi_nati.nati_dal)}. It is paid if the household has an ISEE for family benefits up to ${h.eur(h.P.nuovi_nati.soglia)}, calculated without the child allowance, and if the claiming parent lives in Italy and is an Italian or EU citizen or holds one of the residence permits listed in the law. The claim goes to INPS within ${h.num(h.P.nuovi_nati.giorni_domanda)} days of the birth or of the adopted child joining the family. For children born in 2026 before the online service opened, INPS message 1268 set a single deadline of ${h.date(h.P.nuovi_nati.termine_eventi_2026_prima_apertura)}. For a baby born on ${h.date('2026-10-15')}, with an ISEE of ${h.eur(25000)}, the bonus is ${h.eur(r.importo)} and the claim deadline is ${h.date(r.termine)}.`;
    },
    faqs: (h) => [
      { q: 'Is there a newborn bonus in 2027 too?', a: `Yes. Law 207 of 2024 provides it for every child born or adopted from ${h.date(h.P.nuovi_nati.nati_dal)}, with no end date, so it also covers children born in 2027 under the same rules. For children born from 2027 the 2027 budget bill adds a fund with €100 a year from the state, still to be approved.` },
      { q: 'Which ISEE is needed for the newborn bonus?', a: `The ISEE for family benefits, worked out under paragraph 208 of Law 199 of 2025, which must not exceed ${h.eur(h.P.nuovi_nati.soglia)}. Child-allowance amounts are taken out of the ISEE. If you have no ISEE when you claim, file the DSU straight away: without a valid ISEE the claim is rejected.` },
      { q: 'Is there one claim per child?', a: 'Yes. The bonus is paid per child, so twins need two separate claims. A parent files it on the INPS website with SPID, CIE or CNS, through the contact centre or through a patronato. The amount is paid once to the account given in the claim and is not taxable income.' },
      { q: 'What happens if the claim is filed after 120 days?', a: `The deadline is set by law and INPS circular 45 of 2026 confirms it: a claim filed more than ${h.num(h.P.nuovi_nati.giorni_domanda)} days after the birth or adoption is rejected. That is why the calculator works out the exact day and lets you save it to your calendar with a reminder.` },
    ],
    body: (h) => {
      const righe = ['2026-01-20', '2026-06-01', '2026-10-15', '2027-01-10'].map((d: string) => [h.date(d), h.date(h.M.nuoviNati(20000, d).termine)]);
      return `<h2>Bonus nuovi nati: who qualifies</h2>
<p>${h.src('l207', 'Paragraph 206 of Law 207 of 2024')} grants ${h.eur(h.P.nuovi_nati.importo)} for each child born or adopted from 2025. ${h.src('circ45', 'INPS circular 45 of 2026')} sets out the conditions for the claiming parent: residence in Italy, Italian or EU citizenship or one of the residence permits listed in the law. The household must have an ISEE up to ${h.eur(h.P.nuovi_nati.soglia)}, net of the child allowance.</p>
<h2>When the claim must be filed</h2>
<p>The deadline is ${h.num(h.P.nuovi_nati.giorni_domanda)} days from the birth or from the child joining the family. For children born in 2026 before the service was available, ${h.src('msg1268', 'INPS message 1268 of 2026')} set a single deadline of ${h.date(h.P.nuovi_nati.termine_eventi_2026_prima_apertura)}.</p>
${h.table(['Date of birth', 'Last day to claim'], righe, 'Examples of newborn bonus claim deadlines', ['l', 'l'])}
<h2>How to claim and what it combines with</h2>
<p>Claim on the INPS website, on the ${h.src('inpsNuoviNati', 'newborn bonus page')}, with SPID, CIE or CNS, or through the contact centre or a patronato. The bonus adds to the ${h.a('assegno-unico-importo', 'child allowance')}, which is 50 per cent higher for a baby in the first year, and to the ${h.a('bonus-asilo-nido', 'nursery bonus')}, worth up to ${h.eur(h.P.nido.nuovi_importo)} a year for children born from 2024.</p>`;
    },
  },
});
