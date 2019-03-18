/*
$(document).ready(async function() {

});
*/

//********** FONCTION PRINCIPALE **********//
$("document").ready(async function(){
    var partie = new Jeu();
    await partie.mettreEnPlaceJeu();
    //await partie.afficherModeles();
    partie.grandsAnciens[0].reveil();
    await partie.tourDeJeu();

});

class Jeu {
    //Début du jeu
    constructor() {
        //Déclaration des données membres
        this.actions = [new Marcher()];
        this.nbJoueur = 4;
        this.grandsAnciens = [new Azathoth(), new Yig(), new Dagon()];
        
        this.defausseIndice = new Deck();
        this.paquetIndice = new Deck([
        ], this.defausseIndice);
//        this.paquetRelique = new Deck();
//        this.defausseRelique = new Deck();
//        this.paquetInvocation = new Deck();
//        this.defausseInvocation = new Deck();
        this.cultistes = [];
        this.shoggoths = [];
        this.nbCultistes = 0;
        this.nbShoggoth = 0;
    }

    async afficherModeles() {
        let entites = this.investigateurs.concat(this.cultistes);
        entites = entites.concat(this.shoggoths);
        for(let uneEntite of entites) {
            await uneEntite.afficherMesh();
            uneEntite.ajusterMesh();
        }
    }

