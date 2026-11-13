import { describe, it, expect } from 'vitest';
import * as M from './index';
import { P } from './params';

describe('ISEE (DPCM 159/2013)', () => {
  it('scala di equivalenza : tabella e +0,35 oltre 5', () => {
    expect(M.scalaBase(1)).toBe(1); expect(M.scalaBase(4)).toBe(2.46); expect(M.scalaBase(6)).toBeCloseTo(3.2, 5);
  });
  it('maggiorazioni : figli minori con genitori lavoratori, sotto 3 anni, 3 figli', () => {
    const base = { componenti: 5, figli: 3, minori: true, under3: true, lavoro: true, disabili: 0 };
    expect(M.scala(base)).toBeCloseTo(2.85 + 0.2 + 0.3, 5);
    expect(M.scala(base, true)).toBeCloseTo(2.85 + 0.25 + 0.3, 5);
    expect(M.scala({ ...base, lavoro: false })).toBeCloseTo(3.05, 5);
  });
  it('famiglia di esempio : ISR, franchigia mobiliare e ISEE', () => {
    const r = M.isee(M.ESEMPIO);
    // 38.000 − min(7.600 ; 6.000) − 7.000 = 25.000 ; mobiliare 12.000 − 10.000 = 2.000 ; ISE = 25.400
    expect(r.isr).toBe(25000);
    expect(r.franchigiaMob).toBe(10000);
    expect(r.ise).toBe(25400);
    expect(r.scala).toBeCloseTo(2.66, 5);
    expect(r.isee).toBeCloseTo(25400 / 2.66, 1);
    expect(r.iseeFam).toBeCloseTo(25400 / 2.76, 1);
  });
  it('casa di abitazione : soglia 52.500 ordinaria, 91.500/120.000 per le prestazioni familiari', () => {
    const r = M.isee({ ...M.ESEMPIO, affitto: 0, casa: 100000 });
    expect(r.casaContata).toBeCloseTo((100000 - 52500) * 2 / 3, 1);
    expect(r.casaContataFam).toBeCloseTo((100000 - 94000) * 2 / 3, 1);
    expect(M.isee({ ...M.ESEMPIO, affitto: 0, casa: 100000, metro: true }).casaContataFam).toBe(0);
  });
  it('ISEE corrente : variazione oltre il 25%', () => {
    const c = M.iseeCorrente(20000, 3, 30000, 20000);
    expect(c.ammesso).toBe(true);
    expect(c.stima).toBeCloseTo(20000 - 10000 / 2.04, 1);
    expect(M.iseeCorrente(20000, 3, 30000, 24000).ammesso).toBe(false);
  });
});

describe('Assegno unico 2026', () => {
  const base = { minori: 1, under1: 0, tra1e3: 0, maggiorenni: 0, entrambiLavorano: false, madreUnder21: false };
  it('estremi confermati da INPS : 203,8 € fino a 17.468,51 €, 58,3 € oltre 46.582,71 € o senza ISEE', () => {
    expect(M.auu({ ...base, isee: 10000 }).perMinore).toBe(203.8);
    expect(M.auu({ ...base, isee: P.auu.soglia_min }).perMinore).toBe(203.8);
    expect(M.auu({ ...base, isee: 60000 }).perMinore).toBe(58.3);
    expect(M.auu({ ...base, isee: null }).perMinore).toBe(58.3);
  });
  it('decresce in modo lineare tra le soglie', () => {
    const mid = (P.auu.soglia_min + P.auu.soglia_max) / 2;
    expect(M.auu({ ...base, isee: mid }).perMinore).toBeCloseTo((203.8 + 58.3) / 2, 1);
  });
  it('maggiorazione sotto un anno (+50%) e quattro figli', () => {
    const r = M.auu({ ...base, isee: 10000, under1: 1 });
    expect(r.incrementoUnder1).toBeCloseTo(101.9, 1);
    expect(M.auu({ ...base, minori: 4, isee: null }).quattroFigli).toBe(150);
  });
  it('genitori lavoratori : nulla oltre la soglia massima', () => {
    expect(M.auu({ ...base, isee: 50000, entrambiLavorano: true }).lavoratori).toBe(0);
    expect(M.auu({ ...base, isee: 10000, entrambiLavorano: true }).lavoratori).toBeGreaterThan(30);
  });
  it('rinnovo : DSU entro giugno = arretrati, dopo giugno = mesi al minimo', () => {
    expect(M.rinnovoAuu({ ...base, isee: 15000 }, 5).perdita).toBe(0);
    const r = M.rinnovoAuu({ ...base, isee: 15000 }, 9);
    expect(r.mesiMinimo).toBe(7);
    expect(r.perdita).toBeCloseTo(7 * (203.8 - 58.3), 1);
  });
});

describe('Bonus', () => {
  it('nido : 3.600 € per i nati dal 2024 con ISEE fino a 40.000 €, limite della retta', () => {
    expect(M.nido(2025, 30000, 500, 11).importo).toBe(3600);
    expect(M.nido(2025, 45000, 500, 11).importo).toBe(1500);
    expect(M.nido(2023, 25000.99, 500, 11).importo).toBe(3000);
    expect(M.nido(2023, 30000, 500, 11).importo).toBe(2500);
    expect(M.nido(2025, 30000, 200, 11).totale).toBe(2200);
  });
  it('nuovi nati : 1.000 €, 120 giorni, ISEE fino a 40.000 €', () => {
    const r = M.nuoviNati(30000, '2026-10-01');
    expect(r.spetta).toBe(true); expect(r.termine).toBe('2027-01-29');
    expect(M.nuoviNati(30000, '2026-02-01').termine).toBe('2026-08-12');
    expect(M.nuoviNati(null, '2026-10-01').spetta).toBe(false);
  });
  it('bonus mamme : 60 € nel 2026, 100 € nel DDL 2027, esclusione CDI con 3 figli solo nel 2026', () => {
    const m = { figli: 3, etaPiuPiccolo: 5, mesi: 12, cdi: true, reddito: 30000 };
    expect(M.mamme(m, 2026).totale).toBe(0);
    expect(M.mamme(m, 2027).totale).toBe(1200);
    expect(M.mamme({ ...m, figli: 2, cdi: false }, 2026).totale).toBe(720);
    expect(M.mamme({ ...m, figli: 2, etaPiuPiccolo: 10 }, 2026).spetta).toBe(false);
  });
  it('carta acquisti : 80 € a bimestre, soglie MEF 2026', () => {
    expect(M.cartaAcquisti('70', 8000, 10000).annuo).toBe(480);
    expect(M.cartaAcquisti('65', 8000, 10000).spetta).toBe(false);
    expect(M.cartaAcquisti('bimbo', 9000, 0).spetta).toBe(false);
  });
  it('manovra 2027 : fondo 100 € l’anno e detrazione 19% su 1.000 €', () => {
    const r = M.manovra2027({ figli: 2, etaPiuPiccolo: 1, mesi: 12, cdi: false, reddito: 30000 }, 1, 2000);
    expect(r.fondo).toBe(100); expect(r.detrazione).toBe(190); expect(r.differenzaMamme).toBe(480);
  });
});
