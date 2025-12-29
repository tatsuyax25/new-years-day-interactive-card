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