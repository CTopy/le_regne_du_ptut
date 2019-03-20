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
    constructor(nomJoueur, nbAction, effet, image, nomModele, cartesMax, nomPersonnage, imageFou, defausse){
        super(nomModele, GARE);
        this.nomJoueur=nomJoueur;
        this.nbAction = nbAction;
        this.nbActionMax = nbAction;
        this.effet=effet;
        this.image=image;
        this.imageFou = imageFou;
        this.cartesMax = cartesMax;
        this.santeMentale = 4;
        this.nomPersonnage = nomPersonnage;
        this.actif = true;
        this.rang = 0;

        //Remplissage de l'élément du DOM
        let id = this.nomJoueur.toLowerCase().replace(/('|"|<!--|\/\*| |\/\/|\+)*/g,"");
        let html =
        `<div class="investigateur">
                <img class="portrait" src="`+this.image+`" />
                <p>${this.nomJoueur}</p>
                <p>${this.nomPersonnage}</p>
                <p>${this.effet}</p>
            </div>
            <div class="nbActions">
                <p>${this.nbAction}</p>
            </div>
            <div class="santeMentale">
                <div>
                    <p>4</p>
                </div>
                <img src="assets/images/backgrounds/folie.jpg" />
                <img src="assets/images/backgrounds/folie.jpg" />
                <img src="assets/images/backgrounds/folie.jpg" />
                <img src="assets/images/backgrounds/folie.jpg" />
            </div>
            <div class="main">
        </div>
        `;
        let joueurDOM = document.createElement("div");
        joueurDOM.id = id;
        joueurDOM.className = "joueurActif interface";
        joueurDOM.innerHTML = html;
        document.getElementById("joueurs").appendChild(joueurDOM);

        //Objet JSON contenant des pointeurs vers les éléments du DOM devant être modifiés
        this.dom = {
            root: document.getElementById(id),
            portrait: document.querySelector("#"+id+" .portrait"),
            effet: document.querySelector("#"+id+" .investigateur p:last-child"),
            actions: document.querySelector("#"+id+" .nbActions p"),
            smDiv: document.querySelector("#"+id+" .santeMentale"),
            main: document.querySelector('#'+id+" .main")
        };

        const effetPopup = new Popup();
        this.dom.effet.className = "effet";
        this.dom.effet.addEventListener("click", (e) => {
            effetPopup.afficher(e.target, 1);
        });

        const carte = new Indice(ARKHAM);
        this.main = new Main([
        ], this, defausse);
    }

    /*
    * Permet de passer l'investigateur de sain à fou, et inversement
    */
    toggleFolie(nvNbA, nvEffet) {
        this.estFou = !this.estFou;
        if(this.estFou)
            this.dom.portrait.src= this.imageFou;
        else this.dom.portrait.src=this.image;

        this.nbActionMax = nvNbA;
        this.effet = nvEffet;
    }

    /*
    * Passer le joueur d'actif à passif et inversement
    * @param rang (optionel) : Le rang à accorder. 0 si il est passif
    */
    toggleActif(rang) {
        if (rang>=2 && rang<=4) {
            this.rang = rang;
            this.dom.root.className = "interface joueurPassif j"+this.rang;
            this.actif = false;
        } else if (rang==1) {
            this.rang = 0;
            this.dom.root.className = "interface joueurActif";
            this.actif = true;
        }
    }

    ajouterSanteMentale(nb) {
        if((nb>0 && nb <=4) || (nb>=-4 && nb<0) &&
        (nb+this.santeMentale<=4 || nb+this.santeMentale >0)) {
            this.santeMentale -= nb;
            this.dom.smDiv.innerHTML =
            `<p>`+this.santeMentale+`</p>`;
            for(let i=0; i<this.santeMentale; i++) {
                let img = document.createElement("img");
                img.src = "assets/images/backgrounds/folie.jpg";
                this.dom.smDiv.appendChild(img);
            }
        } else console.log('Erreur : mauvaises valeurs');
    }

    ajouterActions(nb) {
        this.nbAction = this.nbAction + nb;
        this.dom.actions.textContent = this.nbAction;
    }
}

class Detective extends Investigateur{
    constructor(nomJoueur, defausse){
        super(nomJoueur,
              4,
              "Vous n'avez besoin que de 4 cartes de la même couleur pour sceller un portail.",
              "./assets/images/investigateurs/detective.jpg",
              "detective.babylon",
              7,
             "Détective",
             defausse);
    }

    ajusterMesh() {
        this.mesh.scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
    }
}

class Docteur extends Investigateur{
    constructor(nomJoueur, defausse){
        super(nomJoueur,
              5,
              "Vous pouvez effectuer jusqu'à 5 actions par tour.",
              "./assets/images/investigateurs/docteur.jpg",
              "docteur.babylon",
              7,
             "Docteur",
             defausse);
    }

    ajusterMesh() {
        this.mesh.scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
    }
}

//Effet encore à programmer pour le conducteur.
class Conducteur extends Investigateur{
    constructor(nomJoueur, defausse){
        super(nomJoueur,
              4,
              "Lors de l'action 'Marcher', vous POUVEZ vous déplacer de 2 lieux au lieu de 1. Vous êtes immunisé contre les effets d'Ithaqua.",
              "./assets/images/investigateurs/conducteur.jpg",
              "conducteur.babylon",
              7,
             "Conducteur",
             defausse);
    }

    ajusterMesh() {
        this.mesh.scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
    }
}

//Effet encore à programmer pour la chasseresse
class Chasseresse extends Investigateur{
    constructor(nomJoueur, defausse){
        super(nomJoueur,
              4,
              "Retirez tous les cultistes de votre lieu lors de l'action 'Vaincre un cultiste'. Une fois par tour, vous pouvez pour 1 seule action 'Vaincre un Shoggoth' de votre lieu.",
              "./assets/images/investigateurs/chasseresse.jpg",
              "chasseresse.babylon",
              7,
             "Chasseresse",
             defausse);
    }

    ajusterMesh() {
        this.mesh.scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
    }
}

//Effet encore à programmer pour l'occultiste
class Occultiste extends Investigateur{
    constructor(nomJoueur, defausse){
        super(nomJoueur,
              4,
              "Pour 1 action, déplacez 1 cultiste jusqu'à 2 lieux. Pour 2 actions, déplacez 1 Shoggoth d'1 lieu.",
              "./assets/images/investigateurs/occultiste.jpg",
              "occultiste.babylon",
              7,
             "Occultiste",
             defausse);
    }

    ajusterMesh() {
        this.mesh.scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
    }
}

//Effet encore à programmer pour le magicien
class Magicien extends Investigateur{
    constructor(nomJoueur, defausse){
        super(nomJoueur,
              4,
              "Vous commencez la partie avec une Relique du paquet Relique. Votre limite de cartes en main est de 8. A tout moment, en tant qu'action gratuite, vous pouvez 'Donner' ou 'Prendre' 1 carte Relique avec un investigateur sur votre lieu.",
              "./assets/images/investigateurs/magicien.jpg",
              "magicien.babylon",
              8,
             "Magicien",
             defausse);
    }

    ajusterMesh() {
        this.mesh.scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
    }
}

//Effet encore à programmer pour la journaliste
class Journaliste extends Investigateur{
    constructor(nomJoueur, defausse){
        super(nomJoueur,
              4,
              "Lorsque vous 'Prenez le bus', défaussez la carte Indice de votre choix pour vous rendre dans un lieu de n'importe quelle ville. Pour une action, déplacez-vous d'une gare routière jusqu'à une autre gare routière.",
              "./assets/images/investigateurs/journaliste.jpg",
              "journaliste.babylon",
              8,
             "Journaliste",
             defausse);
    }

    ajusterMesh() {
        this.mesh.scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
    }
}