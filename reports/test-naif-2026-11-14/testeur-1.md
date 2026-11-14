# Test naïf du 2026-11-14, testeur 1 : bonusisee.it
**Persona :** Italien(ne) de 45 ans, salarié(e), à l'aise avec son téléphone, aucune connaissance particulière du sujet, ne lit pas les longs paragraphes. Il/elle a tapé sa question dans Google et a cliqué sur le résultat « Bonus ISEE 2026 e 2027: a cosa ho diritto, con importi » parce qu'il/elle a vraiment cette question.

## 1. Concept

**Après 5 secondes (01-accueil-1) :** « C'est exactement ce que Google m'a promis. » Le titre « Bonus ISEE 2026 e 2027: a cosa hai diritto » reprend le résultat Google, et juste dessous il y a un formulaire déjà rempli (« Valore ISEE 18.000 € », « Figli minorenni 2 », « Età del figlio più piccolo 1 anno ») avec un bandeau fixe en bas « Totale stimato nel 2026 — 6371 € ». Elle comprend tout de suite qu'on tape son ISEE et ses enfants et qu'on obtient une somme en euros.

**Après 2 minutes :** elle a vu le détail (« Assegno unico (12 mesi) 5651 € », « Bonus mamme 2026 720 € », « Carta acquisti 0 € », « Bonus mamme 2027 (DDL, non votato) 1200 € »), le tableau des seuils, les dates à retenir (« 31 dicembre 2026 — Domanda bonus mamme 2026 », « 30 giugno 2027 — DSU entro oggi per gli arretrati »), puis des pages de détail. Elle a compris que c'est un site indépendant (« non è l'INPS e non presenta domande per nessuno ») qui additionne les aides pour sa famille.

