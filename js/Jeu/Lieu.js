"use strict";

class Lieu {  

    //Constructeur
    constructor(nom, origine, ville) {

        //Récupération de la scene 3D
        let scene = JEU.scene;

        this.nom = nom;
        this.ville = ville;       //Constante : ARKHAM, KINGSPORT, INNSMOUTH, DUNWICH
        this.portail = NON;             //0 : NON, 1 : OUI, 2 : SCELLE

        //Si l'origine n'est pas de type BABYLON.Vector3 on renvoie une erreur;
        if (typeof origine === typeof new BABYLON.Vector3(0,0,0))
            //Coordonnées du centre du lieu
            this.origine = origine;
        else throw ("L'origine doit être de type BABYLON.Vector3");

        //Le nombre d'entités qui sont sur le lieu
        this.nbEntites = 0;
        
        //Contient toutes les entités dans ce lieu
        this.entites = new Array();
        let xyz = this.origine.asArray();      //Variable temporaire, origine sous forme de tableau
        let x = xyz[0];
        let y = xyz[1];
        let z = xyz[2];
        //Les coordonnées des 7 places différentes possibles sur un lieu
        this.coords = new Array(
            this.origine,                           //0
            new BABYLON.Vector3(x+1, y, z),         //1
            new BABYLON.Vector3(x-1, y, z),         //2
            new BABYLON.Vector3(x, y, z+1),         //3
            new BABYLON.Vector3(x+0.5, y, z-1),     //4
            new BABYLON.Vector3(x-0.5, y, z-1),     //5
            new BABYLON.Vector3(x+1, y, z+1),       //6
            new BABYLON.Vector3(x-1, y, z+1),       //7
            new BABYLON.Vector3(x+1.5, y, z-1),     //8
            new BABYLON.Vector3(x-1.5, y, z-1)      //9
        );
        
        //La liste des lieux connectés à celui-ci
        this.lieuxConnectes = new Array();
        
        //Le lieu qui emmène vers le portail de la ville le plus rapidement
        this.versPortail;
        
        //Mesh invisible qui nous permet de gérer le click sur ce lieu
        this.mesh = BABYLON.MeshBuilder.CreateCylinder(this.nom, {
            height: 0.1,
            diameter: 2.5
        }, scene);
        this.mesh.position = this.origine;
        this.mesh.visibility = false;
        
        //Créer l'action manager du mesh
        this.mesh.actionManager = new BABYLON.ActionManager(scene);
    }
    
    /**Définir tous les attributs non définis dans le constructeur
    /* param1 : Lieux connectés 
    /* param2 : Le lieu qui va vers le portail le plus proche
    **/
    definir(lieuxConnectes, versPortail) {
        this.lieuxConnectes = lieuxConnectes;
        this.versPortail = versPortail;
    }

    /** Cette méthode permet d'ajouter une entité au lieu. Elle ne sera pas stockée par celui-ci
    /* return : Coordonnées où l'entité doit se placer.
    **/
    ajouterEntite(newEntite) {
        this.nbEntites++;
        this.entites.push(newEntite);
    }

    /** de la meme maniere, nous pouvons retirer une entité
    **/
    
    retirerEntite(entite){
        this.nbEntites--;
        for( var i = 0; i < this.entites.length-1; i++){ 
           if (this.entites[i] === entite) {
             this.entites.splice(i, 1); 
           }
        }
    }
    
    //Placer un écouteur de clic sur le mesh du Lieu
    ecouterClic(callback) {
        this.mesh.actionManager.registerAction(
            new ExecuteCodeAction (
                BABYLON.ActionManager.OnPickTrigger,
                function(evt) {
                    callback(evt);
                    unLieu.mesh.actionManager.unregisterAction(BABYLON.ActionManager.OnPickTrigger);
                }));
    }
    
    /** 
    /* Mettre en surbrillance le lieu
    **/
    surbrillance() {
        let xyz = this.origine.asArray();      //Variable temporaire, origine sous forme de tableau
        let x = xyz[0];
        let y = xyz[1];
        let z = xyz[2];
        //Ajouter une lumière
        this.lumiere = new BABYLON.SpotLight(this.nom+"_light", new BABYLON.Vector3(x, y+0.5, z), this.origine, 1, 0, this.scene);
        
    }
    
    stopSurbrillance() {
        this.lumiere = null;
    }
};

//********** DEFINITION DES LIEUX **********//
var GARE = new Lieu('Gare', new BABYLON.Vector3(-23.6,0.1,5.4),ARKHAM);
var RESTAURANT = new Lieu('Restaurant', new BABYLON.Vector3(-6.1,0.1,4.3),ARKHAM);
var LOGE_SECRETE = new Lieu('Loge Secrète', new BABYLON.Vector3(-11.9,0.1,2.8),ARKHAM);
var UNIVERSITE = new Lieu('Université', new BABYLON.Vector3(-19.4,0.1,7.7),ARKHAM);
var COMMISSARIAT = new Lieu('Commissariat', new BABYLON.Vector3(-11.4,0.1,7.9),ARKHAM);
var PARC = new Lieu('Parc', new BABYLON.Vector3(-18.0,0.1,0.4),ARKHAM);

GARE.definir(new Array(UNIVERSITE), UNIVERSITE);
UNIVERSITE.definir(new Array(GARE, PARC, COMMISSARIAT),PARC);
PARC.definir(new Array(UNIVERSITE, LOGE_SECRETE, COMMISSARIAT), null);
COMMISSARIAT.definir(new Array(UNIVERSITE, PARC, LOGE_SECRETE), PARC);
LOGE_SECRETE.definir(new Array(COMMISSARIAT, PARC), PARC);
RESTAURANT.definir(new Array(LOGE_SECRETE), LOGE_SECRETE);

PARC.portail = OUI;

var lieux = new Array(
    GARE,
    UNIVERSITE,
    PARC,
    COMMISSARIAT,
    LOGE_SECRETE,
    RESTAURANT
);

var lieuxPortail = new Array(
    PARC 
);