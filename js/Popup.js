"use strict";

class Popup {
    constructor(bool=false) {
        //Définition du fond pour les boites de dialogue
        this.fond = document.createElement("div");
        this.fond.id="dark";
        this.canvas = document.getElementById("renderCanvas");
        this.scene = JEU.scene;
    }

    ecouteur(elt) {
        elt.addEventListener("click", (e) => {
            this.afficher(elt);
        }, true);
    }

    afficher(element) {
        //Ajouter le fond noir au canvas
        this.canvas.parentNode.appendChild(this.fond);

        //Clone l'élément cliqué'
        let clone = element.cloneNode(true);

        //Créer la croix
        const quitter = document.createElement("img");
        quitter.src = "./assets/images/quitter.png";
        quitter.className = "quitter";

        //Afficher l'élément et la croix
        this.fond.append(clone);
        this.fond.append(quitter);

        if (clone.clientHeight !== undefined && clone.clientWidth !== undefined)
            if (element.clientHeight > element.clientWidth) {
                clone.style.height = '80vh';
            } else {
                clone.style.width = '80vw';
            }
        const h = clone.clientHeight;
        const w = clone.clientWidth;

        const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        const r = ((vw-(((vw-w)/2)+w))/vw)*100-2;
        const t = ((vh-(((vh-h)/2)+h))/vh)*100-5;

        quitter.style.right = r+"%";
        quitter.style.top = t+"%";

        //Ajouter l'écouteur à la croix
        this.ecouteurQuitter(quitter);
    }

    afficherCultiste(nbCultistes, lieuCultistes) {
        //Ajouter le fond noir au canvas
        this.canvas.after(this.fond);

        //Création de l'image du cultiste
        let cultiste = $(document.createElement("img"));
        cultiste.attr("src", "./assets/images/cultiste.jpg");

        //Afficher l'image du cultistes, son nombre et son lieu puis effacement
        this.fond.append(cultiste);
        this.fond.append("<p>"+nbCultistes+" ont été invoqués à "+lieuCultistes+"</p>");
        console.log(this.fond);
        setTimeout(function(){
            this.fond.empty();
            this.fond.remove();
        }, 5000);
    }

    ecouteurQuitter(quitter) {
        //Ajouter un écouteur à la croix pour qu'elle change au survol
        quitter = $(quitter);
        quitter.hover(function (e){
            $(this).attr("src", "assets/images/quitter_survol.png");
        }, function(e) {
            $(this).attr("src", "assets/images/quitter.png");
        });

        //Ajouter un écouteur à la croix pour qu'elle quitte la carte
        quitter.click(this.effacerDialogue.bind(this));
    }

    effacerDialogue() {
        this.fond.innerHTML = "";
        this.fond.remove();
    }
}
