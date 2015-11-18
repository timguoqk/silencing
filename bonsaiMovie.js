function bonsaiMovie(data) {
    var dalpha, sin_dalpha, cos_dalpha;
    updateParameters();

    try {
        importScripts(self.location.origin + '/randomColor.js');
    } catch(e) {
        importScripts('http://silencing.timguoqk.me/randomColor.js');
    }
    stage.setBackgroundColor('#8B8B8B');
    stage.length(1);

    var random = Math.random;

    for (var i = 1; i <= data.numRing; i ++) {
        var distanceFromCenter = data.firstDistance + data.distanceBetweenRing * i;
        var numCircle = Math.floor((2 * Math.PI * distanceFromCenter) / (data.radius * 2 + data.circlePadding * 2));
        var radDiff =  2 * Math.PI / numCircle;
        for (var j = 0; j < 2 * Math.PI; j += radDiff) {
            var x = data.centerX + distanceFromCenter * Math.sin(j),
                y = data.centerY + distanceFromCenter * -Math.cos(j);

            var circle = bonsai.Path
                .circle(x, y, data.radius)
                .attr('fillColor', randomColor(data.colorType));
            circle.x = x;
            circle.y = y;
            stage.addChild(circle);
        }
    }

    var children = stage.children();
    stage.sendMessage('numCircle', children.length);

    stage.on(0, function() {
        for (var i = 0; i < children.length; i ++) {
            var newCoord = motionFunctions[data.motionFunction](children[i].x, children[i].y);
            children[i].x = newCoord[0];
            children[i].y = newCoord[1];
            children[i].animate(1, {
                x: children[i].x,
                y: children[i].y,
            }, {easing: 'linear', isTimelineBound: false});
        }
    });

    var count = 0;
    stage.on(0, function() {
        if (count != 0) {
            count --;
            return;
        }
        count = data.colorMultiplier;
        for (var i = 0; i < children.length; i ++) {
            children[i].animate(data.colorMultiplier, {
                fillColor: randomColor(data.colorType)
            }, {easing: 'linear', isTimelineBound: false});
        }
    });

    stage.addChild(bonsai.Path
        .rect(data.centerX, data.centerY - 3, 1, 7)
        .attr({fillColor: 'white'}));
    stage.addChild(bonsai.Path
        .rect(data.centerX - 3, data.centerY, 7, 1)
        .attr({fillColor: 'white'}));

    function updateParameters() {
        dalpha = data.rpf * 2 * Math.PI;
        sin_dalpha = Math.sin(dalpha);
        cos_dalpha = Math.cos(dalpha);
    }

    stage.on('message:update', function(d) {
        data = d;
        updateParameters();
    });
    stage.on('message:recenter', function() {

    });


    var motionFunctions = [
        function(x, y) {
            return [data.centerX + (x - data.centerX) * cos_dalpha - (y - data.centerY) * sin_dalpha,
                data.centerY + (x - data.centerX) * sin_dalpha + (y - data.centerY) * cos_dalpha];
        },
        function(x, y) {
            var spread = 700 * data.rpf;
            return [x + spread * random() - spread / 2,
                y + spread * random() - spread / 2];
        },
        function(x, y) {
            return [x, y + data.rpf * 200];
        }
    ];
}
