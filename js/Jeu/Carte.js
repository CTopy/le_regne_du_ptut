"use strict";

class Carte{

    constructor(nom, image, deckOrigine){
        this.nom=nom;
        this.image=image; //src de l'image
        const html = createElement("img");
        html.src = "";
        html.addClass("carte");
    }
}

class Indice extends Carte{

    constructor(nom, ville, image){
        super(nom, image);
        this.ville = ville;
    }
}

class Relique extends Carte{
    constructor(nom, effet, image, effetFunc){
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
