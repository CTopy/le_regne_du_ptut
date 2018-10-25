Player = function(game, canvas) {
    // La scène du jeu
    this.scene = game.scene;

    // Initialisation de la caméra
    this._initCamera(this.scene, canvas);
    
};

Player.prototype = {
    _initCamera : function(scene, canvas) {
        // On crée la caméra
        this.camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 30, new BABYLON.Vector3(0, 20, -50), scene);
        

        // On demande à la caméra de regarder au point zéro de la scène
        this.camera.setTarget(BABYLON.Vector3.Zero());

        // On affecte le mouvement de la caméra au canvas
        this.camera.attachControl(canvas, true);
        
        this.camera.clearControl;
        
    }
};