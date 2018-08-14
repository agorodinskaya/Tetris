console.log("HELLO!");
const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");
ctx.scale(20, 20);
//drawing the canvas:

// drawing T, additional row on the top to define the center of rotation:
const matrix = [[0, 0, 0], [1, 1, 1], [0, 1, 0]];

const createMatrix = (w, h) => {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
};
//
const draw = () => {
  // clearing previous figure when moving it:
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(player.matrix, player.pos);
};

//draw the figure and define that it is moving by using offset:
const drawMatrix = (matrix, offset) => {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        ctx.fillStyle = "#7742f4";
        ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
};
const merge = (arena, player) => {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {});
  });
};
const playerDrop = () => {
  player.pos.y++;
  dropCounter = 0;
};

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
const update = (time = 0) => {
  // time since the page is open:
  const deltaTime = time - lastTime;
  lastTime = time;
  // console.log(deltaTime);
  dropCounter += deltaTime;
  //moving the figure every sec:
  if (dropCounter > dropInterval) {
    // see function on line 30:
    playerDrop();
  }
  // console.log(lastTime);
  draw();
  requestAnimationFrame(update);
};

const arena = createMatrix(12, 20);

const player = {
  pos: { x: 5, y: 5 },
  matrix: matrix
};

// Manual manipulation : right key; left key; down key:
document.addEventListener("keydown", event => {
  if (event.keyCode === 37) {
    player.pos.x--;
  } else if (event.keyCode === 39) {
    player.pos.x++;
  } else if (event.keyCode === 40) {
    // see function on line 30:
    playerDrop();
    // console.log(player.pos.y);
  }
});
update();
