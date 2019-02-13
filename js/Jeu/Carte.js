"use strict";


class Carte{

    constructor(nom,image){
        this.popup = new Popup();
        this.nom=nom;
        this.image=image; //src de l'image
        this.dom = document.createElement("img");
        this.dom.src=image;
        this.dom.className="carte affichable";
        this.popup.ecouteur(this.dom);
    }
}

class Indice extends Carte{

    constructor(ville){
        /*Selon la ville, on prend l'image qui correspond*/
        switch (ville) {
            case KINGSPORT:
                super("Kingsport", "assets/images/kingsport.png");
                break;
            case INNSMOUTH:
                super("Innsmouth", "assets/images/innsmouth.png");
                break;
            case DUNWICH:
                super("Dunwich", "assets/images/dunwich.png");
                break;
            case ARKHAM:
                super("Arkham", "assets/images/arkham.png");
                break;
            default: super("ERREUR", "assets/images/dos_indice.jpg");
            break;
        }
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

        this.domPopup = document.createElement("div");
        this.domPopup.className = "relique";
        let bouton = document.createElement("button");
        bouton.textContent = "Utiliser";
        bouton.id = "relique--utiliser";
        this.domPopup.appendChild(bouton);
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
