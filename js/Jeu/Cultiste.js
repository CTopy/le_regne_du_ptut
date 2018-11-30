"use strict";

class Cultiste extends Entite{
    
    constructor(lieu){
        super("cultiste.babylon", lieu);
    }
    
    mourir(){
        this.destroy();
    }
    
    async afficherMesh() {
        await Entite.prototype.afficherMesh.call(this);           //A cause du findIndex
    }
    
    async ajusterMesh() {
        let xyz = this.mesh.position.asArray();
        this.mesh.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
    }
}