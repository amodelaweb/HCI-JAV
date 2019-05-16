(function () {
    bladeColor = "#5c95f2";
    bladeWidth = 10;
    let buildBlade = function (width) {
        let i = bladeSystem.getParticles().length;
        let lineWidth = width;
        let step = width / (i - 1);
        topContext.beginPath();
        while (i-- > 1) {
            if (i == 1)
                topContext.lineWidth = 1;
            else
                topContext.lineWidth = lineWidth;
            let p = bladeSystem.getParticles()[i];
            let next = bladeSystem.getParticles()[i - 1];
            topContext.moveTo(p.position.x, p.position.y);
            topContext.lineTo(next.position.x, next.position.y);
            topContext.stroke();
            lineWidth -= step;
            if (lineWidth <= 0)
                lineWidth = 1;
        }
    };
    buildColorBlade = function (color, width) {
        topContext.strokeStyle = color;
        buildBlade(width);

        topContext.strokeStyle = "#ffffff";
        buildBlade(width * 0.6);
    };
    buildBladeParticle = function (x, y) {
        let p = bladeSystem.createParticle(SPP.Particle);
        p.init(x, y, 0.2);
    };


}());