- **Clair ?** Oui pour le haut de l'accueil. Beaucoup moins dès qu'elle descend : les exemples et les chiffres changent d'un bloc à l'autre, et le parcours finit en anglais.
- **Pour qui ?** Les familles avec enfants mineurs, surtout une mère qui travaille. Une personne sans enfant ou un retraité ne se sent pas visé (la carta acquisti pour les plus de 65 ans n'apparaît qu'au milieu d'un paragraphe).
- **Bénéfice concret :** « je sais combien je toucherai à peu près au total, et ce que je risque de perdre si je ne refais pas ma DSU avant le 30 juin ». C'est réellement utile.

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : le haut de l'accueil oui, le reste non.** La première carte (formulaire + total) est accessible à tous. Ça décroche à cinq endroits :
1. Le **vocabulaire administratif** n'est jamais expliqué en mots simples : « DSU », « DDL », « ISEE ordinario » contre « ISEE per le prestazioni familiari », « scala di equivalenza », « Soglie rispettate 4 / 6 », « una tantum », « arretrati ».
2. Le **paragraphe sur le calcul de l'ISEE** (01-accueil-suite7/suite8 : « DPCM n. 159 del 2013 », « toglie il 20% dei redditi da lavoro dipendente fino a 3000 € », « comma 208 ») : elle décroche à la deuxième ligne.
3. Les **exemples changent sans arrêt** (ISEE 18.000, puis 12.000, puis 20.000, 22.000, 25.000…), donc elle ne sait plus quel chiffre est « le sien ».
4. **Le même cas donne des montants différents** selon la page (voir §6, difficulté 2).
5. **Les pages de détail visitées sont en anglais**, avec des titres moitié italien moitié anglais (« Legge di bilancio 2027: what changes for families », « Assegno unico 2027: renewing the ISEE and arrears »).

## 3. Parcours écran par écran

| Écran | Compris | Coince |
|---|---|---|
| 01-accueil-1 | Titre = promesse Google. Formulaire pré-rempli, total 6371 € en bas. | La question « La madre lavora? Mesi di lavoro nel 2026 » a son champ **caché sous le bandeau fixe** : on ne voit pas la valeur. « Hai un ISEE valido? — Sì, lo conosco » : elle se demande ce qu'il faut faire si elle ne le connaît pas. |
| 01-accueil-suite1 | Détail : « Assegno unico (12 mesi) 5651 € ». Le cadre jaune « Esempio: 2 figli, ISEE di 18.000 €, madre lavoratrice — cambi una cifra per vedere il suo risultato » la rassure : ce n'est qu'un exemple. | Le champ « Mesi di lavoro » est **encore caché** par le bandeau. Le bloc « ▶ Altri dati del suo caso (facoltativi, già compilati) / Cosa abbiamo ipotizzato » : elle ne sait pas si c'est modifiable ni pourquoi c'est déjà rempli. « Il più piccolo va al nido (retta mensile): 0 € » alors que son enfant a 1 an : elle ne comprend pas pourquoi. Le site passe du « tu » (« Scrivi il tuo ISEE ») au « Lei » (« del suo caso », « cambi una cifra »). |
| 01-accueil-suite2 | Liste claire : « Bonus mamme 2026 720 € », « Carta acquisti 0 € ». Mention honnête « Stima indicativa… decidono INPS, MEF e Comuni ». | « Bonus asilo nido — se va al nido » : pas de chiffre, elle ne sait pas combien. « Bonus mamme 2027 (DDL, non votato) 1200 € » : « DDL » inconnu ; ces 1200 € sont-ils dans les 6371 € ? (Non, mais rien ne le dit.) |
| 01-accueil-suite3 | Tableau des seuils lisible, bonne colonne « Stato: in vigore ». | « fino a 8230,81 € » sans point des milliers, alors qu'ailleurs c'est « 17.468,51 € » : petite incohérence. |
| 01-accueil-suite4 | Carte « Le prossime date da segnare » : très utile, gros chiffres. | « DSU entro oggi per gli arretrati » : « entro oggi » est faux (c'est le 30 juin, pas aujourd'hui), et « DSU » n'est pas expliqué. |
| 01-accueil-suite5 | Liste de liens par thème (ISEE e DSU, Assegno unico, Bonus famiglia, Novità 2027). | C'est un plan du site au milieu de la page : elle ne sait pas si elle doit cliquer ou continuer à descendre. |
| 01-accueil-suite6 | Seuils et montants mesure par mesure, clair. | Doublon avec le tableau de suite2/suite3 : elle relit les mêmes chiffres. |
| 01-accueil-suite7 / suite8 | — | Gros pavé juridique (DPCM, franchigie, scala di equivalenza, legge n. 199 comma 208). Elle saute. L'« esempio » ici a un ISEE de 9549 € / 9203 €, encore un autre cas. |
| 01-accueil-suite9 / suite10 | Mini-outil « Sotto quali soglie sta il tuo ISEE ». | Pré-rempli à **12.000 €**, alors qu'elle a laissé 18.000 € plus haut. « Soglie rispettate 4 / 6 » mais elle ne voit que 4 lignes (2 « no », 2 « sì ») : d'où viennent les 4 ? et les 6 ? |
| 01-accueil-suite10 / suite11 | Texte assegno unico : « 407,60 € al mese, contro 116,60 € senza ISEE: 3492 € di differenza ». Parlant. | Encore une famille d'exemple différente. |
| 01-accueil-suite12 / suite13 | Mini-outil « Bonus mamme: 2026 contro 2027 » : 720 € / 1200 € / différence 480 €. Simple. | Le cadre jaune dit « il più piccolo di 4 anni » alors qu'aucun champ ne demande l'âge et que le grand outil disait « 1 anno ». |
| 01-accueil-suite14 / suite15 | Carta Dedicata a te : « non si chiede », date du 16 décembre. Utile. | Textes longs, mais lisibles. |
| 01-accueil-suite16 | « Bonus ISEE è un sito indipendente: non è l'INPS » : rassurant. « redditi e patrimonio non lasciano il tuo dispositivo » : rassurant. | — |
| 01-accueil-suite17 / suite18 | FAQ en accordéon, « Tocchi una domanda per vedere la risposta ». Bonnes questions (« Se non presento la DSU perdo l'assegno unico? »). | La première réponse est ouverte d'office et c'est la plus technique (ISEE ordinario contre prestazioni familiari). |
| 01-accueil-suite19 | Auteur « Radif Partners », date « 13 novembre 2026 » : crédible. | « Radif Partners » ne lui dit rien. |
| 02-menu-1 | Menu en 4 rubriques, lisible. | Le bouton « EN » collé au ☰ ressemble à un bouton du menu. Le bandeau 6371 € reste affiché par-dessus. |
| 03-en-1 → 03-en-suite19 | La même page d'accueil en anglais, mêmes chiffres (« €6,371 »). | Elle est passée en anglais. Pour elle c'est une impasse : elle cherche le petit « IT » pour revenir. Le champ « 18.000 » garde le format italien alors que le reste est « €6,371 ». |
| 04-en-2027-budget-families | Calculateur « Extra in 2027 if the bill passes as is — €675 ». | Titre mi-italien mi-anglais. Un champ est **caché sous le bandeau** (on voit seulement « 1 »). À l'accueil « Bonus mamme 2027 » valait 1200 €, ici l'« extra » vaut 675 € : elle croit à une contradiction. Le revenu de la mère est 28.000 € ici, 22.000 € à l'accueil. « the right-hand column » alors que sur téléphone il n'y a pas de colonnes. |
| 05-en-about | Qui publie, ce qu'ils ne sont pas (« not INPS… a CAF or a patronato »), gratuit, sans inscription, e-mail de contact. Rassurant. | En anglais seulement dans ce parcours. |
| 06-en-child-allowance-2027 | Très utile : « Arrears paid back from March 2027 — Yes », tableau « Estimated loss » selon le mois (juillet €1,229, décembre €2,457). Ça fait peur au bon sens du terme. | Champ « Expected 2027 ISEE » **caché sous le bandeau**. Calculateur à 20.000 €, tableau à 22.000 € : deux exemples différents sur la même page. |
| 07-en-child-allowance-amount | €384.12/mois détaillé (166.16 par enfant + 51.80 « both parents working »). Tableau par tranche d'ISEE clair. | Champ ISEE **caché sous le bandeau**. Le même tableau apparaît deux fois sur la page. |
| 08-en-child-allowance-payments | « Credit per parent, per month €191.15 », « Household allowance €382.30 ». | Même ISEE (20.000) et mêmes 2 enfants qu'en 06, mais **€382.30 ici contre €446.10 en 06**. Le même calculateur apparaît deux fois de suite sur la page. |
| 09-en-child-allowance-without-isee | « With a low ISEE you could get up to €360.87 more a month » : message fort, bien mis en avant. Tableau 1 à 4 enfants très parlant. | L'accueil disait 407,60 − 116,60 = 291 € de différence ; ici « €360.87 more » pour le même nombre d'enfants. €116.60 répété trois fois dans la même carte. |

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Calculateur principal (accueil, total 2026) | Oui, immédiatement | Oui pour le total ; flou pour « se va al nido » et les hypothèses déjà remplies | Très | 4/5 |
| Bandeau fixe du total | Oui | Oui | Oui, mais il cache des champs | 3/5 |
| « Altri dati del suo caso » (hypothèses) | Oui | Non : modifiable ou pas ? | Moyen | 2/5 |
| Tableau « Soglie ISEE delle misure 2026 » | Oui | Oui | Oui | 4/5 |
| « Le prossime date da segnare » | Oui | Oui (sauf « DSU entro oggi ») | Très | 4/5 |
| Mini-outil « Sotto quali soglie sta il tuo ISEE » | Oui | Le « 4 / 6 » non | Moyen, fait doublon avec le grand outil | 2/5 |
| Mini-outil « Bonus mamme 2026 contro 2027 » | Oui | Oui | Oui | 4/5 |
| FAQ en accordéon | Oui | Oui | Oui | 4/5 |
| Calculateur budget 2027 (04) | Via le menu | À moitié (extra 675 € contre 1200 € à l'accueil) | Moyen | 2/5 |
| Calculateur renouvellement 2027 / arriérés (06) | Via le menu | Oui, le tableau des pertes est très parlant | Très | 4/5 |
| Calculateur montant de l'assegno (07) | Via le menu | Oui | Oui | 4/5 |
| Calculateur partage entre parents (08) | Via le menu | Oui, mais le montant contredit la page 06 | Moyen | 3/5 |
| Calculateur sans ISEE (09) | Via le menu | Oui, message « you could get up to… more » fort | Très | 4/5 |
| Bouton de langue EN/IT | Oui, trop facilement | Non : elle bascule sans le vouloir | Pour elle non | 2/5 |
| Liens « Come sono calcolati i numeri », « Metodo e fonti » | Oui | Oui | Rassurant | 4/5 |

## 5. Enchaînement et navigation

- **Accueil :** tout est sur une seule page très longue (20 écrans). Le haut fait le travail ; ensuite on alterne mini-outils, tableaux, pavés juridiques et liste de liens. Elle ne sait pas où s'arrêter.
- **Menu ☰ :** propre, 4 rubriques dépliables, les noms parlent (« Bonus mamme », « Assegno unico senza ISEE »).
- **Rupture majeure :** les pages de détail visitées sont toutes en anglais. Pour une Italienne qui ne cherchait rien en anglais, le site « change de langue tout seul ». Le retour se fait par un petit « IT » discret en haut.
- **Bas de page :** blocs « Related pages and calculations » et fil d'Ariane « Home / … » corrects. Le pied « Bonus ISEE · Chi siamo, note legali e tutte le pagine » est replié et discret.
- **Cohérence entre pages :** c'est le point faible. Chaque page a son propre exemple (ISEE 18.000 / 12.000 / 20.000 / 22.000 / 25.000 ; revenu de la mère 22.000 / 28.000 ; enfant de 1 an / 4 ans), et deux pages donnent deux montants différents pour la même famille.
- **Bandeau fixe :** utile, mais il recouvre systématiquement le 4e ou le 5e champ du formulaire (accueil, 04, 06, 07, 09).

## 6. Difficultés classées

1. **Les pages de détail passent en anglais (03 à 09)**
   *Vécu :* « Je suis italienne, j'ai cherché en italien, et je me retrouve avec "Child allowance payments" et "Assegno unico 2027: renewing the ISEE and arrears". » Elle ferme ou cherche comment revenir.
   *Recommandation :* depuis une page italienne, tous les liens (menu, « tutte le pagine », pages liées) doivent mener aux pages italiennes. Le bouton de langue doit être explicite et éloigné du ☰ : remplacer « EN » par « English » (et « IT » par « Italiano »). Corriger les titres mixtes, par exemple « Legge di bilancio 2027: what changes for families » → « 2027 budget law: what changes for families » en EN, et « Legge di bilancio 2027: cosa cambia per le famiglie » en IT.

2. **Le même cas donne des montants différents**
   *Vécu :* ISEE 20.000 € + 2 enfants = « Household allowance €382.30 » (08) contre « Per month with the ISEE €446.10 » (06). À l'accueil, « 407,60 € contro 116,60 € » (291 € d'écart) contre « up to €360.87 more a month » (09). « Lequel est vrai ? Alors aucun n'est fiable. »
   *Recommandation :* même moteur et mêmes hypothèses partout. Si l'écart vient du supplément « entrambi i genitori lavorano », l'écrire à côté du montant : « 382,30 € senza la maggiorazione per genitori entrambi lavoratori (+63,80 €) ».

3. **Le bandeau fixe cache des champs du formulaire**
   *Vécu :* sur l'accueil, la valeur de « La madre lavora? Mesi di lavoro nel 2026 » n'est jamais visible (01-accueil-1 et suite1). Pareil pour « Expected 2027 ISEE » (06), « ISEE value » (07), « Children under 18 » (09) et un champ de 04.
   *Recommandation :* faire apparaître le bandeau seulement quand la carte du résultat est sortie de l'écran, ou ajouter en bas du formulaire une marge égale à la hauteur du bandeau.

4. **Un exemple différent dans chaque bloc**
   *Vécu :* 18.000 € dans le grand outil, puis 12.000 € dans « Sotto quali soglie sta il tuo ISEE », puis un enfant « di 4 anni » dans le bonus mamme alors qu'elle a laissé « 1 anno ». « J'ai déjà tapé mes chiffres, pourquoi tout change ? »
   *Recommandation :* sur une même page, les mini-outils reprennent les valeurs du grand outil (même ISEE, mêmes enfants, même âge). Sinon, retirer les mini-outils de l'accueil.

5. **Jargon non expliqué : DSU, DDL, soglie, arretrati**
   *Vécu :* « DSU entro oggi per gli arretrati » (en plus, « entro oggi » est faux), « Bonus mamme 2027 (DDL, non votato) », « Soglie rispettate 4 / 6 ».
   *Recommandation :* textes de remplacement :
   - « 30 giugno 2027 — DSU entro oggi per gli arretrati » → « 30 giugno 2027 — Ultimo giorno per rifare l'ISEE (DSU) e avere gli arretrati da marzo »
   - « Bonus mamme 2027 (DDL, non votato) » → « Bonus mamme 2027 (proposta, non ancora legge) »
   - « Soglie rispettate 4 / 6 » → « Rientri in 4 misure su 6 », avec les 6 lignes affichées.

6. **Les hypothèses « déjà remplies » et le « nido » à 0 €**
   *Vécu :* « ▶ Altri dati del suo caso (facoltativi, già compilati) — Cosa abbiamo ipotizzato: … Il più piccolo va al nido (retta mensile): 0 € » puis « Bonus asilo nido: se va al nido ». Elle ne sait pas si elle peut changer ces valeurs, et elle croit qu'elle n'a pas droit au bonus nido.
   *Recommandation :* intitulé « ▶ Modifica altri dati (nido, contratto, reddito della mamma) », et à la place de « se va al nido » : « fino a 3.600 €/anno se il bambino va al nido — inserisci la retta ».

7. **Mélange « tu » / « Lei »**
   *Vécu :* « Scrivi il tuo ISEE… quanti figli hai » puis « Altri dati del suo caso », « cambi una cifra per vedere il suo risultato », « Tocchi una domanda ». Ça fait bricolé.
   *Recommandation :* tout au « tu », cohérent avec le titre : « Altri dati del tuo caso », « cambia una cifra per vedere il tuo risultato », « Tocca una domanda per vedere la risposta ».

8. **Accueil trop long, avec des pavés juridiques**
   *Vécu :* paragraphes « Come si arriva al proprio ISEE » (DPCM, franchigie, scala di equivalenza) et « legge n. 199 del 2025 (comma 208) » ; tableau des seuils affiché deux fois (suite2-3 puis suite5-6). Elle arrête de lire vers le milieu.
   *Recommandation :* replier ces sections comme le premier paragraphe (« Leggi tutto il paragrafo »), supprimer le doublon du tableau et remonter les dates juste sous le résultat.

## 7. À garder

- Le haut de l'accueil : titre identique à la promesse Google, formulaire pré-rempli, total immédiat « 6371 € ».
- Le cadre jaune « Esempio… — cambi una cifra per vedere il suo risultato » : on comprend tout de suite que c'est un exemple.
- La séparation nette entre « in vigore » et « DDL / non votato » : honnête et rassurante.
- La carte « Le prossime date da segnare » (gros chiffres, une ligne chacune).
- Le tableau « Estimated loss » selon le mois de la DSU (06) : c'est l'argument qui fait agir.
- « With a low ISEE you could get up to … more a month » (09) : un message fort et utile.
- « Bonus ISEE è un sito indipendente: non è l'INPS e non presenta domande per nessuno » et « redditi e patrimonio non lasciano il tuo dispositivo ».
- Les FAQ en accordéon, les sources listées et la date « Aggiornato il 13 novembre 2026 ».

## 8. Notes

Clarté : 6/10
Facilité : 6/10
Utilité : 8/10
