!function(e,t){

//import Vue from "vue";

//Vue.component("image-loader", () => import("./components/ImageLoade.vue"));


Vue.component("image-loader", {
  template: `
  <div class="image-canvas-container">
    <img v-if="bitmap!==null" ref="bitmap" :src=bitmap>
    <canvas ref="canvas" style="position: relative; width:100%; height: 100%;"></canvas>
    <img
      ref="image"
      :src="imageSrc"
      alt="Image"
      class="img-main"
      style="position: relative; width:100%; height: 100%; display: none"
      
    />
  </div>
`,
  
  props: {
    src: {},
    bitmap: {
      default: null,
    }, 
  },
  data: function() {
    return {
      imageSrc: this.src,
      isLoading: false,
    };
  },
  mounted: function() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    console.log(this.bitmap);


    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");


    let f = this.drawCanvas;
    this.$refs.image.onload = function() {
      console.log(this);
      f(53);
    }

    // const observer = new IntersectionObserver(this.handleIntersection, options);
    // observer.observe(this.$refs.image);
  },
  methods: {
    handleIntersection: function(entries) {
      const entry = entries[0];
      if (entry.isIntersecting) {
        this.startLoader();
      }
    },
    startLoader: async function() {
      console.log("start");
      // this.$refs.bitmap.style.display = "none";
      this.$refs.canvas.style.display = "block";

      for (j = 53; j > 0; j-=4) {
        console.log("log", j);
        this.drawCanvas(j);
        // return;
        await new Promise(r => setTimeout(r, 20));

      }

      this.$refs.canvas.style.display = "none";
      this.$refs.image.style.display = "block";

    },
    drawCanvas(rate) {
      const image = this.$refs.image;
      const intermediateCanvas = this.canvas;
      const intermediateCtx = this.ctx;
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');

      intermediateCanvas.width = image.width/rate;
      intermediateCanvas.height = image.height/rate;

      intermediateCtx.clearRect(0, 0, intermediateCanvas.width, intermediateCanvas.height);

      intermediateCtx.imageSmoothingEnabled = !1;
      intermediateCtx.webkitImageSmoothingEnabled = !1;
      intermediateCtx.drawImage(image, 0,0, image.width/rate, image.height/rate);

      canvas.width = image.width;
      canvas.height = image.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = !1;
      ctx.webkitImageSmoothingEnabled = !1;
      ctx.drawImage(intermediateCanvas, 0, 0, image.width, image.height);

    },
  },
});


// Export the library
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Vue;
} else {
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return Vue;
    });
  } else {
    t.Vue = Vue;
  }
}
}(window, window);
