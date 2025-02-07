const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const maxParticles = 50; // Adjust number of nodes

// Random color generator for node glow
function getRandomColor() {
    const colors = ["#00FFFF", "#00FF00", "#FF00FF", "#FFA500", "#FF4500"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Particle (Node) Class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1; // Random size
        this.dx = Math.random() * 2 - 1; // Random movement
        this.dy = Math.random() * 2 - 1;
        this.color = getRandomColor();
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = Math.random() * 30; // Dynamic glow intensity
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.dx * (Math.random() * 1.5); // Randomized movement speed
        this.y += this.dy * (Math.random() * 1.5);

        if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.dy *= -1;
    }
}

// Initialize Particles (Nodes)
function init() {
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }
}

// Draw Lines Between Nodes (Dynamic)
function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.strokeStyle = "rgba(0, 255, 255, 0.3)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    drawLines();
    requestAnimationFrame(animate);
}

// Resize Canvas Dynamically
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Hover Effect to Add More Nodes Randomly
canvas.addEventListener("mouseenter", () => {
    particles.push(new Particle(), new Particle(), new Particle());
});

canvas.addEventListener("mouseleave", () => {
    if (particles.length > maxParticles) {
        particles.splice(0, 3);
    }
});

// Initialize & Start Animation
init();
animate();
