"use strict"

class Entite {
    constructor(modele3D) {
        this.modele3D = modele3D
        this.mesh;
    }
}

class Investigateur extends Entite{
    constructor(joueur, nbAction, effet, image, element3D, cartesMax, nomPerso){
        super(element3D);
        this.joueur=joueur;
        this.nbAction = nbAction;
        this.effet=effet;
        this.image=image;
        this.estFou=false;
        this.lieu=GARE;
        this.position=GARE.origine;  //Babylon Vector 3*/
        this.cartesMax = cartesMax;
        this.santeMentale = 4;
        this.main = new Main();
        this.nomPersonnage = nomPerso;
        this.mesh;
    }
    
    devenirFou() {
        this.estFou=true;
    }
    seRetablirDeFolie(){
        this.estFou=false;
    }
    
    marcher(lieu){
        var coordoneeDestination = destination.ajouterEntite(this);
        this.lieu.retirerEntite(this);
        //animation?
        //var animationMvnt = new BABYLON.animation("animationInvestigateur", "position", 30,BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        this.lieu=coordoneeDestination;
    }
}

class Detective extends Investigateur{
    constructor(joueur){
        super(joueur, 
              4, 
              "Vous n'avez besoin que de 4 cartes de la même couleur pour sceller un portail.", 
              "./images/detective.jpg", 
              "./assets/modeles/investigateur.babylon", 
              7,
             "Détective");
        this.mesh = BABYLON.SceneLoader.ImportMesh("", "", this.element3D, scene, function(newMeshes) {
            newMeshes.forEach(function(mesh){
               mesh.position = position;
            });
        });
    }
    
    devenirFou(){
        this.estFou=true;
        this.nbAction = 3;
        this.effet = "Vous n'avez besoin que de 4 cartes de la même couleur pour sceller un portail. De plus, si vous participez à l'action prendre ou donner une carte indice, cela coute 2 actions au joueur actif";
        this.image = "./images/detectiveFou.jpg";
    }
    seRetablirDeFolie(){
        this.estFou=false;
        this.nbAction = 4;
        this.effet="Vous n'avez besoin que de 4 cartes de la même couleur pour sceller un portail."
        this.image="./images/detective.jpg";
    }
}

class Docteur extends Investigateur{
    constructor(joueur){
        super(joueur, 
              5, 
              "Vous pouvez effectuer jusqu'à 5 actions par tour.", 
              "./images/docteur.jpg", 
              "./assets/modeles/investigateur.babylon", 
              7,
              "Docteur");
        this.mesh = BABYLON.SceneLoader.ImportMesh("", "", this.element3D, scene, function(newMeshes) {
            newMeshes.forEach(function(mesh){
               mesh.position = position;
            });
        });
    }
    
    devenirFou(){
        this.estFou=true;
        this.nbAction = 4;
        this.effet = "Vous pouvez effectuer jusqu'à 4 actions par tour.";
        this.image = "./images/docteurFou.jpg";
    }
    seRetablirDeFolie(){
        this.estFou=false;
        this.nbAction = 5;
        this.effet="Vous pouvez effectuer jusqu'à 5 actions par tour."
        this.image="./images/docteur.jpg";
    }
}

class Conducteur extends Investigateur{
    constructor(joueur){
        super(joueur, 
              5, 
              "Lors de l'action marcher, vous POUVEZ vous déplacer de 2 lieux au lieu de 1. De plus, vous êtes immunisé contre les effets d'Ithaqua.", 
              "./images/docteur.jpg", 
              "./assets/modeles/investigateur.babylon", 
              7,
              "Conducteur");
        this.mesh = BABYLON.SceneLoader.ImportMesh("", "", this.element3D, scene, function(newMeshes) {
            newMeshes.forEach(function(mesh){
               mesh.position = position;
            });
        });
    }
    
    devenirFou(){
        this.estFou=true;
        this.nbAction = 3;
        this.effet = "Lors de l'action marcher, vous DEVEZ vous déplacer de 2 lieux au lieu de 1. De plus, vous êtes immunisé contre les effets d'Ithaqua.";
        this.image = "./images/conducteurFou.jpg";
    }
    seRetablirDeFolie(){
        this.estFou=false;
        this.nbAction = 4;
        this.effet="Lors de l'action marcher, vous POUVEZ vous déplacer de 2 lieux au lieu de 1. De plus, vous êtes immunisé contre les effets d'Ithaqua."
        this.image="./images/conducteur.jpg";
    }
}