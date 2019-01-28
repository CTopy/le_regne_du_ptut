"use strict";


/*Pour simplifier le gros bordel,
*je propose que la carte numéro 1
*est en fait la derniere carte du paquet dans le tableaux du deck.
*/

class Deck{
    constructor(nom){
        this.nom=nom;
        this.contenu = new Array();
    }

    melanger(){
      let currentIndex = this.contenu.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex --;

        // And swap it with the current element.
        temporaryValue = this.contenu[currentIndex];
        this.contenu[currentIndex] = this.contenu[randomIndex];
        this.contenu[randomIndex] = temporaryValue;
      }
    }

    piocher(deckEmetteur){
        var derniereCarteEmetteur = deckEmetteur.length-1
        this.contenu.push(derniereCarteEmetteur);
        deckEmetteur[derniereCarteEmetteur].remove();
    }

    afficher(div) {

    }

    prendreCarte(){
    }
}

class Main extends Deck {
    constructor(n, nomJoueur) {
        super(n);
        this.proprietaire;
    }

    afficher(numJoueur) {
        var conteneur;
        switch(numJoueur) {
            case 1: document.getElementsByClassName("j1");
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
        }
    }
}
