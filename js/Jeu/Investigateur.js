"use strict"

function Investigateur(joueur){
    var nbAction;
    var santeMentale;
    var effet;
    var image;
    
    this.joueur=joueur;
    this.nbAction = 4;
    this.santeMentale = 4;
    this.effet="";
    this.image="";
}

var Detective= function(joueur){
    Investigateur.call(joueur)
    this.joueur=joueur;
    this.personnage="Détective";
    this.nbAction = 4;
    this.santeMentale = 4;
    this.effet="Vous n'avez besoin que de 4 cartes de la même couleur pour sceller un portail."
    this.image="./images/detective.jpg";
    
    this.prototype = new Investigateur();
}

var Detective= function(joueur){
    Investigateur.call(joueur)
    this.joueur=joueur;
    this.personnage="Docteur";
    this.nbAction = 5;
    this.santeMentale = 4;
    this.effet="Vous pouvez effectuer jusqu'à 5 actions par tour."
    this.image="./images/docteur.jpg";
    
    this.prototype = new Investigateur();
}