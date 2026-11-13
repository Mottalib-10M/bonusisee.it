import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'calcolo-isee',
  group: 'isee',
  order: 1,
  tool: 'isee',
  related: ['isee-precompilato', 'isee-corrente', 'assegno-unico-importo', 'home'],
  sources: ['dpcm159', 'l199', 'inpsPortaleIsee'],
  it: {
    slug: 'calcolo-isee',
    nav: 'Calcolo ISEE',
    card: 'Stima l’ISEE ordinario e quello per i bonus famiglia, con redditi, affitto, risparmi e casa.',
    title: 'ISEE 2026, calcolo e simulazione con le regole in vigore',
    description: 'ISEE 2026 online: redditi, affitto, risparmi e casa danno l’ISEE ordinario e quello per assegno unico e bonus famiglia, con la nuova franchigia della casa.',
    h1: 'Calcolo ISEE 2026: la simulazione con i tuoi numeri',
    intro: 'Per il calcolo ISEE bastano i redditi di due anni fa, l’affitto, i risparmi e il valore della casa: la simulazione restituisce l’ISEE ordinario e quello usato per assegno unico, nido e nuovi nati.',
    resume: (h) => {
      const r = h.M.isee(h.M.ESEMPIO);
      return `L’ISEE si ottiene dividendo l’ISE per la scala di equivalenza. L’ISE è la somma dei redditi del nucleo, meno le detrazioni ammesse, più il ${h.pct(h.P.isee.quota_patrimonio, 0)} del patrimonio. Dai redditi da lavoro dipendente si toglie il ${h.pct(h.P.isee.ded_dip_quota, 0)} fino a ${h.eur(h.P.isee.ded_dip_max)} per persona; dalle pensioni il ${h.pct(h.P.isee.ded_pens_quota, 0)} fino a ${h.eur(h.P.isee.ded_pens_max)}; l’affitto registrato si toglie fino a ${h.eur(h.P.isee.ded_affitto_max)}. Dal patrimonio mobiliare si toglie una franchigia da ${h.eur(h.P.isee.franchigia_mob_base)} a ${h.eur(h.P.isee.franchigia_mob_max)} secondo il numero di componenti. La casa di abitazione conta solo per i due terzi della parte che supera ${h.eur(h.P.isee.casa_soglia_ord)}, o ${h.eur(h.P.isee.casa_soglia_fam)} per le prestazioni familiari dal 2026. Una famiglia di quattro persone con ${h.eur(h.M.ESEMPIO.redditoDip)} di redditi da lavoro, ${h.eur(h.M.ESEMPIO.affitto)} di affitto e ${h.eur(h.M.ESEMPIO.mobiliare)} di risparmi ha un ISEE stimato di ${h.eur(r.isee)}, e di ${h.eur(r.iseeFam)} per i bonus famiglia.`;
    },
    faqs: (h) => [
      { q: 'Quali redditi si usano per l’ISEE 2026?', a: 'La DSU presentata nel 2026 usa i redditi e il patrimonio del secondo anno precedente, cioè il 2024, con alcune voci aggiornate al 31 dicembre 2025 come i saldi dei conti. Per questo un calo recente dei redditi non si vede subito: in quel caso si può chiedere l’ISEE corrente, che usa gli ultimi dodici mesi.' },
      { q: 'Perché il calcolo mostra due valori diversi?', a: `Dal 2026 il comma 208 della legge n. 199 del 2025 alza la franchigia sulla casa a ${h.eur(h.P.isee.casa_soglia_fam)} e aumenta la scala con due o più figli, ma solo per assegno unico, bonus nido, bonus nuovi nati e Assegno di inclusione. Per tutte le altre prestazioni vale l’ISEE ordinario. Chi vive in affitto e ha un solo figlio vede spesso lo stesso valore.` },
      { q: 'I titoli di Stato e i buoni postali entrano nel patrimonio?', a: `Fino a ${h.eur(h.P.isee.titoli_stato_esclusi_max)} in tutto no: titoli di Stato, buoni fruttiferi e libretti postali sono esclusi dal patrimonio mobiliare per effetto della legge n. 213 del 2023. Nel simulatore conviene quindi inserire solo la parte che supera quel limite, insieme a conti, depositi e altri investimenti.` },
      { q: 'Il risultato vale come attestazione?', a: 'No. L’attestazione ISEE la rilascia solo l’INPS dopo la DSU, presentata online con la precompilata o tramite un CAF. Il simulatore usa le regole del DPCM n. 159 del 2013 ma non conosce redditi esenti, giacenze medie e altre voci che l’INPS ricava dagli archivi. Serve per capire in quale fascia si cade prima di presentare la domanda.' },
    ],
    body: (h) => {
      const P = h.P.isee;
      return `<h2>Il calcolo ISEE passo per passo</h2>
<p>Il simulatore applica gli articoli da 2 a 5 e l’allegato 1 del ${h.src('dpcm159', 'DPCM n. 159 del 2013')}. Prima calcola l’indicatore dei redditi (ISR): somma dei redditi lordi, meno le detrazioni per lavoro dipendente e pensione e meno l’affitto. Poi l’indicatore del patrimonio (ISP): risparmi e investimenti oltre la franchigia, altri immobili al valore IMU e la casa di abitazione oltre la soglia. Infine divide ISR più il ${h.pct(P.quota_patrimonio, 0)} dell’ISP per la scala di equivalenza.</p>
${h.table(['Persone nel nucleo', 'Scala di base'], P.scala.map((s: number, i: number) => [String(i + 1), h.num(s, 2)]), 'Scala di equivalenza (allegato 1 del DPCM n. 159/2013), più 0,35 per ogni persona in più', ['l', 'r'])}
<p>Alla scala si aggiungono ${h.num(P.magg_minori, 2)} per le famiglie con figli minori in cui entrambi i genitori hanno lavorato almeno sei mesi, ${h.num(P.magg_minori_under3, 2)} se c’è un figlio sotto i tre anni, e ${h.num(P.magg_disabile, 2)} per ogni componente con disabilità media, grave o non autosufficiente.</p>
<h2>ISEE per le prestazioni familiari dal 2026</h2>
<p>Il comma 208 della ${h.src('l199', 'legge n. 199 del 2025')} cambia due cose solo per assegno unico, nido, nuovi nati, Assegno di inclusione e Supporto formazione lavoro: la soglia della casa sale da ${h.eur(P.casa_soglia_ord)} a ${h.eur(P.casa_soglia_fam)}, o ${h.eur(P.casa_soglia_fam_metro)} nei capoluoghi metropolitani, e la maggiorazione per i figli parte da ${h.num(P.magg_figli_fam['2'], 2)} con due figli. Per chi ha casa di proprietà la differenza può spostare la fascia dell’assegno unico. La DSU si presenta sul ${h.src('inpsPortaleIsee', 'Portale unico ISEE dell’INPS')} o tramite un CAF.</p>
<h2>Cosa il simulatore non sa</h2>
<p>Non conosce i redditi esenti, le giacenze medie dei conti, i trattamenti assistenziali e il rendimento figurativo del patrimonio mobiliare che l’INPS ricava dagli archivi: per questo l’attestazione può differire di qualche centinaio di euro.</p>`;
    },
  },
  en: {
    slug: 'isee-calculator',
    nav: 'ISEE calculator',
    card: 'Estimate the standard ISEE and the one used for family bonuses, from income, rent, savings and home.',
    title: 'ISEE calculator 2026: estimate your Italian ISEE online',
    description: 'ISEE calculator for 2026: your income, rent, savings and home give the standard Italian ISEE and the one used for the child allowance and family bonuses.',
    h1: 'ISEE calculator 2026: estimate it with your own figures',
    intro: 'The ISEE calculator needs income from two years ago, your rent, savings and the value of your home: it returns the standard ISEE and the one used for the child allowance, nursery and newborn bonuses.',
    resume: (h) => {
      const r = h.M.isee(h.M.ESEMPIO);
      return `The ISEE is the ISE divided by the equivalence scale. The ISE is the household’s income, less the allowed deductions, plus ${h.pct(h.P.isee.quota_patrimonio, 0)} of its assets. Employment income loses ${h.pct(h.P.isee.ded_dip_quota, 0)} up to ${h.eur(h.P.isee.ded_dip_max)} per person; pensions ${h.pct(h.P.isee.ded_pens_quota, 0)} up to ${h.eur(h.P.isee.ded_pens_max)}; registered rent is deducted up to ${h.eur(h.P.isee.ded_affitto_max)}. Savings lose an allowance from ${h.eur(h.P.isee.franchigia_mob_base)} to ${h.eur(h.P.isee.franchigia_mob_max)} depending on household size. The home you live in counts only for two thirds of the part above ${h.eur(h.P.isee.casa_soglia_ord)}, or ${h.eur(h.P.isee.casa_soglia_fam)} for family benefits from 2026. A household of four with ${h.eur(h.M.ESEMPIO.redditoDip)} of employment income, ${h.eur(h.M.ESEMPIO.affitto)} of rent and ${h.eur(h.M.ESEMPIO.mobiliare)} of savings has an estimated ISEE of ${h.eur(r.isee)}, and ${h.eur(r.iseeFam)} for family bonuses. The DSU filed in 2026 uses income from 2024, so a recent fall in earnings only shows up through the current ISEE, which looks at the last twelve months instead.`;
    },
    faqs: (h) => [
      { q: 'Which income does the 2026 ISEE use?', a: 'A DSU filed in 2026 uses income and assets from two years earlier, that is 2024, with some items such as bank balances taken at 31 December 2025. A recent fall in income therefore does not show at once: in that case you can ask for the current ISEE (ISEE corrente), which uses the last twelve months.' },
      { q: 'Why does the calculator show two different values?', a: `From 2026 paragraph 208 of Law 199 of 2025 raises the home allowance to ${h.eur(h.P.isee.casa_soglia_fam)} and lifts the scale for two or more children, but only for the child allowance, the nursery and newborn bonuses and the inclusion allowance. Every other benefit uses the standard ISEE. Renters with one child often see the same value twice.` },
      { q: 'Do Italian government bonds and postal savings count as assets?', a: `Up to ${h.eur(h.P.isee.titoli_stato_esclusi_max)} in total, no: government bonds, postal savings bonds and postal savings books are left out of financial assets under Law 213 of 2023. In the calculator, enter only the part above that limit, together with bank accounts, deposits and other investments.` },
      { q: 'Does the result count as an ISEE certificate?', a: 'No. Only INPS issues the ISEE certificate, after the DSU is filed online with the pre-filled form or through a CAF. The calculator applies Decree 159 of 2013 but does not know exempt income, average balances and other items INPS takes from its records. It shows which band you fall into before you apply.' },
    ],
    body: (h) => {
      const P = h.P.isee;
      return `<h2>The ISEE calculator step by step</h2>
<p>The calculator applies articles 2 to 5 and annex 1 of ${h.src('dpcm159', 'Decree 159 of 2013')}. First it works out the income indicator (ISR): gross income, less the deductions for employment and pensions and less the rent. Then the asset indicator (ISP): savings and investments above the allowance, other property at its IMU value and the home above the threshold. Finally it divides the ISR plus ${h.pct(P.quota_patrimonio, 0)} of the ISP by the equivalence scale.</p>
${h.table(['People in the household', 'Base scale'], P.scala.map((s: number, i: number) => [String(i + 1), h.num(s, 2)]), 'Equivalence scale (annex 1 of Decree 159/2013), plus 0.35 for each extra person', ['l', 'r'])}
<p>The scale rises by ${h.num(P.magg_minori, 2)} for families with children under 18 where both parents worked at least six months, ${h.num(P.magg_minori_under3, 2)} if a child is under three, and ${h.num(P.magg_disabile, 2)} for each member with a medium or severe disability.</p>
<h2>The ISEE for family benefits from 2026</h2>
<p>Paragraph 208 of ${h.src('l199', 'Law 199 of 2025')} changes two things only for the child allowance, nursery, newborn bonus, inclusion allowance and training support: the home threshold rises from ${h.eur(P.casa_soglia_ord)} to ${h.eur(P.casa_soglia_fam)}, or ${h.eur(P.casa_soglia_fam_metro)} in metropolitan capitals, and the child supplement starts at ${h.num(P.magg_figli_fam['2'], 2)} with two children. For home owners the difference can move the child-allowance band. The DSU is filed on the ${h.src('inpsPortaleIsee', 'INPS single ISEE portal')} or through a CAF.</p>
<h2>What the calculator does not know</h2>
<p>It does not know exempt income, average account balances, welfare payments or the notional return on financial assets that INPS takes from its records: the certificate can therefore differ by a few hundred euros.</p>`;
    },
  },
});
