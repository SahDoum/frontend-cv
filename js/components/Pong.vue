<template>
  <div class="canvas-holder">
    <canvas id="canvas" ref="canvas"></canvas>
  </div>
</template>

<style scoped>

.canvas-holder {
  position: relative;
  padding-left: 0;
  padding-right: 0;
  display: block;
  align-content: center;
  width: fit-content;
}

canvas {
}

</style>

<script>

  // RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     ||  
    function( callback ){
      return window.setTimeout(callback, 1000 / 120);
    };
})();

window.cancelRequestAnimFrame = ( function() {
  return window.cancelAnimationFrame         ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame    ||
    window.oCancelRequestAnimationFrame      ||
    window.msCancelRequestAnimationFrame     ||
    clearTimeout
} )();


class Playground {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  draw(ctx) {
    ctx.fillStyle = "white";//"#25292F";//"#ACDA54"//"#9ACD32"//"white";//"#ACE1AF";
    ctx.fillRect(0, 0, this.width, this.height);
  }
}

class Paddle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y; // it's paddle center
    this.width = w;
    this.height = h;
    this.moveDelta = 8;
  }

  moveByBot(balls, mainBall) {
    var destX = mainBall.x;
    if (mainBall.vy > 0) {
      var curr = 10000000; // VEEEERRYYYY BIIIG
      balls.forEach(b => {
        if (b.vy < 0 && b.y < curr) {
          curr = b.y;
          destX = b.x;
        }
      });
    }
    if (destX > this.x) {
      var delta = Math.min(destX - this.x, this.moveDelta);
      this.x += delta;
    }

    if (destX < this.x) {
      var delta = Math.min(this.x - destX, this.moveDelta);
      this.x -= delta;
    }
  }

  moveByMouse(x, y) {
    this.x = x;
  }

  draw(ctx) {
    ctx.fillStyle = "#25292F";
    ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    // ctx.fillStyle = "white";
    // ctx.fillRect(this.x - this.width/2 + 1, this.y - this.height/2 + 1, this.width - 2, this.height - 2);
  }
}


var ball_img = new Image();
ball_img.src = "./media/pongball.svg";

var pravki_img = new Image();
pravki_img.src = "./media/pravkiball.svg";

var intr_img = new Image();
intr_img.src = "./media/intrestingball.svg";

var deadline_img = new Image();
deadline_img.src = "./media/deadlineball.svg";

class Ball {
  constructor(x, y, vx, vy, state) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;

    this.r = 20;

    this.state = state; // 0 -- common, 1 -- pravki, 2 -- intresting free projусе, 3 -- deadline
    if (state == 1) {
      this.image = pravki_img;
    } else if (state == 2) {
      this.image = intr_img;
    } else if (state == 3) {
      this.image = deadline_img;
    } else {
      this.image = ball_img;
    }
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
    if (this.y < 0) 
      return 2;
    if (this.y > playground.height)
      return 1;
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
      this.bounce(paddle);
      return true;
    }
    return false;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x - this.r, this.y - this.r, this.r*2, this.r*2);

  }

}

class Particle {
  // ToDo;
}

var events = [
  [0, "Спасибо, что согласились на проект, Александр!"],
  [1, "Александр, высылаю вам правки!"],
  [1, "Очень приятно с вами работать, давайте поправим еще тут!"],
  [2, "Санёк, дружище, мы тут сервис запускаем. Да 15 минут туда-сюда"],
  [1, "Адександр, в сафари на айфонах полосочка белая появляется..."],
  [1, "Александр, у вас тут критическая бага. Срочно поправьте"],
  [2, "Санёк, сайту сохранения водонапорных башен липецкой области нужен сайт!"],
  [2, "Здравствуйте, а что это строчка делает, вы два года назад добавили?"],
  [3, "Адександр, завтра ДЕДЛАЙН! У вас все готово?"],
];

class Game {
  constructor(width, height, canvas, parent) {
    this.state = 0;
    this.loop;
    this.canvas = canvas;
    this.parent = parent;

    this.score = 0;
    this.lives = 3;

    this.width = width;
    this.height = height;

    var pw = 150;
    var ph = 10;
    this.playground = new Playground(width, height);
    this.paddle = new Paddle(width/2, height - ph/2 - 10, 150, ph);
    this.botPaddle = new Paddle(width/2, ph/2 + 10, 150, ph);

    this.balls;// = new Set();
    this.mainBall;


    // ToDo: particles
  }

  start() {
    if (this.state == 1) return;

    this.state = 1;
    this.lives = 3;
    this.score = 0;

    this.event = 0;
    this.parent.printLine(events[0][1])

    this.balls = new Set();
    this.mainBall = new Ball(this.width/2, 60, 3, 4, 0)
    this.balls.add(this.mainBall);

    this.animloop();
  }

