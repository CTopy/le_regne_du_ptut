"use strict";

class Carte{
    
    constructor(nom,image){
        this.nom=nom;
        this.image=image;
    }
}

class Indice extends Carte{
    
    constructor(nom, ville, image){  
        super(nom, image);
        this.ville = ville;
    }
}

class Relique extends Carte{
    constructor(nom, effet, image){  
        super(nom, image);
        this.effet = effet;
    }
}

class Invocation extends Carte{
    constructor(nom, lieu, image){  
        super(nom, image);
        this.ville = lieu;
    }
}