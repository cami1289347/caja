// script.js
const box = document.getElementById('box1');
const modal = document.getElementById('modal');
const surpriseImg = document.getElementById('surpriseImg');
const modalTop = document.getElementById('modalTop');
const closeBtn = document.getElementById('closeBtn');
const confettiCanvas = document.getElementById('confetti');

box.addEventListener('click', () => {
  modal.style.display = 'flex';
  modalTop.style.transform = 'rotateX(90deg) translateZ(60px)';

  // Mostrar imagen con retardo
  setTimeout(() => {
    surpriseImg.style.opacity = '1';
    launchConfetti();
  }, 1000);
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  surpriseImg.style.opacity = '0';
  modalTop.style.transform = 'rotateX(90deg) translateZ(60px)';
  clearCanvas();
});

// Confeti
const ctx = confettiCanvas.getContext('2d');
confettiCanvas.width = 300;
confettiCanvas.height = 300;
let confetti = [];

function launchConfetti() {
  confetti = Array.from({ length: 100 }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * -confettiCanvas.height,
    size: Math.random() * 5 + 2,
    color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    speed: Math.random() * 3 + 2,
    drift: Math.random() * 2 - 1
  }));
  requestAnimationFrame(drawConfetti);
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    p.y += p.speed;
    p.x += p.drift;
    if (p.y < confettiCanvas.height) requestAnimationFrame(drawConfetti);
  });
}

function clearCanvas() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti = [];
}
