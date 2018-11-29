"use strict";

class GrandAncien{
    constructor(nom, effet, img){
        this.nom = nom;
        this.effet = effet;
        this.estReveille = false; //boolean
        this.img = img;
    }
    
    reveil(){
        //lancer la video?
        this.estReveille = true;
    }
    
    afficherDOM() {
        //Créer les éléments du DOM
            //Définition de la div
            this.div = document.createElement("div");
            this.div.addClass("ancien ancien--cache");
            
            //Définition de l'image
            let imgGdAncien = document.createElement("img");
            imgGdAncien.src = this.img;
            
            //Définition du nom
            let pNom = document.createElement("p");
            pNom.innerHTML = this.nom;
            
            //Définition de l'effet
            let pEffet = document.createElement("p");
            pEffet.innerHTML = this.effet;
            
            //Ajouter les éléments à la div de l'ancien
            this.div.append(imgGdAncien, pNom, pEffet);
            
            //Ajouter la div à la liste de tous les anciens
            $("#gdAnciens").append(this.div);
    }
}

class Azathoth extends GrandAncien{
    constructor(){
        super("Azathoth", "Retirez de la parie 3 cultistes de la réserve.", "assets/images/grandsAnciens/azatoth.jpg")
    }
    reveil(){
        //lancer la video?
        this.estReveille = true;
        //jeu.reserveCultiste-3;
    }
}

class Yig extends GrandAncien{
    constructor(){
        super("Yig", "Sceller un portail nécessite une carte indice supplémentaire d'une ville reliée.", "assets/images/grandsAnciens/yig.jpg")
    }
    reveil(){
        //lancer la video?
        this.estReveille = true;
        //jeu.reserveCultiste-3;
    }
}

class Dagon extends GrandAncien{
    constructor(){
        super("Dagon", "Placez un cultiste sur chaque portail qu'il soit ouvert ou fermé.", "assets/images/grandsAnciens/dagon.jpg")
    }
    reveil(){
        //lancer la video?
        this.estReveille = true;
        //jeu.reserveCultiste-3;
    }
}

class Cthulhu extends GrandAncien{
    constructor(){
        super("Cthulhu", "Le monde est plongé dans la folie, le chaos et la destruction. Vous avez perdu la partie.", "assets/images/grandsAnciens/cthulhu.jpg")
    }
    reveil(){
        //lancer la video?
        this.estReveille = true;
        //jeu.reserveCultiste-3;
    }
}