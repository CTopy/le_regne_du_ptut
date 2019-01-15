"use strict";

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
//      this.main = new Main();
        this.nomPersonnage = nomPersonnage;
        //Création de l'élément du DOM
        this.div = document.createElement("div");
        this.div.className = "interface";
        this.div.id = nomJoueur.toLowerCase().replace(/("|'| |<!--)/g, ""); //Retirer les caractères illégaux ' " <!-- et espace

//      http://pojo.sodhanalibrary.com/ConvertToVariable
        this.div.innerHTML =
        '               <div class="investigateur">'+
    '                        <img v-if="santeMentale != 0" class="portrait" :src="image" />'+
    '                        <img v-else class="portrait" :src="imageFou" />'+
        '                    <div v-if="!actif">'+
        '                       <p>{{nom}}</p>'+
        '                       <p>{{role}}</p>'+
        '                    </div>'+
        '                    <p v-if="actif">{{nom}}</p>'+
        '                    <p v-if="actif">{{role}}</p>'+
        '                    <p>{{effet}}</p>'+
        '                </div>'+
        '                <div class="nbActions">'+
        '                    <p>{{nbActions}}</p>'+
        '                </div>'+
        '                <div class="santeMentale">'+
        '                    <div v-if="actif">'+
        '                        <div v-for="n in santeMentale">'+
        '                            <img src="assets/images/backgrounds/folie.jpg" />'+
        '                        </div>'+
        '                    </div>'+
        '                    <div v-else>'+
        '                        <p>{{santeMentale}}</p>'+
        '                    </div>'+
        '                </div>'+
'                        <div class="main">'+
'                            <img class="carte" src="assets/images/arkham.png" />'+
'                            <img class="carte" src="assets/images/innsmouth.png" />'+
'                            <img class="carte" src="assets/images/arkham.png" />'+
'                            <img class="carte" src="assets/images/kingsport.png" />'+
'                            <img class="carte" src="assets/images/innsmouth.png" />'+
'                            <img class="carte" src="assets/images/innsmouth.png" />'+
'                            <img class="carte" src="assets/images/oeil_mi_go.jpg" />'+
'                            <img class="carte" src="assets/images/arkham.png" />'+
'                        </div>';
        document.getElementById("joueurs").appendChild(this.div);
        this.setPassif();
    }

    setActif() {
        if(this.actif == null) {
            this.div.classList.add("joueurActif");
            this.actif = true;
        }
        else if(!this.actif) {
            this.div.classList.add("joueurActif");
            this.div.classList.remove("joueurPassif");
            this.div.className.replace(/( j\d)|(j\d )|(j\d)/, ""); //Retirer le rang du joueur
            this.actif = true;
        }
        else console.log("Erreur : Le Joueur "+this.nom+" est déjà actif");
    }
    //FIXME setPassif et setActif
    setPassif(rang){
        if(rang<5 && rang>1)
            if (this.actif  == null) {
                this.div.classList.add("joueurPassif");
                this.div.classList.add("j"+rang);
                this.actif = false;
            }
            else if (this.actif || !this.div.className.match(/( j\d)|(j\d )|(j\d)/)) {
                this.div.classList.add("joueurPassif");
                this.div.classList.remove("joueurActif");
                this.div.classList.add("j"+rang);
                this.actif = false;
            }
            else console.log("Erreur : Le joueur "+this.nom+" n'a pas été mis passif");
        else console.log("Le rang doit être compris entre 1 et 3");
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