  restart() {
    this.mainBall = new Ball(this.width/2, 60, 3, 4, 0);
    this.balls = new Set([this.mainBall]);
  }

  restartMainBall() {
    //delete this.mainBall;
    let newBall = new Ball(this.width/2, 60, 3, 4, 0);
    this.balls.delete(this.mainBall);
    this.mainBall = newBall;
    this.balls.add(newBall);

    console.log("restart");
    console.log(this.mainBall);
    console.log(this.balls);
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

  // game logic here
  update() {
    this.botPaddle.moveByBot(this.balls, this.mainBall);
    this.balls.forEach(ball => {
      ball.move();

      if(ball.collideWithPaddle(this.paddle)) {
        this.updateScore(ball);
      }
      ball.collideWithPaddle(this.botPaddle);
      var collide;
      if(collide = ball.collideWithWalls(this.playground)) {
        if (collide == 1)
          this.lose(ball);
        if (collide == 2)
          this.win(ball);
        this.balls.delete(ball);
        return;
      }
    });
  }

  updateScore(ball) {
    this.score += 1;
    this.parent.updateScore(this.score);

    if(this.score % 6 == 2) {
      this.event += 1;
      if (this.event >= events.length) {
        this.gameWon();
        return;
      }
      var ballType = events[this.event][0];
      var message = events[this.event][1];
      this.balls.add(new Ball(this.width/2, 60, 4, 5, ballType))
      this.parent.printLine(message)
    }

    // increase speed
    if(this.score == 45) {
      if(Math.abs(this.mainBall.vx) < 15) {
        this.mainBall.vx += (this.mainBall.vx < 0) ? -1 : 1;
        this.mainBall.vy += (this.mainBall.vy < 0) ? -2 : 2;
      }
    }
  }

  lose(ball) {
    if (ball.state == 0) this.lives -= 1;
    if (ball.state == 1) this.lives -= 1;
    if (ball.state == 3) this.lives -= 2;
    if(this.lives < 0)
      this.gameOver();

    console.log(ball.state)
    if (ball.state == 0) this.restartMainBall();
  }

  win(ball) {
    if (ball.state == 0) this.restart();
  }

  gameOver() {
    this.stop();

    var ctx = this.canvas.getContext("2d");
    ctx.textStlye = "red";
    ctx.font = "32px Roboto Mono, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("ВЫГОРАНИЕ!", this.width/2, this.height/2);
    this.state = 0;
  }

  gameWon() {
    this.stop();

    var ctx = this.canvas.getContext("2d");
    ctx.textStlye = "red";
    ctx.font = "32px Roboto Mono, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("ПРОЕКТ СДАН (можно лечить выгорание)!", this.width/2, this.height/2);
    this.state = 0;
  }

  draw() {
    var ctx = this.canvas.getContext("2d");
    this.playground.draw(ctx);
    this.paddle.draw(ctx);
    this.botPaddle.draw(ctx);
    if(this.balls) {
      this.balls.forEach(ball => {
        ball.draw(ctx);
      });
    }

    ctx.font = "32px Roboto Mono, monospace";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    var mytext = "❤"
    ctx.fillStyle = "red";

    ctx.fillText(mytext.repeat(this.lives), this.width - 100, 20);

    // ctx.font = "16px Arial, sans-serif";
    // ctx.textAlign = "left";
    // ctx.textBaseline = "top";
    // ctx.fillStyle = "black";

    // ctx.fillText("Score: " + this.score, 20, 20 );
  }

  mouseEvent(x, y) {
    this.paddle.moveByMouse(x, y);
  }

}


//
// VUE part
//

export default {
  props: {
    width: {
      default: window.innerHeight*0.6,
    },
    height: {
      default: window.innerHeight*0.9,
    },
  },
  data: function() {
    return {
      pongLineHandler: null,
      pongScoreHandler: null,
    }
  },
  mounted: function() {
    this.$refs.canvas.width = this.width;
    this.$refs.canvas.height = this.height;
    this.game = new Game(this.width, this.height, this.$refs.canvas, this);
    this.game.draw();
  },
  methods: {
    start() {
      this.game.start();
    },
    move(x, y) {
      this.game.mouseEvent(x, y);
    },
    printLine(string) {
      if (this.pongLineHandler) {
        this.pongLineHandler(string);
      }
    },
    updateScore(score) {
      if (this.pongScoreHandler) {
        this.pongScoreHandler(score);
      }

    },
    setPongLineHandler(handler) {
      this.pongLineHandler = handler;
    },
    setPongScoreHandler(handler) {
      this.pongScoreHandler = handler;
    }
  }
};
</script>
