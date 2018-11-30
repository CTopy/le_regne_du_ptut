"use strict";

class Cultiste extends Entite{
    
    constructor(lieu){
        super("cultiste.babylon", lieu);
    }
    
    mourir(){
        this.destroy();
    }
    
    afficherMesh() {
        Entite.prototype.afficherMesh.call(this);           //A cause du findIndex
    }
    
    ajusterMesh() {
    }
}