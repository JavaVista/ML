const draw = {};

draw.path = (ctx, path, color = '#0b0b0b') => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(...path[0]);
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(...path[i]);
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
};
