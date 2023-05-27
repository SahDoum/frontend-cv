<template>
  <div class="canvas-holder">
    <canvas id="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>

  // RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     ||  
    function( callback ){
      return window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = ( function() {
  return window.cancelAnimationFrame          ||
    window.webkitCancelRequestAnimationFrame    ||
    window.mozCancelRequestAnimationFrame       ||
    window.oCancelRequestAnimationFrame     ||
    window.msCancelRequestAnimationFrame        ||
    clearTimeout
} )();


class Playground {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.width, this.height);
  }
}

class Paddle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y; // it's paddle center
    this.width = w;
    this.height = h;
  }

  moveByBot(balls) {
    this.x = balls[0].x;
  }

  moveByMouse(x, y) {
    this.x = x;
  }

  draw(ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
  }
}

class Ball {
  constructor(x, y, vx, vy, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;

    this.r = 10;

    this.color = color;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  bounce(paddle) {
    if (this.vy > 0) {
      this.y = paddle.y - paddle.height/2 - this.r;
    } else {
      this.y = paddle.y + paddle.height/2 + this.r;
    }
    this.vy = -this.vy;

    // put ball on paddle
  }

  collideWithWalls(playground) {
    if (this.y < 0 || this.y > playground.height)
      return true;
    if (this.x <= this.r) {
      this.vx = -this.vx;
      this.x = this.r;
    }
    if (this.x >= playground.width - this.r) {
      this.vx = -this.vx;
      this.x = playground.width - this.r;
    }
    return false;
  }

  collideWithPaddle(paddle) {
    // check paddle intersection
    var dx = Math.abs(this.x - paddle.x);
    var dy = Math.abs(this.y - paddle.y);
    if (dx <= this.r + paddle.width/2 && dy <=this.r + paddle.height/2) {
      console.log("COLLIDE");
      this.bounce(paddle);
      return true;
    }
    return false;
  }

  draw(ctx) {
    ctx.beginPath();
    //ctx.fillRect(this.x - this.r, 0, this.width, this.height);
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();

  }

}

class Particle {
  // ToDo;
}

class Game {
  constructor(width, height, canvas) {
    this.state = 0;
    this.canvas = canvas;
    this.loop;

    this.score = 0;
    this.lives = 3;

    this.width = width;
    this.height = height;

    var pw = 200;
    var ph = 8;
    this.playground = new Playground(width, height);
    this.paddle = new Paddle(width/2, height - ph/2, pw, ph);
    this.botPaddle = new Paddle(width/2, ph/2, pw, ph);

    this.balls = [ new Ball(width/2, height/2, 2, 4, "green")
      ];

    // ToDo: particles
  }

  start() {
    if (this.state == 1) return;
    this.state = 1;
    this.lives = 3;
    this.score = 0;
    this.animloop();
  }

  stop() {
    cancelRequestAnimFrame(this.loop);
  }

  animloop = () => {
    var self = this;
    this.loop = requestAnimFrame(self.animloop);
    this.draw();
    this.update();
  }

  update() {
    this.botPaddle.moveByBot(this.balls);
    this.balls.forEach(ball => {
      ball.move();

      if(ball.collideWithPaddle(this.paddle)) {
        this.score += 1;
      }
      ball.collideWithPaddle(this.botPaddle);
      if(ball.collideWithWalls(this.playground)) {
        this.lose();
        return;
      }
    });
  }

  lose() {
    this.lives -= 1;
    console.log(this.lives)
    if(this.lives < 0)
      this.gameOver();
    this.restart();
  }

  restart() {
    this.balls = [ new Ball(this.width/2, this.height/2, 4, 8, "green")
    ];
  }

  gameOver() {
    this.stop();

    var ctx = this.canvas.getContext("2d");
    ctx.fillStlye = "red";
    ctx.font = "16px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("GAME OVER", this.width/2, this.height/2);
    this.state = 0;
  }

  draw() {
    var ctx = this.canvas.getContext("2d");
    this.playground.draw(ctx);
    this.paddle.draw(ctx);
    this.botPaddle.draw(ctx);
    this.balls.forEach(ball => {
      ball.draw(ctx);
    });

    ctx.fillStlye = "#ff0000";
    ctx.textStlye = "white";
    ctx.font = "32px Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    var mytext = "❤"
    ctx.fillText(mytext.repeat(this.lives), this.width - 100, 20);


    ctx.fillStlye = "white";
    ctx.font = "16px Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + this.score, 20, 20 );
  }

  mouseEvent(x, y) {
    this.paddle.moveByMouse(x, y);
  }

}


export default {
  props: {
    width: {
      default: 900
    },
    height: {
      default: window.innerHeight
    },
  },
  data: function() {
    return {
      width: this.width,
      height: this.height,
    }
  },
  mounted: function() {
    //this.$refs.canvas
    console.log(this.width, this.height);
    this.$refs.canvas.width = this.width;
    this.$refs.canvas.height = this.height;
    this.game = new Game(this.width, this.height, this.$refs.canvas);
  },
  methods: {
    start() {
      this.game.start();
    },
    move(x, y) {
      this.game.mouseEvent(x, y);
    }
  }
};
</script>

<style scoped>

.canvas-holder {
  position: relative;
  padding-left: 0;
  padding-right: 0;
  margin-left: auto;
  margin-right: auto;
  display: block;
  align-content: center;
  width: 900px;
}

canvas {
}

</style>