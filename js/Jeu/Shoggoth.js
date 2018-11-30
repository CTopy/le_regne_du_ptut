"use strict";

class Shoggoth extends Entite{
    
    constructor(lieu){
        super("shoggoth.babylon", lieu);
    }
    
    mourir(){
        this.destroy();
    }
    
    afficherMesh() {
        Entite.prototype.afficherMesh.call(this);           //A cause du findIndex
    }
    
    ajusterMesh() {
    }
    
    seDeplacer(){
        var destination = this.lieu.versPortail;
        var coordoneeDestination = destination.ajouterEntite(this);
        //animation?
        //var animationMvnt = new BABYLON.animation("animationInvestigateur", "position", 30,BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        this.lieu=coordoneeDestination;
    }
}