    async mettreEnPlaceJeu() {
        const j1 = new Detective("Anne-Sophie");
        const j2 = new Detective("Clément Topy");
        const j3 = new Detective("Ludo BroZ");
        const j4 = new Detective("Romain Namor");
        this.investigateurs = [j1, j2, j3, j4];

        //Choisir un joueur qui commence
        melanger(this.investigateurs);
        this.joueurActif = this.investigateurs[0];

        let joueursPassifs = [
            this.investigateurs[1],
            this.investigateurs[2],
            this.investigateurs[3]
        ];
        let rang = 2;
        for (let j of joueursPassifs) {
            j.toggleActif(rang);
            rang++;
        }
        this.investigateurs[0].main.ajouter(new SablierFinal(this.defausseIndice),false);

        //********** MISE EN PLACE DES GRANDS ANCIENS **********//
        //Mélanger les grands anciens
        melanger(this.grandsAnciens);

        //Si on a plus de 6 Grands Anciens, on en garde que 6
        if (this.grandsAnciens.length > 6)
            this.grandsAnciens.splice(0,5);

        //On affiche chaque Grand Ancien
        let num = 0;
        for (let unAncien of this.grandsAnciens) {
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
        this.invoquer(2, CULTISTE);
        this.invoquer(1, CULTISTE);
        this.invoquer(1, CULTISTE);
        //Invocation du Shoggoth
        this.invoquer(1, SHOGGOTH);

        //********* SELECTION DES PERSONNAGES **********//

        //********* AFFICHER TOUS LES MODELES 3D **********//


        //********* MISE EN PLACE DES DECKS ***************//

    }

    async tourDeJeu() {

        //Au début de chaque tour, on affiche toutes les actions
        for(var uneAction of this.actions) {
/*            uneAction.setJoueurActif(this.joueurActif);
            uneAction.afficher();*/
        }
        /*
        //A chaque fois que le joueur joue on réévalue les actions
        this.joueurActif.watch(nbAction, function() {
            //Si le joueur est fou, on vérifie si c'est la fin (si tous les joueurs sont fous)
            //ou
            //Si le joueur est sur un portail et que ce portail est scellé
            if ((this.joueurActif.estFou) || (this.joueurActif.lieu.portail.SCELLE || this.joueurActif.lieu.portail.SIGNE_ANCIENS))
                this.checkFin();            //Vérifier si le jeu est fini

            //Si l'execution continue, on reset les actions
            for(uneAction of this.actions) {
                uneAction.cacher();
            }
            for(uneAction of this.actions) {
                uneAction.afficher(this.joueurActif, this.actions);
            }
        });
        */
        //Si on clique sur le bouton de passer son tour, on passe son tour
        var passerTour = document.getElementById("passerTour");
        passerTour.addEventListener("click", this.passerTour.bind(this));

    }

    passerTour() {
        this.phasePioche();
        /*
            this.checkFin();
            this.invoquer();
            this.checkFin();
        */
        //phase d'invocation
        this.invoquer(2, CULTISTE);
        //phase changement joueur
        this.joueurActif.ajouterActions(this.joueurActif.nbActionMax);
        let ancienActif = this.joueurActif;
        //move(this.joueurs, 0, this.investigateurs.length-1);
        /*Je passe le joueur juste avant en actif et je fais avancer les autres d'une place dans le rang*/
        this.joueurActif = this.investigateurs[(ancienActif.numero+3)%4];
        this.joueurActif.setActif();
        ancienActif.setPassif(2);
        this.investigateurs[(ancienActif.numero+1)%4].setPassif(3);
        this.investigateurs[(ancienActif.numero+2)%4].setPassif(4);
        //je passe au tour suivant
        this.tourDeJeu();
    }

    phasePioche() {
        //Le joueur actif pioche deux fois
        this.joueurActif.main.piocher(this.paquetIndice);
        //ensuite, on affiche sa main
        let main = "";
        for(let carte of this.joueurActif.main.contenu) {
            main = main+'<img class="carte" src="'+carte.image+'" />'
        }
        $("#"+this.joueurActif.numero).append(main) ;
    }

    /** invoquer : Permet d'invoquer une ou plusieurs entités
    * param1 : Nombre d'entités à invoquer
    * param2 : Est-ce qu'on invoque un Shoggoth ? (sinon un cultiste)
    **/
    async invoquer(nbEntiteAInvoc, onInvoqueUnShoggoth) {

//            this.defausseInvocation.piocher(this.paquetInvocation);
//            let lieuInvoc = this.defausseInvocation[(this.defausseInvocation.length)-1].lieu;
        //TEMPORAIRE : Choisir un lieu aléatoire
        let nbAlea = null, lieuInvoc = null;
        nbAlea = Math.floor(alea(0,5));
        lieuInvoc = lieux[nbAlea];

            //On invoque le nombre de shoggoths ou de cultistes demandé
            if (!onInvoqueUnShoggoth) {
                for (var i=0 ; i<nbEntiteAInvoc ; i++) {
                    let unCultiste = new Cultiste(lieuInvoc);
                    lieuInvoc.ajouterEntite(unCultiste);
                    this.cultistes.push(unCultiste);
                    this.nbCultistes++;
                }
            }

            if (onInvoqueUnShoggoth) {
                for (var i=0 ; i<nbEntiteAInvoc ; i++) {
                    let shoggoth = new Shoggoth(lieuInvoc);
                    lieuInvoc.ajouterEntite(shoggoth);
                    this.shoggoths.push(shoggoth);
                    this.nbShoggoth++;
                }
            }
        //On crée une popup pour indiquer à l'utilisateur ce qui a été invoqué et sur quel lieu
        /*let popup = new Popup();
        popup.afficherCultiste(nbEntiteAInvoc, lieuInvoc.nom);*/
        //on affiche les modèles 3D sur le plateau de jeu
        await this.afficherModeles();
        this.checkFin();
    }

    checkFin() {
        //On vérifie si tous les portails sont scellés
        let tousPortailsScelles = true;
        for(let unLieu of lieuxPortail){
            if (unLieu.portail === OUI)
                tousPortailsScelles = false;
        }

        let tousJoueursSontFous = true;
        for (let unJoueur of this.investigateurs) {
            if (!unJoueur.estFou)
                tousJoueursSontFous = false;
        }

        let cthulhuEstReveille = this.grandsAnciens[this.grandsAnciens.length-1].estReveille;

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
}
