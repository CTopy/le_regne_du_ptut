"use strict"


let fond = document.createElement("section");
$(fond).css({
    "width":"100vw",
    "height":"100vh",
    "background-color":"black",
    "z-index":"100",
    "display":"flex",
    "justify-content":"center"
});
document.querySelector("body").prepend(fond);

let cadre = document.createElement("div");
$(cadre).css({
    "width" : "30vw",
    "height" : "30vh",
    "border-radius" : "10px",
    "margin" : "auto",
    "position" : "absolute",
    "top" : "20%",
    "align-items": "center",
    "padding" : "5%"
   /* "src": "./assets/images/rectangle_chargement.png"*/
});
fond.append(cadre);

let text = document.createElement("P");
text.textContent="CHARGEMENT"
$(text).css({
    "text-align" : "center",
    "font-size" : "5vw"
});
cadre.append(text);

let imageAnime = document.createElement("img");
$(imageAnime).attr({
    src : "./assets/images/chargement.png"
});
$(imageAnime).css({
    "animation":"1.5s infinite cubic-bezier(.39, .01, .63, .99) TOURNE",
    "margin":"auto",
    "height":"50%"
});
cadre.append(imageAnime);