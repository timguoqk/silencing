$(function() {
    var movie = bonsai.run(document.getElementById('main-container'), {
        code: originalColor
    });
});

function originalColor() {
    importScripts(self.location.origin + "/randomColor.js");
    var centerX = 250,
        centerY = 250,
        circles = 140,
        distance = 180,
        frames = 14,
        radiusMin = 10,
        radiusVar = 10;

    var circle, random = Math.random;

    for (var i = 0; i < circles; ++i) {
        var f = i / circles,
            x = centerX + distance * Math.sin(f*2*Math.PI),
            y = centerY + distance * -Math.cos(f*2*Math.PI),
            radius = random() * radiusVar + radiusMin;

        circle = bonsai.Path
            .circle(x, y, radius)
            .attr({fillColor: randomColor()});
        circle.x = x;
        circle.y = y;
        stage.addChild(circle);
    }

    var c = stage.children();
    stage.length(frames);
    var spread = 80;
    stage.on(0, function() {
        for (var i = 0, circle; (circle = c[i++]); ) {

        circle.animate(frames, {
            x: circle.x + spread * random() - spread / 2,
            y: circle.y + spread * random() - spread / 2
        }, {easing: 'sineInOut'});
        }
    });
}