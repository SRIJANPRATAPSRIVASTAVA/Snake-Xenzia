let Reset = document.getElementById("reset");
let score = document.getElementById("score");
console.log(Reset);

const foodSound = new Audio("./gulp_.mp3");
const collapseSound = new Audio("./collapse.mp3");

let up = document.getElementById("top");
let down = document.getElementById("bottom");
let left = document.getElementById("left");
let right = document.getElementById("right");

console.log(up, down, left, right);

function StartGame() {
  const cvs = document.getElementById("canvas");
  const ctx = cvs.getContext("2d");

  let Score = 0;

  let W = canvas.width;
  let H = canvas.height;

  let vel = 8;
  let VelX = 0;
  let VelY = 0;

  let tileCount = 20; // number of reactangle for dividing canvas in grids
  let tileSize = W / tileCount - 2;
  let headX = 10;
  let headY = 10;

  let foodX = 5;
  let foodY = 5;

  // Snake body
  class body {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  let bodyparts = [];
  let tailLength = 2;

  function RunGame() {
    changeDirection();
    if (chkGameOver()) {
      return;
    }
    clearScreen();
    checkCollison();
    drawFood();
    drawSnake();
    setTimeout(RunGame, 1000 / vel); // vel increases , 1000/vel decreases means less refresh time, fast refresh rate
  }

  function clearScreen() {
    ctx.fillStyle = "#202c33";
    ctx.fillRect(0, 0, W, H);
  }

  function drawSnake() {
    ctx.fillStyle = "green";
    for (let i = 0; i < bodyparts.length; i++) {
      // console.log(bodyparts.length);
      ctx.fillRect(
        bodyparts[i].x * tileCount,
        bodyparts[i].y * tileCount,
        tileSize,
        tileSize
      );
    }
    bodyparts.push(new body(headX, headY));
    if (bodyparts.length > tailLength) {
      bodyparts.shift();
    }
    ctx.fillStyle = "Orange";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
    // ctx.fillStyle = "white";
    // ctx.fillRect(headX * tileCount, headY * tileCount, 5, 5);
  }

  function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
    // ctx.fillStyle = "white";
    // ctx.fillRect(foodX * tileCount, foodY * tileCount, 5, 5);
  }

  function changeDirection() {
    // console.log('1');
    headX = headX + VelX;
    headY = headY + VelY;
  }

  function checkCollison() {
    if (foodX === headX && foodY === headY) {
      foodX = Math.floor(Math.random() * tileCount);
      foodY = Math.floor(Math.random() * tileCount);

      // while (1) {
      //   foodX = Math.floor(Math.random() * tileCount);
      //   foodY = Math.floor(Math.random() * tileCount);
      //   flag = 0;
      //   for (let i = 0; i < bodyparts.length; i++) {
      //     if ((bodyparts[i].x == foodX, (bodyparts[i].y = foodY))) {
      //        flag = 1;
      //     }
      //   }
      //   if(flag==0)
      //   {
      //     break;
      //   }
      // }

      console.log(foodX * tileCount, foodY * tileCount);
      Score++;
      score.innerHTML = Score;
      tailLength++;
      foodSound.play();
    }
  }

  addEventListener("keydown", (e) => {
    if (e.code == "ArrowUp" && VelY != 1) {
      VelY = -1;
      VelX = 0;
    } else if (e.code == "ArrowDown" && VelY != -1) {
      VelY = 1;
      VelX = 0;
    } else if (e.code == "ArrowLeft" && VelX != 1) {
      VelY = 0;
      VelX = -1;
    } else if (e.code == "ArrowRight" && VelX != -1) {
      VelY = 0;
      VelX = 1;
    }
  });

  up.addEventListener("click", (e) => {
    if (VelY != 1) {
      VelY = -1;
      VelX = 0;
    }
  });
  down.addEventListener("click", (e) => {
    if (VelY != -1) {
      VelY = 1;
      VelX = 0;
    }
  });
  left.addEventListener("click", (e) => {
    if (VelX != 1) {
      VelY = 0;
      VelX = -1;
    }
  });
  right.addEventListener("click", (e) => {
    if (VelX != -1) {
      VelY = 0;
      VelX = 1;
    }
  });

  function chkGameOver() {
    let GameOver = false;

    if (VelY == 0 && VelX == 0) return false;

    if (headX < 0) GameOver = true;
    else if (headX >= tileCount) GameOver = true;
    else if (headY < 0) GameOver = true;
    else if (headY >= tileCount) GameOver = true;

    for (let i = 0; i < bodyparts.length; i++) {
      if (bodyparts[i].x === headX && bodyparts[i].y === headY) {
        GameOver = true;
        break;
      }
    }

    if (GameOver) {
      ctx.fillStyle = "white";
      ctx.font = "50px MonoSpace";
      ctx.fillText("GAME OVER!", W / 7, H / 2);
    }
    if (GameOver) collapseSound.play();

    return GameOver;
  }
  RunGame();
}

StartGame();

function ResetGame() {
  score.innerHTML = 0;
  StartGame();
}

Reset.addEventListener("click", ResetGame);
