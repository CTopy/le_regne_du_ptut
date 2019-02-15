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

    /** Ajouter une carte au dessus du paquet
    *   @param cartes : Un tableau de cartes ou une seule carte
    *
    **/
    ajouter(cartes, display=false) {
      if(!Array.isArray(cartes))
        cartes = [cartes];
      let deck = new Deck(cartes);
      this.piocher(deck, cartes.length, display);
    }

    piocher(deckEmetteur,nb=1, display=false){

        let cartes = [];
        for(let i = 0; i<nb; i++) {
            cartes.push(deckEmetteur.contenu.pop());
        }
        if (display) {
            const cartesDom = [];
            cartes.forEach((elt) => {
                cartesDom.push(elt.dom);
            });
            this.popup.afficher(cartesDom, 1);
        }
        this.contenu = this.contenu.concat(cartes);    //Ajouter les cartes finalement
        //Si le deck dont on prends est une main, on ré-affiche cette main
        if(deckEmetteur instanceof Main)
            deckEmetteur.render(deckEmetteur.proprietaire.dom.main);
    }

    prendre(deckEmetteur, carte) {

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

    ajouter(cartes) {
        Deck.prototype.ajouter.call(this, cartes);
    }

    piocher(deckEmetteur,nb=1, display=false) {
        Deck.prototype.piocher.call(this, deckEmetteur, nb, display);
        this.render(this.proprietaire.dom.main);

        if(nb+this.proprietaire.main.contenu.length > this.proprietaire.cartesMax)
    }

    render(container) {
        container.innerHTML = "";
        this.contenu.forEach((carte, index) => {
            carte.dom.dataset.index = index;
            container.appendChild(carte.dom);
        });
    }

    demanderDefausse(nb=0) {
        const h1 = document.createElement("h1"),
        button = document.createElement("button"),
        div = document.createElement("div"),
        selected = [];
        let nbSelected = 0;

        h1.textContent = "Défaussez "+nb+" cartes, puis validez";
        button.type = "button";
        button.textContent("Valider");
        button.disabled = "disabled";
        div.className = "popup-container flex-row";
        this.render(div);

        this.popup.afficher([h1, div, button], 2);

        div.childNodes.forEach((carte) => {
            carte.addEventListener("click", (evt) => {
                if(evt.target.className.contains("select"))
                    nbSelected--
                else nbSelected++;
                evt.target.toggleClass("select");

                if(selected === nb) {

                }
            });
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
