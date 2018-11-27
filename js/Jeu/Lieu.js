"use strict";

class Lieu {  

    //Constructeur
    constructor(nom, origine, ville) {

        //Récupération de la scene 3D
        let scene = JEU.scene;

        this.nom = nom;
        this.ville = ville;       //Constante : ARKHAM, KINGSPORT, INNSMOUTH, DUNWICH
        this.portail = false;             //Booléen

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
        //Les coordonnées des 7 places différentes possibles sur un lieu
        this.coords = new Array(
            this.origine,
            new BABYLON.Vector3(xyz[0]*1.076, xyz[1], xyz[2]),
            new BABYLON.Vector3(xyz[0]*0.928, xyz[1], xyz[2]),
            new BABYLON.Vector3(xyz[0]*1.076, xyz[1], xyz[2]*1.264),
            new BABYLON.Vector3(xyz[0], xyz[1], xyz[2]*1.264),
            new BABYLON.Vector3(xyz[0], xyz[1], xyz[2]*0.698),
            new BABYLON.Vector3(xyz[0]*0.928, xyz[1], xyz[2]*1.264),
            new BABYLON.Vector3(xyz[0], xyz[1], xyz[2]*0.698)
        );
        
        //La liste des lieux connectés à celui-ci
        this.lieuxConnectes = new Array();
        
        //Le lieu qui emmène vers le portail de la ville le plus rapidement
        this.versPortail;
        
        //Mesh invisible qui nous permet de gérer le click sur ce lieu
        this.mesh = BABYLON.MeshBuilder.CreateCylinder(this.nom, {
            height: 0.1,
            diameter: 2.2
        }, scene);
        this.mesh.position = this.origine;
//        this.mesh.visibility = false;
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
        return this.coords[nbEntites-1];
    }

    /** de la meme maniere, nous pouvons retirer une entité
    **/
    
    retirerEntite(entite){
        this.nbEntites--;
        this.entites.remove(entite);
    }
    
    /** 
    /* Mettre en surbrillance le lieu
    **/
    surbrillance() {
        //Ajouter une lumière
    }
};

//********** DEFINITION DES LIEUX **********//
var GARE = new Lieu("Gare", new BABYLON.Vector3(-23.6, 0.1, 5.3), ARKHAM);
var UNIVERSITE = new Lieu("Université", new BABYLON.Vector3(-19.4, 0.1, 7.5), ARKHAM);
var PARC = new Lieu("Parc", new BABYLON.Vector3(-18.0, 0.1, 5.3), ARKHAM);
var COMMISSARIAT = new Lieu("Commissariat", new BABYLON.Vector3(-18.0, 0.1, 5.3), ARKHAM);
var LOGE_SECRETE = new Lieu("Loge secrète", new BABYLON.Vector3(-13.0, 0.1, 2.9), ARKHAM);
var RESTAURANT = new Lieu("Restaurant", new BABYLON.Vector3(-7.0, 0.1, 4.2), ARKHAM);

PARC.portail = true;

var lieux = new Array(
    GARE,
);
