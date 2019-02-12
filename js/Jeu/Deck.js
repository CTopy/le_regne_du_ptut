"use strict";


/*Pour simplifier le gros bordel,
*je propose que la carte numéro 1
*est en fait la derniere carte du paquet dans le tableaux du deck.
*/

class Deck{
    constructor(contenu=false){
        this.contenu = contenu || new Array();
        this.melanger();
        this.popup = new Popup();
    }

    melanger(){
        let currentIndex = this.contenu.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = this.contenu[currentIndex];
            this.contenu[currentIndex] = this.contenu[randomIndex];
            this.contenu[randomIndex] = temporaryValue;
        }
    }

    piocher(deckEmetteur,nb=1, display=false){
        let cartes = [];
        for(let i = 0; i<nb; i++) {
            cartes.push(deckEmetteur.contenu.pop());
        }
        if (display) {
            if(nb>1) {
                var affichage = document.createElement("div");
                affichage.innerHTML += `
                <style>
                    #dark div {
                        display: table;
                        text-align: center;
                        white-space: nowrap;
                        width: 80vw;
                        display: table;
                    }

                    #dark div img {
                        display: table-cell;
                        max-height: 80vh;
                    }

                    .quitter {
                        bottom: 80vh !important;
                    }
                </style>
                `;
                cartes.forEach((carte) => {
                    affichage.appendChild(carte.dom);
                });
            } else {
                var affichage = cartes[0].dom;
            }
            this.popup.afficher(affichage);
        }
        deckEmetteur.render(deckEmetteur.proprietaire.dom.main);
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
        container.innerHTML = "";
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
