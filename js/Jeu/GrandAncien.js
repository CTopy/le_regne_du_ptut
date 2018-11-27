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
        for(var unLieu of lieux){
            if(unLieux.portail){
                unLieu.ajouterEntite(new Cultiste());
            }
        }
    }
}

class Cthulhu extends GrandAncien{
    constructor(){
        this.nom = "Cthulhu"
        this.effet="Le monde est plongé dans la folie, le chaos et la destruction. Vous avez perdu la partie."
        this.reveille=false;
        this.invocation="";
    }
    reveil(){
        //lancer la video?
        this.reveille = true;
        //jeu.perdu!;
    }
}