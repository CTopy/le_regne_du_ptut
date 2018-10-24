// Page entièrement chargé, on lance le jeu
document.addEventListener("DOMContentLoaded", function () {
    new Game('renderCanvas');
}, false);

// Constructeur de l'objet Game.js
Game = function(canvasId) {
    
    // Canvas et engine défini ici
    // Variables locales
    var canvas = document.getElementById(canvasId);
    var engine = new BABYLON.Engine(canvas, true);
    var _this = this;
    
    // On initie la scène avec une fonction associé à l'objet Game
    this.scene = this._initScene(engine);
    
    // On appelle Player.js
    var _player = new Player(_this, canvas);
    
    // On appelle Arena.js
    var _arena = new Arena(_this);
    
    // Permet au jeu de tourner
    engine.runRenderLoop(function () {
        _this.scene.render();
    });

    // Ajuste la vue 3D si la fenetre est agrandi ou diminué
    window.addEventListener("resize", function () {
        if (engine) {
            engine.resize();
        }
    },false);

};


Game.prototype = {
    // Prototype d'initialisation de la scène
    _initScene : function(engine) {
        var scene = new BABYLON.Scene(engine);
        engine.enableOfflineSupport = false;
        scene.clearColor=new BABYLON.Color3(0,0,0);
        return scene;
    }
};