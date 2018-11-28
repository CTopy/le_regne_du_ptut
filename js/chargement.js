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
    "background-color" : "#024002",
    "border-radius" : "100px",
    "margin" : "auto",
    "display" : "flex",
    "position" : "absolute",
    "top" : "20%",
    "align-items": "center",
    "padding" : "5%"
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
    src : "./assets/images/teteDeChtulhu.png"
});
$(imageAnime).css({
    "animation":"1.5s infinite cubic-bezier(.39, .01, .63, .99) TOURNE",
    "margin":"auto",
    "height":"20%"
});
cadre.append(imageAnime);