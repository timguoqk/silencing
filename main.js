$(function() {
    var movie = bonsai.run(document.getElementById('main-container'), {
        width: 500, // TODO: make it responsive
        height: 500,
        code: originalColor
    });
});

function originalColor() {
    importScripts(self.location.origin + "/randomColor.js");
    stage.setBackgroundColor("#8B8B8B");
    var centerX = 250,
        centerY = 250,
        numRing = 3,
        circlePadding = 5,
        diviation = 1,
        distanceBetweenRing = 40,
        rotateF = 1, colorMultiplier = 10, rpf = 0.02,
        radius = 10;

    var random = Math.random;

    for (var i = 1; i <= numRing; i ++) {
        var distanceFromCenter = distanceBetweenRing * i;
        var numCircle = Math.floor((2 * Math.PI * distanceFromCenter) / (radius * 2 + circlePadding * 2));
        var radDiff =  2 * Math.PI / numCircle;
        for (var j = 0; j < 2 * Math.PI; j += radDiff) {
            var x = centerX + distanceFromCenter * Math.sin(j),
                y = centerY + distanceFromCenter * -Math.cos(j);

            var circle = bonsai.Path
                .circle(x, y, radius)
                .attr('fillColor', randomColor());
            circle.x = x;
            circle.y = y;
            stage.addChild(circle);
        }
    }

    var children = stage.children();
    var spread = 800;
    var dalpha = rpf * 2 * Math.PI;
    var sin_dalpha = Math.sin(dalpha), cos_dalpha = Math.cos(dalpha);
    stage.length(rotateF);
    stage.on(0, function() {
        console.log('123');
        for (var i = 0; i < children.length; i ++) {
            var newX = centerX + (children[i].x - centerX) * cos_dalpha - (children[i].y - centerY) * sin_dalpha;
            var newY = centerY + (children[i].x - centerX) * sin_dalpha + (children[i].y - centerY) * cos_dalpha;
            children[i].x = newX;
            children[i].y = newY;
            children[i].animate(rotateF, {
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
        count = colorMultiplier;
        for (var i = 0; i < children.length; i ++) {
            children[i].animate(rotateF * colorMultiplier, {
                fillColor: randomColor()
            }, {easing: 'linear', isTimelineBound: false});
        }
    });

    // TODO: crosshair instead
    var center = bonsai.Path
        .circle(centerX, centerY, 2)
        .attr({fillColor: 'white'});
    stage.addChild(center);
}
