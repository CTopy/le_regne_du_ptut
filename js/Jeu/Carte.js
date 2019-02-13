"use strict";


class Carte{

    constructor(image){
        this.image=image; //src de l'image
        this.dom = document.createElement("img");
        this.dom.src=image;
        this.dom.className="carte affichable";
    }
}

class Indice extends Carte{

    constructor(ville){
        /*Selon la ville, on prend l'image qui correspond*/
        switch (ville) {
            case KINGSPORT:
                super("assets/images/kingsport.png");
                break;
            case INNSMOUTH:
                super("assets/images/innsmouth.png");
                break;
            case DUNWICH:
                super("assets/images/dunwich.png");
                break;
            case ARKHAM:
                super("assets/images/arkham.png");
                break;
            default: super("assets/images/dos_indice.jpg");
            break;
        }
        this.popup = new Popup();
        this.popup.ecouteur(this.dom);
        this.ville = ville;
    }
}
/**
*********************************************************
******   RELIQUES
*********************************************************
**/

class Relique extends Carte{
    constructor(image){
        super(image);
        this.popup = new Popup();

        let div = document.createElement("div");
        div.className = "relique";
        let bouton = document.createElement("button");
        bouton.textContent = "Utiliser";
        bouton.id = "relique--utiliser";
        div.appendChild(this.dom.cloneNode(true));
        div.appendChild(bouton);

        this.domPopup = div;
        bouton.addEventListener("click", (evt) => {
            evt.preventDefault();
            this.utiliser();
        }, true);

        this.dom.addEventListener("click", (evt) => {
            this.popup.afficher(this.domPopup);
        }, true);
    }
}

class SablierFinal extends Relique {
    constructor() {
        super("./assets/images/cartes/sablier-final.png");
    }

    utiliser() {
        this.popup.effacerDialogue();
        alert("La carte a été utilisée");
    }
}

class Invocation extends Carte{
    constructor(nom, lieu, image){
        super(nom, image);
        this.ville = lieu;
    }
}
