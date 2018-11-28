$("document").ready(function(){
    //Initialisation du jeu, chargement dynamique des scripts
    
    //Chargement des éléments du Jeu
    chargerScript("js/Jeu/Lieu.js");
    chargerScript("js/Jeu/Investigateur.js");
    chargerScript("js/Jeu/Cultiste.js");
    chargerScript("js/Jeu/Shoggoth.js");
        //Chargement de l'affichage
        chargerScript("js/Vue.js");
    chargerScript("js/Jeu/Action.js");
    chargerScript("js/Jeu/Deck.js");
    chargerScript("js/Jeu/Carte.js");
    chargerScript("js/Jeu/GrandAncien.js");
    
});
    
function chargerScript(path) {
    let script = document.createElement("script");
    script.type="text/javascript";
    script.src = path;  //Ajouter l'URL du script à charger
    script.async = false;

    document.body.appendChild(script);
}