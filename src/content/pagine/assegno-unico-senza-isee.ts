import { defineGuide } from '../../lib/guide-types';

const fam = { minori: 2, under1: 0, tra1e3: 0, maggiorenni: 0, entrambiLavorano: false, madreUnder21: false };

export default defineGuide({
  id: 'assegno-unico-senza-isee',
  group: 'assegno',
  order: 3,
  tool: 'auu',
  outil: { senza: true, confronto: true },
  related: ['assegno-unico-importo', 'calcolo-isee', 'isee-precompilato', 'assegno-unico-2027'],
  sources: ['inpsAuu', 'dlgs230'],
  it: {
    slug: 'assegno-unico-senza-isee',
    nav: 'Assegno unico senza ISEE',
    card: 'Quanto spetta con gli importi minimi e quando conviene comunque presentare la DSU.',
    title: 'Assegno unico senza ISEE: importi minimi 2026 e confronto',
    description: 'Assegno unico senza ISEE: nel 2026 spettano 58,30 € al mese per figlio minorenne. Confronta con l’importo che avresti con l’ISEE e vedi quando la DSU conviene.',
    h1: 'Assegno unico senza ISEE: quanto spetta e quanto perdi',
    intro: 'L’assegno unico senza ISEE si può chiedere lo stesso, ma con gli importi minimi: il simulatore parte senza ISEE e mostra quanto guadagneresti presentando la DSU.',
    resume: (h) => {
      const m = h.M.auu({ ...fam, isee: null });
      const c = h.M.auu({ ...fam, isee: 30000 });
      return `L’assegno unico è una misura universale: spetta anche a chi non presenta l’ISEE o ha un ISEE sopra la soglia massima, che per il 2026 è di ${h.eur(h.P.auu.soglia_max, 2)}. In questi casi l’INPS paga gli importi minimi: ${h.eur(h.P.auu.minore_min, 2)} al mese per ogni figlio minorenne, più le maggiorazioni che non dipendono dall’ISEE, come quella per i bambini sotto un anno o quella forfettaria per quattro o più figli. Per una famiglia con due figli minorenni l’assegno minimo vale ${h.eur(m.mensile, 2)} al mese, ${h.eur(m.annuo)} all’anno. Con un ISEE di ${h.eur(30000)} la stessa famiglia riceverebbe circa ${h.eur(c.mensile, 2)} al mese, cioè ${h.eur(c.annuo - m.annuo)} in più all’anno. Rinunciare all’ISEE conviene solo a chi è sicuro di superare la soglia massima, o non vuole dichiarare il patrimonio: in tutti gli altri casi la DSU, gratuita, vale centinaia di euro.`;
    },
    faqs: (h) => [
      { q: 'Posso presentare l’ISEE dopo la domanda di assegno unico?', a: `Sì. La domanda si può fare anche senza ISEE e l’INPS ricalcola l’assegno quando la DSU arriva. Se l’ISEE viene presentato entro il ${h.date(h.P.date.auu_arretrati_entro)}, spettano gli arretrati da marzo; dopo quella data l’importo pieno decorre dal mese successivo e i mesi già pagati al minimo non si recuperano.` },
      { q: 'Con un ISEE alto conviene presentarlo lo stesso?', a: `Con un ISEE sopra ${h.eur(h.P.auu.soglia_max, 2)} l’importo è identico a quello senza ISEE, quindi per l’assegno unico non cambia nulla. L’ISEE può però servire per altre misure, come il bonus nido o le tasse universitarie. Attenzione: dal 2026 l’ISEE dell’assegno unico non conta la casa fino a ${h.eur(h.P.isee.casa_soglia_fam)}, e può essere più basso del previsto.` },
      { q: 'Quali maggiorazioni restano senza ISEE?', a: 'Restano quelle legate ai figli e non all’ISEE: l’aumento del 50 per cento per i figli sotto un anno, la somma forfettaria per i nuclei con almeno quattro figli e le quote minime per i figli dopo il secondo e per i figli con disabilità. Si perde invece la maggiorazione per i genitori che lavorano entrambi, che senza ISEE vale zero.' },
    ],
    body: (h) => {
      const righe = [1, 2, 3, 4].map((n: number) => { const m = h.M.auu({ ...fam, minori: n, isee: null }); const p = h.M.auu({ ...fam, minori: n, isee: h.P.auu.soglia_min }); return [String(n), h.eur(m.mensile, 2), h.eur(p.mensile, 2)]; });
      return `<h2>Assegno unico senza ISEE: gli importi minimi 2026</h2>
<p>La ${h.src('inpsAuu', 'scheda INPS')} conferma che l’assegno può essere chiesto anche in assenza di ISEE, con gli importi minimi previsti dalla norma. La tabella confronta l’assegno minimo con quello pieno, che spetta con un ISEE fino a ${h.eur(h.P.auu.soglia_min, 2)}.</p>
${h.table(['Figli minorenni', 'Senza ISEE, al mese', 'Con ISEE basso, al mese'], righe, 'Assegno unico 2026 senza ISEE e con ISEE fino alla soglia minima (maggiorazioni dal terzo figlio stimate)', ['r', 'r', 'r'])}
<h2>Perché tanti restano senza ISEE</h2>
<p>Alcune famiglie temono che la casa di proprietà o i risparmi le portino sopra la soglia. Dal 2026 però l’ISEE dell’assegno unico esclude la casa fino a ${h.eur(h.P.isee.casa_soglia_fam)} e titoli di Stato e buoni postali fino a ${h.eur(h.P.isee.titoli_stato_esclusi_max)}. Prima di rinunciare conviene fare il ${h.a('calcolo-isee', 'calcolo dell’ISEE')}: la soglia massima di ${h.eur(h.P.auu.soglia_max, 2)} è più alta di quanto molti pensino, soprattutto con due o più figli.</p>
<h2>Come rimediare</h2>
<p>Basta presentare la DSU, anche online con la ${h.a('isee-precompilato', 'precompilata')}: l’INPS aggancia l’ISEE alla domanda senza altri passaggi. Le regole dell’${h.src('dlgs230', 'articolo 6 del decreto legislativo n. 230 del 2021')} sulla decorrenza valgono ogni anno, quindi anche per il ${h.a('assegno-unico-2027', 'rinnovo 2027')}.</p>`;
    },
  },
  en: {
    slug: 'child-allowance-without-isee',
    nav: 'Child allowance without ISEE',
    card: 'What the minimum amounts are and when it still pays to file a DSU.',
    title: 'Assegno unico without ISEE: 2026 minimum amounts compared',
    description: 'Assegno unico without an ISEE: in 2026 you get €58.30 a month per child under 18. Compare it with the amount due with an ISEE and see when a DSU pays off.',
    h1: 'Assegno unico without ISEE: what you get and lose',
    intro: 'You can claim the assegno unico without an ISEE, but only at the minimum amounts: the calculator starts with no ISEE and shows what filing a DSU would add.',
    resume: (h) => {
      const m = h.M.auu({ ...fam, isee: null });
      const c = h.M.auu({ ...fam, isee: 30000 });
      return `The child allowance is universal: it is paid even to people who file no ISEE or whose ISEE is above the upper limit, ${h.eur(h.P.auu.soglia_max, 2)} for 2026. In those cases INPS pays the minimum amounts: ${h.eur(h.P.auu.minore_min, 2)} a month per child under 18, plus supplements that do not depend on the ISEE, such as the one for babies under one or the flat amount for four or more children. For a family with two children under 18 the minimum allowance is ${h.eur(m.mensile, 2)} a month, ${h.eur(m.annuo)} a year. With an ISEE of ${h.eur(30000)} the same family would get about ${h.eur(c.mensile, 2)} a month, that is ${h.eur(c.annuo - m.annuo)} more a year. Going without an ISEE only makes sense if you are sure to be above the upper limit or do not want to declare your assets: in every other case the free DSU is worth hundreds of euros.`;
    },
    faqs: (h) => [
      { q: 'Can I file the ISEE after claiming the child allowance?', a: `Yes. You can claim without an ISEE and INPS recalculates the allowance when the DSU arrives. If the ISEE is filed by ${h.date(h.P.date.auu_arretrati_entro)}, arrears are paid from March; after that date the full amount starts from the following month and months already paid at the minimum are not recovered.` },
      { q: 'With a high ISEE, is it still worth filing?', a: `With an ISEE above ${h.eur(h.P.auu.soglia_max, 2)} the amount is the same as with no ISEE, so nothing changes for the child allowance. The ISEE can still help with other measures, such as the nursery bonus or university fees. Note that from 2026 the child-allowance ISEE ignores the home up to ${h.eur(h.P.isee.casa_soglia_fam)}, so it may be lower than you expect.` },
      { q: 'Which supplements remain without an ISEE?', a: 'Those linked to the children rather than to the ISEE: the 50 per cent increase for babies under one, the flat amount for households with at least four children and the minimum amounts for children after the second and for disabled children. You lose the supplement for two working parents, which is zero without an ISEE.' },
    ],
    body: (h) => {
      const righe = [1, 2, 3, 4].map((n: number) => { const m = h.M.auu({ ...fam, minori: n, isee: null }); const p = h.M.auu({ ...fam, minori: n, isee: h.P.auu.soglia_min }); return [String(n), h.eur(m.mensile, 2), h.eur(p.mensile, 2)]; });
      return `<h2>Assegno unico without ISEE: the 2026 minimum amounts</h2>
<p>The ${h.src('inpsAuu', 'INPS page')} confirms that the allowance can be claimed without an ISEE, at the minimum amounts set by law. The table compares the minimum allowance with the full one, paid with an ISEE up to ${h.eur(h.P.auu.soglia_min, 2)}.</p>
${h.table(['Children under 18', 'No ISEE, per month', 'Low ISEE, per month'], righe, '2026 child allowance without an ISEE and with an ISEE up to the lower limit (third-child supplements estimated)', ['r', 'r', 'r'])}
<h2>Why so many families skip the ISEE</h2>
<p>Some families fear their own home or savings will push them over the limit. From 2026, though, the child-allowance ISEE leaves out the home up to ${h.eur(h.P.isee.casa_soglia_fam)} and Italian government and postal bonds up to ${h.eur(h.P.isee.titoli_stato_esclusi_max)}. Before giving up, run the ${h.a('calcolo-isee', 'ISEE calculator')}: the ${h.eur(h.P.auu.soglia_max, 2)} upper limit is higher than many people think, especially with two or more children.</p>
<h2>How to put it right</h2>
<p>Just file the DSU, online with the ${h.a('isee-precompilato', 'pre-filled form')} if you like: INPS links the ISEE to your claim with no further steps. The timing rules in ${h.src('dlgs230', 'article 6 of Legislative Decree 230 of 2021')} apply every year, including the ${h.a('assegno-unico-2027', '2027 renewal')}.</p>`;
    },
  },
});
