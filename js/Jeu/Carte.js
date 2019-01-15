"use strict";


class Carte{
    
    constructor(nom,image){
        this.nom=nom;
        this.image=image; //src de l'image
        var html = document.createElement("img");
        html.src = "";
        //html.className("carte");
    }
}

class Indice extends Carte{
    
    constructor(nom, ville){  
        super(nom);
        this.ville = ville;
        /*Selon la ville, on prend l'image qui correspond*/
        switch (ville) {
            case "Kingsport":
                this.image="../../assets/images/kingsport.png";
                break;
            case "Innsmouth":
                this.image="../../assets/images/innsmouth.png";
                break;
            case "Dunwich":
                this.image="../../assets/images/dunwich.png";
                break;
            case "Arkham":
                this.image="../../assets/images/arkham.png";
                break;
        }
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