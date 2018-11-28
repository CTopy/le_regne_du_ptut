"use strict"

class Entite {
    constructor(nomModele, lieu) {
        this.scene = JEU.scene;
        this.nomModele = nomModele;
        this.lieu = lieu;
        this.lieu.ajouterEntite(this);
        console.log(this.lieu.entites);
    }
    
    //Pour des raisons de synchronicité, pour afficher une entité il faut
    //appeller le constructeur, puis la méthode affichermesh() dans une fonction asynchrone (avec le mot clé async devant)
    async afficherMesh() {
        //Si le modèle n'existe pas, on l'importe
        if (typeof this.mesh === 'undefined') {
            //Importer
            let result = await BABYLON.SceneLoader.ImportMeshAsync("", "./assets/modeles/", this.nomModele, this.scene);
            
            //Récupérer le mesh
            this.mesh = result['meshes'][0];
        }
        //Récupérer l'index de l'entité dans son lieu
        let index = this.lieu.entites.findIndex(() => {
           return this; 
        });
        
        this.mesh.visibility = false;
        this.mesh.position = this.lieu.coords[index];
        this.mesh.visibility = true;
    }
    
    deplacer(nvLieu) {
        var deplacement = new BABYLON.Animation("deplacer", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        deplacement.setKeys(new Array(
            {frame:0,
            value:this.mesh.position},
            {frame:15,
            value:nvLieu.coords[nvLieu.nbEntites]}
        ));
    }
}

class Investigateur extends Entite{
    constructor(nomJoueur, nbAction, effet, URLimage, nomModele, cartesMax, nomPersonnage){
        super(nomModele, GARE);
        this.nomJoueur=nomJoueur;
        this.nbAction = nbAction;
        this.nbActionMax = nbAction;
        this.effet=effet;
        this.URLimage=URLimage;
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
    constructor(nomJoueur){
        super(nomJoueur, 
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
    
    ajusterMesh() {
        this.mesh.scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
    }
}