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
    constructor(nomJoueur, nbAction, effet, image, nomModele, cartesMax, nomPersonnage, imageFou, defausse, partie){
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
        this.partie = partie;
        this.audio = new Audio();

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
            new Indice(ARKHAM),
            new Indice(ARKHAM),
            new Indice(KINGSPORT),
            new Indice(INNSMOUTH),
            new Indice(DUNWICH),
            new Indice(KINGSPORT),
            new Indice(ARKHAM)
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
        if (this.nbAction > this.nbActionMax)
            this.nbAction = this.nbActionMax
        this.effet = nvEffet;
        
        this.dom.actions.innerHTML = this.nbAction;
        this.dom.effet.innerHTML = this.effet;
    }

    /*
    * Passer le joueur d'actif à passif et inversement
    * @param rang (optionel) : Le rang à accorder. 0 si il est passif
    */
    toggleActif(rang=0) {
        if (this.actif && rang>=2 && rang<=4) {
            this.rang = rang;
            this.dom.root.className = "interface joueurPassif j"+this.rang;
        } else if (!this.actif) {
            this.rang = 0;
            this.dom.root.className = "interface joueurActif";
        }
    }

    ajouterSanteMentale(nb) {
        let tempSm = this.santeMentale + nb;
        if(tempSm > 4)
            this.santeMentale = 4
        else if (tempSm <= 0)
            this.santeMentale = 0
        else 
            this.santeMentale = tempSm;
        
        this.dom.smDiv.innerHTML = `<p>${this.santeMentale}</p>`;
        for(let i = 0; i<this.santeMentale; i++) {
            let img = document.createElement("img");
            img.src = "assets/images/backgrounds/folie.jpg";
            this.dom.smDiv.appendChild(img);
        }
    }

    ajouterActions(nb) {
        this.nbAction = this.nbAction + nb;
        this.dom.actions.textContent = this.nbAction;
    }
    
    jetterLesDes() {
        let rnd = Math.floor((Math.random()*5)+1),
            src;
        console.log(rnd);
        if(rnd <= 2) {
            this.ajouterSanteMentale(-1);
            src = "./assets/images/dé/1sm.jpeg";
        } else if (rnd == 5) {
            this.ajouterSanteMentale(-2);
            src = "./assets/images/dé/2sm.jpeg";
        } else if(rnd == 6) {
            this.partie.invoquer(2, CULTISTE);
            src = "./assets/images/dé/2invoc.jpeg";
        } else {
            src = "./assets/images/dé/rien.jpeg";
        }
        
        return new Promise(resolve => {
            this.audio.src = "./assets/audio/jeu/lancer-dé.ogg";
            this.audio.play();
            const popup = new Popup();
            let img = document.createElement("img");
            img.src = src;
            popup.afficher(img, 1, false);
            window.setTimeout(() => {
                popup.effacerDialogue();
                resolve("Resolved");
            }, 2000);

        });
    }
}

class Detective extends Investigateur{
    constructor(nomJoueur, defausse, partie){
        super(nomJoueur,
              4,
              "Vous n'avez besoin que de 4 cartes de la même couleur pour sceller un portail.",
              "./assets/images/investigateurs/detective.jpg",
              "detective.babylon",
              7,
             "Détective",
             defausse,
             partie);
    }

    ajusterMesh() {
        this.mesh.scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
    }
    
    ajouterSanteMentale(nb) {
        Investigateur.prototype.ajouterSanteMentale.call(this, nb);
        if(this.santeMentale == 0)
            this.toggleFolie(3, "Vous n'avez besoin que de 4 cartes de la même couleur pour <em>Sceller un portail</em>.<br>Si vous participez à l'action <em>Prendre</em> ou <em>Donner</em>, cela coûte 2 actions au joueur actif.");
    }
}
