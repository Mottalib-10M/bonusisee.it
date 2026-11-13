/**
 * Moteur du site : fonctions pures, paramètres passés en argument (src/data/params-2026.json).
 * ISEE (DPCM 159/2013 + L. 199/2025 c. 208), assegno unico (D.Lgs. 230/2021 art. 4, soglie INPS 2026),
 * bonus nido, nuovi nati, mamme 2026, carta acquisti, ADI, et les mesures du DDL de bilancio 2027.
 * Aucune page n'écrit un chiffre à la main : elles appellent ces fonctions.
 */
export interface Params {
  isee: {
    scala: number[]; scala_extra: number; magg_figli_ord: Record<string, number>; magg_figli_fam: Record<string, number>;
    magg_minori: number; magg_minori_under3: number; magg_disabile: number; quota_patrimonio: number;
    ded_dip_quota: number; ded_dip_max: number; ded_pens_quota: number; ded_pens_max: number;
    ded_affitto_max: number; ded_affitto_figlio_oltre_secondo: number;
    franchigia_mob_base: number; franchigia_mob_per_componente: number; franchigia_mob_max: number; franchigia_mob_figlio_oltre_secondo: number;
    casa_soglia_ord: number; casa_soglia_ord_figlio_oltre_secondo: number; casa_soglia_fam: number; casa_soglia_fam_metro: number;
    casa_soglia_fam_figlio_oltre_primo: number; casa_quota_eccedente: number; corrente_variazione_min: number; corrente_validita_mesi: number;
  };
  auu: {
    soglia_min: number; soglia_max: number; minore_max: number; minore_min: number; legge_soglia_min: number; legge_soglia_max: number;
    legge_maggiorenne_max: number; legge_maggiorenne_min: number; legge_oltre_secondo_max: number; legge_oltre_secondo_min: number;
    legge_lavoratori_max: number; legge_madre_under21: number; legge_quattro_figli: number; incremento_under1: number;
  };
  nido: { nati_dal: string; nuovi_importo: number; nuovi_soglia: number; fascia1_soglia: number; fascia1_importo: number; fascia2_soglia: number; fascia2_importo: number; minimo: number; mensilita: number };
  nuovi_nati: { importo: number; soglia: number; giorni_domanda: number; nati_dal: string; termine_eventi_2026_prima_apertura: string };
  mamme2026: { mensile: number; mesi_max: number; reddito_max: number; eta_secondo_figlio_max: number; eta_piu_piccolo_max: number };
  carta_acquisti: { bimestre: number; isee_max: number; reddito_65_70_max: number; reddito_70_max: number };
  adi: { isee_max: number };
  ddl2027: { stato: string; mamme_mensile: number; valore_nuovi_nati_annuo: number; valore_nuovi_nati_eta: number; detrazione_versamenti: number; detrazione_versamenti_max: number; congedo_80_attuale_mesi: number; congedo_80_mesi: number[] };
}

const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));
const r2 = (x: number) => Math.round(x * 100) / 100;

/* ------------------------------------------------------------------ ISEE */

export interface IseeInput {
  /** Componenti del nucleo (1-10). */
  componenti: number;
  /** Figli nel nucleo (di cui minorenni : `minori`). */
  figli: number;
  minori: boolean;
  /** Almeno un figlio sotto i 3 anni. */
  under3: boolean;
  /** Entrambi i genitori (o l'unico) hanno lavorato almeno 6 mesi, oppure genitore solo con figli minori (all. 1, lett. b-c). */
  lavoro: boolean;
  disabili: number;
  /** Redditi lordi da lavoro dipendente del nucleo (anno t-2) e numero di percettori. */
  redditoDip: number;
  percettoriDip: number;
  redditoPensione: number;
  altriRedditi: number;
  /** Canone annuo di affitto registrato (0 se casa di proprietà). */
  affitto: number;
  /** Depositi, titoli e altro patrimonio mobiliare al 31/12 (t-2 / t-1). */
  mobiliare: number;
  /** Valore IMU della casa di abitazione, al netto del mutuo residuo. */
  casa: number;
  altriImmobili: number;
  /** Residenza in un comune capoluogo di città metropolitana (franchigia 120.000 €). */
  metro: boolean;
}

export interface IseeResult {
  isr: number; isp: number; ise: number; scala: number; isee: number;
  /** ISEE per le prestazioni familiari (AUU, nido, nuovi nati, ADI, SFL : L. 199/2025 c. 208). */
  iseeFam: number; ispFam: number; scalaFam: number;
  dedRedditi: number; dedAffitto: number; franchigiaMob: number; casaContata: number; casaContataFam: number;
}

