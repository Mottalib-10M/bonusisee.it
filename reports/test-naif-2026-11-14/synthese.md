# Synthèse des corrections, test naïf du 2026-11-14 : bonusisee.it

Notes du 1er tour : testeur 1 6/6/8, testeur 2 7/7/8, testeur 3 5/4/6.
Les captures 03 à 09 sont des pages /en/ prises par erreur par l'outil de captures (corrigé depuis) : les remarques
« le site passe en anglais » ne visent pas le site. Les pages italiennes équivalentes (/it/…) ont été vérifiées pour
les mêmes défauts : elles partagent les mêmes calculateurs et les mêmes composants, donc les corrections s'y appliquent.

| Difficulté relevée | Testeurs | Décision | Raison / correction |
|---|---|---|---|
| Même cas, montants différents : ISEE 20.000 € + 2 figli = 446,10 € (page 2027) contre 382,30 € (page pagamento) ; « fino a 360,87 € in più » contre 407,60 − 116,60 = 291 € (page senza ISEE) | 1, 2, 3 | **corrigé** | Cause dans le code : les outils `auu` et `rinnovo` (champ commun `_figli.ts`) et l'outil de l'accueil comptaient d'office la maggiorazione « genitori entrambi lavoratori » (réponse « Sì » par défaut), alors que les mini-calculs, les tableaux et les textes comptent le montant de base. Défaut ramené à « No » partout ; la maggiorazione estimée s'affiche sur une ligne à part « Non compreso: se lavorano entrambi i genitori (stima) +63,80 € al mese » et s'ajoute seulement si on répond « Sì ». Désormais 382,30 € sur les deux pages et « 291 € in più » = le tableau. Test `src/lib/coerenza.test.ts` ajouté. Conséquence sur l'accueil : le total d'exemple passe de 6.371 € à 5.547 €, avec la ligne « +823 € » si les deux parents travaillent. |
| Page 2027 : calculateur à ISEE 20.000 €, tableau des pertes à 22.000 € | 1, 2 | **corrigé** | Le tableau prend la même famille que le calculateur (20.000 €). |
| La barre verte « Totale stimato nel 2026 » recouvre « Mesi di lavoro » (et un champ des pages 04, 06, 07, 09) | 1, 2, 3 | **corrigé** | La barre n'apparaît plus qu'après un premier défilement (`components/calc/kit.tsx`) : à l'ouverture, tout le formulaire se lit. Défaut de trame. |
| Bouton « EN » collé au ☰, sigle ambigu ; « IT » pour revenir | 1, 3 | **corrigé** | Le bouton écrit « English » (page italienne) et « Italiano » (page anglaise), avec `lang` et plus d'espace avant le ☰. Défaut de trame. |
| « La madre lavora? Mesi di lavoro nel 2026 » : question oui/non suivie d'un nombre | 3 | **corrigé** | « Mesi di lavoro della mamma nel 2026 (0 se non lavora) ». |
| « DSU entro oggi per gli arretrati » (faux : c'est le 30 giugno) | 1, 2, 3 | **corrigé** | « Ultimo giorno per rifare l'ISEE (la DSU) e avere gli arretrati da marzo » ; même correction dans le calendrier (« entro oggi » retiré deux fois). |
| Sigles non expliqués : DSU, DDL, MEF, CAF, ISEE | 1, 2, 3 | **corrigé** | ISEE expliqué dans le chapeau ; DSU expliquée à la première apparition (texte, alerte, champ du mois) ; « DDL, non votato » devient « proposta di legge, non ancora approvata » dans les résultats ; « MEF » écrit « Ministero dell'Economia » ; CAF expliqué. |
| « Bonus mamme 2027 (DDL) 1200 € » : compris dans le total ? | 1, 3 | **corrigé** | Libellé « (proposta di legge, non ancora approvata; fuori dal totale) ». |
| « Soglie rispettate 4 / 6 » avec 4 lignes seulement | 1, 2, 3 | **corrigé** | Les 6 seuils comptés sont tous affichés, « Soglie sotto cui stai: 2 su 6 ». |
| Exemples qui changent d'un bloc à l'autre (18.000 puis 12.000 € ; enfant de 1 an puis 4 ans ; revenu de la mère 22.000 puis 28.000 €) | 1, 2, 3 | **corrigé** | Sur l'accueil, les mini-calculs reprennent la famille du calculateur (ISEE 18.000 €, plus petit de 1 an, revenu 22.000 €) et le disent. Revenu de la mère 22.000 € aussi sur les pages bonus mamme et manovra. |
| Mélange « tu » / « Lei » (« Altri dati del suo caso », « cambi una cifra », « Tocchi una domanda ») | 1, 2, 3 | **corrigé** | Tout au « tu », comme le titre (libellés de trame italiens corrigés dans `lib/libelles-trame.ts`). Défaut de trame. |
| « Altri dati… già compilati » : modifiable ? valeurs « devinées » ? | 1, 3 | **corrigé** | « Cambia gli altri dati (facoltativi, già compilati con valori di esempio) » et « Valori di esempio usati ». |
| « Bonus asilo nido : se va al nido » sans montant | 1, 2, 3 | **corrigé** | « fino a 3.600 € se va al nido: scrivi la retta negli altri dati » (montant tiré du moteur selon l'ISEE). |
| Tableau des seuils affiché deux fois sur l'accueil | 1, 2, 3 | **corrigé** | Le tableau du résultat est retiré ; reste celui du texte, qui donne aussi les montants. |
| Paragraphe juridique « Come si arriva al proprio ISEE » (DPCM, comma, franchigie, scala) | 1, 2, 3 | **corrigé** | Réécrit en mots simples, en commençant par l'action (DSU gratuite, INPS ou CAF) ; les références de loi passent en fin de paragraphe. |
| Même calculateur affiché deux fois (page pagamento) | 1, 2, 3 | **corrigé** | Mini-calcul en double retiré ; même défaut corrigé sur les pages ISEE minorenni et ISEE precompilato. |
| Page importo : même tableau deux fois | 1, 2 | **corrigé** | Le petit tableau du calculateur est retiré ; reste le tableau complet de la page. |
| Page senza ISEE : 116,60 € répété trois fois dans la carte | 1 | **corrigé** | La ligne « Senza ISEE » ne s'affiche plus quand le résultat est déjà sans ISEE. |
| « tre misure » à l'accueil, « quattro misure » sur la page manovra | 2 | **corrigé** | Accueil aligné : quatre mesures, l'article 60 ajouté (sans chiffre nouveau). |
| Page 04 : « extra 675 € » contre 1.200 € à l'accueil | 1 | **corrigé** | Libellé « In più nel 2027 rispetto al 2026, se la proposta di legge passa così ». |
| Titre mixte « Legge di bilancio 2027: what changes for families » | 1, 2, 3 | **corrigé** | H1 anglais « Italy's 2027 budget law (legge di bilancio 2027): what changes for families ». Les autres titres anglais gardent « Assegno unico », nom propre de la prestation. |
| « the right-hand column » sur téléphone (page 04) | 1 | **corrigé** | « Le cifre «Dal 2027» » / « The "From 2027" figures ». |
| Carte « Newborn bonus — …: the claim deadline. » coupée | 3 | **corrigé** | « … da chiedere entro 120 giorni dalla nascita » (IT et EN). |
| « 8230,81 € » sans séparateur de milliers à côté de « 17.468,51 € » | 1 | **corrigé** | Montants italiens toujours avec le point des milliers (`lib/format.ts`, monnaie seulement). |
| Première FAQ ouverte = la plus technique | 1, 2, 3 | **corrigé** | La question ouverte d'office est « Se non presento la DSU perdo l'assegno unico? ». |
| Les pages visitées sont en anglais, le site « change de langue tout seul » | 1, 2, 3 | **non retenu (outil de captures)** | Le script a pris les pages /en/ du sitemap après l'accueil ; les liens des pages italiennes mènent aux pages /it/. |
| Format « 18.000 » dans les champs des pages anglaises | 1, 2 | **non retenu** | Champ commun de la trame (`NumberField`) : le formater en anglais casserait la lecture de la saisie (« 18,000 » lu 18). À traiter dans la trame. |
| Accueil trop long (20 écrans), plan de liens au milieu | 1, 2, 3 | **non retenu en partie** | Doublons retirés et texte juridique simplifié ; la structure (outil, dates, rubriques, texte) suit RECETTE §5 pour la page pilier. |
| Menu sans lien « Calcola i tuoi bonus » ; libellés « ISEE corrente / minorenni » | 2, 3 | **non retenu** | Le logo ramène au calculateur ; ce sont les noms officiels que l'on cherche sur Google. |
| Mention « Esempio » trop bas, 6371 € lu comme un droit réel | 3 | **non retenu** | Un seul testeur ; la barre collante n'apparaît plus à l'ouverture, et la carte du résultat porte déjà le cadre « Esempio ». |
| Rassurances (« non è l'INPS ») trop bas ; ordre du menu ; date Carta Dedicata absente des cartes | 3 | **non retenu** | Un seul testeur, choix éditorial, pas un défaut objectif. |
| « Radif Partners » ne dit rien | 1, 3 | **non retenu** | Identité éditeur imposée (société, page Chi siamo liée). |

`npm run check` : passe en entier (55 tests, tous les contrôles à 0). Captures relues après correction : accueil, legge-di-bilancio-2027, assegno-unico-2027, -pagamento, -senza-isee, -importo (pages /it/).
