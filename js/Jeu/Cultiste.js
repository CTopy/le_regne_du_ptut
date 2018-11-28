"use strict";

class Cultiste extends Entite{
    
    constructor(lieu){
        this.lieu = lieu;
        var coordoneeDestination = lieu.ajouterEntite(this);
        
        this.pion = BABYLON.SceneLoader.ImportMesh("", "", "./assets/modeles/cultiste.babylon", scene, function(newMeshes) {
            newMeshes.forEach(function(mesh){
               mesh.position = coordoneeDestination;
            });
        });
    }
    
    mourir(){
        this.destroy();
    }
}