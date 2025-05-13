### Partie à faire pour tout le monde

Cet exercice est libre, vous devez implémenter le jeu Chifoumi avec les connaissances que nous venons d'aborder. Utilisez readline.

Pensez à organiser votre code en différents fichiers et à séparer l'interface utilisateur de la couche métier.

Le jeu du Chifoumi se fera avec deux joueurs créer de manière automatique, par le script, les figures possibles du jeu chifoumi (`pierre`, `feuille`, `ciseaux`) seront définies en variable d'environnement.

L'utilisateur pourra lancer le jeu et précisé le nombre de manches à jouer (`exemple` : `start 10` lancera une partie de 10 manches),

On affichera pour chaque manche la figure du joueur 1, du joueur 2 et le gagnant de la manche s'il y en a un, égalité sinon.

Une fois la partie términé, on comptabilise les résultats accumulés de toutes les parties jouées et on affiche ces dérniers, on voudra connaitre : le nombre de parties jouées, le nombre de manches jouées, le pourcentage de partie gagné par le joueur 1 et le joueur 2

### Partie optionnelle Challenge
Pensez à offrir la possibilité de réinitialiser les résultats avec la commande `reset`, si le jeu est quitté, on enregistrera également les résultats dans un JSON.