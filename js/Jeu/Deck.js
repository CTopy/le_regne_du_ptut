"use strict";


/*Pour simplifier le gros bordel,
*je propose que la carte numéro 1
*est en fait la derniere carte du paquet dans le tableaux du deck.
*/

class Deck{
    constructor(contenu=false, defausse=false){
        this.contenu = contenu || new Array();
        this.melanger();
        this.popup = new Popup();
        this.defausse = defausse;
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
    
    defausser(indexes) {
        let carte;
        indexes.forEach((elt) => {
            carte = this.contenu.splice(elt, 1);
            if(this.defausse)
                this.defausse.ajouter(carte);
        });
    }

    prendre(deckEmetteur, carte) {

    }

    afficher(div) {

    }

    prendreCarte(){
    }
}

class Main extends Deck {
    constructor(contenu=false, investigateur, defausse) {
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
            this.demanderDefausse(nb+this.proprietaire.main.contenu.length-this.proprietaire.cartesMax);
    }

    render(container) {
        container.innerHTML = "";
        console.log(this.contenu);
        let index = 1;
        for(let carte of this.contenu) {
            carte.dom.dataset.index = index;
            container.appendChild(carte.dom);
            index++;
        };
        /*this.contenu.forEach((carte, index) => {
            carte.dom.dataset.index = index;
            container.appendChild(carte.dom);
        });*/
    }

    //Si l'utilisateur a trop de cartes
    demanderDefausse(nb=1) {
        const h1 = document.createElement("h1"),
        div = document.createElement("div"),
        selected = [];
        let nbSelected = 0,
        button = document.createElement("button");

        h1.textContent = "Défaussez "+nb+" cartes, puis validez";
        button.type = "button";
        button.textContent = "Valider";
        button.disabled = true;
        div.className = "popup-container flex-row";
        this.render(div);

        this.popup.afficher([h1, div, button], 2, false);
        button = document.querySelector("#dark button");
        const cartes = document.querySelectorAll("#dark .carte");
        cartes.forEach((carte) => {
            carte.addEventListener("click", (evt) => {
                console.log("click ! " + evt.target.dataset.index + " " + nbSelected + " " + nb);
                if(evt.target.classList.contains("select")) {
                    nbSelected--;
                    selected.splice( selected.indexOf(evt.target.dataset.index), 1 );
                }
                else {
                    nbSelected++;
                    selected.push(evt.target.dataset.index);
                }
                evt.target.classList.toggle("select");

                if(nbSelected === nb) {
                    button.removeAttribute("disabled");
                } else {
                    button.disabled = true;
                }
            });
        });
        
        button.addEventListener("click", (evt) => {
            this.defausser(selected);
            this.popup.effacerDialogue();
            this.render(this.proprietaire.dom.main);
        });
    }
}
