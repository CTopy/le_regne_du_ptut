"use strict"

function Investigateur(joueur){
    var nbAction;
    var santeMentale;
    var nbCarteEnMainPutainDeMagicien;
    var effet;
    var image;
    var estFou;
    
    this.joueur=joueur;
    this.nbAction = 4;
    this.santeMentale = 4;
    this.effet="";
    this.image="";
    this.estFou=false;
    
    this.devenirFou = function(){
        this.estFou=true;
        this.nbAction = 3;
        this.effet = "";
        this.image = "";
    }
    this.seRetablirDeFolie = function(){
        this.estFou=false;
        this.nbAction = 3;
        this.effet = "";
        this.image = "";
    }
}

var Detective = function(joueur){
    Investigateur.call(joueur);
    this.joueur=joueur;
    this.personnage="Détective";
    this.nbAction = 4;
    this.santeMentale = 4;
    this.nbCarteEnMainPutainDeMagicien = 7;
    this.effet="Vous n'avez besoin que de 4 cartes de la même couleur pour sceller un portail."
    this.image="./images/detective.jpg";
    this.estFou=false;
    
    this.devenirFou = function(){
        this.estFou=true;
        this.nbAction = 3;
        this.effet = "Vous n'avez besoin que de 4 cartes de la même couleur pour sceller un portail. De plus, si vous participez à l'action prendre ou donner une carte indice, cela coute 2 actions au joueur actif";
        this.image = "./images/detectiveFou.jpg";
    }
    this.seRetablirDeFolie = function(){
        this.estFou=false;
        this.nbAction = 4;
        this.effet="Vous n'avez besoin que de 4 cartes de la même couleur pour sceller un portail."
        this.image="./images/detective.jpg";
    }
    
    this.prototype = new Investigateur();
}

var Docteur = function(joueur){
    Investigateur.call(joueur);
    this.joueur=joueur;
    this.personnage="Docteur";
    this.nbAction = 5;
    this.santeMentale = 4;
    this.nbCarteEnMainPutainDeMagicien = 7;
    this.effet="Vous pouvez effectuer jusqu'à 5 actions par tour."
    this.image="./images/docteur.jpg";
    this.estFou=false;
    
    this.devenirFou = function(){
        this.estFou=true;
        this.nbAction = 4;
        this.effet = "Vous pouvez effectuer jusqu'à 4 actions par tour.";
        this.image = "./images/docteurFou.jpg";
    }
    this.seRetablirDeFolie = function(){
        this.estFou=false;
        this.nbAction = 5;
        this.effet="Vous pouvez effectuer jusqu'à 5 actions par tour."
        this.image="./images/docteur.jpg";
    }
    
    
    this.prototype = new Investigateur();
}

var Conducteur = function(joueur){
    Investigateur.call(joueur);
    this.joueur=joueur;
    this.personnage="Conducteur";
    this.nbAction = 4;
    this.santeMentale = 4;
    this.nbCarteEnMainPutainDeMagicien = 7;
    this.effet="Lors de l'action marcher, vous POUVEZ vous déplacer de 2 lieux au lieu de 1. De plus, vous êtes immunisé contre les effets d'Ithaqua."
    this.image="./images/conducteur.jpg";
    this.estFou=false;
    
    this.devenirFou = function(){
        this.estFou=true;
        this.nbAction = 3;
        this.effet = "Lors de l'action marcher, vous DEVEZ vous déplacer de 2 lieux au lieu de 1. De plus, vous êtes immunisé contre les effets d'Ithaqua.";
        this.image = "./images/conducteurFou.jpg";
    }
    this.seRetablirDeFolie = function(){
        this.estFou=false;
        this.nbAction = 4;
        this.effet="Lors de l'action marcher, vous POUVEZ vous déplacer de 2 lieux au lieu de 1. De plus, vous êtes immunisé contre les effets d'Ithaqua."
        this.image="./images/conducteur.jpg";
    }
    
    this.prototype = new Investigateur();
}