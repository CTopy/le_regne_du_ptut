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

var joueurs = new Array(new Detective(), new Detective()); 

function debutPartie() {
    var marcher = new Marcher();
    var vaincCult = new VaincreCultiste();
    var vaincShog = new VaincreShoggoth();
    var scelPort = new ScellerPortail();

    var actions = new Array(marcher, vaincCult, vaincShog, scelPort);
    
    //Déterminer le joueur qui commence
    var index = Math.floor(Math.random() * Math.floor(joueurs.length));
    tourDeJeu(index, actions);
    
}

function tourDeJeu(index, actions) {
    let joueurActif = joueur[index];
    joueurActif.nbAction = 4;
    for(uneAction of actions) {
        uneAction.afficher()
    }
    joueurActif.watch(nbAction, function() {
    for(uneAction of actions) {
        uneAction.cacher()
    }
    for(uneAction of actions) {
        uneAction.afficher()
    }
    });
    
    var passerTour = document.getElementById("passerTour");
    if (index < joueurs.length)
        passerTour.addEventListener("click", tourDeJeu(joueurs[index+1]));
    else 
        passerTour.addEventListener("click", tourDeJeu(joueurs[0]), actions);
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