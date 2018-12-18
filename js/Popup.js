"use strict";

//Utiliser du jQuery
class Popup {
    constructor() {
        //Définition du fond pour les boites de dialogue
        this.fond = $(document.createElement("div"));
        this.fond.attr("id", "dark");
        this.canvas = $("#renderCanvas");
        this.cylindres = -1;
        this.scene = JEU.scene;
    }
    
    afficherCarte(carte) {
        //Ajouter le fond noir au canvas
        this.canvas.after(this.fond);
        
        //Clone la carte clickée
        let clone = carte.clone();
        
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