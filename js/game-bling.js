function startBling(){
  var canvas;
  var ctx;
  var dx = 5;
  var dy = 5;
  var x = 400;
  var y = 300;
  var xspeed = 0;
  var yspeed = 0;
  var ballr = 10;
  var bluex = 0;
  var bluey = 0;
  var bluew = 0;
  var blueh = 0;
  var bluesize = 50;
  var bluescore = 0;
  var WIDTH = 600;
  var HEIGHT = 400;
  var bling = new Audio('resources/bling.mp3');

  function getRandomInt(min, max) {
    //http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function circle(x,y,r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.fill();
  }

  function rect(x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function blueAssign(){
    var rand = getRandomInt(1,5);
    if (rand == 1){
      bluex = 0;
      bluey = getRandomInt(50,350);
      bluew = 5;
      blueh = bluesize;
    }
    else if (rand == 2){
      bluex = getRandomInt(50,750);
      bluey = 0;
      bluew = bluesize;
      blueh = 5;
    }
    else if (rand == 3){
      bluex = WIDTH-5;
      bluey = getRandomInt(50,350);
      bluew = 5;
      blueh = bluesize;
    }
    else if (rand == 4){
      bluex = getRandomInt(50,750);
      bluey = HEIGHT-5;
      bluew = bluesize;
      blueh = 5;
    }
  }

  function score(){
    bluescore += 1;
    $('#bling-score').html(bluescore);
    blueAssign();
    bling.play();
  }

  function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }
  function init() {
    canvas = document.getElementById("canvas-bling");
    ctx = canvas.getContext("2d");
    blueAssign();
    return setInterval(draw, 15);
  }

  function doKeyDown(evt){
    switch (evt.keyCode) {
      case 38:
        yspeed = -5;
        break;
      case 40:
        yspeed = 5;
        break;
      case 37:
        xspeed = -5;
        break;
      case 39:
        xspeed = 5;
        break;
    }
  }

  function update(){
    x += xspeed;
    y += yspeed;
    if (y - yspeed < 0){
      y = (2*ballr);
      yspeed = -yspeed;
      if (x < bluex + bluesize && x > bluex && bluey == 0){
        score();
      }
    }
    else if (y + yspeed > HEIGHT){
      y = HEIGHT-(2*ballr);
      yspeed = -yspeed;
      if (x < bluex + bluesize && x > bluex && bluey == HEIGHT-5){
        score();
      }
    }
    if (x - xspeed < 0){
      x = (2*ballr);
      xspeed = -xspeed;
      if (y < bluey + bluesize && y > bluey && bluex == 0){
        score();
      }
    }
    else if (x + xspeed > WIDTH){
      x = WIDTH-(2*ballr);
      xspeed = -xspeed;
      if (y < bluey + bluesize && y > bluey && bluex == WIDTH-5){
        score();
      }
    }
  }

  function draw() {
    clear();
    update(xspeed, yspeed);
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    rect(0,0,WIDTH,HEIGHT);
    ctx.fillStyle = "blue";
    rect(bluex,bluey,bluew, blueh);
    ctx.fillStyle = "purple";
    circle(x, y, ballr);
  }
  init();
  window.addEventListener('keydown',doKeyDown,true);
}
