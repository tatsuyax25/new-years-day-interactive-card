const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
let textParticles = [];
let showText = false;

// Utility: random number
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// Particle class
class Particle {
  constructor(x, y, color, vx, vy, size = 2, isText = false) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
    this.alpha = 1;
    this.size = size;
    this.isText = isText;
  }

  update() {
    if (!this.isText) {
      this.vy += 0.02; // gravity
      this.alpha -= 0.01;
    }
    this.x += this.vx;
    this.y += this.vy;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

// Launch a random firework
function launchFirework() {
  const x = rand(100, canvas.width - 100);
  const y = rand(100, canvas.height / 2);

  for (let i = 0; i < 60; i++) {
    const angle = (Math.PI * 2 * i) / 60;
    const speed = rand(2, 5);
    particles.push(
      new Particle(
        x,
        y,
        `hsl(${rand(0, 360)}, 100%, 60%)`,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed
      )
    );
  }
}

// Create text particles
function createTextParticles() {
  const textCanvas = document.getElementById("textCanvas");
  const tctx = textCanvas.getContext("2d");

  textCanvas.width = 800;
  textCanvas.height = 200;

  tctx.fillStyle = "white";
  tctx.font = "80px sans-serif";
  tctx.fillText("Happy New Year! 2026!", 20, 120);

  const imgData = tctx.getImageData(0, 0, textCanvas.width, textCanvas.height);

  for (let y = 0; y < imgData.height; y += 4) {
    for (let x = 0; x < imgData.width; x += 4) {
      const index = (y * imgData.width + x) * 4;
      if (imgData.data[index + 3] > 128) {
        textParticles.push(
          new Particle(
            canvas.width / 2,
            canvas.height / 2,
            "white",
            (x - textCanvas.width / 2) * 0.02,
            (y - textCanvas.height / 2) * 0.02,
            2,
            true
          )
        );
      }
    }
  }
}