import type { APIRoute } from 'astro';
import { PAGES } from '../lib/guides';
import { route } from '../i18n/routes';
import { SITE_URL, SITE_NAMES, AUTHOR_NAME } from '../data/site-config';
import { P } from '../lib/engine/params';

/** llms.txt (RECETTE §21) : le site, ses données et ses pages, généré au build depuis le registre des pages. */
export const GET: APIRoute = () => {
  const u = (p: string) => SITE_URL + p;
  const lines = [
    `# ${SITE_NAMES.it}`,
    '',
    `> Strumenti indipendenti su ISEE, assegno unico e bonus per le famiglie italiane pubblicati da ${AUTHOR_NAME}: stima dell'ISEE ordinario e per le prestazioni familiari (DPCM 159/2013, L. 199/2025 c. 208), importo dell'assegno unico 2026 (D.Lgs. 230/2021, soglie INPS), bonus asilo nido, bonus nuovi nati, bonus mamme 2026 e 2027, carta acquisti, calendario 2026-2027 e novità del disegno di legge di bilancio 2027 (non ancora votato). Importi stimati, calcolati nel browser. Sito non ufficiale, non è l'INPS. Italiano e inglese.`,
    '',
    '## Fonti',
    '',
    `- DPCM 5 dicembre 2013 n. 159; D.Lgs. 29 dicembre 2021 n. 230; L. 30 dicembre 2024 n. 207 c. 206; L. 30 dicembre 2025 n. 199 commi 5, 207, 208; schede e circolari INPS (n. 29/2026, n. 45/2026, n. 106/2026); MEF Carta Acquisti 2026; DDL di bilancio 2027 artt. 57-60 (RGS). Testi riletti il ${P.retrieved_at}.`,
    `- Metodo e fonti: ${u(route('method', 'it'))}`,
    '',
    '## Pagine (italiano)',
    '',
    `- [${SITE_NAMES.it}](${u(route('home', 'it'))})`,
    ...PAGES.map((p) => `- [${p.it.h1}](${u(route(p.id, 'it'))}): ${p.it.description}`),
    '',
    '## Pages (English)',
    '',
    `- [Home](${u(route('home', 'en'))})`,
    ...PAGES.map((p) => `- [${p.en.h1}](${u(route(p.id, 'en'))}): ${p.en.description}`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
