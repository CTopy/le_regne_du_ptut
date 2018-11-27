// Lorsque le DOM est chargé
document.addEventListener("DOMContentLoaded", function () {
    // Passer à "true" pour activer le mode débug
    
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
    
    $(".carte").click(function () {
        vue.afficherCarte($(this));
    });
});