export function scalaBase(p: Params, n: number): number {
  const s = p.isee.scala;
  return n <= s.length ? s[Math.max(1, n) - 1] : s[s.length - 1] + (n - s.length) * p.isee.scala_extra;
}
function maggFigli(tab: Record<string, number>, figli: number): number {
  const keys = Object.keys(tab).map(Number).sort((a, b) => a - b);
  let m = 0;
  for (const k of keys) if (figli >= k) m = tab[String(k)];
  return m;
}
export function scalaEquivalenza(p: Params, i: Pick<IseeInput, 'componenti' | 'figli' | 'minori' | 'under3' | 'lavoro' | 'disabili'>, fam = false): number {
  let s = scalaBase(p, i.componenti);
  s += maggFigli(fam ? p.isee.magg_figli_fam : p.isee.magg_figli_ord, i.figli);
  if (i.minori && i.lavoro) s += i.under3 ? p.isee.magg_minori_under3 : p.isee.magg_minori;
  s += p.isee.magg_disabile * Math.max(0, i.disabili);
  return r2(s);
}

export function isee(p: Params, i: IseeInput): IseeResult {
  const P = p.isee;
  const oltre2 = Math.max(0, i.figli - 2);
  const percettori = Math.max(1, Math.round(i.percettoriDip));
  const dedDip = Math.min(P.ded_dip_quota * i.redditoDip, P.ded_dip_max * percettori);
  const dedPens = Math.min(P.ded_pens_quota * i.redditoPensione, P.ded_pens_max);
  const lordo = i.redditoDip + i.redditoPensione + i.altriRedditi;
  const dedAffitto = Math.min(i.affitto, P.ded_affitto_max + P.ded_affitto_figlio_oltre_secondo * oltre2);
  const isr = Math.max(0, lordo - dedDip - dedPens - dedAffitto);
  const franchigiaMob = Math.min(P.franchigia_mob_base + P.franchigia_mob_per_componente * Math.max(0, i.componenti - 1), P.franchigia_mob_max) + P.franchigia_mob_figlio_oltre_secondo * oltre2;
  const mob = Math.max(0, i.mobiliare - franchigiaMob);
  const sogliaOrd = P.casa_soglia_ord + P.casa_soglia_ord_figlio_oltre_secondo * oltre2;
  const sogliaFam = (i.metro ? P.casa_soglia_fam_metro : P.casa_soglia_fam) + P.casa_soglia_fam_figlio_oltre_primo * Math.max(0, i.figli - 1);
  const casaContata = i.casa > sogliaOrd ? (i.casa - sogliaOrd) * P.casa_quota_eccedente : 0;
  const casaContataFam = i.casa > sogliaFam ? (i.casa - sogliaFam) * P.casa_quota_eccedente : 0;
  const isp = mob + i.altriImmobili + casaContata;
  const ispFam = mob + i.altriImmobili + casaContataFam;
  const scala = scalaEquivalenza(p, i, false);
  const scalaFam = scalaEquivalenza(p, i, true);
  const ise = isr + P.quota_patrimonio * isp;
  const iseFam = isr + P.quota_patrimonio * ispFam;
  return {
    isr: r2(isr), isp: r2(isp), ise: r2(ise), scala, isee: r2(ise / scala),
    iseeFam: r2(iseFam / scalaFam), ispFam: r2(ispFam), scalaFam,
    dedRedditi: r2(dedDip + dedPens), dedAffitto: r2(dedAffitto), franchigiaMob, casaContata: r2(casaContata), casaContataFam: r2(casaContataFam),
  };
}

/** ISEE corrente (art. 9 DPCM 159) : variazione dei redditi e stima del nuovo indicatore. */
export function iseeCorrente(p: Params, iseeAttuale: number, componenti: number, redditiDsu: number, redditi12: number) {
  const variazione = redditiDsu > 0 ? (redditiDsu - redditi12) / redditiDsu : 0;
  const ammesso = variazione > p.isee.corrente_variazione_min;
  const scala = scalaBase(p, componenti);
  const stima = Math.max(0, iseeAttuale - Math.max(0, redditiDsu - redditi12) / scala);
  return { variazione, ammesso, stima: r2(stima), scala, validitaMesi: p.isee.corrente_validita_mesi };
}

/* ---------------------------------------------------------- Assegno unico */

