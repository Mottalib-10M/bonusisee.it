import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'isee-2027',
  group: 'isee',
  order: 2,
  tool: 'scadenze',
  related: ['assegno-unico-2027', 'isee-precompilato', 'calcolo-isee', 'bonus-mamme'],
  sources: ['dpcm159', 'inpsAuu', 'inpsMamme', 'poste'],
  it: {
    slug: 'isee-2027',
    nav: 'ISEE 2027 e scadenze',
    card: 'Quando scade l’ISEE 2026, da quando si presenta la DSU 2027 e le date dei bonus da segnare.',
    title: 'ISEE 2027: quando rinnovare la DSU e le date da segnare',
    description: 'ISEE 2027: l’ISEE 2026 scade il 31 dicembre, la DSU 2027 si presenta dal 1° gennaio e entro il 30 giugno salva gli arretrati. Le date in un calendario.',
    h1: 'ISEE 2027: quando rinnovare la DSU e cosa segnare',
    intro: 'L’ISEE 2027 nasce con una nuova DSU da presentare dal primo gennaio: qui trovi le date che contano per assegno unico, bonus mamme e Carta Dedicata a te, da scaricare nel calendario del telefono.',
    resume: (h) => `La DSU, la dichiarazione da cui nasce l’ISEE, vale dal giorno in cui viene presentata fino al 31 dicembre successivo: lo stabilisce l’articolo 10 del DPCM n. 159 del 2013. Chi l’ha presentata nel 2026 ha quindi un ISEE che scade il ${h.date(h.P.date.dsu_2026_scade)}, qualunque sia il mese di presentazione. Dal ${h.date(h.P.date.dsu_2027_dal)} si può presentare la DSU 2027, che userà i redditi e il patrimonio del 2025 con i saldi dei conti al 31 dicembre 2026. Per l’assegno unico l’annualità va da marzo a febbraio: senza un nuovo ISEE, da marzo 2027 l’INPS paga gli importi minimi. Se la DSU arriva entro il ${h.date(h.P.date.auu_arretrati_entro)}, l’INPS ricalcola e paga gli arretrati da marzo; se arriva dopo, i mesi già pagati al minimo restano tali. Le altre scadenze di fine anno sono il ${h.date(h.P.date.mamme_domanda)} per il bonus mamme 2026 e il ${h.date(h.P.date.dedicata_primo_pagamento)} per il primo pagamento con la Carta Dedicata a te.`,
    faqs: (h) => [
      { q: 'Conviene presentare la DSU già a gennaio 2027?', a: `Sì, se nel 2027 ti servono più misure. Una sola DSU vale per tutte fino al 31 dicembre 2027, e a gennaio i CAF sono meno affollati che a febbraio, quando molte famiglie si accorgono dell’assegno unico ridotto. Per l’assegno unico il limite vero è il ${h.date(h.P.date.auu_arretrati_entro)}, ma prima arriva l’ISEE, prima arrivano gli importi pieni.` },
      { q: 'Cosa succede all’assegno unico tra gennaio e febbraio 2027?', a: 'L’annualità dell’assegno unico va da marzo a febbraio, quindi i pagamenti di gennaio e febbraio 2027 appartengono ancora all’annualità 2026 e restano calcolati sull’ISEE presentato nel 2026. Il cambio avviene con la mensilità di marzo, che senza una DSU 2027 viene pagata con gli importi minimi.' },
      { q: 'Con la DSU 2027 cambiano anche le soglie?', a: 'Le soglie dell’assegno unico si rivalutano ogni anno con il costo della vita e l’INPS le pubblica a inizio anno: gli importi 2027 non sono ancora noti. Le soglie di bonus nido e bonus nuovi nati restano quelle di legge finché una norma non le cambia. Il disegno di legge di bilancio 2027 non tocca le soglie ISEE di queste misure.' },
      { q: 'Il calendario scaricato si aggiorna da solo?', a: 'No. Il file .ics contiene le date lette oggi su leggi e schede ufficiali e si salva sul tuo telefono: se l’INPS sposta una scadenza o la legge di bilancio ne introduce di nuove, il file non cambia. Conviene tornare su questa pagina dopo il voto della legge di bilancio e scaricarlo di nuovo.' },
    ],
    body: (h) => `<h2>ISEE 2027: la DSU dura fino al 31 dicembre</h2>
<p>Per l’${h.src('dpcm159', 'articolo 10 del DPCM n. 159 del 2013')} la dichiarazione sostitutiva unica è valida dal momento della presentazione al 31 dicembre successivo. Non esiste quindi un ISEE «di dodici mesi»: una DSU presentata a novembre 2026 scade dopo poche settimane. La DSU 2027 prende i redditi del 2025, gli stessi della dichiarazione dei redditi presentata nel 2026, e il patrimonio al 31 dicembre 2025, con le giacenze dei conti aggiornate.</p>
<h2>Le date di fine 2026 e del 2027</h2>
<p>La ${h.src('inpsMamme', 'scheda INPS del bonus mamme')} fissa la domanda entro il ${h.date(h.P.date.mamme_domanda)}, o entro il ${h.date(h.P.date.mamme_domanda_dicembre)} per chi matura il requisito a dicembre. Per la Carta Dedicata a te, ${h.src('poste', 'Poste Italiane')} avverte che la carta diventa inutilizzabile senza un primo pagamento entro il ${h.date(h.P.date.dedicata_primo_pagamento)}. Per l’assegno unico la ${h.src('inpsAuu', 'scheda INPS')} lega gli arretrati a una DSU presentata entro il 30 giugno. Il calendario qui sopra mostra solo le date che riguardano la tua famiglia e le scarica con un promemoria sette giorni prima.</p>
<h2>Come prepararsi</h2>
<p>Servono i documenti d’identità e i codici fiscali di tutti i componenti, il contratto d’affitto registrato, i dati della casa e degli eventuali mutui, le targhe dei veicoli. Con la DSU precompilata online gran parte dei redditi e dei saldi arriva già dagli archivi di INPS e Agenzia delle entrate; per una stima prima di presentarla c’è il ${h.a('calcolo-isee', 'calcolo dell’ISEE')}.</p>`,
  },
  en: {
    slug: 'isee-2027',
    nav: 'ISEE 2027 and deadlines',
    card: 'When the 2026 ISEE expires, when the 2027 DSU can be filed and the bonus dates to note.',
    title: 'ISEE 2027: when to renew the DSU and the dates to note',
    description: 'ISEE 2027: the 2026 ISEE expires on 31 December, the 2027 DSU can be filed from 1 January and filing by 30 June saves arrears. Bonus dates in one calendar.',
    h1: 'ISEE 2027: when to renew the DSU and what to note',
    intro: 'The 2027 ISEE starts with a new DSU you can file from 1 January: here are the dates that matter for the child allowance, the working-mothers bonus and the Carta Dedicata a te, ready to download to your phone calendar.',
    resume: (h) => `The DSU, the declaration the ISEE comes from, is valid from the day it is filed until the following 31 December: article 10 of Decree 159 of 2013 says so. Anyone who filed in 2026 therefore has an ISEE that expires on ${h.date(h.P.date.dsu_2026_scade)}, whatever the month of filing. From ${h.date(h.P.date.dsu_2027_dal)} the 2027 DSU can be filed; it will use 2025 income and assets, with bank balances at 31 December 2026. For the child allowance the year runs from March to February: without a new ISEE, from March 2027 INPS pays the minimum amounts. If the DSU arrives by ${h.date(h.P.date.auu_arretrati_entro)}, INPS recalculates and pays arrears from March; if it arrives later, the months already paid at the minimum stay that way. The other year-end deadlines are ${h.date(h.P.date.mamme_domanda)} for the 2026 working-mothers bonus and ${h.date(h.P.date.dedicata_primo_pagamento)} for the first payment with the Carta Dedicata a te.`,
    faqs: (h) => [
      { q: 'Should I file the DSU in January 2027?', a: `Yes, if you need several measures in 2027. One DSU covers them all until 31 December 2027, and CAF offices are quieter in January than in February, when many families notice a reduced child allowance. For the child allowance the real limit is ${h.date(h.P.date.auu_arretrati_entro)}, but the sooner the ISEE arrives, the sooner full amounts are paid.` },
      { q: 'What happens to the child allowance in January and February 2027?', a: 'The child-allowance year runs from March to February, so the January and February 2027 payments still belong to the 2026 year and are worked out on the ISEE filed in 2026. The switch comes with the March payment, which is paid at the minimum if there is no 2027 DSU.' },
      { q: 'Do the limits change with the 2027 DSU?', a: 'The child-allowance limits are revalued every year with the cost of living and INPS publishes them early in the year: the 2027 amounts are not known yet. The nursery and newborn limits stay at their legal level until a law changes them. The 2027 budget bill does not touch the ISEE limits of these measures.' },
      { q: 'Does the downloaded calendar update itself?', a: 'No. The .ics file holds the dates read today in laws and official pages and is saved on your phone: if INPS moves a deadline or the budget law adds new ones, the file does not change. Come back to this page after the budget law is voted and download it again.' },
    ],
    body: (h) => `<h2>ISEE 2027: the DSU lasts until 31 December</h2>
<p>Under ${h.src('dpcm159', 'article 10 of Decree 159 of 2013')} the single declaration (DSU) is valid from filing until the following 31 December. There is no “twelve-month” ISEE: a DSU filed in November 2026 expires a few weeks later. The 2027 DSU takes 2025 income, the same as in the tax return filed in 2026, and assets at 31 December 2025, with updated bank balances.</p>
<h2>Dates at the end of 2026 and in 2027</h2>
<p>The ${h.src('inpsMamme', 'INPS working-mothers bonus page')} sets the claim deadline at ${h.date(h.P.date.mamme_domanda)}, or ${h.date(h.P.date.mamme_domanda_dicembre)} for those who qualify in December. For the Carta Dedicata a te, ${h.src('poste', 'Poste Italiane')} warns that the card is blocked without a first payment by ${h.date(h.P.date.dedicata_primo_pagamento)}. For the child allowance the ${h.src('inpsAuu', 'INPS page')} links arrears to a DSU filed by 30 June. The calendar above shows only the dates that apply to your family and downloads them with a reminder seven days before.</p>
<h2>How to get ready</h2>
<p>You need identity documents and tax codes for every member, the registered rental contract, details of your home and any mortgage, and vehicle plates. With the online pre-filled DSU most income and balances come straight from INPS and tax-agency records; for an estimate before filing there is the ${h.a('calcolo-isee', 'ISEE calculator')}.</p>`,
  },
});
