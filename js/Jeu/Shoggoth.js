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
}