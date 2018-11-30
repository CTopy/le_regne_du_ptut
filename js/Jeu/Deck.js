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