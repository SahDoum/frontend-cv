<template>
  <div class="image-canvas-container">
    <img
      ref="image"
      :src="imageSrc"
      alt="Image"
      @load="startLoader"
      class="loder-image"
    />
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      imageSrc: './photo.jpg',
      isLoading: false,
    };
  },
  mounted: function() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };


    this.canvas = document.createElement("canvas");
    console.log(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    const observer = new IntersectionObserver(this.handleIntersection, options);
    observer.observe(this.$refs.image);
  },
  methods: {
    handleIntersection: function(entries) {
      const entry = entries[0];
      if (entry.isIntersecting) {
        this.startLoader();
      }
    },
    startLoader: async function() {
      const image = this.$refs.image;
      const intermediateCanvas = this.canvas;
      const intermediateCtx = this.ctx;
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');

      for (i = 53; i > 0; i-=4) {

        intermediateCanvas.width = image.width/i;
        intermediateCanvas.height = image.height/i;

        intermediateCtx.clearRect(0, 0, intermediateCanvas.width, intermediateCanvas.height);

        intermediateCtx.imageSmoothingEnabled = !1;
        intermediateCtx.webkitImageSmoothingEnabled = !1;
        intermediateCtx.drawImage(image, 0,0, image.width/i, image.height/i);

        canvas.width = image.width;
        canvas.height = image.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = !1;
        ctx.webkitImageSmoothingEnabled = !1;
        ctx.drawImage(intermediateCanvas, 0, 0, image.width, image.height);

        await new Promise(r => setTimeout(r, 20));

      }
    },
  },
};
</script>