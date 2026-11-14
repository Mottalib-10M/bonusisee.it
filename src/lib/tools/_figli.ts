/** Champs communs « figli » des outils assegno unico. */
import { T, yn, eur2, type L } from '../minis/_kit';
import { auu } from '../engine/index';
import type { ToolInput } from '../tool-types';
export const campiFigli = (l: L, minori = 2): ToolInput[] => [
  { id: 'minori', label: T(l, 'Figli minorenni', 'Children under 18'), def: minori, max: 12 },
  { id: 'under1', label: T(l, 'Di cui sotto 1 anno', 'Of whom under 1'), def: 0, max: 6, avance: true },
  { id: 'tra1e3', label: T(l, 'Di cui tra 1 e 3 anni', 'Of whom aged 1 to 3'), def: 0, max: 6, avance: true },
  { id: 'maggiorenni', label: T(l, 'Figli tra 18 e 20 anni a carico', 'Dependent children aged 18 to 20'), def: 0, max: 6, avance: true },
  // Défaut « No » (testeurs naïfs du 2026-11-14) : avec « Sì », 20.000 € et 2 figli donnaient 446,10 € ici et 382,30 €
  // dans les mini-calculs et les textes, qui comptent l'importo base. Partout le même montant de base ; la maggiorazione
  // stimata s'affiche à part (rigaLavoratori) et s'ajoute seulement si on répond « Sì ».
  { id: 'lavorano', label: T(l, 'Entrambi i genitori lavorano?', 'Do both parents work?'), def: 0, options: yn(l), avance: true },
  { id: 'madre21', label: T(l, 'Madre sotto i 21 anni?', 'Mother under 21?'), def: 0, options: yn(l), avance: true },
];
export const auuInput = (v: Record<string, number>, isee: number | null) => ({ isee, minori: v.minori, under1: v.under1, tra1e3: v.tra1e3, maggiorenni: v.maggiorenni, entrambiLavorano: v.lavorano === 1, madreUnder21: v.madre21 === 1 });
/** Ligne « se lavorano entrambi i genitori : + X € al mese » quand la maggiorazione n'est pas comptée. */
export const rigaLavoratori = (l: L, v: Record<string, number>, isee: number | null): [string, string] | null => {
  if (v.lavorano === 1 || isee === null) return null;
  const plus = auu(auuInput({ ...v, lavorano: 1 }, isee)).lavoratori;
  return plus > 0 ? [T(l, 'Non compreso: se lavorano entrambi i genitori (stima)', 'Not included: if both parents work (estimate)'), `+${eur2(plus, l)} ${T(l, 'al mese', 'a month')}`] : null;
};
