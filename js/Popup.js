"use strict";

//Utiliser du jQuery
class Popup {
    constructor() {
        //Définition du fond pour les boites de dialogue
        this.fond = $(document.createElement("div"));
        this.fond.attr("id", "dark");

        this.container = $(document.createElement("div"));
        this.container.attr("id", "popup");

        this.canvas = $("#renderCanvas");
    }

    pre() {
        //Afficher l'overlay noir
        this.canvas.after(this.fond);
        this.fond.append(this.container);
    }

    /** Afficher les cartes à l'écran
    * @param carte : Une carte à afficher ou
    * @param arr : Un tableau de cartes à afficher
    **/
    afficherCarte(carte = false, arr = false, anim = AUCUNE) {
        //Création du bouton quitter
        var quitter = $(document.createElement("img"));
        quitter.attr("src", "./assets/images/quitter.png");

        //Afficher la carte et la croix
        this.fond.append(clone);
        this.fond.append(quitter);

        //Ajouter l'écouteur à la croix
        this.ecouteurQuitter(quitter);
    }

    ecouteurQuitter(quitter) {
        //Ajouter un écouteur à la croix pour qu'elle change au survol
        quitter.hover(function (e){
            $(this).attr("src", "assets/images/quitter_survol.png");
        }, function(e) {
            $(this).attr("src", "assets/images/quitter.png");
        });

        //Ajouter un écouteur à la croix pour qu'elle quitte la carte
        quitter.click(this.effacerDialogue.bind(this));
    }

    effacerDialogue() {
        this.fond.empty();
        this.fond.remove();
    }
}
