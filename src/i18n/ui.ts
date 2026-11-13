import type { Locale } from './routes';
const it = {
  updatedOn: 'Aggiornato il', editorialPolicy: 'Politica editoriale', contactLabel: 'Contatti', reviewedBy: 'Verificato da',
  skipToContent: 'Vai al contenuto', mainNav: 'Navigazione principale', breadcrumbLabel: 'Percorso', breadcrumbHome: 'Home', menuOpen: 'Apri il menu',
  faqTitle: 'Domande frequenti', relatedCalculators: 'Pagine e calcoli collegati', sourcesTitle: 'Fonti', writtenBy: 'Scritto da',
  asOf: 'Regole in vigore nel', lastUpdated: 'testi riletti il', footerValidated: 'Fonti: Normattiva, schede e circolari INPS, MEF, Ragioneria generale dello Stato', footerBrowser: 'Nessun account · nulla di ciò che scrivi viene inviato o conservato · calcolo nel browser · gratis',
  footerDisclaimer: 'Sito indipendente pubblicato da Radif Partners. Non è il sito dell’INPS, del MEF, di un Comune o di un CAF e non presenta domande per conto di nessuno: nessun legame commerciale, nessuna commissione. Gli importi sono stime indicative calcolate dai testi di legge; le novità 2027 vengono da un disegno di legge non ancora votato. Fanno fede l’attestazione ISEE e le decisioni dell’INPS.', footerPopular: '', notFound: 'Questa pagina non esiste.',
  readMore: 'Leggi tutto',
};
const en: typeof it = {
  updatedOn: 'Updated on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Checked by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Frequently asked questions', relatedCalculators: 'Related pages and calculations', sourcesTitle: 'Sources', writtenBy: 'Written by',
  asOf: 'Rules in force in', lastUpdated: 'texts reread on', footerValidated: 'Sources: Normattiva, INPS guidance and circulars, the Ministry of Economy and the State General Accounting Office', footerBrowser: 'No account · nothing is sent or stored · runs in your browser · free',
  footerDisclaimer: 'Independent site published by Radif Partners. It is not the site of INPS, the Ministry of Economy, a comune or a CAF and files no application for anyone: no commercial link, no commission. Amounts are estimates only, worked out from the legal texts; the 2027 changes come from a budget bill not yet voted. Only the ISEE certificate and INPS decisions are binding.', footerPopular: '', notFound: 'This page does not exist.',
  readMore: 'Read more',
};
export function t(lang: Locale) { return lang === 'en' ? en : it; }
