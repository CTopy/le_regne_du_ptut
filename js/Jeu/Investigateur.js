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
    constructor(nomJoueur, nbAction, effet, image, nomModele, cartesMax, nomPersonnage, imageFou){
        super(nomModele, GARE);
        this.nomJoueur=nomJoueur;
        this.nbAction = nbAction;
        this.nbActionMax = nbAction;
        this.effet=effet;
        this.image=image;
        this.imageFou = imageFou;
        this.cartesMax = cartesMax;
        this.santeMentale = 4;
//        this.main = new Main();
        this.nomPersonnage = nomPersonnage;

<<<<<<< HEAD
        //Création du DOM
        //Un objet JSON qui contient les différents éléments qui seront amenés à être modifiés
        this.dom = {
            "root": document.createElement("div"),
            "effet": document.createElement("p"),
            "portrait": document.createElement("img"),
            "actions": document.createElement("p"),
            "smpassive": {
                "div": document.createElement("div"),
                "text": document.createElement("p")
            },
            "smactive": [],
            "main":document.createElement("div")
        }
        
        this.dom.root.classList.add("interface");
        const regex = new RegExp(' |<!--|\'|"|<|\\|/|>');
        this.dom.root.id = this.nomJoueur.toLowerCase().replace(regex, "");

        this.dom.effet.textContent = this.nomJoueur;

        this.dom.img.addClass("portrait");
        this.dom.img.src=this.image;

        this.dom.actions.textContent = "this.nbAction";
        
        this.dom.smpassive.text.textContent = this.santeMentale;
        this.dom.smpassive.div.appendChild(this.dom.smpassive.text);
        
        for (let i = 0; i<this.santeMentale;i++) {
            let img = document.createElement("img");
            img.src = "./assets/images/backgrounds/folie.jpg";
            this.dom.smactive.push(img);
        }
        
        this.dom.main.addClass("main");
        
        //Remplissage de l'élément du DOM
        this.dom.root.innerHTML =
        `<div class="investigateur">
            <div>
                <p>`+this.nomJoueur+`</p>
                <p>`+this.nomPersonnage+`</p>
            </div>
            `+/*Insérer effet*/`
        </div>
        <div class="nbActions">
            `+/*Insérer nb actions*/`
        </div>
        <div class="santeMentale">
    	   `+/*Insérer santé mentale*/`
        </div>
        `/*Insérer main*/;
        this.dom.root.querySelector(".investigateur").appendChild(this.dom.effet);
        this.dom.root.querySelector(".nbActions").appendChild(this.dom.actions);
        this.dom.root.querySelector(".santeMentale").appendChild(this.dom.smpassive.div);
        this.dom.root.appendChild(this.dom.main);
    }
    
    updateDom() {
        let divContent = document.getElementById(this.dom.root.id).innerHTML;
        divContent = "";
        divContent = this.dom.root.innerHTML;
=======
        //Création de l'élément du DOM
        const root = document.createElement("div");
        root.classList.add("interface");
        root.id = this.nomJoueur.toLowerCase();

        const effet = document.createElement("p");
        nom.textContent = this.nomJoueur;

        const img = document.createElement("img");
        img.addClass("portrait");
        img.src=this.image;

        const actions = document.createElement("p");
        actions.textContent = "this.nbAction";

        const sm = document.createElement("div");
        sm.append(document.createElement("p"));
        sm.querySelector("p").textContent = this.santeMentale;

        this.dom = {
            "root": root;
        }

        //Remplissage de l'élément du DOM
        this.eltDOM.innerHTML =
        `<div class="investigateur"
          <div>
            <p>`+this.nomJoueur+`</p>
            <p>`+this.nomPersonnage+`</p>
          </div>
        `
        ;
            "<div class=\"investigateur\">"+
                "<img class=\"portrait\" src=\"assets/images/investigateurs/docteur.jpg\" />"+
                    "<div>"+
                        "<p>{{nom}}</p>"+
                        "<p>{{investigateur}}</p>"+
                    "</div>"+
                    "<p>{{effet}}</p>"+
            "</div>"+
            "<div class=\"nbActions\">"+
                "<p>5</p>"+
            "</div>"+
            "<div class=\"santeMentale\">"+
                "<div>"+
                    "<p>4</p>"+
                "</div>"+
                "<img src=\"assets/images/backgrounds/folie.jpg\" />"+
                "<img src=\"assets/images/backgrounds/folie.jpg\" />"+
                "<img src=\"assets/images/backgrounds/folie.jpg\" />"+
                "<img src=\"assets/images/backgrounds/folie.jpg\" />"+
            "</div>"+
            "<div class=\"main\">"+
            "</div>";

    }

    devenirFou() {
        this.estFou=true;
        this.echangerImages();
    }
    seRetablirDeFolie(){
        this.estFou=false;
        this.echangerImages();
    }

    private echangerImages(anim=true) {

        let i = this.image;
        this.image = this.imageFou
        this.imageFou = i;
>>>>>>> classe
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
        document.getElementById("joueurs").appendChild(this.dom.root);
    }
<<<<<<< HEAD
    
    ajouterSanteMentale(nb) {
        if((nb>0 && nb <=4) && this.santeMentale-nb > 0) {
            this.santeMentale -= nb;
            
            this.dom.smactive = [];
            for (let i = 0; i<this.santeMentale; i++) {
                let img = document.createElement("img");
                img.src = "./assets/images/backgrounds/folie.jpg";
                this.dom.smactive.push(img);
            }
            this.dom.smpassive.text.textContent = this.santeMentale;
            
            this.updateDom();
        } else console.log('Erreur : santeMentale ne peut pas être à 0');
    }
=======
>>>>>>> classe

    ajouterActions(nb) {
        this.nbAction = this.nbAction + nb;
        this.actionsDOM.children.length = 0;
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
