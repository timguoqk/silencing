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
        circles = 20,
        distance = 180,
        fps = 30, rps = 1,
        radius = 15;

    var circle, random = Math.random;

    for (var i = 0; i < circles; ++i) {
        var f = i / circles,
            x = centerX + distance * Math.sin(f*2*Math.PI),
            y = centerY + distance * -Math.cos(f*2*Math.PI),

        circle = bonsai.Path
            .circle(x, y, radius)
            .attr({fillColor: randomColor()});
        circle.x = x;
        circle.y = y;
        stage.addChild(circle);
    }

    var children = stage.children();
    var spread = 800;
    var dalpha = rps * 2 * Math.PI / fps;
    var sin_dalpha = Math.sin(dalpha), cos_dalpha = Math.cos(dalpha);
    stage.length(fps);
    stage.on(0, function() {
        console.log('123');
        for (var i = 0; i < children.length; i ++) {
            var newX = centerX + (children[i].x - centerX) * cos_dalpha - (children[i].y - centerY) * sin_dalpha;
            var newY = centerY + (children[i].x - centerX) * sin_dalpha + (children[i].y - centerY) * cos_dalpha;
            children[i].x = newX;
            children[i].y = newY;
            children[i].animate(fps, {
                x: children[i].x,
                y: children[i].y,
                fillColor: randomColor()
            }, {easing: 'linear', isTimelineBound: false});
        }
    });

    var center = bonsai.Path
        .circle(centerX, centerY, 2)
        .attr({fillColor: 'white'});
    stage.addChild(center);
}