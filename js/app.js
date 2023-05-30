;(function () {

var app = Vue.createApp({
  el: '#app',
  data() {
    return {
      status: 0, // 0 -- torus, 1 -- cv, 2 -- pong
      torusAnim: true,
      pongStart: false,
      pongLine: "",
      pongTmr: null,
    }
  },
  mounted() {
  },
  methods: {
    startPong: function(event) {
      this.pongStart = true;
      this.$refs.pong.setPongLineHandler(this.printPongLine);
      this.$refs.pong.start();
    },

    printPongLine: function(string) {
      var tmr = this.pongTmr;
      var self = this;
      if (tmr) clearInterval(tmr);

      var word_write = function() {
        if (self.pongLine.length == string.length) {
          clearInterval(tmr);
          return;
        }
        self.pongLine = string.substr(0, self.pongLine.length + 1);
      }

      var word_erase = function() {
        if (self.pongLine.length == 0) {
          clearInterval(tmr);
          tmr = setInterval(word_write, 30);
          return;
        }
        self.pongLine = self.pongLine.slice(0, -1);
      }

      tmr = setInterval(word_erase, 20);

    },

    movePong: function(event) {
      var rect = document.getElementById('canvas').getBoundingClientRect()
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      this.$refs.pong.move(x, y);
    },

    torusClick: async function(event) {
      if (!torus_click()) {
        this.torusAnim = false;
        this.slideToNextScreen();
        await new Promise(r => setTimeout(r, 300));
        anim1();
      }
    },

    torusMove: function(event) {
      updateCursor(event);
    },

    animateIntro: async function(event) {      
      if (status != 0) return;
      status = 1;
      var gridContainer = this.$refs.gridContainer;
      gridContainer.classList.add('animate-intro-first');
      await new Promise(r => setTimeout(r, _animationTimings["main"]*1000+500));
      gridContainer.classList.add('animate-intro-second');
      await new Promise(r => setTimeout(r, _animationTimings["main"]*1000+1000));
      gridContainer.classList.add('animate-intro-third');
      await new Promise(r => setTimeout(r, _animationTimings["main"]*1000+500));
      
      this.$refs.profile_img.startLoader();
    },

    zoomPong: async function(event) {
      if (status != 1) return;
      // console.log("zoomPong");
      // var gridContainer = this.$refs.gridContainer;
      // var scoreboard = this.$refs.scoreboard;
      // gridContainer.classList.add('animate-pong-zoom');
      // this.$refs.profile_img.revertLoader();
      // await new Promise(r => setTimeout(r, _animationTimings["IntroT"]*1000+500));
      // scoreboard.classList.add('visible');

      // await new Promise(r => setTimeout(r, 1500));
      const thirdContainer = document.getElementById("third");
      thirdContainer.classList.remove("pong-container-hidden");
      if (thirdContainer) {
        const scrollTop = thirdContainer.offsetTop;
        window.scrollTo({
          top: scrollTop,
          behavior: "smooth",
        });
      }

      this.startPong()
    },

    slideToNextScreen: async function() {
      const secondContainer = document.getElementById("second");
      if (secondContainer) {
        const scrollTop = secondContainer.offsetTop;
        window.scrollTo({
          top: scrollTop,
          behavior: "smooth",
        });
      }
      await new Promise(r => setTimeout(r, 750));
      this.animateIntro();
    }
    
  }
});


window.app = app;

})()
