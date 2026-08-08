const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const W = 1200, H = 630;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

// Background gradient
const grad = ctx.createLinearGradient(0, 0, W, H);
grad.addColorStop(0, '#ffe3ec');
grad.addColorStop(0.5, '#ffc2d4');
grad.addColorStop(1, '#ffe9f0');
ctx.fillStyle = grad;
ctx.fillRect(0, 0, W, H);

// Floating hearts (background decoration)
function drawHeart(cx, cy, size, color, alpha = 0.3) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  const s = size;
  ctx.moveTo(cx, cy + s * 0.3);
  ctx.bezierCurveTo(cx, cy - s * 0.1, cx - s * 0.5, cy - s * 0.4, cx - s * 0.5, cy - s * 0.1);
  ctx.bezierCurveTo(cx - s * 0.5, cy + s * 0.2, cx, cy + s * 0.5, cx, cy + s * 0.7);
  ctx.bezierCurveTo(cx, cy + s * 0.5, cx + s * 0.5, cy + s * 0.2, cx + s * 0.5, cy - s * 0.1);
  ctx.bezierCurveTo(cx + s * 0.5, cy - s * 0.4, cx, cy - s * 0.1, cx, cy + s * 0.3);
  ctx.fill();
  ctx.restore();
}

// Background hearts
const hearts = [
  [100, 100, 30, '#ff9e9e'], [200, 520, 25, '#ffb3c6'], [350, 80, 20, '#ff5e8a'],
  [500, 550, 35, '#ff9e9e'], [700, 60, 28, '#ffb3c6'], [850, 530, 22, '#ff5e8a'],
  [1000, 90, 32, '#ff9e9e'], [1100, 520, 18, '#ffb3c6'], [150, 350, 15, '#ffc2d4'],
  [1050, 300, 20, '#ffc2d4'], [300, 480, 18, '#ff9e9e'], [900, 150, 24, '#ffb3c6'],
];
hearts.forEach(([x, y, s, c]) => drawHeart(x, y, s, c, 0.25 + Math.random() * 0.2));

