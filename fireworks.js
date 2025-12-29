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