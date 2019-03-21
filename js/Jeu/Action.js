class Action {
    //constructeur de la classe mère
    constructor (partie, URLimage, nom) {
        this.partie = partie;
        this.image = URLimage;
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
        
        //Booléen : L'élément a été selectionné ou non
        this.click = false;
        
        this.eltDOM.appendChild(img);
        this.eltDOM.appendChild(p);
        
        //On l'ajoute au DOM
        document.querySelector("#actions>div:first-child").appendChild(this.eltDOM);
        
        //Cette fonction permet de bloquer le click sur toutes les autres actions
        this.empecherAutresActions = function(event) {
            if(event.target != this.eltDOM)     //Si on clique sur autre chose que la croix
            event.stopPropagation();
        }
        
        //Placer l'écouteur de click sur l'action
        this.eltDOM.addEventListener("click", function() {
            this.click = !this.click;
            if(this.click && this.joueurActif.nbAction > 0) {
                //Empêcher de sélectionner d'autres actions
                document.getElementById("actions").addEventListener("click", this.empecherAutresActions);
                this.preaction();
            } else {
                this.annuler();
            }
        }.bind(this));
    }
    
    setJoueurActif(investigateur) {
        this.joueurActif = investigateur;
    }
    
    //définition des méthodes de la classe mère
    cacher() {
        this.eltDOM.classList = "action action--cache";
    }
}

//

class Marcher extends Action {
    //constructeur de la classe fille - Marcher
    constructor (partie) {
        super(partie, "assets/images/actions/marcher.png", "Marcher");
    }
    
    ecouteurClick() {
        
    }
    
    afficher() {
        if(this.joueurActif.nbAction > 0) {
            this.eltDOM.classList = "action";
        } else {
            this.cacher(null);
        }
    }

    //redéfinition des méthodes
    preaction() {
        //Changer l'icone et possibilité d'annuler l'action
        this.eltDOM.firstElementChild.src = "assets/images/quitter.png";
        //on prend les lieux connectés à l'emplacement de l'this.joueurActif
        this.lieuxVoisins = this.joueurActif.lieu.lieuxConnectes;
        //Préparer l'action
        for (let unLieu of this.lieuxVoisins) {
            // pour chaque lieu, on les met en exergue (pour l'utilisateur)
            unLieu.surbrillance();
            //Ajouter un écouteur de clic sur le mesh du lieu
            unLieu.ecouterClic(function() {
                this.faireAction(unLieu);
            }.bind(this));
        }
        //Si on annule

    }
    
    annuler() {
            for (var unLieu of this.lieuxVoisins) {
                //Supprimer la surbrillance des lieux
                unLieu.stopSurbrillance();
                //Retirer l'écouteur de click
                unLieu.mesh.actionManager.actions.length = 0;
            }
            this.eltDOM.firstElementChild.src = this.image;
    }
    
    faireAction(lieu) {
    
        this.joueurActif.deplacer(lieu);
        this.joueurActif.ajouterActions(-1);
        //s'il reste des actions au joueur, on revient à l'étape de sélection du lieu
        if (this.joueurActif.nbAction>0){
            //On repropose au joueur de marcher
            this.annuler();
            this.preaction();
        } else {
            this.annuler();
        }
        for(var uneAction of this.partie.actions) {
            uneAction.setJoueurActif(this.joueurActif);
            uneAction.afficher();
        }
    }
}

class VaincreCultiste extends Action {
    constructor(partie) {
        super(partie, "assets/images/actions/vaincre_cultiste.png", "Vaincre un cultiste");
    }
    
    afficher(){
        if(this.joueurActif.lieu.nbCultistesLieu > 0){
            this.eltDOM.classList = "action";
        }else{
            this.cacher(null);
        }
    }
}

class ScellerPortail extends Action {
    
    constructor(partie) {
        super(partie, "assets/images/WIP.jpg", "Sceller un portail");
        let nbCarteNecessaire = 5;
    }
    

/*
    if(Yig.estReveille){
        nbCarteNecessaire++;
        }
    if(joueur est detective){
        nbCarteNecessaire++;
    }
*/
    
}