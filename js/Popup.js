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
    afficher(element, flextype=0) {
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
        this.container.appendChild(quitter);

        //Ajouter l'écouteur à la croix
        this.ecouteurQuitter(quitter);
    }

    afficherCultiste(nbCultistes, lieuCultistes) {
        //Ajouter le fond noir au canvas
        this.canvas.after(this.fond);

        //Création de l'image du cultiste
        let cultiste = $(document.createElement("img"));
        cultiste.attr("src", "./assets/images/cultiste.jpg");

        //Afficher l'image du cultistes, son nombre et son lieu puis effacement
        this.fond.append(cultiste);
        this.fond.append("<p>"+nbCultistes+" ont été invoqués à "+lieuCultistes+"</p>");
        console.log(this.fond);
        setTimeout(function(){
            this.fond.empty();
            this.fond.remove();
        }, 5000);
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
