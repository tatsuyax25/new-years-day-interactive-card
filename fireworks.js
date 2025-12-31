/* ============================================================
  FIREWORKS CANVAS SETUP
   ============================================================ */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

/* Utility: random number */
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

/* ============================================================
  PARTICLE CLASS (used for fireworks)
   ============================================================ */
class Particle {
  constructor(x, y, color, vx, vy, size = 2) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
    this.alpha = 1;
    this.size = size;
  }

  update() {
    this.vy += 0.02; // gravity
    this.alpha -= 0.01;
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

/* ============================================================
  FIREWORK LAUNCH FUNCTION
   ============================================================ */
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

/* ============================================================
  FIREWORKS ANIMATION LOOP
   ============================================================ */
function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.alpha <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animateFireworks);
}

animateFireworks();

/* ============================================================
  COUNTDOWN + BALL DROP + BILLBOARD REVEAL
   ============================================================ */
let count = 10;

function startCountdown() {
  const countdownEl = document.getElementById("countdown");

  const interval = setInterval(() => {
    countdownEl.textContent = count;

    // Fade animation for each number
    countdownEl.classList.add("fade");
    setTimeout(() => countdownEl.classList.remove("fade"), 300);

    if (count === 0) {
      clearInterval(interval);
      dropBall();
    }

    count--;
  }, 1000);
}

/* ============================================================
  BALL DROP ANIMATION
   ============================================================ */
function dropBall() {
  const ball = document.getElementById("ball");

  // Trigger CSS drop animation
  ball.classList.add("drop");

  // When the ball finishes dropping...
  ball.addEventListener("transitionend", () => {
    revealBillboard();
    startFireworksShow();
  });
}

/* ============================================================
  BILLBOARD REVEAL
   ============================================================ */
function revealBillboard() {
  const billboard = document.getElementById("billboard");
  billboard.style.opacity = 1;
}

/* ============================================================
  FIREWORKS SHOW SEQUENCE
   ============================================================ */
function startFireworksShow() {
  // Launch fireworks every 1.2 seconds
  setInterval(() => {
    launchFirework();
  }, 1200);
}

/* ============================================================
  START EVERYTHING
   ============================================================ */
startCountdown();
