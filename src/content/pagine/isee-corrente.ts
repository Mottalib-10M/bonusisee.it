import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'isee-corrente',
  group: 'isee',
  order: 4,
  tool: 'corrente',
  related: ['calcolo-isee', 'isee-precompilato', 'assegno-unico-importo'],
  sources: ['dpcm159', 'inpsPortaleIsee'],
  it: {
    slug: 'isee-corrente',
    nav: 'ISEE corrente',
    card: 'Se i redditi sono calati di oltre il 25% o hai perso il lavoro: quando conviene e quanto scende.',
    title: 'ISEE corrente 2026: quando si chiede e quanto può scendere',
    description: 'ISEE corrente 2026: si chiede se i redditi scendono di oltre il 25% o dopo la perdita del lavoro, vale sei mesi e usa gli ultimi dodici mesi. Stima il valore.',
    h1: 'ISEE corrente: quando si chiede e quanto scende',
    intro: 'L’ISEE corrente sostituisce i redditi di due anni fa con quelli degli ultimi dodici mesi: la stima dice se puoi chiederlo e di quanto scenderebbe il tuo indicatore.',
    resume: (h) => {
      const c = h.M.iseeCorrente(15000, 3, 30000, 20000);
      return `L’ISEE ordinario guarda indietro di due anni: la DSU 2026 usa i redditi del 2024. Chi nel frattempo ha perso il lavoro o ha visto calare le entrate rischia di restare fuori da un bonus per una situazione che non esiste più. L’articolo 9 del DPCM n. 159 del 2013 prevede per questo l’ISEE corrente, che ricalcola l’indicatore dei redditi sugli ultimi dodici mesi (o sui due mesi precedenti moltiplicati per sei, per chi ha perso un posto a tempo indeterminato o un trattamento). Si può chiedere se c’è un ISEE ordinario valido e se un componente ha perso il lavoro, ha avuto una sospensione o riduzione dell’attività, ha smesso di ricevere trattamenti, oppure se l’indicatore dei redditi è cambiato di oltre il ${h.pct(h.P.isee.corrente_variazione_min, 0)}. Vale ${h.num(h.P.isee.corrente_validita_mesi)} mesi. In una famiglia di tre persone con un ISEE di ${h.eur(15000)} e redditi scesi da ${h.eur(30000)} a ${h.eur(20000)}, il calo è del ${h.pct(c.variazione, 0)} e l’ISEE corrente stimato è di ${h.eur(c.stima)}.`;
    },
    faqs: (h) => [
      { q: 'Serve un ISEE ordinario per chiedere quello corrente?', a: 'Sì. L’ISEE corrente si aggiunge a un ISEE ordinario in corso di validità: si presenta un modulo integrativo alla DSU con i redditi aggiornati dei componenti per cui c’è stata la variazione. Senza la DSU ordinaria il modulo non può essere elaborato, quindi la prima mossa resta sempre la DSU.' },
      { q: 'L’ISEE corrente cambia anche il patrimonio?', a: 'Di regola cambia solo la parte dei redditi. Dal 1° aprile di ogni anno l’articolo 9 del DPCM n. 159 del 2013 permette però anche un ISEE corrente patrimoniale, se il patrimonio dell’anno precedente differisce di oltre il 20 per cento da quello della DSU; questo vale fino al 31 dicembre. La stima di questa pagina tiene fermo il patrimonio.' },
      { q: 'Quanto dura e cosa succede dopo sei mesi?', a: `L’ISEE corrente vale ${h.num(h.P.isee.corrente_validita_mesi)} mesi dalla presentazione del modulo, a meno che nel frattempo la situazione cambi di nuovo: in quel caso va aggiornato entro due mesi. Alla scadenza torna a valere l’ISEE ordinario, se ancora valido, oppure si presenta un nuovo modulo se le condizioni ci sono ancora.` },
    ],
    body: (h) => `<h2>Quando si può chiedere l’ISEE corrente</h2>
<p>L’${h.src('dpcm159', 'articolo 9 del DPCM n. 159 del 2013')} elenca due strade. La prima è un evento: un dipendente a tempo indeterminato licenziato, sospeso o con orario ridotto, un lavoratore a termine senza contratto dopo almeno 120 giorni di lavoro negli ultimi dodici mesi, un autonomo che ha chiuso un’attività durata almeno dodici mesi, oppure la fine di un trattamento assistenziale o previdenziale. La seconda è numerica: una variazione dell’indicatore dei redditi superiore al ${h.pct(h.P.isee.corrente_variazione_min, 0)} rispetto a quello della DSU. Il simulatore controlla la seconda strada sui tuoi numeri e accetta la prima con la domanda sul lavoro perso.</p>
<h2>Quanto scende l’ISEE corrente</h2>
<p>Il calo dei redditi entra nell’ISE e viene diviso per la scala di equivalenza della famiglia: con tre persone la scala è ${h.num(h.M.scalaBase(3), 2)}, quindi ${h.eur(10000)} di redditi in meno abbassano l’ISEE di circa ${h.eur(10000 / h.M.scalaBase(3))}. La stima tiene fermi patrimonio e maggiorazioni, che l’ISEE corrente non tocca, e non applica le detrazioni sui nuovi redditi: per questo è prudente.</p>
<h2>Come si presenta</h2>
<p>Il modulo integrativo si compila sul ${h.src('inpsPortaleIsee', 'Portale unico ISEE')} o presso un CAF, con le buste paga, le certificazioni dei trattamenti o i documenti dell’attività autonoma degli ultimi mesi. Con un ISEE più basso si può poi aggiornare la domanda di ${h.a('assegno-unico-importo', 'assegno unico')} e di altri bonus.</p>`,
  },
  en: {
    slug: 'current-isee',
    nav: 'Current ISEE',
    card: 'If income fell by more than 25% or you lost your job: when it pays off and how far it drops.',
    title: 'Current ISEE 2026: when to apply and how far it can drop',
    description: 'Current ISEE 2026: available if income falls by over 25% or after losing a job, valid six months, based on the last twelve months. Estimate the new value.',
    h1: 'Current ISEE: when to apply and how far it drops',
    intro: 'The current ISEE swaps two-year-old income for the last twelve months: the estimate tells you whether you can apply and how far your indicator would fall.',
    resume: (h) => {
      const c = h.M.iseeCorrente(15000, 3, 30000, 20000);
      return `The standard ISEE looks back two years: the 2026 DSU uses 2024 income. Anyone who has since lost a job or seen income fall risks missing a bonus because of a situation that no longer exists. Article 9 of Decree 159 of 2013 therefore provides the current ISEE (ISEE corrente), which recalculates the income indicator on the last twelve months (or on the previous two months multiplied by six, for those who lost a permanent job or a benefit). You can ask for it if there is a valid standard ISEE and a member has lost a job, had work suspended or cut, stopped receiving a benefit, or if the income indicator has changed by more than ${h.pct(h.P.isee.corrente_variazione_min, 0)}. It is valid for ${h.num(h.P.isee.corrente_validita_mesi)} months. In a household of three with an ISEE of ${h.eur(15000)} and income down from ${h.eur(30000)} to ${h.eur(20000)}, the fall is ${h.pct(c.variazione, 0)} and the estimated current ISEE is ${h.eur(c.stima)}.`;
    },
    faqs: (h) => [
      { q: 'Do I need a standard ISEE to ask for the current one?', a: 'Yes. The current ISEE is added to a valid standard ISEE: you file a supplementary form to the DSU with the updated income of the members whose situation changed. Without the standard DSU the form cannot be processed, so the first step is always the DSU.' },
      { q: 'Does the current ISEE also change assets?', a: 'As a rule only the income part changes. From 1 April each year, however, article 9 of Decree 159 of 2013 also allows an asset-based current ISEE if the previous year’s assets differ by more than 20 per cent from those in the DSU; that one lasts until 31 December. The estimate on this page keeps assets unchanged.' },
      { q: 'How long does it last and what happens after six months?', a: `The current ISEE is valid for ${h.num(h.P.isee.corrente_validita_mesi)} months from filing the form, unless your situation changes again in the meantime: then it must be updated within two months. When it expires the standard ISEE applies again, if still valid, or you file a new form if the conditions still hold.` },
    ],
    body: (h) => `<h2>When you can ask for the current ISEE</h2>
<p>${h.src('dpcm159', 'Article 9 of Decree 159 of 2013')} offers two routes. The first is an event: a permanent employee dismissed, suspended or put on shorter hours, a fixed-term worker left without a contract after at least 120 days of work in the last twelve months, a self-employed person who closed a business that ran for at least twelve months, or the end of a welfare or pension benefit. The second is numerical: a change in the income indicator of more than ${h.pct(h.P.isee.corrente_variazione_min, 0)} compared with the DSU. The calculator checks the second route on your figures and accepts the first through the lost-job question.</p>
<h2>How far the current ISEE falls</h2>
<p>The drop in income goes into the ISE and is divided by the household’s equivalence scale: with three people the scale is ${h.num(h.M.scalaBase(3), 2)}, so ${h.eur(10000)} less income lowers the ISEE by about ${h.eur(10000 / h.M.scalaBase(3))}. The estimate keeps assets and supplements fixed, as the current ISEE does not touch them, and applies no deductions to the new income: it is therefore cautious.</p>
<h2>How to file it</h2>
<p>The supplementary form is filled in on the ${h.src('inpsPortaleIsee', 'INPS single ISEE portal')} or at a CAF, with recent payslips, benefit statements or self-employment records. With a lower ISEE you can then update your ${h.a('assegno-unico-importo', 'child allowance')} and other bonus claims.</p>`,
  },
});
