+ Règles de nommage pour les branches Git

++ 1 - Les fonctionnalités

Pour le développement d'une fonctionnalité, la syntaxe est feat/slug

* Le slug se compose de mots non accentués séparés par des tirets décrivant la feature
* Le slug doit être clair
* Le slug doit être le plus court possible sans atteinte à sa clarté

On peut utiliser plusieurs slugs, par exemple lorsqu'on branche d'une branche ou que plusieurs fonctionnalités pourraient correspondre au premier slug
feat/gd-anciens/affichage
feat/gd-anciens/reveil
ou
feat/affichage-2d/investigateurs

etc.

++ 2 - Les fixes
Un fix est une modification majeure d'une fonctionnalité, d'une page, ou d'un fichier, pour corriger un bug, réécrire un texte, corriger une coquille, modifier la fonctionnalité.
Les branches de fix se notent fix/slug
Les règles pour les slugs sont les mêmes que pour les fonctionnalités

++ 3 - Les hotfixes
Un hotfix est une modification mineure d'une fonctionnalité ou d'un élément (correction de faute, de bug mineur, d'erreur de calcul, modifier un style CSS etc...)
Ils se notent hotfix/slug

++ 4 - Le reste
Les branches ne rentrant pas dans les catégories ci-dessus sont notées other/slug
Elles peuvent comprendre les ajouts de ressources, de fonts, de modèles 3D, l'ajout d'un fichier etc...

++ 5 - Noms des commits
Les commits devront être nommés avec un titre décrivant rapidement les avancements. Si le commit ne marque pas d'avancement mais simplement une sauvegarde, nommez-le Sauvegarde-1-2-3...
Tous les commits de sauvegarde suivant celui-ci devront être "amendés" (cochez la case Amend), c'est à dire, ajoutés au commit plutôt qu'en créer un nouveau. Lorsqu'un avancement a finalement été fait, crééz un nouveau commit. 
Le premier commit doit expliquer dans sa description ce qui est développé dans la branche
Le dernier commit doit rendre comppte de ce qui a été implémenté avec succès
Lorsque 2 commits d'une branche portent le même nom, ajouter un nombre (ex : Commit, Commit-2, Commit-3 etc.)
Exemple : Branche feat/affichage-2d/vue-js (lire de bas en haut)

...
Investigateurs | Affichage des investigateurs complets
Actions et SMentale | Affichage du nombre d'actions et de la santé mentale fonctionnel
Sauvegarde-2
Infos de base | L'affichage des infos de base fonctionne
Sauvegarde
Mise en place | Réaliser l'affichage avec Vue JS plutôt que par affichage DOM. Implémentation de Vue JS
Titre | Description