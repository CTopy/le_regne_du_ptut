/*
 * Queued script loading (not so fast as yepnope/labJS, but ordered execution):
 * sssl([source1, source2, source3], complete);
 * 
 * Example:
 * sssl(['jquery.js', 'jquery.ui.js'], function(){
 * 	$(function(){
 * 		$('div.accordion').accordion();
 * 	});
 * });
 */
const chgt= afficherChargement();
$(document).ready(function() {
    console.log("Chargement en cours...");
    sssl(['js/Jeu/constantes.js', 'js/Arena.js', 'js/Player.js', 'js/Game.js', 'js/Jeu/Lieu.js', 'js/Jeu/Carte.js', 'js/Jeu/Deck.js', 'js/Jeu/Investigateur.js', 'js/Jeu/Cultiste.js', "js/Jeu/Shoggoth.js", "js/Jeu/GrandAncien.js", 'js/Jeu/Action.js', 'js/Popup.js', 'js/Jeu/Jeu.js'], function() {
        console.log("Fin du chargement !");
    }).then(() => {
        effacerChargement(chgt);
    });
});

(function(){
	var firstScript = document.getElementsByTagName('script')[0];
	var scriptHead = firstScript.parentNode;
	var re = /ded|co/;
	var onload = 'onload';
	var onreadystatechange = 'onreadystatechange'; 
	var readyState = 'readyState';
	
	var load = function(src, fn){
		var script = document.createElement('script');
		script[onload] = script[onreadystatechange] = function(){
			if(!this[readyState] || re.test(this[readyState])){
				script[onload] = script[onreadystatechange] = null;
				fn && fn(script);
				script = null;
			}
		};
		script.async = true;
		script.src = src;
		scriptHead.insertBefore(script, firstScript);
	};
	window.sssl = function(srces, fn){
		if(typeof srces == 'string'){
			load(srces, fn);
			return;
		}
		var src = srces.shift();
		load(src, function(){
			if(srces.length){
				window.sssl(srces, fn);
			} else {
				fn && fn();
			}
		});
	};
})();

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
        "font-size" : "5vw",
        "font-family" : "Tahoma"
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
    return fond;
}

function effacerChargement(fond){
    
    $(fond).animate({
        "opacity" : "0"
    }, 2000, function() {
        $(fond).empty();
        $(fond).remove();
    });
}