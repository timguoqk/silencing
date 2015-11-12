function bonsaiMovie(data) {
    importScripts(self.location.origin + "/randomColor.js");
    stage.setBackgroundColor("#8B8B8B");

    var random = Math.random;

    for (var i = 1; i <= data.numRing; i ++) {
        var distanceFromCenter = data.distanceBetweenRing * i;
        var numCircle = Math.floor((2 * Math.PI * distanceFromCenter) / (data.radius * 2 + data.circlePadding * 2));
        var radDiff =  2 * Math.PI / numCircle;
        for (var j = 0; j < 2 * Math.PI; j += radDiff) {
            var x = data.centerX + distanceFromCenter * Math.sin(j),
                y = data.centerY + distanceFromCenter * -Math.cos(j);

            var circle = bonsai.Path
                .circle(x, y, data.radius)
                .attr('fillColor', randomColor());
            circle.x = x;
            circle.y = y;
            stage.addChild(circle);
        }
    }

    var children = stage.children();
    var dalpha = data.rpf * 2 * Math.PI;
    var sin_dalpha = Math.sin(dalpha), cos_dalpha = Math.cos(dalpha);
    stage.length(data.rotateF);
    stage.on(0, function() {
        console.log('123');
        for (var i = 0; i < children.length; i ++) {
            var newX = data.centerX + (children[i].x - data.centerX) * cos_dalpha - (children[i].y - data.centerY) * sin_dalpha;
            var newY = data.centerY + (children[i].x - data.centerX) * sin_dalpha + (children[i].y - data.centerY) * cos_dalpha;
            children[i].x = newX;
            children[i].y = newY;
            children[i].animate(data.rotateF, {
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
            children[i].animate(data.rotateF * data.colorMultiplier, {
                fillColor: randomColor()
            }, {easing: 'linear', isTimelineBound: false});
        }
    });

    // TODO: crosshair instead
    var center = bonsai.Path
        .circle(data.centerX, data.centerY, 2)
        .attr({fillColor: 'white'});
    stage.addChild(center);
}
