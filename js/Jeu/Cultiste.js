"use strict";

class Cultiste extends Entite{
    
    constructor(lieu, modele){
        super(modele, lieu);
    }
    
    mourir(){
        this.destroy();
    }
    
    ajusterMesh() {
        this.mesh.scaling = new BABYLON.Vector3(0.0005, 0.0005, 0.0005);
    }
}