class Action {
    //constructeur de la classe mère
    constructor (investigateur) {
        this.nom;
        this.lieu = investigateur.lieu;
    }
    //définition des méthodes de la classe mère
    preaction() {}
    faireAction() {}
}

class Marcher extends Action {
    //constructeur de la classe fille - Marcher
    constructor (investigateur) {
        this.nom = "Marcher";
        super(lieu);
    }
    //redéfinition des méthodes
    preaction() {
        //on prend les lieux connectés à l'emplacement de l'investigateur
        var liens = lieu.lieuxConnectes;
        for (var unLieu of liens) {
            // pour chaque lieu, on les met en exergue (pour l'utilisateur) et on lui met un écouteur
            unLieu.surbrillance();
            unLieu.addEventListener("click", faireAction);
        }
    }
    
    faireAction() {
        //on redéfinit le lieu par le lieu cliqué, on décrémente le nombre d'actions
        investigateur.lieu = this;
        investigateur.nbAction = (investigateur.nbAction)-1;
        if (investigateur.nbAction>0){
            preaction();
        }
        
    }
}

class VaincreCultiste extends Action {
    constructor (investigateur) {
        this.nom = "Vaincre un cultiste";
        super(lieu);
    }
    
    preaction() {
    }
    
    faireAction() {
    }
}