// Sparkles
function drawSparkle(cx, cy, size, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const outerX = cx + Math.cos(angle) * size;
    const outerY = cy + Math.sin(angle) * size;
    const innerAngle = angle + Math.PI / 4;
    const innerX = cx + Math.cos(innerAngle) * size * 0.35;
    const innerY = cy + Math.sin(innerAngle) * size * 0.35;
    if (i === 0) ctx.moveTo(outerX, outerY);
    else ctx.lineTo(outerX, outerY);
    ctx.lineTo(innerX, innerY);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
drawSparkle(180, 180, 14, '#ffd166');
drawSparkle(1020, 140, 11, '#ff9ff3');
drawSparkle(950, 480, 16, '#ffd166');
drawSparkle(250, 460, 10, '#ff9ff3');

// ===== BEAR =====
const bx = 600, by = 260; // center of bear

// Ears
ctx.fillStyle = '#c58f63';
ctx.beginPath(); ctx.arc(bx - 65, by - 68, 32, 0, Math.PI * 2); ctx.fill();
ctx.beginPath(); ctx.arc(bx + 65, by - 68, 32, 0, Math.PI * 2); ctx.fill();
ctx.fillStyle = '#f8dcb8';
ctx.beginPath(); ctx.arc(bx - 65, by - 68, 16, 0, Math.PI * 2); ctx.fill();
ctx.beginPath(); ctx.arc(bx + 65, by - 68, 16, 0, Math.PI * 2); ctx.fill();

// Bow
ctx.fillStyle = '#ff5e8a';
ctx.beginPath();
ctx.moveTo(bx, by - 95);
ctx.lineTo(bx - 22, by -115);
ctx.quadraticCurveTo(bx - 28, by - 90, bx, by - 95);
ctx.fill();
ctx.beginPath();
ctx.moveTo(bx, by - 95);
ctx.lineTo(bx + 22, by - 115);
ctx.quadraticCurveTo(bx + 28, by - 90, bx, by - 95);
ctx.fill();
ctx.fillStyle = '#ff2e63';
ctx.beginPath(); ctx.arc(bx, by - 95, 7, 0, Math.PI * 2); ctx.fill();

// Head
ctx.fillStyle = '#c58f63';
ctx.beginPath(); ctx.arc(bx, by, 82, 0, Math.PI * 2); ctx.fill();

// Muzzle
ctx.fillStyle = '#f8dcb8';
ctx.beginPath(); ctx.ellipse(bx, by + 28, 36, 28, 0, 0, Math.PI * 2); ctx.fill();

// Nose
ctx.fillStyle = '#4a3226';
ctx.beginPath(); ctx.ellipse(bx, by + 12, 11, 8, 0, 0, Math.PI * 2); ctx.fill();

// Blush
ctx.fillStyle = 'rgba(255, 158, 158, 0.7)';
ctx.beginPath(); ctx.ellipse(bx - 55, by + 14, 14, 9, 0, 0, Math.PI * 2); ctx.fill();
ctx.beginPath(); ctx.ellipse(bx + 55, by + 14, 14, 9, 0, 0, Math.PI * 2); ctx.fill();

// Eyes (happy ^ ^)
ctx.strokeStyle = '#4a3226';
ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.beginPath(); ctx.arc(bx - 28, by - 8, 14, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke();
ctx.beginPath(); ctx.arc(bx + 28, by - 8, 14, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke();

// Big smile
ctx.fillStyle = '#a04040';
ctx.beginPath();
ctx.moveTo(bx - 22, by + 28);
ctx.quadraticCurveTo(bx, by + 60, bx + 22, by + 28);
ctx.closePath();
ctx.fill();
ctx.fillStyle = '#ff8a8a';
ctx.beginPath(); ctx.ellipse(bx, by + 40, 9, 5, 0, 0, Math.PI * 2); ctx.fill();

// Heart the bear is holding
function drawBigHeart(cx, cy, size, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy + size * 0.3);
  ctx.bezierCurveTo(cx, cy - size * 0.1, cx - size * 0.5, cy - size * 0.4, cx - size * 0.5, cy - size * 0.1);
  ctx.bezierCurveTo(cx - size * 0.5, cy + size * 0.2, cx, cy + size * 0.5, cx, cy + size * 0.7);
  ctx.bezierCurveTo(cx, cy + size * 0.5, cx + size * 0.5, cy + size * 0.2, cx + size * 0.5, cy - size * 0.1);
  ctx.bezierCurveTo(cx + size * 0.5, cy - size * 0.4, cx, cy - size * 0.1, cx, cy + size * 0.3);
  ctx.fill();
}
drawBigHeart(bx, by + 115, 50, '#ff2e63');
drawBigHeart(bx, by + 115, 38, '#ff5e8a');

// Paws
ctx.fillStyle = '#d9a87c';
ctx.beginPath(); ctx.arc(bx - 48, by + 100, 18, 0, Math.PI * 2); ctx.fill();
ctx.beginPath(); ctx.arc(bx + 48, by + 100, 18, 0, Math.PI * 2); ctx.fill();
ctx.fillStyle = '#f8dcb8';
ctx.beginPath(); ctx.ellipse(bx - 48, by + 100, 7, 6, 0, 0, Math.PI * 2); ctx.fill();
ctx.beginPath(); ctx.ellipse(bx + 48, by + 100, 7, 6, 0, 0, Math.PI * 2); ctx.fill();

// ===== TEXT =====
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

// Main title with shadow
ctx.fillStyle = 'rgba(0,0,0,0.08)';
ctx.font = 'bold 56px "Segoe UI", "Baloo 2", system-ui, sans-serif';
ctx.fillText('Mau Ngedate Nggak?', bx + 2, 520 + 2);

ctx.fillStyle = '#4a3226';
ctx.font = 'bold 56px "Segoe UI", "Baloo 2", system-ui, sans-serif';
ctx.fillText('Mau Ngedate Nggak?', bx, 520);

// Subtitle
ctx.fillStyle = '#ff5e8a';
ctx.font = '32px "Segoe UI", "Baloo 2", system-ui, sans-serif';
ctx.fillText('🐻💖 Klik Yes dan atur kencannya!', bx, 572);

// Save
const outPath = path.join(__dirname, 'og-image.png');
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(outPath, buffer);
console.log('OG image saved:', outPath, `(${buffer.length} bytes)`);
