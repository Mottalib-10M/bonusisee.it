/**
 * Testeurs naïfs du 2026-11-14 : pour ISEE 20.000 € et 2 figli, l'assegno unico valait 446,10 € (page 2027)
 * et 382,30 € (page pagamento), parce que les outils comptaient d'office la maggiorazione « genitori entrambi
 * lavoratori » et pas les mini-calculs ni les textes. Même cas, même montant de base, sur toutes les pages.
 */
import { describe, expect, it } from 'vitest';
import { getTool } from './tool-specs';
import { getSpec } from './mini-specs';

const defaults = (inputs: Array<{ id: string; def: number }>) => Object.fromEntries(inputs.map((i) => [i.id, i.def]));
const val = (rows: Array<[string, string] | [string, string, boolean]>, label: string) => rows.find((r) => r[0].startsWith(label))?.[1];

describe('assegno unico : même cas, même montant', () => {
  it('page 2027 (rinnovo) = pagamento (quota) pour ISEE 20.000 € et 2 figli', () => {
    const t = getTool('rinnovo', 'it');
    const r = t.run({ ...defaults(t.inputs), isee: 20000, minori: 2 }, {});
    const q = getSpec('quota', 'it');
    const m = q.run({ ...defaults(q.inputs), isee: 20000, minori: 2 });
    expect(val(r.rows, 'Al mese con l’ISEE')).toBe(val(m.rows, 'Assegno del nucleo'));
  });
  it('senza ISEE : « fino a X in più » = écart du tableau (ISEE basso − senza ISEE)', () => {
    const t = getTool('auu', 'it', { senza: true, confronto: true });
    const r = t.run({ ...defaults(t.inputs), minori: 2 }, {});
    expect(r.alert).toContain('291');
  });
  it('la maggiorazione n’est comptée que si on répond « Sì », et elle est affichée à part sinon', () => {
    const t = getTool('rinnovo', 'it');
    const v = { ...defaults(t.inputs), isee: 20000, minori: 2 };
    const no = t.run(v, {}), si = t.run({ ...v, lavorano: 1 }, {});
    expect(val(no.rows, 'Non compreso')).toBeDefined();
    expect(val(si.rows, 'Non compreso')).toBeUndefined();
  });
});
