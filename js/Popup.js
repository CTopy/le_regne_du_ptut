"use strict";

class Popup {
    constructor() {
        //Définition du fond pour les boites de dialogue
        this.fond = document.getElementById("dark");
        this.container = document.querySelector(".popup-container");
        this.canvas = document.getElementById("renderCanvas");
        this.scene = JEU.scene;
    }

    ecouteur(elt) {
        elt.addEventListener("click", (e) => {
            this.afficher(elt);
        }, true);
    }

    /** Afficher une popup contenant element
    * @param element : Un ou plusieurs éléments à mettre dans la popup
    * @param flextype : 0 = aucun, 1 = row, 2 = column
    **/
    afficher(element, flextype=0, addQuitter=true) {
        if(!Array.isArray(element))
          element = [element]

        //Ajouter le fond noir au canvas
        this.fond.style.display = "flex";
        switch (flextype) {
            case 1: this.container.className = "popup-container flex-row";
            break;
            case 2: this.container.className = "popup-container flex-column";
            break;
            default: break;
        }

        //Clone les éléments à afficher
        const clone = [];
        element.forEach((elt) => {
            clone.push(elt.cloneNode(true));
        });

        //Créer la croix
        const quitter = document.createElement("img");
        quitter.src = "./assets/images/quitter.png";
        quitter.className = "quitter";

        //Afficher l'élément et la croix
        clone.forEach((elt) => {
            this.container.appendChild(elt);
        })
        if(addQuitter) {
            this.container.appendChild(quitter);
            
            //Ajouter l'écouteur à la croix
            this.ecouteurQuitter(quitter);
        }
        
        return new Promise(resolve => resolve('resolved'));

    }

    afficherCultistes(nbCultistes, flextype=0, lieuCultistes) {
        
        //Ajouter le fond noir au canvas
        this.fond.style.display = "flex";
        switch (flextype) {
            case 1: this.container.className = "popup-container flex-row";
            break;
            case 2: this.container.className = "popup-container flex-column";
            break;
            default: break;
        }

        //Création de l'image du cultiste
        let cultiste = document.createElement("img");
        cultiste.src = "./assets/images/cultiste.jpg";
        
        //Création de la légende
        let pCultiste = document.createElement("p");
        let text = document.createTextNode(nbCultistes+" ont été invoqué à la case : "+lieuCultistes);
        pCultiste.appendChild(text);

        //Créer la croix
        const quitter = document.createElement("img");
        quitter.src = "./assets/images/quitter.png";
        quitter.className = "quitter";

        //Afficher le cultiste, son nombre et la croix
        this.container.appendChild(cultiste);
        this.container.appendChild(pCultiste);
        this.container.appendChild(quitter);
        //Ajouter l'écouteur à la croix
        this.ecouteurQuitter(quitter);
        
        return new Promise(resolve => resolve('resolved'));

    }

    ecouteurQuitter(quitter) {
        //Ajouter un écouteur à la croix pour qu'elle change au survol
        quitter = $(quitter);
        quitter.hover(function (e){
            $(this).attr("src", "assets/images/quitter_survol.png");
        }, function(e) {
            $(this).attr("src", "assets/images/quitter.png");
        });

        //Ajouter un écouteur à la croix pour qu'elle quitte la carte
        quitter.click(this.effacerDialogue.bind(this));
    }

    effacerDialogue() {
        this.container.innerHTML = "";
        this.container.className = "popup-container";
        this.fond.style.display = "none";
    }
}
