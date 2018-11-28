
$("document").ready(function(){
        //Initialisation du jeu, chargement dynamique des scripts

        

        //Chargement des éléments du Jeu
        chargerScript("js/Jeu/Lieu.js");
            //Chargement de l'affichage
            chargerScript("js/Vue.js");
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
        this.joueurs;
        this.nbjoueur = 4;
        this.grandsAnciens = new Array(new Azathoth(), new Yig(), Dagon());
        this.cthulhu = new Cthulhu();
        this.paquetIndice = new Deck();
        this.paquetRelique = new Deck();
        this.defausseIndice = new Deck();
        this.defausseRelique = new Deck();
        this.paquetInvocation = new Deck();
        this.defausseInvocation = new Deck();
        
        
        //Le joueur qui commence est aléatoire
        this.joueurActif = this.joueurs[Math.floor(Math.random() * Math.floor(joueurs.length))];
        this.nbCultistes = 0;
        this.nbShoggoth = 0;

        this.tourDeJeu();
    }
    
    mettreEnPlaceJeu() {
        
        function melanger(array) {
                var currentIndex = array.length, temporaryValue, randomIndex;

                // While there remain elements to shuffle...
                while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }
        
        //Mise en place des Grands Anciens
        melanger(this.grandsAnciens);
        
        let divGlobale;
        let imgGdAncien;
        let paraNom;
        let paraEffet;
        for (var i=0; i<6; i++) {
            divGlobale = document.createElement("div");
            divGlobale.addClass("ancien ancien--cache");
            imgGdAncien = document.createElement("img");
            imgGdAncien.src = this.grandsAnciens[i].img;
            paraNom = document.createElement("p");
            paraNom.innerHTML = this.grandsAnciens[i].nom;
            paraEffet = document.createElement("p");
            paraEffet.innerHTML = this.grandsAnciens[i].effet;
            divGlobale.append(imgGdAncien, paraNom, paraEffet);
            $("#gdAnciens").append(divGlobale);
        }
        
        //Mise en place de Cthulhu
        divGlobale = document.createElement("div");
        divGlobale.addClass("ancien ancien--cache");
        imgGdAncien = document.createElement("img");
        imgGdAncien.src = this.cthulhu.img;
        paraNom = document.createElement("p");
        paraNom.innerHTML = this.cthulhu.nom;
        paraEffet = document.createElement("p");
        paraEffet.innerHTML = this.cthulhu.effet;
        divGlobale.append(imgGdAncien, paraNom, paraEffet);
        $("#gdAnciens").append(divGlobale);
        
        //Invocation des cultistes
        this.phaseInvocation(2,3, new Cultiste());
        this.phaseInvocation(2,2, new Cultiste());
        this.phaseInvocation(2,1, new Cultiste());
        //Invocation du Shoggoth
        this.phaseInvocation(1,1, new Shoggoth());
        
        //On donne un personnage à chaque joueur
        
        
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
        this.joueurActif.unwatch(nbAction);
        this.joueurActif.nbAction = joueurActif.nbActionMax;
        
        let index = this.joueurActif.indexOf(joueurs);
        index = index++%4;
        this.joueurActif = this.joueurs[index];
        this.tourDeJeu();
    }
    
    phasePioche() {
        this.joueurActif.main.piocher(paquetIndice);
    }
    
    phaseInvocation(nbCarteDefaussee, nbEntiteAInvoc, typeEntiteAInvoc) {
        for(var j=0 ; j<nbCarteDefaussee ; j++) {
            this.defausseInvocation.piocher(this.paquetInvocation);
            let lieuInvoc = this.defausseInvocation[(this.defausseInvocation.length)-1].lieu;
            if (typeof typeEntiteAInvoc = typeof new Cultiste()) {
                for (var i=0 ; i<nbEntiteAInvoc ; i++) {
                    lieuInvoc.ajouterEntite(new Cultiste());
                    this.nbCultistes++;
                }
            } else if (typeof typeEntiteAInvoc = typeof new Shoggoth()) {
                for (var i=0 ; i<nbEntiteAInvoc ; i++) {
                    lieuInvoc.ajouterEntite(new Shoggoth());
                    this.nbShoggoth++;
                }
            }
        }
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
        let baseHTML = "<div id=\"dark\"></div>";
        let canvas = $("#renderCanvas");
        
        //Ajouter le fond noir
        this.canvas.after(this.baseHTML);
        
        //Générer le code HTML de la carte
        let codeHTML = "<img id=\"perdu\" src=\"assets/images/perdu.png\" /><img src=\"assets/images/quitter.png\" id=\"quitter\" />";
        
        //Ajouter l'overlay noir à la page
        $("#dark").append(codeHTML);
        
        //Ajouter un écouteur à la croix pour qu'elle change au survol
        $("#quitter").hover(function (e){
            $(this).attr("src", "assets/images/quitter_survol.png");
        }, function(e) {
            $(this).attr("src", "assets/images/quitter.png");
        });
        
        //Ajouter un écouteur à la croix pour qu'elle referme la carte
        $("#quitter").click(this.retourMenu.bind);
    }

    gagne() {
        let baseHTML = "<div id=\"dark\"></div>";
        let canvas = $("#renderCanvas");
        
        //Ajouter le fond noir
        this.canvas.after(this.baseHTML);
        
        //Générer le code HTML de la carte
        let codeHTML = "<img id=\"gagne\" src=\"assets/images/gagne.png\" /><img src=\"assets/images/quitter.png\" id=\"quitter\" />";
        
        //Ajouter l'overlay noir à la page
        $("#dark").append(codeHTML);
        
        //Ajouter un écouteur à la croix pour qu'elle change au survol
        $("#quitter").hover(function (e){
            $(this).attr("src", "assets/images/quitter_survol.png");
        }, function(e) {
            $(this).attr("src", "assets/images/quitter.png");
        });
        
        //Ajouter un écouteur à la croix pour qu'elle referme la carte
        $("#quitter").click(this.retourMenu.bind);
    }
    
    retourMenu() {
        window.location.replace("/menu.html"); //Redirection similaire à une redirection HTTP
    }

    chargerScript(path) {
        let script = document.createElement("script");
        script.type="text/javascript";
        script.src = path;  //Ajouter l'URL du script à charger
        script.async = false;

        document.body.appendChild(script);
    }
}