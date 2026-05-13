const canvas = document.getElementById('symbols');
const ctx = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

const symbols = ['π','√','∞','∑','∆','≠','≈','∫','∂'];
const particles = [];

for(let i = 0; i < 30; i++){
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        dx: (Math.random() - 0.5) * 0.6,
        dy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 30 + 18,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        opacity: Math.random() * 0.3 + 0.1
    });
}

function animate(){
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
        ctx.font = `${p.size}px Segoe UI`;
        ctx.fillStyle = `rgba(0,0,0,${p.opacity})`;
        ctx.fillText(p.symbol, p.x, p.y);

        p.x += p.dx;
        p.y += p.dy;

        if(p.x < 0 || p.x > width) p.dx *= -1;
        if(p.y < 0 || p.y > height) p.dy *= -1;
    });

    requestAnimationFrame(animate);
}

animate();
