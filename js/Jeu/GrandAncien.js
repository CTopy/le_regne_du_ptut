"use strict";

class GrandAncien{
    constructor(partie, nom, effet, img){
        this.partie = partie;
        this.nom = nom;
        this.effet = effet;
        this.estReveille = false; //boolean
        this.img = img;
    }
    
    reveiller(){
        
        //affichage pop-up
        let sectionReveil = document.createElement("section");
        sectionReveil.id = "sectionReveil"
        
        let divSectionReveil = document.createElement("div");        
        let titreSectionReveil = document.createElement("p");
        let imageSectionReveil = document.createElement("div");
        let textSectionReveil = document.createElement("p");
        let quitteSectionReveil = document.createElement("button");
        
        titreSectionReveil.textContent = this.nom + " se réveille !";
        imageSectionReveil.style.backgroundImage = "url("+this.img+")";
        textSectionReveil.textContent = this.effet;
        quitteSectionReveil.textContent = "OK";
        
        sectionReveil.appendChild(divSectionReveil);
        divSectionReveil.appendChild(titreSectionReveil);
        divSectionReveil.appendChild(imageSectionReveil);
        divSectionReveil.appendChild(textSectionReveil);
        divSectionReveil.appendChild(quitteSectionReveil);
        
        quitteSectionReveil.addEventListener("click", function(){
            sectionReveil.remove();
            titreSectionReveil.remove();
            imageSectionReveil.remove();
            textSectionReveil.remove();
            textSectionReveil.remove();
            quitteSectionReveil.remove();
            divSectionReveil.remove();
        })
        
        document.querySelector("body").appendChild(sectionReveil);
        
        //gestion de l'affichage css
        this.estReveille = true;
        this.div.classList = "ancien ancien--decouvert";
        this.div.firstElementChild.src = this.img;
    }
    
    afficherDOM() {
        //Créer les éléments du DOM
            //Définition de la div
            this.div = document.createElement("div");
            this.div.classList.add("ancien");
            this.div.classList.add("ancien--cache");
            
            //Définition de l'image
            let imgGdAncien = document.createElement("img");
            imgGdAncien.src = "assets/images/grandsAnciens/grand_anciens_cacher.jpg";
            
            //Définition du nom
            let pNom = document.createElement("p");
            pNom.innerHTML = this.nom;
            
            //Définition de l'effet
            let pEffet = document.createElement("p");
            pEffet.innerHTML = this.effet;
            
            //Ajouter les éléments à la div de l'ancien
            this.div.append(imgGdAncien, pNom, pEffet);
            
            //Ajouter la div à la liste de tous les anciens
            $("#gdAnciens").append(this.div);
    }
}

class Azathoth extends GrandAncien{
    constructor(partie){
        super(partie, "Azathoth", "Retirez de la partie 3 cultistes de la réserve.", "assets/images/grandsAnciens/azathoth.jpg")
    }
    reveiller(){
        GrandAncien.prototype.reveiller.call(this);
        this.estReveille = true;
        nbCultisteMax=nbCultisteMax-3;
    }
}

class Yig extends GrandAncien{
    constructor(partie){
        super(partie, "Yig", "Sceller un portail nécessite une carte indice supplémentaire d'une ville reliée.", "assets/images/grandsAnciens/yig.jpg")
    }
    reveiller(){
        GrandAncien.prototype.reveiller.call(this);
        //lancer la video?
        this.estReveille = true;
    }
}

class Dagon extends GrandAncien{
    constructor(partie){
        super(partie, "Dagon", "Placez un cultiste sur chaque portail qu'il soit ouvert ou fermé.", "assets/images/grandsAnciens/dagon.jpg")
    }
    reveiller(){
        GrandAncien.prototype.reveiller.call(this);
        //lancer la video?
        this.estReveille = true;
        for(let unLieuPortail of lieuxPortail){
            this.partie.invoquer(1, CULTISTE, unLieuPortail);
        }
    }
}

class Cthulhu extends GrandAncien{
    constructor(partie){
        super(partie, "Cthulhu", "Le monde est plongé dans la folie, le chaos et la destruction. Vous avez perdu la partie.", "assets/images/grandsAnciens/cthulhu.jpg")
    }
    reveiller(){
        //lancer la video?
        this.estReveille = true;
        //jeu.reserveCultiste-3;
    }
    
    afficherDOM() {
        //Créer les éléments du DOM
            //Définition de la div
            this.div = document.createElement("div");
            this.div.classList.add("ancien");
            this.div.classList.add("ancien--cache");
            
            //Définition de l'image
            let imgGdAncien = document.createElement("img");
            imgGdAncien.src = "assets/images/grandsAnciens/grand_anciens_cacher_cthulhu.jpg";
            
            //Définition du nom
            let pNom = document.createElement("p");
            pNom.innerHTML = this.nom;
            
            //Définition de l'effet
            let pEffet = document.createElement("p");
            pEffet.innerHTML = this.effet;
            
            //Ajouter les éléments à la div de l'ancien
            this.div.append(imgGdAncien, pNom, pEffet);
            
            //Ajouter la div à la liste de tous les anciens
            $("#gdAnciens").append(this.div);
    }
}