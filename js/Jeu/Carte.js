"use strict";

class Carte{

    constructor(nom, image, deckOrigine){
        this.nom=nom;
        const html = createElement("img");
        html.src = "image";
        html.addClass("carte");
    }
}

class Indice extends Carte{

    constructor(nom, ville, image){
        super(nom, image);

        if(ville >= 0 && ville < 4)
            this.ville = ville;
        else console.log("Carte "+this.nom+", ville invalide");
    }
}

class Relique extends Carte{
    constructor(nom, effet, image, effetFunc){
        super(nom, image);
        this.effet = effet;
    }

    /**
    * Réaliser les effets de la carte
    **/
    jouer() {

    }
}

class Invocation extends Carte{
    constructor(nom, lieu, image){
        super(nom, image);
        this.lieu = lieu;
    }
}
