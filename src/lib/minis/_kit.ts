/** Petits outils communs aux mini-simulateurs et aux outils (fichier ignoré par les registres : préfixe « _ »). */
import { formatMoney, formatPercent, formatNumber } from '../format';
export type L = 'it' | 'en';
export const T = <A>(l: L, it: A, en: A) => (l === 'en' ? en : it);
export const eur = (x: number, l: L, d = 0) => formatMoney(x, d, l);
export const eur2 = (x: number, l: L) => formatMoney(x, Number.isInteger(Math.round(x * 100) / 100) ? 0 : 2, l);
export const pct = (x: number, l: L, d = 1) => formatPercent(x, d, l);
export const num = (x: number, l: L, d = 0) => formatNumber(x, d, l);
export const yn = (l: L) => [{ value: '0', label: 'No' }, { value: '1', label: l === 'en' ? 'Yes' : 'Sì' }];
export const data = (iso: string, l: L) => new Date(`${iso}T00:00:00Z`).toLocaleDateString(l === 'en' ? 'en-GB' : 'it-IT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const MESI = (l: L) => Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1), label: new Date(Date.UTC(2027, i, 1)).toLocaleDateString(l === 'en' ? 'en-GB' : 'it-IT', { month: 'long', timeZone: 'UTC' }) }));
/** Champ « ho l'ISEE / non ancora » et champ ISEE montré seulement s'il compte. */
export const campiIsee = (l: L, def: number, label?: string) => [
  { id: 'hai', label: T(l, 'Hai un ISEE valido?', 'Do you have a valid ISEE?'), def: 1, options: [{ value: '1', label: T(l, 'Sì, lo conosco', 'Yes, I know it') }, { value: '0', label: T(l, 'No, non ancora', 'No, not yet') }] },
  { id: 'isee', label: label ?? T(l, 'Valore ISEE', 'ISEE value'), def, unit: '€', max: 200000, showIf: (v: Record<string, number>) => v.hai === 1 },
];
export const iseeDi = (v: Record<string, number>) => (v.hai === 1 ? v.isee : null);
