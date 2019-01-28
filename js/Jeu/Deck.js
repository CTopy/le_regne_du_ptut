"use strict";

/*
0 = bas du Deck
n = haut du deck
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

    /** Piocher une carte d'un paquet vers un autre
    * @param deck : Le deck dans lequel piocher
    * @param nbCartes : Défaut = 1, le nombre de cartes à piocher
    * @param anim : Doit-on afficher les cartes avec un son lorsqu'on pioche ?
    **/
    piocher(deck, nbCartes = 1, anim = false){
        for(let i=0; i<nbCartes; i++) {
            let index = deck.contenu.length-nbCartes;   //Index de la carte à piocher
            this.contenu[] = deck.contenu[index];       //Piocher la carte, la mettre au dessus
            deck.contenu = deck.contenu.splice(index, 1);   //Retirer la carte piochée
        }
    }
}

class Main extends Deck {
    constructor(n, nomJoueur) {
        super(n);
        this.proprietaire;
    }
}
