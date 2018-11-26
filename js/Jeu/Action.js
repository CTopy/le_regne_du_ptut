class Action {
    //constructeur de la classe mère
    constructor (investigateur) {
        this.nom;
        this.investigateur = investigateur;
    }
    //définition des méthodes de la classe mère
    preaction() {}
    faireAction() {}
}

class Marcher extends Action {
    //constructeur de la classe fille - Marcher
    constructor (investigateur) {
        this.nom = "Marcher";
        super(investigateur);
    }
    //redéfinition des méthodes
    preaction() {
        //on prend les lieux connectés à l"emplacement de l'investigateur
        var liens = this.investigateur.lieu.lieuxConnectes;
        for (var unLieu of liens) {
            // pour chaque lieu, on les met en exergue (pour l'utilisateur) et on lui met un écouteur
            unLieu.surbrillance();
            unLieu.addEventListener("click", faireAction());
        }
    }
    
    faireAction() {
        //on redéfinit le lieu par le lieu cliqué, on décrémente le nombre d'actions
        investigateur.lieu = this;
        investigateur.nbAction = (investigateur.nbAction)-1;
        //s'il reste des actions au joueur, on revient à l'étape de sélection du lieu
        if (investigateur.nbAction>0){
            preaction();
        }
        
    }
}

class VaincreCultiste extends Action {
    constructor (investigateur) {
        this.nom = "Vaincre un cultiste";
        super(investigateur);
        this.entites = investigateur.lieu.entité;
    }
    
    preaction() {
        //on créer une div pour le slider
        var newDiv = document.createElement("div");
        //on y ajoute des boutons cliquables pour sélectionner le nombre de cultistes à vaincre
        var btn1 = document.createElement("button");
        var textBtn1 = document.createTextNode("1");
        newDiv.appendChild(btn1);
        btn1.appendChild(textBtn1);
        var btn2 = document.createElement("button");
        var textBtn2 = document.createTextNode("2");
        newDiv.appendChild(btn2);
        btn2.appendChild(textBtn2);
        var btn3 = document.createElement("button");
        var textBtn3 = document.createTextNode("3");
        newDiv.appendChild(btn3);
        btn3.appendChild(textBtn3);
        //on insère le tout dans la page
        var iconeClique = document.getElementById("vaincreCult");
        document.body.insertBefore(newDiv, iconeClique);
        
        //on ajoute des classes pour le positionnement en CSS
        newDiv.id = "divVaincCult";
        btn1.className = "btnVaincCult";
        btn2.className = "btnVaincCult";
        btn3.className = "btnVaincCult";
        //on y met les écouteurs pour tuer les cultistes
        btn1.addEventListener("click", faireAction(1));
        btn2.addEventListener("click", faireAction(2));
        btn3.addEventListener("click", faireAction(3));
    }
    
    faireAction(nbCultAVaincre) {
        var newDiv = document.getElementById("divVaincCult");
        document.body.removeChild(newDiv);
        if(investigateur.nbAction<nbCultAVaincre) {
            //si le nombre d'action du joueur est inférieur au nombre de cultistes à vaincre, on lui dit qu'il ne peut pas les tuer
            alert("Vous n'avez pas suffisamment d'actions restantes");
            preaction();
        } else {
            var cultAVaincre;
            for(var i=0; i<nbCultAVaincre; i++) {
                for(var uneEntite of entites) {
                    if (typeof uneEntite === typeof new Cultiste()) {
                        uneEntite.mourir();
                        this.investigateur.lieu.retirerEntite(uneEntite);
                    }
                }
            }
        }
    }
}

class VaincreShoggoth extends Action {
    constructor (investigateur) {
        this.nom = "Vaincre un Shoggoth";
        super(investigateur);
        this.entites = investigateur.lieu.entité;
    }
    
    preaction() {
        //on créer une div pour le slider
        var newDiv = document.createElement("div");
        //on y ajoute des boutons cliquables pour sélectionner le nombre de shoggoths à vaincre
        var btn1 = document.createElement("button");
        var textBtn1 = document.createTextNode("1");
        newDiv.appendChild(btn1);
        btn1.appendChild(textBtn1);
        var btn2 = document.createElement("button");
        var textBtn2 = document.createTextNode("2");
        newDiv.appendChild(btn2);
        btn2.appendChild(textBtn2);
        var btn3 = document.createElement("button");
        var textBtn3 = document.createTextNode("3");
        newDiv.appendChild(btn3);
        btn3.appendChild(textBtn3);
        //on insère le tout dans la page
        var iconeClique = document.getElementById("vaincreShog");
        document.body.insertBefore(newDiv, iconeClique);
        
        //on ajoute des classes pour le positionnement en CSS
        newDiv.id = "divVaincShog";
        btn1.className = "btnVaincShog";
        btn2.className = "btnVaincShog";
        btn3.className = "btnVaincShog";
        //on y met les écouteurs pour tuer les shoggoths
        btn1.addEventListener("click", faireAction(1));
        btn2.addEventListener("click", faireAction(2));
        btn3.addEventListener("click", faireAction(3));
    }
    
    faireAction(nbShogAVaincre) {
        var newDiv = document.getElementById("divVaincShog");
        document.body.removeChild(newDiv);
        if(investigateur.nbActions<nbShogAVaincre) {
            //si le nombre d'action du joueur est inférieur au nombre de Shoggoths à vaincre, on lui dit qu'il ne peut pas les tuer
            alert("Vous n'avez pas suffisamment d'actions restantes");
            preaction();
        } else {
            var shogAVaincre;
            for(var i=0; i<nbShogAVaincre; i++) {
                for(var uneEntite of entites) {
                    if (typeof uneEntite === typeof new Shoggoth()) {
                        uneEntite.mourir();
                        this.investigateur.lieu.retirerEntite(uneEntite);
                    }
                }
            }
        }
    }
}