const canvas = document.getElementById("dataCanvas");
const ctx = canvas.getContext("2d");

// Set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Adjust canvas size when the window is resized
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Line properties
const lines = [];
const numLines = 10; // Reduced the number of lines
const maxPoints = 50; // Reduced the number of points per line
const speed = 2; // Increased the speed for more visible movement

// Initialize lines with random starting positions
for (let i = 0; i < numLines; i++) {
  const points = [];
  for (let j = 0; j < maxPoints; j++) {
    points.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    });
  }
  lines.push(points);
}

// Animate the lines
function animateLines() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Draw each line
  for (const points of lines) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(130, 14, 93, 0.7)`; // Light blue lines
    ctx.lineWidth = 1.5;

    // Move the first point to start the line
    ctx.moveTo(points[0].x, points[0].y);

    // Draw line segments between points
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);

      // Move points slightly to simulate flowing motion
      points[i].x += Math.random() * speed - speed / 2;
      points[i].y += Math.random() * speed - speed / 2;

      // Wrap points around the canvas edges
      if (points[i].x > canvas.width) points[i].x = 0;
      if (points[i].x < 0) points[i].x = canvas.width;
      if (points[i].y > canvas.height) points[i].y = 0;
      if (points[i].y < 0) points[i].y = canvas.height;
    }

    ctx.stroke();
  }

  requestAnimationFrame(animateLines); // Continue animation
}

// Start animation
animateLines();
