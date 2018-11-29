class Action {
    //constructeur de la classe mère
    constructor (URLimage, nom) {
        this.nom = nom;
        //Créer la div qui va contenir l'action
        this.eltDOM = document.createElement("div");
        this.eltDOM.classList.add("action");
        //Par défaut, l'action est cachée
        this.eltDOM.classList.add("action--cache");
        
        //Créer la balise image
        let img  = document.createElement("img");
        img.src = URLimage;
        
        //Context
        let p = document.createElement("p");
        p.innerHTML = nom;
        
        this.eltDOM.appendChild(img);
        this.eltDOM.appendChild(p);
        
        //On l'ajoute au DOM
        document.querySelector("#actions>div:first-child").appendChild(this.eltDOM);
    }
    //définition des méthodes de la classe mère
    cacher(investigateur) {
        this.eltDOM.classList = "action action--cache";
        this.eltDOM.removeEventListener("click", this.preaction(investigateur));
    }
}

//

class Marcher extends Action {
    //constructeur de la classe fille - Marcher
    constructor () {
        super("assets/images/actions/marcher.png", "Marcher");
    }
    
    afficher(investigateur) {
        if(investigateur.nbAction > 0) {
            this.eltDOM.classList = "action";
            this.eltDOM.addEventListener("click", function() {
                this.preaction(investigateur);
            }.bind(this));
        } else {
            this.cacher(investigateur);
        }
    }

    //redéfinition des méthodes
    preaction(investigateur) {
        //Changer l'icone et possibilité d'annuler l'action
        this.eltDOM.firstChild.src = "assets/images/quitter.png";
        
        //On empêche d'activer à nouveau l'action, on ajoute un écouteur pour annuler
        this.eltDOM.removeEventListener("click", function() {
            this.preaction(investigateur)
        }.bind(this));
        this.eltDOM.addEventListener("click", function() {
            this.annuler(lieuxVoisins)
        }.bind(this));
        
        //On ajoute un écouteur sur la div actions :
        //Si on clique sur autre chose que sur la croix, on empêche la propagation
        document.getElementById("actions").addEventListener("click", function(event) {
            if(event.target != this.eltDOM)     //Si on clique sur autre chose que la croix
                event.stopPropagation();
        });
        
        //on prend les lieux connectés à l'emplacement de l'investigateur
        let lieuxVoisins = investigateur.lieu.lieuxConnectes;
        
        //Préparer l'action
        for (var unLieu of lieuxVoisins) {
            // pour chaque lieu, on les met en exergue (pour l'utilisateur)
            unLieu.surbrillance();
            //Ajouter un écouteur de clic sur le mesh du lieu
            unLieu.ecouterClic(function() {
                investigateur.deplacer(unLieu);
            });
        }
        //Si on annule

    }
    
    annuler(lieuxVoisins) {
            for (var unLieu of lieuxVoisins) {
                //Supprimer la surbrillance des lieux
                unLieu.stopSurbrillance();
                //Retirer l'écouteur de click
                unLieu.mesh.actionManager.unregisterAction(BABYLON.ActionManager.OnPickTrigger);
            }
            this.cacher();
            this.afficher();
    }
    
    faireAction(investigateur) {
        //on redéfinit le lieu par le lieu cliqué, on décrémente le nombre d'actions
        investigateur.lieu = this;
        investigateur.nbAction = (investigateur.nbAction)-1;
        //s'il reste des actions au joueur, on revient à l'étape de sélection du lieu
        if (investigateur.nbAction>0){
            preaction();
        }
        
    }
}

//
/*
class VaincreCultiste extends Action {
    constructor () {
        this.nom = "Vaincre un cultiste";
    }
    
    afficher(investigateur) {
        var cultistes=0;
        for(var uneEntite of this.entites) {
            if (typeof uneEntite === typeof new Cultiste()) {
                cultistes++;
            }
        }

        if (investigateur.nbAction>0 && cultistes>0) {
            var iconeVaincCult = document.getElementById("vaincreCult");
            iconeVaincCult.css("display","block");
            iconeVaincCult.addEventListener("click", preaction(investigateur));
        } else {
            var iconeVaincCult = document.getElementById("vaincreCult");
            iconeVaincCult.css("display","none");
            iconeVaincCult.removeEventListener("click", preaction(investigateur));
        }
    }
    
    cacher() {
        $(".action").css("display", "none");
    }

    preaction(investigateur) {
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
        btn1.addEventListener("click", faireAction(1, investigateur));
        btn2.addEventListener("click", faireAction(2, investigateur));
        btn3.addEventListener("click", faireAction(3, investigateur));
    }
    
    faireAction(nbCultAVaincre, investigateur) {
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
    constructor () {
        this.nom = "Vaincre un Shoggoth";
    }
    
    afficher(investigateur) {
        var shoggoths=0;
        for(var uneEntite of this.entites) {
            if (typeof uneEntite === typeof new Shoggoth()) {
                shoggoths++;
            }
        }

        if (investigateur.nbAction>2 && shoggoths>0) {
            var iconeVaincShog = document.getElementById("vaincreShog");
            iconeVaincCult.css("display","block");
            iconeVaincCult.addEventListener("click", preaction(investigateur));
        } else {
            var iconeVaincShog = document.getElementById("vaincreShog");
            iconeVaincCult.css("display","none");
            iconeVaincCult.removeEventListener("click", preaction(investigateur));
        }
    }
    
    cacher() {
        $(".action").css("display", "none");
    }
    
    
    preaction(investigateur) {
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
        btn1.addEventListener("click", faireAction(1, investigateur));
        btn2.addEventListener("click", faireAction(2, investigateur));
        btn3.addEventListener("click", faireAction(3, investigateur));
    }
    
    faireAction(nbShogAVaincre, investigateur) {
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

class ScellerPortail extends Action {
    constructor () {
        this.nom = "Sceller un Portail";
    }
    
    afficher(investigateur) {
            if (investigateur.nbAction>0) {
            var iconeScelPort = document.getElementById("scellerPort");
            iconeScelPort.css("display","block");
            iconeScelPort.addEventListener("click", preaction(investigateur));
        } else {
            var iconeScelPort = document.getElementById("scellerPort");
            iconeScelPort.css("display","none");
            iconeScelPort.removeEventListener("click", preaction(investigateur));
        }
    }
    
    cacher() {
        $(".action").css("display", "none");
    }
    
    preaction(investigateur) {
        var compteur = 0;
        for (var i=0; i<6; i++) {
            for (var uneCarte of cartes) {
                if (typeof uneCarte === typeof new Indice()) {
                    if (investigateur.lieu === uneCarte.ville) {
                        compteur++;
                    }
                }
            }
        }
        if(compteur===5) {
            faireAction(investigateur);
        } else {
            alert("Vous n'avez pas assez de cartes "+investigateur.lieu);
        }
    }
                        
    faireAction(investigateur) {
        for (var i=0; i<6; i++) {
            for (var uneCarte of cartes) {
                if (typeof uneCarte === typeof new Indice()) {
                    if (investigateur.lieu === uneCarte.ville) {
                        investigateur.main.enleverCarte(uneCarte);
                    }
                }
            }
        }
    }
}
*/