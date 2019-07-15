
const canvas = document.querySelector('canvas');
canvas.width = 288;
canvas.height = 512;
const ctx = canvas.getContext('2d');
const littleOne = new Image();
littleOne.src = 'images/bird.png';
const backgroundImage = new Image();
backgroundImage.src = 'images/bg.png';
const topPipe = new Image();
topPipe.src = 'images/pipeNorth.png';
const botPipe = new Image();
botPipe.src = 'images/pipeSouth.png';
const floor = new Image();
floor.src = 'images/fg.png';
const song = new Audio();
song.src = 'sounds/attack_on_titan.mp3';

function flyUp() {
  littleOneY -= 30;
}
document.addEventListener('click', flyUp);
document.addEventListener('keydown', (evt) => {
  const keycode = evt.keyCode;
  if (keycode == 32) {
    flyUp();
  }
});
const pipes = [{ x: canvas.width, y: 0 }];
function pipeLoop() {
  const pipeGap = 90;
  const gapAndTopPipe = topPipe.height + pipeGap;

  for (let i = 0; i < pipes.length; i += 1) {
    ctx.drawImage(topPipe, pipes[i].x, pipes[i].y);
    ctx.drawImage(botPipe, pipes[i].x, pipes[i].y + gapAndTopPipe);
    pipes[i].x -= 2;
    if (pipes[i].x == 70) {
      pipes.push({ x: canvas.width, y: Math.floor(Math.random() * topPipe.height) - topPipe.height });
    }
    if ((littleOneY + littleOne.height >= canvas.height - floor.height) || (littleOneX + littleOne.width >= pipes[i].x && littleOneX <= pipes[i].x + topPipe.width) && (littleOneY <= pipes[i].y + topPipe.height || littleOneY + littleOne.height >= pipes[i].y + gapAndTopPipe)) {
      gameOver();
    }
    if (pipes[i].x == 110) {
      scoreCounter++;
    }
  }
}

let scoreCounter = 0;
function score() {
  ctx.fillstyle = '#000';
  ctx.font = '20px Arial';
  ctx.fillText(`score: ${scoreCounter}`, 10, 20);
  ctx.fillstyle = '#fff';
}
function gameOver() {
  song.volume = 0
  if (window.confirm(`Game Over\n Your Score\n ${scoreCounter}`)) {
    location.reload();
  }
  window.location.href = 'index.html';
}

let littleOneY = 200;
let littleOneX = 130;

function draw() {
  littleOneY += 2;
  song.play();
  song.volume = .2;
  ctx.drawImage(backgroundImage, 0, 0);
  ctx.drawImage(littleOne, littleOneX, littleOneY);
  pipeLoop();
  ctx.drawImage(floor, 0, canvas.height - floor.height);
  score();
  window.requestAnimationFrame(draw);
}
draw();
