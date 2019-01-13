// Variable pour activer/désactiver le mode débug
const DEBUG_MODE = true;

// Fonctions utilitaires génériques
function melanger(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function alea(min , max) {
    return Math.random() * (max-min) + min;
}
    
// Empêcher l'utilisateur d'ouvrir le menu contextuel (clic droit)
// pour des raisons d'ergonomie
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

if (!DEBUG_MODE) {
    // Empêcher l'utilisateur d'accéder à l'inspecteur
    document.onkeydown = function(e) {
      if(e.keyCode == 123) {
         return false;
      }
      if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
         return false;
      }
      if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
         return false;
      }
      if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
         return false;
      }
      if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
         return false;
      }
    }
}

for (let uneCarte of document.querySelectorAll(".carte")) {
    uneCarte.addEventListener("click", function(e) {
        vue.afficherCarte(e.target);
    });
}
