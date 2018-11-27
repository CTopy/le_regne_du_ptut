    $("document").ready(function(){
        //Initialisation du jeu, chargement dynamique des scripts

        //Chargement de l'affichage
        chargerScript("js/Vue.js");

        //Chargement des éléments du Jeu
        chargerScript("js/Jeu/Lieu.js");
        chargerScript("js/Jeu/Action.js");
        chargerScript("js/Jeu/Deck.js");
        chargerScript("js/Jeu/Carte.js");
        chargerScript("js/Jeu/Cultiste.js");
        chargerScript("js/Jeu/Shoggoth.js");
        chargerScript("js/Jeu/Investigateur.js");
        chargerScript("js/Jeu/GrandAncien.js");

        debutPartie();
    });

class Jeu {
    //Début du jeu
    constructor() {
        //Déclaration des données membres
        this.actions = new Array(new Marcher(), new VaincreCultiste(), new VaincreShoggoth(), new ScellerPortail());
        this.joueurs = new Array(new Detective(), new Detective());
        this.gdAnciens = new Array(new Cthulhu());
        this.paquetIndice() = new Deck();
        
        //Le joueur qui commence est aléatoire
        this.joueurActif = this.joueurs[Math.floor(Math.random() * Math.floor(joueurs.length))];
        this.nbCultistes = 0;
        this.nbShoggoth = 0;

        this.tourDeJeu();
    }
    
    mettreEnPlaceJeu() {
        
    }

    tourDeJeu() {
        for(var uneAction of this.actions) {
            uneAction.afficher()
        }
        //A chaque fois que le joueur joue on réévalue les actions
        this.joueurActif.watch(nbAction, function() {
            //Si le joueur est fou, on vérifie si c'est la fin (si tous les joueurs sont fous)
            //ou
            //Si le joueur est sur un portail et que ce portail est scellé
            if ((this.joueurActif.estFou) || (this.joueurActif.lieu.portail.SCELLE || this.joueurActif.lieu.portail.SIGNE_ANCIENS))
                this.checkFin();            //Vérifier si le jeu est fini
            
            //Si l'execution continue, on reset les actions
            for(uneAction of this.actions) {
                uneAction.cacher()
            }
            for(uneAction of this.actions) {
                uneAction.afficher()
            }
        });
        //Si on clique sur le bouton de passer son tour, on passe son tour
        var passerTour = document.getElementById("passerTour");
        passerTour.addEventListener("click", this.passerTour().bind(this));
    }
    
    passerTour() {
        this.phasePioche();
        this.checkFin();
        this.phaseInvocation();
        this.checkFin();
    }
    
    phasePioche() {
        
    }
    
    phaseInvocation() {
        
    }

    checkFin() {
        //On vérifie si tous les portails sont scellés
        let tousPortailsScelles = true;
        for(var unLieu of lieuxPortail){
            if (unLieu.portail = OUI)
                tousPortailsScelles = false;
        }
        
        let tousJoueursSontFous = true;
        for (var unJoueur of this.joueurs) {
            if (!unJoueur.estFou)
                tousJoueursSontFous = false;
        }
        
        let cthulhuEstReveille = this.gdAnciens[this.gdAnciens.length-1].estReveille;
        
        let tropDeCultistes = false;
        if (this.nbCultistes > 26)
            tropDeCultistes = true;
        
        let tropDeShoggoth = false;
        if (this.nbShoggoth > 26)
            tropDeShoggoth = true;
        
        //Tester le paquet indice dans la classe Deck
        
        if(tousPortailsScelles)
            this.gagne()
        else if (tousJoueursSontFous)
            this.perdu();
        else if (cthulhuEstReveille)      //Cthulhu est reveille
            this.perdu();
        else if (tropDeCultistes)
            this.perdu();
        else if (tropDeShoggoth)
            this.perdu();
    }

    perdu() {

    }

    gagne() {

    }

    function chargerScript(path) {
        let script = document.createElement("script");
        script.type="text/javascript";
        script.src = path;  //Ajouter l'URL du script à charger
        script.async = false;

        document.body.appendChild(script);
    }
}