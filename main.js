$(function() {
    var schemas = {
        original: {
            centerX: ($('#main-container').width() - 150) / 2,
            centerY: ($('#main-container').width() - 150) / 2,
            numRing: 3,
            circlePadding: 5,
            firstDistance: 80,
            distanceBetweenRing: 40,
            colorMultiplier: 30,
            rpf: 0,
            radius: 10,
            colorType: {},
            motionFunction: 0
        },
        mobile: {
            centerX: ($('#main-container').width() - 150) / 2,
            centerY: ($('#main-container').width() - 150) / 2,
            numRing: 3,
            circlePadding: 5,
            firstDistance: 80,
            distanceBetweenRing: 40,
            colorMultiplier: 30,
            rpf: 0,
            radius: 10,
            colorType: {},
            motionFunction: 0
        }
    };
    var currentSchema = $.extend({}, schemas.original), movie;
    

    movie = bonsai.run(document.getElementById('main-container'), {
        width: $('#main-container').width() - 150,
        height: $('#main-container').width() - 150,
        code: run,
        data: currentSchema
    });
    movie.on('message:numCircle', function(d) {
        $('#num-circle-label .detail').text(d);
    });
    function restart() {
        movie.destroy();
        movie = bonsai.run(document.getElementById('main-container'), {
            width: $('#main-container').width() - 150,
            height: $('#main-container').width() - 150,
            code: run,
            data: currentSchema
        });
        movie.on('message:numCircle', function(d) {
            $('#num-circle-label .detail').text(d);
        });
        updateSchema();
    }

    function updateSchema() {
        movie.sendMessage('update', currentSchema);
        $('#speed-label .detail').text(currentSchema.rpf.toFixed(3));
    }

    $('#move-pos-one-button').on('click', function() {
        currentSchema.rpf = 0.015;
        updateSchema();
    });
    $('#move-neg-one-button').on('click', function() {
        currentSchema.rpf = -0.015;
        updateSchema();
    });
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
    $('#rotation-button').on('click', function() {
        currentSchema.motionFunction = 0;
        $('#rotation-button').addClass('active');
        $('#translation-button').removeClass('active');
        updateSchema();
    });
    $('#translation-button').on('click', function() {
        currentSchema.motionFunction = 1;
        $('#rotation-button').removeClass('active');
        $('#translation-button').addClass('active');
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
    try {
        importScripts(self.location.origin + '/bonsaiMovie.js');
    } catch(e) {
        importScripts('http://silencing.timguoqk.me/bonsaiMovie.js');
    }
    bonsaiMovie(stage.options.data);
}
