Arena = function(game) {
    // Appel des variables nécéssaires
    this.game = game;
    var scene = game.scene;
    
    // Création du materiau du plateau
    var materiauPlateau = new BABYLON.StandardMaterial("materiauPlateau", scene);
    // Ajouter l'image du plateau au matériau
    materiauPlateau.diffuseTexture = new BABYLON.Texture("assets/images/plateau.jpg", scene);

    // Création de notre lumière principale
    var lumiere1 = new BABYLON.HemisphericLight("lumiere1", new BABYLON.Vector3(1, 1, 0), scene);
    lumiere1.range = 10;
    
    // Création d'un sol
    var plateau = BABYLON.Mesh.CreateGround("plateau", 20, 13, 2, scene);
    
    // Redimensionner la texture
    materiauPlateau.diffuseTexture.uScale = 1.0;
    materiauPlateau.diffuseTexture.vScale = 1.0;
    
    // Attribution de la texture au plateau
    plateau.material = materiauPlateau;
};