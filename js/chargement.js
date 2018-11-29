"use strict"

function afficherChargement(){
    let fond = document.createElement("section");
    let cadre = document.createElement("div");
    let text = document.createElement("p");
    let imageAnime = document.createElement("img");


    $(fond).css({
        "width":"100vw",
        "height":"100vh",
        "background-color":"#021c05",
        "z-index":"1000",
        "position":"absolute",
        "display":"flex",
        "justify-content":"center"
    });
    document.querySelector("body").prepend(fond);

    $(cadre).css({
        "width" : "30vw",
        "height" : "30vh",
        "border-radius" : "10px",
        "margin" : "auto",
        "position" : "absolute",
        "display" : "flex",
        "justify-content" : "space-around",
        "top" : "20%",
        "align-items": "center",
        "padding" : "5%",
        "src": "./assets/images/rectangle_chargement.png"
    });
    fond.append(cadre);

    text.textContent="CHARGEMENT"
    $(text).css({
        "text-align" : "center",
        "font-size" : "5vw"
    });
    cadre.append(text);

    $(imageAnime).attr({
        src : "./assets/images/chargement.png"
    });
    $(imageAnime).css({
        "animation":"0.6s infinite linear TOURNE",
        "margin":"auto",
        "height":"50%"
    });
    cadre.append(imageAnime);
}

function effacerChargement(fond){
    
    $(fond).animate({
        "opacity" : "0"
    }, 2000, function() {
        $(fond).empty();
        $(fond).remove();
    });
}
    