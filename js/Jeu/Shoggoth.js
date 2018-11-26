"use strict";

class Shoggoth{
    
    constructor(lieu){
        this.lieu = lieu;
        var coordoneeDestination = lieu.ajouterEntite(this);
        
        this.pion = BABYLON.SceneLoader.ImportMesh("", "", "./assets/modeles/shoggoth.babylon", scene, function(newMeshes) {
            newMeshes.forEach(function(mesh){
               mesh.position = coordoneeDestination;
            });
        });
    }
    
    mourir(){
        this.destroy();
    }
    
    seDeplacer(){
        var destination = this.lieu.versPortail;
        var coordoneeDestination = destination.ajouterEntite(this);
        //animation?
        //var animationMvnt = new BABYLON.animation("animationInvestigateur", "position", 30,BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        this.lieu=coordoneeDestination;
    }
}