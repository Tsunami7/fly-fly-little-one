/* eslint-disable */

// alert('test');
const canvas = document.querySelector('canvas');
canvas.width = 288;
canvas.height = 512;
// this will select the canvas
// now we can need to access the canvas
// so we use getContext from MDN ctx is context https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
const ctx = canvas.getContext('2d');
// now we have to load the images
// so i set imagesNames to be a constructor
// now im gonna call the images from my folder location
// .src will invoque the image location
// first we call the bird
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
// audio
const song = new Audio();
song.src = 'sounds/attack_on_titan.mp3';

// -55 will help it climb 55 px up need to fix it to lower number possibly
// num has been abjusted down to 40
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
// constraint to spacebar 32
//
// test variable from flappy bird code link https://code.sololearn.com/W1O96yrdL6aU/#html
const pipes = [{ x: canvas.width, y: 0 }];
//
function pipeLoop() {
  const pipeGap = 90;
  const gapAndTopPipe = topPipe.height + pipeGap;

  for (let i = 0; i < pipes.length; i += 1) {
    // this will populate the pipes in the y axis
    ctx.drawImage(topPipe, pipes[i].x, pipes[i].y);
    ctx.drawImage(botPipe, pipes[i].x, pipes[i].y + gapAndTopPipe);
    // this will make the pipes move from right to left simple pipe.x iteration at speed of 2
    pipes[i].x -= 2;
    // will randomize the pipes y position will only work
    // 70 will be the space between pipes when they are generated in x axis
    if (pipes[i].x == 70) {
      pipes.push({ x: canvas.width, y: Math.floor(Math.random() * topPipe.height) - topPipe.height });
    }
    // collision floor collision and pipes collision
    if ((littleOneY + littleOne.height >= canvas.height - floor.height) || (littleOneX + littleOne.width >= pipes[i].x && littleOneX <= pipes[i].x + topPipe.width) && (littleOneY <= pipes[i].y + topPipe.height || littleOneY + littleOne.height >= pipes[i].y + gapAndTopPipe)) {
      // console.log('beep')
      // location.reload();
      gameOver();
    }
    // will keep score going after every iteration if pipes are clear at 120p x axis.
    if (pipes[i].x == 110) {
      scoreCounter++;
    }
  }
}

let scoreCounter = 0;
function score() {
  // fillstyle will set color of font and filltext allows me to print it in the screen
  // this one is set on top of the of canvas
  ctx.fillstyle = '#000';
  ctx.font = '20px Arial';
  ctx.fillText(`score: ${scoreCounter}`, 10, 20);
  ctx.fillstyle = '#fff';
  // fillrect goes as follows x, y, w, h
  // ctx.fi llRect = (10, 20, 30, 15)
}
// game over
function gameOver() {
  song.volume = 0
  if (window.confirm(`                               **-- Game Over --**\n                       In Loving Memory of Darksouls\n                              Indeed this was cancer!\n\n                                    Your Score: ${scoreCounter}\n\nhit 'OK' to play again if not hit 'Cancel' to go back to main screen`)) {
    location.reload();
  }
  window.location.href = 'index.html';
}

let littleOneY = 200;
let littleOneX = 130;

function draw() {
  // gravity
  littleOneY += 2;
  song.play();
  song.volume = .2;
  // draw the images
  // gapAndTopPipe keep it inside the draw function,
  ctx.drawImage(backgroundImage, 0, 0);
  // drawing the little one in x position and y position
  ctx.drawImage(littleOne, littleOneX, littleOneY);
  pipeLoop();
  ctx.drawImage(floor, 0, canvas.height - floor.height);
  //
  score();
  // requestAnimationFrame is needed to draw the images when using canvas else it will not work
  // used this to make it work https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations and use the planets example to know why canvas wasnt working
  window.requestAnimationFrame(draw);
}

draw();
