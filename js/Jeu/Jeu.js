$("document").ready(function(){
    //Initialisation du jeu, chargement dynamique des scripts
    
    //Chargement des constantes
    chargerScript("js/Jeu/constantes.js");
    
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

function debutPartie() {
    var joueurs = new Investigateur[];
    for(var unJoueur of joueurs) {
        var marcher = new Marcher(joueurActif);
        var vaincCult = new VaincreCultiste(joueurActif);
        var vaincShog = new VaincreShoggoth(joueurActif);
        var scelPort = new ScellerPortail(joueurActif);
    }
}

function tourDeJeu() {
    var joueurActif;
    marcher.afficher(joueurActif);
    vaincCult.afficher(joueurActif);
    vaincShog.afficher(joueurActif);
    scelPort.afficher(joueurActif);
    
}

function perdu() {
    
}

function gagne() {
    
}
    
function chargerScript(path) {
    let script = document.createElement("script");
    script.type="text/javascript";
    script.src = path;  //Ajouter l'URL du script à charger
    script.async = false;

    document.body.appendChild(script);
}