/*
$(document).ready(async function() {

});
*/



$("document").ready(function(){
    var jeu = new Jeu();
    jeu.mettreEnPlaceJeu();
    });

class Jeu {
    //Début du jeu
    constructor() {
        //Déclaration des données membres
        this.actions = new Array(new Marcher(), new VaincreCultiste(), new VaincreShoggoth(), new ScellerPortail());
        this.joueurs;
        this.nbJoueur = 4;
        this.persoJoueur;
        this.investigateurs = new Array(new Detective());
        this.grandsAnciens = new Array(new Azathoth(), new Yig(), Dagon());
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
        
        //********** MISE EN PLACE DES GRANDS ANCIENS **********//
        //Mélanger les grands anciens
        melanger(this.grandsAnciens);
        
        //Si on a plus de 6 Grands Anciens, on en garde que 6
        if (this.grandsAnciens.length > 6)
            this.grandsAnciens.splice(0,5);
        
        //On affiche chaque Grand Ancien
        let num = 0;
        for (var unAncien of this.grandsAnciens) {
            num++;
            unAncien.afficherDOM();
            unAncien.div.dataset.num = num;
        }
        
        //On ajoute Cthulhu à la fin
        this.grandsAnciens.push(new Cthulhu());
        let cthulhu = this.grandsAnciens[this.grandsAnciens.length-1];
        cthulhu.afficherDOM();
        cthulhu.div.dataset.num = "cthulhu";
        
        //********** INVOCATION **********//
        //Invoquer 2 fois, 3 cultistes, puis 2 cultistes, puis 1 cultiste
        for (i=3; i>=0; i--) {
            this.invoquer(2,i, CULTISTE);
        }
        //Invocation du Shoggoth
        this.invoquer(1,1, SHOGGOTH);
        
        //********* SELECTION DES PERSONNAGES **********//
        melanger(this.investigateurs);
        
        for(var i=0; i<this.nbJoueur ; i++) {
            
            //prendre les 2 premiers investigateurs
            let investigateur1 = this.investigateurs[0];
            let investigateur2 = this.investigateurs[1];
            //Les affiche
            let baseHTML = "<div id=\"dark\"></div>";
            let canvas = $("#renderCanvas");
        
            //Ajouter le fond noir
            this.canvas.after(this.baseHTML);

            //Générer le code HTML de la carte
            let codeHTML = "<img id=\"imgInvestigateur1\" src=\""+investigateur1.URLimage+"\" /><img src=\""+investigateur2.URLimage+"\" id=\"imgImvestigateur2\" />";

            //Ajouter l'overlay noir à la page
            $("#dark").append(codeHTML);
            
            while(//Le joueur n'a pas choisi d'investigateur
            persoJoueur===null)
            //On attend click (écouteur)
                $("#imgInvestigateur1").click(function() {
                    persoJoueur=investigateur1;
                });
            $("#imgInvestigateur2").click(function() {
                    persoJoueur=investigateur2;
                });
                //On lui donne le personnage
                //On remet le personnage restant au dessus du paquet
        }
        
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
        this.invoquer();
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
    
    invoquer(nbInvocations, nbEntiteAInvoc, onInvoqueUnShoggoth) {
        
        for(var j=0 ; j<nbInvocations ; j++) {
            this.defausseInvocation.piocher(this.paquetInvocation);
            let lieuInvoc = this.defausseInvocation[(this.defausseInvocation.length)-1].lieu;
            
            if (!onInvoqueUnShoggoth) {
                for (var i=0 ; i<nbEntiteAInvoc ; i++) {
                    lieuInvoc.ajouterEntite(new Cultiste());
                    this.nbCultistes++;
                }
            }
            
            if (onInvoqueUnShoggoth) {
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
            if (unLieu.portail === OUI)
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