export interface AuuInput {
  /** ISEE valido ; null = domanda senza ISEE (importi minimi). */
  isee: number | null;
  minori: number;
  /** Di cui sotto 1 anno. */
  under1: number;
  /** Di cui tra 1 e 3 anni. */
  tra1e3: number;
  /** Figli 18-20 anni a carico (studio, lavoro con reddito < 8.000 €, disoccupati, servizio civile). */
  maggiorenni: number;
  entrambiLavorano: boolean;
  madreUnder21: boolean;
}
export interface AuuResult {
  mensile: number; annuo: number; perMinore: number; perMaggiorenne: number;
  incrementoUnder1: number; incremento1e3: number; oltreSecondo: number; lavoratori: number; madre: number; quattroFigli: number;
  /** Quota dell'ISEE nella fascia decrescente (0 = importo pieno, 1 = minimo). */
  fascia: number; coefficiente: number;
}

/** Coefficiente di rivalutazione 2026 dedotto dalle soglie INPS (46.582,71 / 40.000). */
export const rivalutazione = (p: Params) => p.auu.soglia_max / p.auu.legge_soglia_max;

export function assegnoUnico(p: Params, i: AuuInput): AuuResult {
  const A = p.auu;
  const k = rivalutazione(p);
  const f = i.isee === null ? 1 : clamp((i.isee - A.soglia_min) / (A.soglia_max - A.soglia_min), 0, 1);
  const sottoMax = i.isee !== null && i.isee < A.soglia_max;
  const minori = Math.max(0, Math.round(i.minori));
  const maggiorenni = Math.max(0, Math.round(i.maggiorenni));
  const under1 = clamp(Math.round(i.under1), 0, minori);
  const tra1e3 = clamp(Math.round(i.tra1e3), 0, minori - under1);
  const figli = minori + maggiorenni;
  const perMinore = A.minore_max - f * (A.minore_max - A.minore_min);
  const perMaggiorenne = k * (A.legge_maggiorenne_max - f * (A.legge_maggiorenne_max - A.legge_maggiorenne_min));
  const oltreUnit = k * (A.legge_oltre_secondo_max - f * (A.legge_oltre_secondo_max - A.legge_oltre_secondo_min));
  const oltreSecondo = oltreUnit * Math.max(0, figli - 2);
  const incrementoUnder1 = A.incremento_under1 * perMinore * under1;
  const incremento1e3 = figli >= 3 && i.isee !== null && i.isee <= A.soglia_max ? A.incremento_under1 * perMinore * tra1e3 : 0;
  const lavoratori = i.entrambiLavorano && sottoMax ? k * A.legge_lavoratori_max * (1 - f) * minori : 0;
  const madre = i.madreUnder21 ? k * A.legge_madre_under21 * figli : 0;
  const quattroFigli = figli >= 4 ? A.legge_quattro_figli : 0;
  const mensile = perMinore * minori + perMaggiorenne * maggiorenni + oltreSecondo + incrementoUnder1 + incremento1e3 + lavoratori + madre + quattroFigli;
  return {
    mensile: r2(mensile), annuo: r2(mensile * 12), perMinore: r2(perMinore), perMaggiorenne: r2(perMaggiorenne),
    incrementoUnder1: r2(incrementoUnder1), incremento1e3: r2(incremento1e3), oltreSecondo: r2(oltreSecondo), lavoratori: r2(lavoratori),
    madre: r2(madre), quattroFigli: r2(quattroFigli), fascia: f, coefficiente: k,
  };
}

/** Rinnovo 2027 : DSU presentata nel mese `meseDsu` (1-12) del 2027. Annualità marzo 2027 - febbraio 2028. */
export function rinnovoAuu(p: Params, i: AuuInput, meseDsu: number) {
  const con = assegnoUnico(p, i).mensile;
  const senza = assegnoUnico(p, { ...i, isee: null }).mensile;
  const m = clamp(Math.round(meseDsu), 1, 12);
  const arretrati = m <= 6;
  // Mesi dell'annualità (da marzo) pagati con l'importo minimo, senza arretrati se la DSU arriva dopo giugno.
  const mesiMinimo = arretrati ? 0 : Math.min(12, m - 2); // da marzo al mese della DSU compreso : l'importo pieno decorre dal mese successivo (scheda INPS)
  return { con: r2(con), senza: r2(senza), differenza: r2(con - senza), arretrati, mesiMinimo, perdita: r2(mesiMinimo * (con - senza)), annuo: r2(con * (12 - mesiMinimo) + senza * mesiMinimo) };
}

/* ------------------------------------------------------------------ Bonus */

