"use strict";

class Cultiste extends Entite{
    
    constructor(partie, lieu){
        super("cultiste.babylon", lieu);
        this.partie = partie;
    }
    
    mourir(){
        this.lieu.nbEntites--;
        for( var i = 0; i < this.partie.entites.length-1; i++){ 
           if (this.partie.entites[i] === entite) {
             this.partie.entites.splice(i, 1); 
           }
        }
        
    }
    
    async afficherMesh() {
        await Entite.prototype.afficherMesh.call(this);           //A cause du findIndex
    }
    
    async ajusterMesh() {
        let xyz = this.mesh.position.asArray();
        this.mesh.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
    }
}