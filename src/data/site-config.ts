/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://bonusisee.it";
export const SITE_NAMES: Record<string, string> = {"it": "Bonus ISEE", "en": "Bonus ISEE"};
// Partie du nom affichée en couleur dans l'en-tête (RECETTE §10.3), « » pour aucune.
export const BRAND_ACCENT = "ISEE";
export const LANG_TAGS: Record<string, string> = {"it": "it-IT", "en": "en-IT"};
export const OG_LOCALES: Record<string, string> = {"it": "it_IT", "en": "en_GB"};
export const LOCALE_TAG = 'it-IT';
export const CURRENCY = 'EUR';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
/** Une locale par langue (RECETTE §4) : virgule décimale en italien, point en anglais. */
export const LOCALE_BY_LANG: Record<string, string> = { it: 'it-IT', en: 'en-GB' };
export const LAST_UPDATED = '2026-11-13';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"it": "Editore di strumenti indipendenti su ISEE, assegno unico e bonus per le famiglie: stima dell'ISEE, importo dell'assegno, bonus a cui si ha diritto e calendrario 2026-2027", "en": "Publisher of independent tools on Italy's ISEE, the universal child allowance and family bonuses: ISEE estimate, allowance amount, eligible bonuses and the 2026-2027 calendar"};
export const AUTHOR_DESC: Record<string, string> = {"it": "Radif Partners legge il DPCM n. 159 del 2013, il decreto legislativo n. 230 del 2021, la legge n. 199 del 2025, il disegno di legge di bilancio 2027 e le schede dell'INPS, del MEF e di ARERA, e ne ricava strumenti che girano interamente nel browser: stima indicativa dell'ISEE, importo dell'assegno unico, bonus nido, nuovi nati e mamme, carta acquisti. Radif Partners non è l'INPS, non è un CAF e non presenta domande per conto di nessuno.", "en": "Radif Partners reads Italian Decree 159/2013, Legislative Decree 230/2021, Law 199/2025, the 2027 budget bill and the guidance of INPS, the Ministry of Economy and ARERA, and turns them into tools that run entirely in your browser: an indicative ISEE estimate, the universal child allowance, the nursery, newborn and working-mother bonuses and the shopping card. It is not INPS or a CAF and files no application for anyone."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"it": ["ISEE e DSU (DPCM n. 159/2013)", "Assegno unico e universale (D.Lgs. n. 230/2021)", "Bonus asilo nido", "Bonus nuovi nati", "Bonus mamme 2026 e 2027", "Carta acquisti e Assegno di inclusione", "Legge di bilancio 2027 per le famiglie"], "en": ["Italy's ISEE means test", "Italy's universal child allowance", "Italy's nursery bonus", "Italy's newborn bonus", "Italy's working-mother bonus", "Italy's shopping card and inclusion allowance", "Italy's 2027 budget for families"]};
export const CONTACT_EMAIL = "contatti@bonusisee.it";
export const THEME_COLOR = '#1F6E4A';
export const LOGO_SYMBOL = 'ISEE';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = '';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = '';
export const INDEXNOW_KEY = '229d4a00ad84387e82071850725e349f';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',            // raison sociale ou nom commercial exploité
  legalForm: '',  // vide : publication à titre personnel, pas de société
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "Partita IVA / TVA",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city'];

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
