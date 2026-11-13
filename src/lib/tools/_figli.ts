/** Champs communs « figli » des outils assegno unico. */
import { T, yn, type L } from '../minis/_kit';
import type { ToolInput } from '../tool-types';
export const campiFigli = (l: L, minori = 2): ToolInput[] => [
  { id: 'minori', label: T(l, 'Figli minorenni', 'Children under 18'), def: minori, max: 12 },
  { id: 'under1', label: T(l, 'Di cui sotto 1 anno', 'Of whom under 1'), def: 0, max: 6, avance: true },
  { id: 'tra1e3', label: T(l, 'Di cui tra 1 e 3 anni', 'Of whom aged 1 to 3'), def: 0, max: 6, avance: true },
  { id: 'maggiorenni', label: T(l, 'Figli tra 18 e 20 anni a carico', 'Dependent children aged 18 to 20'), def: 0, max: 6, avance: true },
  { id: 'lavorano', label: T(l, 'Entrambi i genitori lavorano?', 'Do both parents work?'), def: 1, options: yn(l), avance: true },
  { id: 'madre21', label: T(l, 'Madre sotto i 21 anni?', 'Mother under 21?'), def: 0, options: yn(l), avance: true },
];
export const auuInput = (v: Record<string, number>, isee: number | null) => ({ isee, minori: v.minori, under1: v.under1, tra1e3: v.tra1e3, maggiorenni: v.maggiorenni, entrambiLavorano: v.lavorano === 1, madreUnder21: v.madre21 === 1 });
