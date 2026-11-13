/** Moteur lié aux paramètres : pages, outils et mini-simulateurs appellent ces fonctions, jamais un second calcul. */
import { params } from './params';
import * as B from './bonus';
export type { IseeInput, IseeResult, AuuInput, AuuResult, MammeInput, FasciaAcquisti } from './bonus';
export { addDays, daysBetween } from './bonus';
export const isee = (i: B.IseeInput) => B.isee(params, i);
export const scala = (i: Parameters<typeof B.scalaEquivalenza>[1], fam = false) => B.scalaEquivalenza(params, i, fam);
export const scalaBase = (n: number) => B.scalaBase(params, n);
export const iseeCorrente = (iseeAttuale: number, componenti: number, redditiDsu: number, redditi12: number) => B.iseeCorrente(params, iseeAttuale, componenti, redditiDsu, redditi12);
export const auu = (i: B.AuuInput) => B.assegnoUnico(params, i);
export const rinnovoAuu = (i: B.AuuInput, meseDsu: number) => B.rinnovoAuu(params, i, meseDsu);
export const rivalutazione = () => B.rivalutazione(params);
export const nido = (anno: number, iseeMin: number | null, retta: number, mesi: number) => B.nido(params, anno, iseeMin, retta, mesi);
export const nuoviNati = (iseeVal: number | null, nascita: string) => B.nuoviNati(params, iseeVal, nascita);
export const mamme = (i: B.MammeInput, anno: 2026 | 2027) => B.mamme(params, i, anno);
export const cartaAcquisti = (f: B.FasciaAcquisti, iseeVal: number | null, reddito: number) => B.cartaAcquisti(params, f, iseeVal, reddito);
export const adiPossibile = (iseeVal: number | null) => B.adiPossibile(params, iseeVal);
export const manovra2027 = (m: B.MammeInput, nati: number, versamenti: number) => B.manovra2027(params, m, nati, versamenti);
/** Famille d'exemple partagée par les pages (deux parents salariés, deux enfants de 4 et 8 ans, en location). */
export const ESEMPIO: B.IseeInput = { componenti: 4, figli: 2, minori: true, under3: false, lavoro: true, disabili: 0, redditoDip: 38000, percettoriDip: 2, redditoPensione: 0, altriRedditi: 0, affitto: 7800, mobiliare: 12000, casa: 0, altriImmobili: 0, metro: false };
