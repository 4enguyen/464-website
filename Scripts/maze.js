const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
let lastKey = '';
let cat = {
  x: 60,
  y: 60,
  size: 30
};
let catImg = new Image();
catImg.src = 'Images/logo.png';
const mazeBounds = {
  minX: 40,
  minY: 40,
  maxX: 360, 
  maxY: 360 
};
const walls = [
  { x: 80, y: 40, width: 10, height: 100 },
  { x: 40, y: 180, width: 100, height: 10 },
  { x: 130, y: 80, width: 10, height: 100 },
  { x: 130, y: 80, width: 100, height: 10 },
  { x: 220, y: 90, width: 10, height: 100 },
  { x: 270, y: 90, width: 10, height: 100 },
  { x: 270, y: 80, width: 90, height: 10 },
  { x: 310, y: 90, width: 10, height: 100 },
  { x: 270, y: 180, width: 40, height: 10 },
  { x: 180, y: 180, width: 40, height: 10 },
  { x: 180, y: 130, width: 10, height: 50 },  
  { x: 180, y: 130, width: 40, height: 10 },
  { x: 80, y: 230, width: 280, height: 10 },
  { x: 80, y: 240, width: 10, height: 80 },
  { x: 80, y: 310, width: 40, height: 10 },
  { x: 110, y: 240, width: 10, height: 80 },
  { x: 160, y: 280, width: 10, height: 80 },
  { x: 210, y: 240, width: 10, height: 80 },
  { x: 260, y: 280, width: 10, height: 80 },
  { x: 260, y: 280, width: 50, height: 10 },
  { x: 310, y: 280, width: 10, height: 80 },
];

function drawCat() {
  ctx.drawImage(catImg, cat.x - cat.size / 2, cat.y - cat.size / 2, cat.size, cat.size);
}

// Creates maze
function drawMaze() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#4e342e";
  ctx.fillRect(0, 0, 400, 400);

  ctx.fillStyle = "#fffded";
  ctx.fillRect(40, 40, 320, 320);

  ctx.fillStyle = "black";
  walls.forEach(wall => {
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
  });

  const squareSize = 10;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      ctx.fillStyle = (i + j) % 2 === 0 ? "grey" : "black";
      ctx.fillRect(40 + i * squareSize, 40 + j * squareSize, squareSize, squareSize); // Start
      ctx.fillRect(360 - 40 + i * squareSize, 360 - 40 + j * squareSize, squareSize, squareSize); // End
    }
  }
}

// Movement function
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let newX = cat.x;
  let newY = cat.y;
  const speed = 2;

  switch(lastKey) {
      case "ArrowRight":
          if (!isColliding(newX + speed, newY, cat.size)) {
              newX += speed;
          }
          break;
      case "ArrowLeft":
          if (!isColliding(newX - speed, newY, cat.size)) {
              newX -= speed;
          }
          break;
      case "ArrowUp":
          if (!isColliding(newX, newY - speed, cat.size)) {
              newY -= speed;
          }
          break;
      case "ArrowDown":
          if (!isColliding(newX, newY + speed, cat.size)) {
              newY += speed;
          }
          break;
  }

  // Update position if no collision
  cat.x = newX;
  cat.y = newY;

  drawMaze();
  drawCat();

  requestAnimationFrame(gameLoop);
}

// Checks collision
function isColliding(x, y, size) {
  // Check if the movement is outside the maze boundaries
  if (x - size / 2 < mazeBounds.minX || x + size / 2 > mazeBounds.maxX ||
      y - size / 2 < mazeBounds.minY || y + size / 2 > mazeBounds.maxY) {
    return true;
  }

  return walls.some(wall => {
    return (x + size / 2 > wall.x && x - size / 2 < wall.x + wall.width) &&
           (y + size / 2 > wall.y && y - size / 2 < wall.y + wall.height);
  });
}


document.addEventListener('keydown', function(keyPressed) {
    lastKey = keyPressed.key;
});

document.addEventListener('keyup', function(keyPressed) {
    if (keyPressed.key === lastKey) lastKey = '';
});

requestAnimationFrame(gameLoop);
