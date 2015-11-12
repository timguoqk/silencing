var schemas = {
    original: {
        centerX: 250,
        centerY: 250,
        numRing: 3,
        circlePadding: 5,
        distanceBetweenRing: 40,
        rotateF: 1,
        colorMultiplier: 10,
        rpf: 0.02,
        radius: 10
    }
};

$(function() {
    var movie = bonsai.run(document.getElementById('main-container'), {
        width: 500, // TODO: make it responsive
        height: 500,
        code: run,
        data: schemas.original
    });
});

function run() {
    importScripts(self.location.origin + "/bonsaiMovie.js");
    bonsaiMovie(stage.options.data);
}