export function nido(p: Params, annoNascita: number, iseeMin: number | null, retta: number, mesi: number) {
  const N = p.nido;
  const nuovi = annoNascita >= Number(N.nati_dal.slice(0, 4));
  let importo: number;
  if (iseeMin === null) importo = N.minimo;
  else if (nuovi) importo = iseeMin <= N.nuovi_soglia ? N.nuovi_importo : N.minimo;
  else importo = iseeMin <= N.fascia1_soglia ? N.fascia1_importo : iseeMin <= N.fascia2_soglia ? N.fascia2_importo : N.minimo;
  const rata = importo / N.mensilita;
  const m = clamp(Math.round(mesi), 0, N.mensilita);
  const perMese = Math.min(rata, Math.max(0, retta));
  return { importo, rata: r2(rata), perMese: r2(perMese), totale: r2(perMese * m), mesi: m, nuovi, limitatoDallaRetta: retta < rata };
}

const addDays = (iso: string, n: number) => { const d = new Date(`${iso}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
export { addDays };
export const daysBetween = (a: string, b: string) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000);

export function nuoviNati(p: Params, iseeVal: number | null, nascita: string) {
  const N = p.nuovi_nati;
  const dopo = nascita >= N.nati_dal;
  const sotto = iseeVal !== null && iseeVal <= N.soglia;
  let termine = addDays(nascita, N.giorni_domanda);
  if (nascita.startsWith('2026') && termine < N.termine_eventi_2026_prima_apertura) termine = N.termine_eventi_2026_prima_apertura;
  return { spetta: dopo && sotto, dopo, sotto, importo: dopo && sotto ? N.importo : 0, termine };
}

export interface MammeInput { figli: number; etaPiuPiccolo: number; mesi: number; cdi: boolean; reddito: number }
/** Bonus mamme 2026 (L. 199/2025 c. 207) e 2027 (DDL di bilancio, art. 57). */
export function mamme(p: Params, i: MammeInput, anno: 2026 | 2027) {
  const M = p.mamme2026;
  const mensile = anno === 2026 ? M.mensile : p.ddl2027.mamme_mensile;
  const figli = Math.round(i.figli);
  const limiteEta = figli >= 3 ? M.eta_piu_piccolo_max : M.eta_secondo_figlio_max;
  const motivi: string[] = [];
  if (figli < 2) motivi.push('figli');
  if (i.reddito > M.reddito_max) motivi.push('reddito');
  if (figli >= 2 && i.etaPiuPiccolo >= limiteEta) motivi.push('eta');
  if (anno === 2026 && figli >= 3 && i.cdi) motivi.push('cdi');
  if (i.mesi <= 0) motivi.push('mesi');
  const mesi = motivi.length ? 0 : clamp(Math.round(i.mesi), 0, M.mesi_max);
  return { spetta: motivi.length === 0, motivi, mesi, mensile, totale: mesi * mensile, compieNellAnno: figli >= 2 && i.etaPiuPiccolo === limiteEta - 1 };
}

export type FasciaAcquisti = 'bimbo' | '65' | '70';
export function cartaAcquisti(p: Params, fascia: FasciaAcquisti, iseeVal: number | null, reddito: number) {
  const C = p.carta_acquisti;
  const iseeOk = iseeVal !== null && iseeVal <= C.isee_max;
  const redditoOk = fascia === 'bimbo' ? true : reddito <= (fascia === '70' ? C.reddito_70_max : C.reddito_65_70_max);
  const spetta = iseeOk && redditoOk;
  return { spetta, iseeOk, redditoOk, annuo: spetta ? C.bimestre * 6 : 0, bimestre: C.bimestre };
}

export const adiPossibile = (p: Params, iseeVal: number | null) => iseeVal !== null && iseeVal <= p.adi.isee_max;

/* ---------------------------------------------------------- Manovra 2027 */

export function manovra2027(p: Params, mamma: MammeInput, nati2027: number, versamentiParenti: number) {
  const D = p.ddl2027;
  const m26 = mamme(p, mamma, 2026);
  const m27 = mamme(p, mamma, 2027);
  const fondo = Math.max(0, Math.round(nati2027)) * D.valore_nuovi_nati_annuo;
  const versato = Math.min(Math.max(0, versamentiParenti), D.detrazione_versamenti_max);
  const detrazione = r2(versato * D.detrazione_versamenti);
  return { mamme2026: m26.totale, mamme2027: m27.totale, differenzaMamme: m27.totale - m26.totale, fondo, fondo18: fondo * D.valore_nuovi_nati_eta, detrazione, stato: D.stato };
}
