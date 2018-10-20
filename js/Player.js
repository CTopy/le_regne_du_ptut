Player = function(game, canvas) {
    // La scène du jeu
    this.scene = game.scene;

    // Initialisation de la caméra
    this._initCamera(this.scene, canvas);
    
};

Player.prototype = {
    _initCamera : function(scene, canvas) {
        // Parameters: alpha, beta, radius, target position, scene
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 30, new BABYLON.Vector3(0, 0, 0), scene);

        // Positions the camera overwriting alpha, beta, radius
            camera.setPosition(new BABYLON.Vector3(0, 0, 20));
        
        // Empêcher l'utilisateur de bouger la caméra avec le clavier
            camera.inputs.clear();
            //camera.inputs.addMouse;

        // This attaches the camera to the canvas
            camera.attachControl(canvas, true);
    }
};