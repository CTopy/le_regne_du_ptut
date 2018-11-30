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
        this.mesh.position = new BABYLON.Vector3(xyz[0], xyz[1]+1, xyz[2]);
        this.mesh.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    }
}