// Test script to verify Catmull-Rom spline, arc-length parameterization, and SVG path generation

function catmullRom(p0, p1, p2, p3, t) {
  const t2 = t * t;
  const t3 = t2 * t;
  const x = 0.5 * (
    (2 * p1.x) +
    (-p0.x + p2.x) * t +
    (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
    (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
  );
  const y = 0.5 * (
    (2 * p1.y) +
    (-p0.y + p2.y) * t +
    (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
    (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
  );
  const dx = 0.5 * (
    (-p0.x + p2.x) +
    2 * (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t +
    3 * (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t2
  );
  const dy = 0.5 * (
    (-p0.y + p2.y) +
    2 * (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t +
    3 * (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t2
  );
  return { x, y, dx, dy };
}

const controlPoints = [
  { x: -350, y: 440 }, // P0 handle
  { x: -180, y: 370 }, // P1 enter
  { x: 100, y: 240 },  // P2 rise
  { x: 380, y: 85 },   // P3 crest 1
  { x: 630, y: 175 },  // P4 descend
  { x: 850, y: 280 },  // P5 central valley
  { x: 1070, y: 205 }, // P6 rise
  { x: 1280, y: 85 },  // P7 crest 2
  { x: 1520, y: 230 }, // P8 descend
  { x: 1780, y: 360 }, // P9 exit
  { x: 1950, y: 440 }, // P10 handle
];

// Sample spline
const samples = [];
for (let i = 1; i < controlPoints.length - 2; i++) {
  const p0 = controlPoints[i - 1];
  const p1 = controlPoints[i];
  const p2 = controlPoints[i + 1];
  const p3 = controlPoints[i + 2];
  const steps = 120;
  for (let s = 0; s < steps; s++) {
    const t = s / steps;
    const pt = catmullRom(p0, p1, p2, p3, t);
    const len = Math.hypot(pt.dx, pt.dy) || 1;
    samples.push({
      x: pt.x,
      y: pt.y,
      tx: pt.dx / len,
      ty: pt.dy / len,
      nx: -pt.dy / len,
      ny: pt.dx / len,
    });
  }
}

// Compute cumulative arc length
let totalLen = 0;
samples[0].arcLen = 0;
for (let i = 1; i < samples.length; i++) {
  const d = Math.hypot(samples[i].x - samples[i - 1].x, samples[i].y - samples[i - 1].y);
  totalLen += d;
  samples[i].arcLen = totalLen;
}

console.log("Total samples:", samples.length);
console.log("Total arc length:", totalLen.toFixed(1));
console.log("Start pt:", samples[0].x.toFixed(1), samples[0].y.toFixed(1));
console.log("End pt:", samples[samples.length - 1].x.toFixed(1), samples[samples.length - 1].y.toFixed(1));
