"use strict";

class GrandAncien{
    constructor(nom, effet, img){
        this.nom = nom;
        this.effet = effet;
        this.estReveille = false; //boolean
        this.div;
        this.img = img;
    }
    
    reveil(){
        //lancer la video?
        this.estReveille = true;
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