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

$(document).ready(function() {
    console.log("Chargement en cours...");
    sssl(['js/Jeu/constantes.js', 'js/general.js', 'js/Arena.js', 'js/Player.js', 'js/Game.js', 'js/Jeu/Lieu.js', 'js/Jeu/Carte.js', 'js/Jeu/Deck.js', 'js/Jeu/Investigateur.js', 'js/Jeu/Cultiste.js', "js/Jeu/Shoggoth.js", "js/Jeu/GrandAncien.js", 'js/Jeu/Action.js', 'js/Vue.js', 'js/Jeu/Jeu.js'], function() {
        console.log("Fin du chargement !");
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