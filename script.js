;(function () {


var app = new Vue({
  el: '#app',
    data: {
      status: 0, // o -- torus, 1 -- next
      startSecondAnimation: false,
      torusAnim: true,
    },
  methods: {
    torusClick: function(event) {
      console.log(this.torusAnim);
      if (!torus_click()) {
        this.torusAnim = false;
        this.slideToNextScreen();
        anim1();
      }
    },

    torusMove: function(event) {
      updateCursor(event);
    },

    animateIntro: async function(event) {
      var gridContainer = this.$el.querySelector('.grid-container');
      gridContainer.classList.add('animate-intro-first');
      await new Promise(r => setTimeout(r, _animationTimings["IntroF"]*1000+500));
      gridContainer.classList.add('animate-intro-second');
      await new Promise(r => setTimeout(r, _animationTimings["IntroS"]*1000+1000));
      gridContainer.classList.add('animate-intro-third');
      await new Promise(r => setTimeout(r, _animationTimings["IntroT"]*1000+500));
      
      this.$refs.profile_img.startLoader();
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
      // pauseTorus();
    },

    secondAnimation: async function() {
      // console.log("anom")
      // this.startSecondAnimation = true;

      // await new Promise(r => setTimeout(r, 1000));
      // console.log(this.$refs.profile_img);
      // this.$refs.profile_img.startLoader();
    }

  }
});

})()
