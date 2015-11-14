var schemas = {
    original: {
        centerX: 250,
        centerY: 250,
        numRing: 3,
        circlePadding: 5,
        firstDistance: 60,
        distanceBetweenRing: 40,
        colorMultiplier: 25,
        rpf: 0.01,
        radius: 10,
        colorType: {},
        motionFunction: 0
    },
    mobile: {
        centerX: 250,
        centerY: 250,
        numRing: 2,
        circlePadding: 30,
        firstDistance: 60,
        distanceBetweenRing: 40,
        colorMultiplier: 30,
        rpf: 0.01,
        radius: 5,
        colorType: {hue: 'blue'},
        motionFunction: 0
    }
};

$(function() {
    var currentSchema = $.extend({}, schemas.original), movie;
    
    movie = bonsai.run(document.getElementById('main-container'), {
        width: 500, // TODO: make it responsive
        height: 500,
        code: run,
        data: currentSchema
    });
    function restart() {
        movie.destroy();
        movie = bonsai.run(document.getElementById('main-container'), {
            width: 500, // TODO: make it responsive
            height: 500,
            code: run,
            data: currentSchema
        });
        updateSchema();
    }

    movie.on('message:numCircle', function(d) {
        $('#num-circle-label .detail').text(d);
    });

    function updateSchema() {
        movie.sendMessage('update', currentSchema);
        $('#speed-label .detail').text(currentSchema.rpf.toFixed(3));
    }

    $('#move-fast-button').on('click', function() {
        currentSchema.rpf += 0.005;
        updateSchema();
    });
    $('#move-slow-button').on('click', function() {
        currentSchema.rpf -= 0.005;
        updateSchema();
    });
    $('#move-stop-button').on('click', function() {
        currentSchema.rpf = 0;
        updateSchema();
    });
    $('#restart-button').on('click', function() {
        currentSchema = $.extend({}, schemas.original);
        restart();
    });

    function safeGetVal(name) {
        var x = $('input[name="' + name + '"]');
        return x.val() || x.attr('placeholder');
    }

    $('#apply-normal-form-button').on('click', function() {
        currentSchema.colorType = JSON.parse(safeGetVal('randomColor'));
        currentSchema.colorMultiplier = safeGetVal('colorMultiplier');
        updateSchema();
    });

    $('#apply-special-form-button').on('click', function() {
        currentSchema.numRing = safeGetVal('numRing');
        currentSchema.circlePadding = safeGetVal('circlePadding');
        currentSchema.distanceBetweenRing = safeGetVal('distanceBetweenRing');
        currentSchema.radius = safeGetVal('radius');
        restart();
    });
    $('#mobile-button').on('click', function() {
        currentSchema = $.extend({}, schemas.mobile);
        restart();
    });
    $('#default-button').on('click', function() {
        currentSchema = $.extend({}, schemas.original);
        restart();
    });
});

function run() {
    importScripts(self.location.origin + '/bonsaiMovie.js');
    bonsaiMovie(stage.options.data);
}
