"use strict";

class GrandAncien{
    constructor(){
        this.nom;
        this.effet;
        this.reveille; //boolean
        this.invocation; //video d'invocation?
    }
    
    reveil(){
        //lancer la video?
        this.reveille = true;
    }
}

class Azathoth extends GrandAncien{
    constructor(){
        this.nom = "Azathoth"
        this.effet="Retirez de la parie 3 cultistes de la réserve."
        this.reveille=false;
        this.invocation="";
    }
    reveil(){
        //lancer la video?
        this.reveille = true;
        //jeu.reserveCultiste-3;
    }
}

class Yig extends GrandAncien{
    constructor(){
        this.nom = "Yig"
        this.effet="Sceller un portail nécessite une carte indice supplémentaire d'une ville reliée."
        this.reveille=false;
        this.invocation="";
    }
    reveil(){
        //lancer la video?
        this.reveille = true;
        //jeu.reserveCultiste--;
    }
}

class Dagon extends GrandAncien{
    constructor(){
        this.nom = "Dagon"
        this.effet="Placez un cultiste sur chaque portail qu'il soit ouvert ou fermé."
        this.reveille=false;
        this.invocation="";
    }
    reveil(){
        //lancer la video?
        this.reveille = true;
        //jeu.reserveCultiste--;
    }
}

class Yig extends GrandAncien{
    constructor(){
        this.nom = "Yig"
        this.effet="Sceller un portail nécessite une carte indice supplémentaire d'une ville reliée."
        this.reveille=false;
        this.invocation="";
    }
    reveil(){
        //lancer la video?
        this.reveille = true;
        //jeu.reserveCultiste--;
    }
}