"use strict";
document.addEventListener("DOMContentLoaded", initialiser);

function initialiser(){
    document.getElementById("btnRegle").addEventListener("click", gestionRegle);
    document.getElementById("bouttonQuitter").addEventListener("click", gestionRegle);
}

function gestionRegle(){
    if(this.id=="bouttonQuitter"){
        document.getElementById("regle").style.top="150vh";
    }else{
        document.getElementById("regle").style.top="0";
    }
}
