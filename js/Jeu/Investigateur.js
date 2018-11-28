"use strict"

class Entite {
    constructor(modele) {
        this.scene = JEU.scene;
        this.modele = modele;
        this.mesh;
        this.lieu;
        let _this = this;
        
                
        // Importer le modèle
        BABYLON.SceneLoader.ImportMesh("", "./assets/modeles/", _this.modele, _this.scene, function (meshes) {
            _this.mesh = meshes[0];
        });
    }
}

class Investigateur extends Entite{
    constructor(nomJoueur, nbAction, effet, URLimage, element3D, cartesMax, nomPersonnage){
        super(element3D);
        this.nomJoueur=nomJoueur;
        this.nbAction = nbAction;
        this.nbActionMax = nbAction;
        this.effet=effet;
        this.URLimage=URLimage;
        this.estFou=false;
        this.lieu=GARE;
        this.cartesMax = cartesMax;
        this.santeMentale = 4;
//        this.main = new Main();
        this.nomPersonnage = nomPersonnage;
    }
    
    devenirFou() {
        this.estFou=true;
    }
    seRetablirDeFolie(){
        this.estFou=false;
    }
    
    seDeplacer(lieu){
        var coordoneeDestination = destination.ajouterEntite(this);
        this.lieu.retirerEntite(this);
        this.lieu=coordoneeDestination;
    }
}

class Detective extends Investigateur{
    constructor(joueur){
        super(joueur, 
              4, 
              "Vous n'avez besoin que de 4 cartes de la même couleur pour sceller un portail.", 
              "./images/detective.jpg", 
              "detective.babylon", 
              7,
             "Détective");
    }
    
    devenirFou(){
        this.estFou=true;
        this.nbAction = 3;
        this.nbActionMax = 3;
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
              "docteur.babylon", 
              7,
              "Docteur");
    }
    
    devenirFou(){
        this.estFou=true;
        this.nbActionMax = 4;
        this.effet = "Vous pouvez effectuer jusqu'à 4 actions par tour.";
        this.image = "./images/docteurFou.jpg";
    }
    seRetablirDeFolie(){
        this.estFou=false;
        this.nbActionMax = 5;
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
              "conducteur.babylon", 
              7,
              "Conducteur");
    }
    
    devenirFou(){
        this.estFou=true;
        this.nbActionMax = 3;
        this.effet = "Lors de l'action marcher, vous DEVEZ vous déplacer de 2 lieux au lieu de 1. De plus, vous êtes immunisé contre les effets d'Ithaqua.";
        this.image = "./images/conducteurFou.jpg";
    }
    seRetablirDeFolie(){
        this.estFou=false;
        this.nbActionMax = 4;
        this.effet="Lors de l'action marcher, vous POUVEZ vous déplacer de 2 lieux au lieu de 1. De plus, vous êtes immunisé contre les effets d'Ithaqua."
        this.image="./images/conducteur.jpg";
    }
}