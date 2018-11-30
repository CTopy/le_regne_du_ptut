"use strict"

class Entite {
    constructor(nomModele, lieu) {
        this.scene = JEU.scene;
        this.nomModele = nomModele;
        this.lieu = lieu;
        this.lieu.ajouterEntite(this);
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
        let index = this.lieu.entites.findIndex(function(object) {
           return object === this; 
        }.bind(this));
        
        this.mesh.visibility = false;
        this.mesh.position = this.lieu.coords[index];
        this.mesh.visibility = true;
    }
    
    async deplacer(nvLieu) {

        //Trouver la nouvelle position du joueur sur le lieu en fonction du nombre d'entités déjà présentes
        let nvPosition = nvLieu.coords[nvLieu.nbEntites];
        
        //Transformer la position en tableau pour pouvoir le manipuler
        let xyz = this.mesh.position.asArray();
        let x = xyz[0];
        let y = xyz[1];
        let z = xyz[2];
        
        //Transformer la nouvelle position du joueur en tableau
        let xyz1 = nvLieu.coords[nvLieu.nbEntites].asArray();
        let x1 = xyz1[0];
        let y1 = xyz1[1];
        let z1 = xyz1[2];
        
        //Animation de déplacement
        var deplacement = new BABYLON.Animation("deplacer", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        deplacement.setKeys(new Array(
            {frame:0,
            value:this.mesh.position},
            {frame:10,
            value: new BABYLON.Vector3(x, y+2, z)},
            {frame:35,
            value: new BABYLON.Vector3(x1, y+2, z1)},
            {frame: 40,
            value: new BABYLON.Vector3(x1, y1, z1)}
        ));
        
        this.mesh.animations = new Array(deplacement);
        this.scene.beginAnimation(this.mesh, 0, 100, true);
        this.lieu.retirerEntite(this);
        nvLieu.ajouterEntite(this);
        this.lieu = nvLieu;
    }
}

class Investigateur extends Entite{
    constructor(nomJoueur, nbAction, effet, image, nomModele, cartesMax, nomPersonnage){
        super(nomModele, GARE);
        this.nomJoueur=nomJoueur;
        this.nbAction = nbAction;
        this.nbActionMax = nbAction;
        this.effet=effet;
        this.image=image;
        this.cartesMax = cartesMax;
        this.santeMentale = 4;
//        this.main = new Main();
        this.nomPersonnage = nomPersonnage;
        //Création de l'élément du DOM
        this.eltDOM = document.createElement("div");
        this.eltDOM.dataset.joueur = this.nomJoueur;
        this.eltDOM.classList.add("interface");
        
        //Création de la div investigateur
        this.divInvestigateur = document.createElement("div");
        this.divInvestigateur.classList.add("investigateur");
        
        this.imageDOM = document.createElement("img");
        this.imageDOM.src = this.image;
        
        let nomDOM = document.createElement("p");
        nomDOM.innerHTML = this.nomJoueur;
        
        let invDOM = document.createElement("p");
        invDOM.innerHTML = this.nomPersonnage;
        
        this.effetDOM = document.createElement("p");
        this.effetDOM.innerHTML = this.effet;
        
        this.divInvestigateur.appendChild(this.imageDOM);
        this.imageDOM.after(this.effet);
        
        //Création de la div actions
        this.actionsDOM = document.createElement("div");
        this.actionsDOM.classList.add("nbActions");
        this.actionsDOM.innerHTML = "<p>"+this.nbAction+"</p>";
        
        //Création de la div santé mentale
        this.santeMentaleDOM = document.createElement("div");
        this.santeMentaleDOM.classList.add("santeMentale");
        this.santeMentaleDOM.innerHTML = "<div><p>"+this.santeMentale+"</p></div>";
        for (let i = 1; i <= this.santeMentale; i++)
            this.santeMentaleDOM.lastChild.insertAdjacentHTML('beforeend',"<img src=\"assets/images/backgrounds/folie.jpg\" />");
        
        //Création de la div main
        this.mainDOM = document.createElement("div");
        this.mainDOM.classList.add("main");
        
        this.eltDOM.appendChild(this.divInvestigateur);
        this.eltDOM.appendChild(this.actionsDOM);
        this.eltDOM.appendChild(this.santeMentaleDOM);
        this.eltDOM.appendChild(this.mainDOM);
        
        this.identiteDOM = document.createElement("div");
        this.identiteDOM.innerHTML = "<p>"+this.nomJoueur+"</p>"+
                                     "<p>"+this.nomPersonnage+"</p>";
        
    }
    
    devenirFou() {
        this.estFou=true;
    }
    seRetablirDeFolie(){
        this.estFou=false;
    }
    
    setActif() {
        let nom = document.createElement("p");
        nom.innerHTML = this.nomJoueur;
        let inv = document.createElement("p");
        inv.innerHTML = this.nomPersonnage;
        this.divInvestigateur.innerHTML = "";
        this.divInvestigateur.append(this.imageDOM);
        this.divInvestigateur.append(nom);
        this.divInvestigateur.append(inv);
        this.divInvestigateur.append(this.effetDOM);   
        this.eltDOM.className = "interface joueurActif";
    }
    
    setPassif(rang){
        this.divInvestigateur.innerHTML = "";
        this.divInvestigateur.append(this.imageDOM);
        this.divInvestigateur.append(this.identiteDOM);
        this.divInvestigateur.append(this.effetDOM)
        this.eltDOM.className = "interface joueurPassif j"+rang;
    }
    
    afficherDOM() {
        document.getElementById("joueurs").appendChild(this.eltDOM);
    }
    
    ajouterActions(nb) {
        this.nbAction = this.nbAction + nb;
        this.actionsDOM.innerHTML = "";
        this.actionsDOM.innerHTML = "<p>"+this.nbAction+"</p>";
    }
    
    setActions(nb) {
        this.nbAction = nb;
        this.actionsDOM.innerHTML = "";
        this.actionsDOM.innerHTML = "<p>"+this.nbAction+"</p>";
    }
}

class Detective extends Investigateur{
    constructor(nomJoueur){
        super(nomJoueur, 
              4, 
              "Vous n'avez besoin que de 4 cartes de la même couleur pour sceller un portail.", 
              "./assets/images/investigateurs/detective.jpg", 
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