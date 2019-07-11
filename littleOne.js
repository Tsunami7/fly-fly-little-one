// alert('test');
const imageCanvas = document.getElementById('canvas');
// this will select the canvas
// now we can need to access the canvas
// so we use getContext from MDN
const ctx = imageCanvas.getContext('2d');

// now we have to load the images
// so i set imagesNames to be a constructor
//
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
const gravity = 1;
//
//
function moveUp() {
  littleOneY -= 80;
}
//

document.addEventListener('keydown', moveUp);
//
function draw() {
  // draw the images
  // gapAndTopPipe keep it inside the draw function,
  // else it will not know what are you talking about,
  // and just give you nightmares; evil juju nightmares
  const gapAndTopPipe = topPipe.height + gap;
  //
  //
  ctx.drawImage(backgroundImage, 0, 0);
  //
  ctx.drawImage(topPipe, 100, 0);
  ctx.drawImage(botPipe, 100, 0 + gapAndTopPipe);

  ctx.drawImage(floor, 0, imageCanvas.height - floor.height);

  // drawing the little one
  ctx.drawImage(littleOne, 100, littleOneY);
  //
  littleOneY += gravity;
  //

  // requestAnimationFrame is needed to draw the images
  window.requestAnimationFrame(draw);
}
draw();
