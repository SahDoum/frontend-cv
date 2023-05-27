;(function () {

var app = Vue.createApp({
  el: '#app',
  data() {
    return {
      status: 0, // 0 -- torus, 1 -- cv, 2 -- pong
      torusAnim: true,
    }
  },
  mounted() {
    //this.$refs.d.$emit("mousemove", this.torusMove);
  },
  methods: {
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
      await new Promise(r => setTimeout(r, _animationTimings["IntroF"]*1000+500));
      gridContainer.classList.add('animate-intro-second');
      await new Promise(r => setTimeout(r, _animationTimings["IntroS"]*1000+1000));
      gridContainer.classList.add('animate-intro-third');
      await new Promise(r => setTimeout(r, _animationTimings["IntroT"]*1000+500));
      
      this.$refs.profile_img.startLoader();
    },

    zoomPong: async function(event) {
      if (status != 1) return;
      console.log("zoomPong");
      var gridContainer = this.$refs.gridContainer;
      var scoreboard = this.$refs.scoreboard;
      gridContainer.classList.add('animate-pong-zoom');
      this.$refs.profile_img.revertLoader();
      await new Promise(r => setTimeout(r, _animationTimings["IntroT"]*1000+500));
      scoreboard.classList.add('visible');

    },

    slideToNextScreen: function() {
      const secondContainer = document.getElementById("second");
      if (secondContainer) {
        const scrollTop = secondContainer.offsetTop;
        window.scrollTo({
          top: scrollTop,
          behavior: "smooth",
        });
      }
    }
    
  }
});


window.app = app;

})()
