/** Champs communs du bonus mamme (2026 et DDL 2027). */
import { T, yn, type L } from '../minis/_kit';
import type { ToolInput } from '../tool-types';
export const campiMamme = (l: L, avanzati = false): ToolInput[] => [
  { id: 'figli', label: T(l, 'Numero di figli', 'Number of children'), def: 2, max: 12 },
  { id: 'eta', label: T(l, 'Età del figlio più piccolo (anni compiuti)', 'Youngest child’s age (completed years)'), def: 4, max: 30 },
  { id: 'mesi', label: T(l, 'Mesi di lavoro nell’anno', 'Months worked in the year'), def: 12, max: 12, avance: avanzati },
  { id: 'reddito', label: T(l, 'Reddito da lavoro annuo della madre', 'Mother’s annual earned income'), def: 28000, unit: '€', max: 1000000, avance: avanzati },
  { id: 'cdi', label: T(l, 'Contratto a tempo indeterminato?', 'Permanent employment contract?'), def: 0, options: yn(l), avance: true },
];
export const mammeInput = (v: Record<string, number>) => ({ figli: v.figli, etaPiuPiccolo: v.eta, mesi: v.mesi, cdi: v.cdi === 1, reddito: v.reddito });
export const motivo = (l: L, m: string) => ({
  figli: T(l, 'servono almeno due figli', 'at least two children are needed'),
  reddito: T(l, 'il reddito da lavoro supera 40.000 €', 'earned income is above €40,000'),
  eta: T(l, 'il figlio più piccolo ha superato il limite di età', 'the youngest child is over the age limit'),
  cdi: T(l, 'con tre o più figli il contratto a tempo indeterminato esclude il bonus 2026', 'with three or more children a permanent contract rules out the 2026 bonus'),
  mesi: T(l, 'nessun mese di lavoro', 'no months worked'),
} as Record<string, string>)[m] ?? m;
