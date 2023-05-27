<template>
  <div class="image-canvas-container">
    <img v-if="bitmap!==null" ref="bitmap" :src=bitmap>
    <canvas ref="canvas"></canvas>
    <img
      ref="image"
      :src="imageSrc"
      alt="Image"
      class="img-main"
    />
  </div>
</template>

<style scoped>
  img {
    position: relative; 
    width:100%; 
    height: 100%; 
    display: none;
  }
  canvas {
     position: relative; 
     width:100%; 
     height: 100%;
  }
</style>

<script>
export default {
  props: {
    src: {},
    bitmap: {
      default: null,
    }, 
  },
  data: function() {
    let canvas = document.createElement("canvas");
    return {
      imageSrc: this.src,
      isLoading: false,
      canvas: canvas,
      ctx: canvas.getContext("2d"),
    };
  },
  mounted: function() {
    let f = this.drawCanvas;
    this.$refs.image.onload = function() {
      f(41);
    }
  },
  methods: {
    startLoader: async function() {
      // this.$refs.bitmap.style.display = "none";
      this.$refs.canvas.style.display = "block";

      for (var j = 41; j > 0; j-=4) {
        this.drawCanvas(j);
        // return;
        await new Promise(r => setTimeout(r, 20));

      }

      this.$refs.canvas.style.display = "none";
      this.$refs.image.style.display = "block";
    },

    revertLoader: function() {
      this.drawCanvas(41);

      this.$refs.canvas.style.display = "block";
      this.$refs.image.style.display = "none";
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
};
</script>