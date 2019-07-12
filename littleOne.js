/* eslint-disable */
// alert('test');
const imageCanvas = document.getElementById('canvas');
// this will select the canvas
// now we can need to access the canvas
// so we use getContext from MDN
const ctx = imageCanvas.getContext('2d');
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
//
// to set up the gap between the pipes
const gap = 75;
// setting the y axis value
let littleOneY = 150;
//
//
//-55 will help it climb 55 px up need to fix it to lower number possibly
function moveUp() {
  littleOneY -= 40;
}
document.addEventListener('keydown', function (evt) {
  const keycode = evt.keyCode
  if (keycode == 32) {
    moveUp();
  }
});
//constraint to spacebar 32
//
// test variable from flappy bird code link https://code.sololearn.com/W1O96yrdL6aU/#html
const pipe = [{ x: imageCanvas.width, y: 0 }]
//
//
function pipeLoop() {
  const gapAndTopPipe = topPipe.height + gap;
  for (let i = 0; i < pipe.length; i += 1) {
    ctx.drawImage(topPipe, pipe[i].x, pipe[i].y);
    ctx.drawImage(botPipe, pipe[i].x, pipe[i].y + gapAndTopPipe);
    pipe[i].x -= 1;
  }
}

// function genPipe(){
//   for(let i = 0; i < pipe.length; i += 1){  
//      newPipe.push(Math.floor(Math.random()*pipe[i].y))
//   }
// }

function draw() {
  const gravity = 1;
  // draw the images
  // gapAndTopPipe keep it inside the draw function,
  // else it will not know what are you talking about,
  // and just give you nightmares; evil juju nightmares
  ctx.drawImage(backgroundImage, 0, 0);
  pipeLoop();

  ctx.drawImage(floor, 0, imageCanvas.height - floor.height);
  // drawing the little one
  ctx.drawImage(littleOne, 100, littleOneY);
  // checkCollision();
  //
  littleOneY += gravity;
  // requestAnimationFrame is needed to draw the images when using canvas else it will not work
  window.requestAnimationFrame(draw);
}

draw();
