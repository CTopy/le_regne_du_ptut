Player = function(game, canvas) {
    // La scène du jeu
    this.scene = game.scene;

    // Initialisation de la caméra
    this._initCamera(this.scene, canvas);
    
    var id = window.setInterval(this.getCoords, 1000);
};

Player.prototype = {
    _initCamera : function(scene, canvas) {
        // On crée la caméra
        this.camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 30, new BABYLON.Vector3(0, 20, -50), scene);
        

        // On demande à la caméra de regarder au point zéro de la scène
        this.camera.setTarget(BABYLON.Vector3.Zero());

        // On affecte le mouvement de la caméra au canvas
        this.camera.attachControl(canvas, true);
        this.camera.inputs.detachControl;
        
        // Paramétrer la caméra
        if (!DEBUG_MODE) {
            this.camera.panningSensibility = 200;  //La caméra se déplace plus vite que par défaut
            this.camera.lowerRadiusLimit = 13;      //Ne pas trop zoomer
        } else {
            this.camera.panningSensibility = 1000;
        }
        this.camera.upperBetaLimit = 1.3;       //Rester au dessus du plateau
        this.camera.upperRadiusLimit = 75;      //Ne pas trop dezoomer
        this.camera.panningDistanceLimit = 30;  //Ne pas trop s'éloigner

        
        // Cette partie du code sera à retirer dans le programme final, elle permet de mettre en place un viseur qui donne
        // les coordonnées à laquelle la caméra regarde. Ca sera utile notamment pour créer les lieux
        var self = this;

        var id = window.setInterval(function () {
            if(false)
                console.log(self.camera.target);
        },2000);

        $("[src=\"assets/images/folie.jpg\"]").click(function() {
            window.clearInterval(id);
        });
        //***********************************************************
    },
};