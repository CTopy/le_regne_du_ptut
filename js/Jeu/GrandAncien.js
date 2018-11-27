"use strict";

class GrandAncien{
    constructor(nom, effet, invocation){
        this.nom = nom;
        this.effet = effet;
        this.estReveille = false; //boolean
        this.invocation = invocation; //video d'invocation?
    }
    
    reveil(){
        //lancer la video?
        this.estReveille = true;
    }
}

class Azathoth extends GrandAncien{
    constructor(){
        super("Azathoth", "Retirez de la parie 3 cultistes de la réserve.", "")
    }
    reveil(){
        //lancer la video?
        this.estReveille = true;
        //jeu.reserveCultiste-3;
    }
}

class Yig extends GrandAncien{
    constructor(){
        super("Yig", "Sceller un portail nécessite une carte indice supplémentaire d'une ville reliée.", "")
    }
    reveil(){
        //lancer la video?
        this.estReveille = true;
        //jeu.reserveCultiste-3;
    }
}

class Dagon extends GrandAncien{
    constructor(){
        super("Dagon", "Placez un cultiste sur chaque portail qu'il soit ouvert ou fermé.", "")
    }
    reveil(){
        //lancer la video?
        this.estReveille = true;
        //jeu.reserveCultiste-3;
    }
}

class Dagon extends GrandAncien{
    constructor(){
        super("Cthulhu", "Le monde est plongé dans la folie, le chaos et la destruction. Vous avez perdu la partie.", "")
    }
    reveil(){
        //lancer la video?
        this.estReveille = true;
        //jeu.reserveCultiste-3;
    }
}