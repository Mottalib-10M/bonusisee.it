import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'bonus-asilo-nido',
  group: 'bonus',
  order: 2,
  tool: 'nido',
  related: ['isee-minorenni', 'bonus-nuovi-nati', 'assegno-unico-importo', 'calcolo-isee'],
  sources: ['inpsNido', 'l199'],
  it: {
    slug: 'bonus-asilo-nido',
    nav: 'Bonus asilo nido',
    card: 'Fino a 3.600 euro all’anno per la retta del nido: importo secondo anno di nascita, ISEE minorenni e retta pagata.',
    title: 'Bonus asilo nido 2026: importo per ISEE e rimborso retta',
    description: 'Bonus asilo nido 2026: fino a 3.600 euro all’anno per i nati dal 2024 con ISEE minorenni fino a 40.000 euro, in 11 rate mai oltre la retta. Calcola il tuo.',
    h1: 'Bonus asilo nido: quanto spetta con la tua retta',
    intro: 'Il bonus asilo nido rimborsa la retta fino a 3.600 euro all’anno: l’importo dipende da anno di nascita e ISEE minorenni, e ogni rata non supera la retta pagata nel mese.',
    resume: (h) => {
      const N = h.P.nido;
      const r = h.M.nido(2025, 30000, 300, 11);
      return `Il bonus asilo nido dell’INPS rimborsa le rette di asili nido pubblici e privati autorizzati e, per i bambini con gravi patologie croniche, finanzia forme di supporto a casa. Per i bambini nati dal ${h.date(N.nati_dal)} spettano ${h.eur(N.nuovi_importo)} all’anno con un ISEE minorenni fino a ${h.eur(N.nuovi_soglia)}; sopra quella soglia o senza ISEE restano ${h.eur(N.minimo)}. Per i nati prima del 2024 l’importo è di ${h.eur(N.fascia1_importo)} con ISEE fino a ${h.eur(N.fascia1_soglia, 2)}, di ${h.eur(N.fascia2_importo)} fino a ${h.eur(N.fascia2_soglia)} e di ${h.eur(N.minimo)} oltre. Il bonus è diviso in ${h.num(N.mensilita)} mensilità e ogni rata non può superare la retta effettivamente pagata. Dal calcolo dell’ISEE si toglie l’assegno unico. Con una retta di ${h.eur(300)} al mese, un bambino nato nel 2025 e un ISEE di ${h.eur(30000)}, la rata massima di ${h.eur(r.rata, 2)} si riduce alla retta: ${h.eur(r.totale)} all’anno invece di ${h.eur(r.importo)}.`;
    },
    faqs: (h) => [
      { q: 'Il bonus nido copre anche il 2027?', a: 'Sì. Il bonus asilo nido è una misura strutturale prevista dalla legge n. 232 del 2016 e potenziata dalle leggi di bilancio successive: la domanda si presenta ogni anno per l’anno solare in cui si frequenta il nido, quando l’INPS apre il servizio. Gli importi 2027 restano quelli in vigore salvo modifiche della legge di bilancio.' },
      { q: 'Quale ISEE si usa per il bonus nido?', a: `Si usa l’ISEE minorenni del bambino per cui si chiede il bonus, calcolato con le regole del comma 208 della legge n. 199 del 2025 e senza gli importi dell’assegno unico. Se l’ISEE manca o supera ${h.eur(h.P.nido.nuovi_soglia)}, spetta l’importo minimo di ${h.eur(h.P.nido.minimo)} all’anno.` },
      { q: 'Si può avere il bonus nido e la detrazione fiscale delle rette?', a: 'No. Il bonus nido non è cumulabile con la detrazione del 19 per cento delle spese per la frequenza dell’asilo nido, per le stesse rette. Chi riceve il bonus non può portare in detrazione la parte di retta già rimborsata dall’INPS. Di norma il bonus conviene, perché restituisce fino all’intero importo della retta.' },
      { q: 'Fino a che età del bambino si può chiedere?', a: 'La domanda riguarda i bambini fino a tre anni che frequentano il nido. La scheda INPS precisa che si può presentare fino al mese di agosto dell’anno in cui il bambino compie tre anni, per i mesi di frequenza di quell’anno. Per il supporto a casa serve invece un’attestazione del pediatra sulla patologia cronica.' },
    ],
    body: (h) => {
      const N = h.P.nido;
      const righe = [[`Nati dal 2024`, `fino a ${h.eur(N.nuovi_soglia)}`, h.eur(N.nuovi_importo), h.eur(N.nuovi_importo / N.mensilita, 2)], ['Nati prima del 2024', `fino a ${h.eur(N.fascia1_soglia, 2)}`, h.eur(N.fascia1_importo), h.eur(N.fascia1_importo / N.mensilita, 2)], ['Nati prima del 2024', `fino a ${h.eur(N.fascia2_soglia)}`, h.eur(N.fascia2_importo), h.eur(N.fascia2_importo / N.mensilita, 2)], ['Tutti', 'oltre o senza ISEE', h.eur(N.minimo), h.eur(N.minimo / N.mensilita, 2)]];
      return `<h2>Bonus asilo nido: importi per ISEE e anno di nascita</h2>
<p>La ${h.src('inpsNido', 'scheda INPS del bonus asilo nido')}, aggiornata con la circolare n. 29 del 2026, riporta questi importi annui e la rata massima per ciascuna delle ${h.num(N.mensilita)} mensilità.</p>
${h.table(['Bambino', 'ISEE minorenni', 'Importo annuo', 'Rata massima'], righe, 'Bonus asilo nido 2026: importi INPS per fascia', ['l', 'l', 'r', 'r'])}
<h2>Perché il rimborso può essere più basso</h2>
<p>Ogni rata rimborsa la retta pagata quel mese fino al tetto di ${h.eur(N.nuovi_importo / N.mensilita, 2)} per i nati dal 2024 con ISEE basso. Se la retta è più bassa, perché il Comune applica tariffe agevolate, il rimborso si ferma alla retta. Il simulatore tiene conto della retta e dei mesi di frequenza, ed è per questo che il totale può essere inferiore all’importo annuo.</p>
<h2>ISEE minorenni e assegno unico</h2>
<p>Per il nido conta l’ISEE minorenni, che con genitori non sposati e non conviventi può includere il genitore che vive altrove: le regole sono nella guida all’${h.a('isee-minorenni', 'ISEE minorenni')}. Dal 2026 l’ISEE usato per il nido segue il comma 208 della ${h.src('l199', 'legge n. 199 del 2025')}, con la casa che pesa solo oltre ${h.eur(h.P.isee.casa_soglia_fam)}, e non conta gli importi dell’${h.a('assegno-unico-importo', 'assegno unico')}.</p>`;
    },
  },
  en: {
    slug: 'nursery-bonus',
    nav: 'Nursery bonus',
    card: 'Up to €3,600 a year towards nursery fees: amount by year of birth, ISEE for minors and fee paid.',
    title: 'Bonus asilo nido 2026: amount by ISEE and fee refund',
    description: 'Bonus asilo nido 2026 (nursery bonus): up to €3,600 a year for children born from 2024 with an ISEE for minors up to €40,000, in 11 payments under the fee.',
    h1: 'Bonus asilo nido: what you get with your nursery fee',
    intro: 'The bonus asilo nido refunds nursery fees up to €3,600 a year: the amount depends on year of birth and ISEE for minors, and each payment never exceeds the fee paid that month.',
    resume: (h) => {
      const N = h.P.nido;
      const r = h.M.nido(2025, 30000, 300, 11);
      return `The INPS nursery bonus refunds fees at public and authorised private nurseries and, for children with serious chronic illnesses, pays for support at home. For children born from ${h.date(N.nati_dal)} it is ${h.eur(N.nuovi_importo)} a year with an ISEE for minors up to ${h.eur(N.nuovi_soglia)}; above that limit or with no ISEE it is ${h.eur(N.minimo)}. For children born before 2024 it is ${h.eur(N.fascia1_importo)} with an ISEE up to ${h.eur(N.fascia1_soglia, 2)}, ${h.eur(N.fascia2_importo)} up to ${h.eur(N.fascia2_soglia)} and ${h.eur(N.minimo)} above. The bonus is split into ${h.num(N.mensilita)} monthly payments and each one cannot exceed the fee actually paid. The child allowance is taken out of the ISEE. With a ${h.eur(300)} monthly fee, a child born in 2025 and an ISEE of ${h.eur(30000)}, the ${h.eur(r.rata, 2)} maximum payment is capped at the fee: ${h.eur(r.totale)} a year instead of ${h.eur(r.importo)}.`;
    },
    faqs: (h) => [
      { q: 'Does the nursery bonus also cover 2027?', a: 'Yes. The nursery bonus is a permanent measure created by Law 232 of 2016 and extended by later budget laws: you apply each year for the calendar year your child attends, once INPS opens the service. The 2027 amounts stay as they are unless the budget law changes them.' },
      { q: 'Which ISEE is used for the nursery bonus?', a: `The ISEE for minors of the child you are claiming for, worked out under paragraph 208 of Law 199 of 2025 and without child-allowance amounts. If there is no ISEE or it is above ${h.eur(h.P.nido.nuovi_soglia)}, the minimum of ${h.eur(h.P.nido.minimo)} a year is paid.` },
      { q: 'Can I get the bonus and the tax deduction on fees?', a: 'No. The nursery bonus cannot be combined with the 19 per cent tax deduction for nursery fees on the same fees. If you receive the bonus you cannot deduct the part of the fee INPS has already refunded. The bonus is usually the better deal, as it can refund the whole fee.' },
      { q: 'Up to what age can it be claimed?', a: 'The claim covers children up to three who attend a nursery. The INPS page explains that you can apply until August of the year the child turns three, for the months attended that year. Home support instead requires a paediatrician’s certificate of the chronic illness.' },
    ],
    body: (h) => {
      const N = h.P.nido;
      const righe = [['Born from 2024', `up to ${h.eur(N.nuovi_soglia)}`, h.eur(N.nuovi_importo), h.eur(N.nuovi_importo / N.mensilita, 2)], ['Born before 2024', `up to ${h.eur(N.fascia1_soglia, 2)}`, h.eur(N.fascia1_importo), h.eur(N.fascia1_importo / N.mensilita, 2)], ['Born before 2024', `up to ${h.eur(N.fascia2_soglia)}`, h.eur(N.fascia2_importo), h.eur(N.fascia2_importo / N.mensilita, 2)], ['All', 'above or no ISEE', h.eur(N.minimo), h.eur(N.minimo / N.mensilita, 2)]];
      return `<h2>Bonus asilo nido: amounts by ISEE and year of birth</h2>
<p>The ${h.src('inpsNido', 'INPS nursery bonus page')}, updated with circular 29 of 2026, gives these yearly amounts and the maximum for each of the ${h.num(N.mensilita)} monthly payments.</p>
${h.table(['Child', 'ISEE for minors', 'Yearly amount', 'Maximum payment'], righe, '2026 nursery bonus: INPS amounts by band', ['l', 'l', 'r', 'r'])}
<h2>Why the refund can be lower</h2>
<p>Each payment refunds the fee paid that month up to ${h.eur(N.nuovi_importo / N.mensilita, 2)} for children born from 2024 with a low ISEE. If the fee is lower, because the comune charges reduced rates, the refund stops at the fee. The calculator takes the fee and months attended into account, which is why the total can be below the yearly amount.</p>
<h2>ISEE for minors and the child allowance</h2>
<p>The nursery bonus uses the ISEE for minors, which with unmarried parents who live apart can include the parent living elsewhere: the rules are in the guide to the ${h.a('isee-minorenni', 'ISEE for minors')}. From 2026 the nursery ISEE follows paragraph 208 of ${h.src('l199', 'Law 199 of 2025')}, with the home counting only above ${h.eur(h.P.isee.casa_soglia_fam)}, and leaves out ${h.a('assegno-unico-importo', 'child allowance')} amounts.</p>`;
    },
  },
});
