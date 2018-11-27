"use strict";

//Utiliser du jQuery
class Vue {
    constructor() {
        //Définition du fond pour les boites de dialogue
        this.fond = $(document.createElement("div"));
        this.fond.attr("id", "dark");
        console.log(this.fond);
        this.canvas = $("#renderCanvas");
    }
    
    afficherCarte(carte) {
        //Ajouter le fond noir au canvas
        this.canvas.after(this.fond);
        
        //Clone la carte clickée
        var clone = carte.clone();
        
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
        quitter.click(this.effacerDialogue);
    }
    
    effacerDialogue() {
        alert(this.fond);
        this.fond.remove();
    }
}

var vue = new Vue();