const canvas = document.getElementById("symbols");
const ctx = canvas.getContext("2d");
const symbols = ["π", "√", "∞", "∑", "∆", "≠", "≈", "∫", "∂"];
const particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles.length = 0;
  for (let i = 0; i < 30; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 0.6,
      dy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 30 + 18,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      opacity: Math.random() * 0.3 + 0.1,
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    ctx.font = `${particle.size}px Segoe UI`;
    ctx.fillStyle = `rgba(0,0,0,${particle.opacity})`;
    ctx.fillText(particle.symbol, particle.x, particle.y);

    particle.x += particle.dx;
    particle.y += particle.dy;

    if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
    if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;
  });

  requestAnimationFrame(animate);
}

resizeCanvas();
createParticles();
window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});
animate();
