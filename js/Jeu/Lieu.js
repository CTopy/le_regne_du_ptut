"use strict";

//Constructeur
var Lieu = function(nom, origine, ville) {
    if (typeof origine === typeof new BABYLON.Vector3(0,0,0))
    this.origine = origine;
    else throw ("L'origine doit être de type BABYLON.Vector3");
    
    this.positions = array();         //Calculer les différentes positions (7 en tout)
    this.nom = nom;
    this.ville = ville;
    this.portail;
};