"use strict";

//Utiliser du jQuery
class Vue {
    constructor() {
        //Définition du fond pour les boites de dialogue
        this.fond = $(document.createElement("div"));
        this.fond.attr("id", "dark");
        console.log(this.fond);
        this.canvas = $("#renderCanvas");
        this.cylindres = -1;
        this.scene = JEU.scene;
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
        quitter.click(this.effacerDialogue.bind(this));
    }
    
    effacerDialogue() {
        this.fond.remove();
    }
    
    afficherEntite(entite) {
        //Récupérer l'index de l'entité dans son lieu
        let index = entite.lieu.findIndex(function() {
           return entite; 
        });
        
        entite.mesh.visibility = false;
        entite.mesh.position = entite.lieu.coords[index];
        entite.mesh.visibility = true;
    }
    
    //Fonction pour test
        creerCube(lieu) {
            this.cylindres++;
            //Récupérer l'index de l'entité dans son lieu
            let mesh = BABYLON.MeshBuilder.CreateCylinder("cylindre"+this.cylindres, {}, this.scene);
            mesh.visibility = false;
            mesh.position = lieu.coords[this.cylindres%7];
            console.log(this.cylindres%6);
            mesh.visibility = true;
    }
}

var vue = new Vue();
for (var i=0; i<7; i++) {
    vue.creerCube(GARE);
    vue.creerCube(UNIVERSITE);
    vue.creerCube(COMMISSARIAT);
    vue.creerCube(PARC);
    vue.creerCube(LOGE_SECRETE);
    vue.creerCube(RESTAURANT);
}