"use strict";

var Vue = function() {
    this.baseHTML = "<div id=\"dark\"></div>";
    this.canvas = $("#renderCanvas");
};

Vue.prototype = {
    afficherCarte : function (carte) {
        
        //Ajouter le fond noir
        this.canvas.after(this.baseHTML);
        
        //Récupérer l'image de la carte cliquée
        var imageCarte = carte.attr("src");
        
        //Générer le code HTML de la carte
        var codeHTML = "<img class=\"carte\" src="+imageCarte+" /><img src=\"assets/images/quitter.png\" id=\"quitter\" />";
        
        //Ajouter l'overlay noir à la page
        $("#dark").append(codeHTML);
        
        //Ajouter un écouteur à la croix pour qu'elle change au survol
        $("#quitter").hover(function (e){
            $(this).attr("src", "assets/images/quitter_survol.png");
        }, function(e) {
            $(this).attr("src", "assets/images/quitter.png");
        });
        
        //Ajouter un écouteur à la croix pour qu'elle referme la carte
        $("#quitter").click(this.effacerDialogue);
        
},
    effacerDialogue : function () {
    $("#dark").remove();
}
}