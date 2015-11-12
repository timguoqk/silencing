var schemas = {
    original: {
        centerX: 250,
        centerY: 250,
        numRing: 3,
        circlePadding: 5,
        distanceBetweenRing: 40,
        colorMultiplier: 40,
        rpf: 0.01,
        radius: 10,
        colorType: {hue: 'blue'}
    }
};

$(function() {
    var currentSchema = schemas.original;
    var movie = bonsai.run(document.getElementById('main-container'), {
        width: 500, // TODO: make it responsive
        height: 500,
        code: run,
        data: currentSchema
    });

    $('#move-button').on('click', function() {
        currentSchema.rpf += 0.01;
        movie.sendMessage('update', currentSchema);
    });
});

function run() {
    importScripts(self.location.origin + "/bonsaiMovie.js");
    bonsaiMovie(stage.options.data);
}
