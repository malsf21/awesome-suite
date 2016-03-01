//took this https://robots.thoughtbot.com/pong-clone-in-javascript and added on it

var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
  window.setTimeout(callback, 1000 / 60);
};

var canvas = $("#canvas-pong")[0];
var width = 400;
var height = 400;
var context = canvas.getContext('2d');
var player = new Player();
var computer = new Computer();
var ball = new Ball(200, 300);
var playerScore = 0;
var computerScore = 0;
var reset = false;
var pause = true;
var scored = false;

var keysDown = {};

var render = function () {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);
    player.render();
    computer.render();
    ball.render();
};

var update = function () {
    player.update();
    computer.update(ball);
    ball.update(player.paddle, computer.paddle);
};

var stats = function (){
  $('#playerScore').html(playerScore);
  $('#computerScore').html(computerScore);
};

var step = function () {
    update();
    render();
    animate(step);
};

function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
}

Paddle.prototype.render = function () {
    context.fillStyle = "#FFFFFF";
    context.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.move = function (x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if (this.x < 0) {
        this.x = 0;
        this.x_speed = 0;
    } else if (this.x + this.width > 400) {
        this.x = 400 - this.width;
        this.x_speed = 0;
    }
};

Paddle.prototype.resetX = function (){
  this.x = 175;
  this.x_speed = 0;
};

function Computer() {
    this.paddle = new Paddle(175, 10, 50, 10);
}

Computer.prototype.render = function () {
    this.paddle.render();
};

Computer.prototype.update = function (ball) {
    var x_pos = ball.x;
    var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
    if (diff < 0 && diff < -4) {
        diff = -5;
    } else if (diff > 0 && diff > 4) {
        diff = 5;
    }
    this.paddle.move(diff, 0);
    if (this.paddle.x < 0) {
        this.paddle.x = 0;
    } else if (this.paddle.x + this.paddle.width > 400) {
        this.paddle.x = 400 - this.paddle.width;
    }
};

function Player() {
    this.paddle = new Paddle(175, 380, 50, 10);
}

Player.prototype.render = function () {
    this.paddle.render();
};

Player.prototype.update = function () {
    for (var key in keysDown) {
        var value = Number(key);
        if (value == 32){
          pause = false;
        } else if (value == 82) {
           playerScore = 0;
           computerScore = 0;
           reset = true;
           stats();
        }
        else if (pause === false){
          if (value == 37) {
              this.paddle.move(-4, 0);
          } else if (value == 39) {
              this.paddle.move(4, 0);
          }
        } else {
          this.paddle.move(0, 0);
        }
    }
    if (reset === true){
      this.paddle.resetX();
    }
    else if (scored === true){
      this.paddle.resetX();
      scored = false;
    }
};

function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 3;
}

Ball.prototype.render = function () {
    context.beginPath();
    context.arc(this.x, this.y, 5, 2 * Math.PI, false);
    context.fillStyle = "#FFFFFF";
    context.fill();
};

Ball.prototype.update = function (paddle1, paddle2) {
    if (pause === true){

    }
    else{
      this.x += this.x_speed;
      this.y += this.y_speed;
      var top_x = this.x - 5;
      var top_y = this.y - 5;
      var bottom_x = this.x + 5;
      var bottom_y = this.y + 5;
      if (reset === true){
        this.x = 200;
        this.y = 200;
        this.x_speed = 0;
        this.y_speed = 3;
        reset = false;
        pause = true;
      }
      if (this.x - 5 < 0) {
          this.x = 5;
          this.x_speed = -this.x_speed;
      } else if (this.x + 5 > 400) {
          this.x = 395;
          this.x_speed = -this.x_speed;
      }
      if (this.y < 0){ // AI Loses
        this.x_speed = 0;
        this.y_speed = -3;
        this.x = 200;
        this.y = 200;
        playerScore += 1;
        scored = true;
        stats();
      }
      if (this.y > 400){ // Player Loses
        this.x_speed = 0;
        this.y_speed = 3;
        this.x = 200;
        this.y = 200;
        computerScore += 1;
        scored = true;
        stats();
      }

      if (top_y > 300) {
          if (top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
              this.y_speed = -3;
              this.x_speed += (paddle1.x_speed / 2);
              this.y += this.y_speed;
          }
      } else {
          if (top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
              this.y_speed = 3;
              this.x_speed += (paddle2.x_speed / 2);
              this.y += this.y_speed;
          }
      }
    }
};

animate(step);

window.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];
});
