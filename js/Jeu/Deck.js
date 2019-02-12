"use strict";


/*Pour simplifier le gros bordel,
*je propose que la carte numéro 1
*est en fait la derniere carte du paquet dans le tableaux du deck.
*/

class Deck{
    constructor(contenu=false){
        this.contenu = contenu ? contenu : new Array();
    }

    melanger(){

    }

    piocher(deckEmetteur){
        this.contenu.push(deckEmetteur.contenu.pop());
    }

    afficher(div) {

    }

    prendreCarte(){
    }
}

class Main extends Deck {
    constructor(contenu=false, investigateur) {
        super(contenu);
        this.proprietaire = investigateur;
        this.render(this.proprietaire.dom.main);
    }

    render(container) {
        this.contenu.forEach((carte) => {
            container.appendChild(carte.dom);
        });
    }
}

class PaquetIndice extends Deck {
    constructor(n) {
        super(n);
        /*pour l'instant, pour le test, je crée une carte de chaque ville dans le paquet*/
        this.contenu = new Array(new Indice("carte1","Kingsport"), new Indice("carte2","Dunwich"), new Indice("carte3","Innsmouth"), new Indice("carte4","Arkham"));
    }
}
