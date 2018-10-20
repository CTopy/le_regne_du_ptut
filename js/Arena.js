Arena = function(game) {
    // Appel des variables nécéssaires
    this.game = game;
    var scene = game.scene;

    // Création de notre lumière principale
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    
    // Création d'un sol
    var sol = new BABYBLON.Mesh.CreateGround("ground1", 20, 20, 2, scene);
};