import { defineGuide } from '../../lib/guide-types';

const fam = { isee: 20000, minori: 2, under1: 0, tra1e3: 0, maggiorenni: 0, entrambiLavorano: false, madreUnder21: false };

export default defineGuide({
  id: 'assegno-unico-2027',
  group: 'assegno',
  order: 2,
  tool: 'rinnovo',
  related: ['assegno-unico-importo', 'isee-2027', 'assegno-unico-senza-isee', 'isee-precompilato'],
  sources: ['inpsAuu', 'dlgs230', 'ddl2027'],
  it: {
    slug: 'assegno-unico-2027',
    nav: 'Assegno unico 2027',
    card: 'Cosa succede da marzo 2027 senza nuovo ISEE, fino a quando ci sono gli arretrati e quanto costa il ritardo.',
    title: 'Assegno unico 2027: rinnovo ISEE, arretrati e importi',
    description: 'Assegno unico 2027: da marzo senza nuova DSU arrivano gli importi minimi; con l’ISEE entro il 30 giugno l’INPS paga gli arretrati. Quanto perdi in ritardo.',
    h1: 'Assegno unico 2027: rinnovo dell’ISEE e arretrati',
    intro: 'Per l’assegno unico 2027 non serve una nuova domanda, ma serve un nuovo ISEE: il simulatore mostra quanto ricevi con e senza DSU e quanto perdi se la presenti dopo giugno.',
    resume: (h) => {
      const r = h.M.rinnovoAuu(fam, 9);
      return `La domanda di assegno unico resta valida negli anni: l’INPS continua a pagare finché non cambia qualcosa o la domanda viene revocata. L’ISEE invece scade ogni 31 dicembre, e l’annualità dell’assegno va da marzo a febbraio, come prevede l’articolo 1 del decreto legislativo n. 230 del 2021. Senza una DSU 2027, quindi, da marzo 2027 l’INPS paga gli importi minimi, come a chi non ha ISEE. Se la DSU viene presentata entro il ${h.date(h.P.date.auu_arretrati_entro)}, l’INPS ricalcola l’assegno e versa gli arretrati da marzo; se arriva dopo, l’importo pieno decorre solo dal mese successivo alla presentazione. Per una famiglia con due figli minorenni e un ISEE di ${h.eur(fam.isee)}, la differenza è di ${h.eur(r.differenza, 2)} al mese: presentare la DSU a settembre invece che entro giugno costa circa ${h.eur(r.perdita)}. Il disegno di legge di bilancio 2027 non modifica l’assegno unico; gli importi 2027 dipenderanno dalla rivalutazione ISTAT che l’INPS pubblica a inizio anno.`;
    },
    faqs: (h) => [
      { q: 'Devo rifare la domanda di assegno unico nel 2027?', a: 'No. La domanda presentata negli anni precedenti resta attiva, salvo revoca o decadenza. Va aggiornata solo se cambia qualcosa: nasce un figlio, un figlio compie 18 o 21 anni, cambia l’IBAN o la situazione dei genitori. Va invece rinnovato ogni anno l’ISEE, perché la DSU scade il 31 dicembre.' },
      { q: 'Cosa succede se presento l’ISEE a luglio 2027?', a: `L’assegno torna pieno dal mese successivo alla presentazione della DSU, ma i mesi da marzo a giugno restano pagati con gli importi minimi. Il limite del ${h.date(h.P.date.auu_arretrati_entro)} vale solo per gli arretrati: con una DSU entro quella data l’INPS ricalcola l’assegno da marzo e paga le differenze.` },
      { q: 'Gli importi dell’assegno unico 2027 sono già noti?', a: 'No. Soglie e importi si rivalutano ogni anno con la variazione dell’indice dei prezzi calcolata dall’ISTAT, e l’INPS li pubblica di norma tra gennaio e febbraio. Il simulatore usa quelli del 2026, che restano un riferimento prudente: con la rivalutazione gli importi del 2027 saranno di poco superiori.' },
      { q: 'Il disegno di legge di bilancio 2027 cambia l’assegno unico?', a: 'Il testo presentato in Parlamento non modifica gli importi né le soglie dell’assegno unico. Le misure per le famiglie del DDL riguardano il bonus mamme, un fondo per i nati dal 2027, il congedo parentale e un contributo per i servizi all’infanzia dei genitori lavoratori autonomi. Fino al voto finale il testo può ancora cambiare.' },
    ],
    body: (h) => {
      const righe = [2, 4, 6, 7, 9, 12].map((m: number) => { const r = h.M.rinnovoAuu(fam, m); return [['', 'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'][m], r.arretrati ? 'sì' : 'no', h.eur(r.perdita)]; });
      return `<h2>Assegno unico 2027: perché da marzo cambia l’importo</h2>
<p>L’${h.src('dlgs230', 'articolo 1 del decreto legislativo n. 230 del 2021')} definisce l’assegno come beneficio mensile per il periodo da marzo a febbraio. I pagamenti di gennaio e febbraio 2027 restano legati all’ISEE del 2026; quello di marzo è il primo dell’annualità nuova. La ${h.src('inpsAuu', 'scheda INPS')} spiega che, senza un ISEE valido, l’assegno viene pagato con gli importi minimi e che le differenze si recuperano con una DSU presentata entro il 30 giugno.</p>
${h.table(['DSU presentata a', 'Arretrati da marzo', 'Perdita stimata'], righe, `Famiglia con due figli minorenni e ISEE di ${h.eur(fam.isee)}: quanto si perde rinnovando tardi`, ['l', 'l', 'r'])}
<h2>Cosa fare tra dicembre 2026 e giugno 2027</h2>
<p>La DSU 2027 si può presentare dal ${h.date(h.P.date.dsu_2027_dal)}: online con la precompilata o tramite un CAF. Non serve toccare la domanda di assegno unico: l’INPS aggancia da solo il nuovo ISEE. Conviene controllare nel fascicolo previdenziale che l’importo di marzo o aprile sia quello pieno. Il ${h.a('isee-2027', 'calendario ISEE 2027')} raccoglie tutte le date utili.</p>
<h2>E il disegno di legge di bilancio 2027?</h2>
<p>Il ${h.src('ddl2027', 'DDL di bilancio 2027')} è ancora all’esame del Parlamento e non tocca l’assegno unico. Le novità per le famiglie riguardano altre misure, raccolte nella pagina sulla ${h.a('legge-di-bilancio-2027', 'manovra 2027 per le famiglie')}.</p>`;
    },
  },
  en: {
    slug: 'child-allowance-2027',
    nav: 'Child allowance 2027',
    card: 'What happens from March 2027 without a new ISEE, how long arrears are paid and what a late renewal costs.',
    title: 'Assegno unico 2027: ISEE renewal, arrears and amounts',
    description: 'Assegno unico 2027: from March, without a new DSU, minimum amounts are paid; with an ISEE filed by 30 June INPS pays arrears. See what a late renewal costs you.',
    h1: 'Assegno unico 2027: renewing the ISEE and arrears',
    intro: 'For the 2027 assegno unico you do not need a new claim, but you do need a new ISEE: the calculator shows what you get with and without a DSU and what you lose by filing after June.',
    resume: (h) => {
      const r = h.M.rinnovoAuu(fam, 9);
      return `A child-allowance claim stays valid over the years: INPS keeps paying until something changes or the claim is withdrawn. The ISEE, however, expires every 31 December, and the allowance year runs from March to February, as article 1 of Legislative Decree 230 of 2021 provides. Without a 2027 DSU, from March 2027 INPS pays the minimum amounts, as for people with no ISEE. If the DSU is filed by ${h.date(h.P.date.auu_arretrati_entro)}, INPS recalculates the allowance and pays arrears from March; if it is filed later, the full amount only starts from the month after filing. For a family with two children under 18 and an ISEE of ${h.eur(fam.isee)}, the difference is ${h.eur(r.differenza, 2)} a month: filing in September rather than by June costs about ${h.eur(r.perdita)}. The 2027 budget bill does not change the child allowance; 2027 amounts will depend on the ISTAT revaluation INPS publishes early in the year.`;
    },
    faqs: (h) => [
      { q: 'Do I have to claim the child allowance again in 2027?', a: 'No. A claim filed in earlier years stays active unless withdrawn or lapsed. It only needs updating if something changes: a child is born, turns 18 or 21, the IBAN changes or the parents’ situation changes. The ISEE, on the other hand, must be renewed every year, because the DSU expires on 31 December.' },
      { q: 'What if I file the ISEE in July 2027?', a: `The allowance returns to the full amount from the month after the DSU is filed, but March to June stay paid at the minimum. The ${h.date(h.P.date.auu_arretrati_entro)} limit only matters for arrears: with a DSU filed by then INPS recalculates the allowance from March and pays the difference.` },
      { q: 'Are the 2027 child-allowance amounts known yet?', a: 'No. Limits and amounts are revalued every year in line with the price index calculated by ISTAT, and INPS usually publishes them between January and February. The calculator uses the 2026 figures, which are a cautious reference: after revaluation the 2027 amounts will be slightly higher.' },
      { q: 'Does the 2027 budget bill change the child allowance?', a: 'The text presented to Parliament does not change child-allowance amounts or limits. The family measures in the bill concern the working-mothers bonus, a fund for children born from 2027, parental leave and a childcare grant for self-employed parents. Until the final vote the text can still change.' },
    ],
    body: (h) => {
      const righe = [2, 4, 6, 7, 9, 12].map((m: number) => { const r = h.M.rinnovoAuu(fam, m); return [['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][m], r.arretrati ? 'yes' : 'no', h.eur(r.perdita)]; });
      return `<h2>Assegno unico 2027: why the amount changes in March</h2>
<p>${h.src('dlgs230', 'Article 1 of Legislative Decree 230 of 2021')} defines the allowance as a monthly benefit for the period from March to February. The January and February 2027 payments are still tied to the 2026 ISEE; March is the first of the new year. The ${h.src('inpsAuu', 'INPS page')} explains that without a valid ISEE the allowance is paid at the minimum, and that the difference is recovered with a DSU filed by 30 June.</p>
${h.table(['DSU filed in', 'Arrears from March', 'Estimated loss'], righe, `Family with two children under 18 and an ISEE of ${h.eur(fam.isee)}: what a late renewal costs`, ['l', 'l', 'r'])}
<h2>What to do between December 2026 and June 2027</h2>
<p>The 2027 DSU can be filed from ${h.date(h.P.date.dsu_2027_dal)}: online with the pre-filled form or through a CAF. You do not need to touch the child-allowance claim: INPS links the new ISEE automatically. Check in your INPS records that the March or April payment is the full one. The ${h.a('isee-2027', '2027 ISEE calendar')} gathers all the useful dates.</p>
<h2>What about the 2027 budget bill?</h2>
<p>The ${h.src('ddl2027', '2027 budget bill')} is still before Parliament and does not touch the child allowance. The family changes concern other measures, gathered on the page about the ${h.a('legge-di-bilancio-2027', '2027 budget for families')}.</p>`;
    },
  },
});
