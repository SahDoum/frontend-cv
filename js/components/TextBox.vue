<template>
  <div class="text-box-style">
    <div
      v-for="(slot, index) in $slots.default()"
      :style="{ 'margin-top': index >= dropedLines ? '-1em' : '0' }"
    >
      <div v-if="index > 0" class="block__tile tile-line"></div>
      <component :is="slot" />
    </div>
  </div>
</template>

<script setup>
import { ref, useSlots } from 'vue';

const props = defineProps({
  dropedLines: Number
});
//const dropedLines = ref('');
console.log(props);

const slots = ref(useSlots().default());
console.log(slots.value)
console.log(slots.value[0].children)


let isAnimating = ref(false);

const addLine = (line) => {
  props.children.push(line);
};

const addText = (text) => {
  const textLines = splitTextIntoLines(text);
  props.children = props.children.concat(textLines);
};

const splitTextIntoLines = (text) => {
  // ... (same as before)
};

const dropNLines = (n) => {
  props.dropedLines += n;

  isAnimating.value = true;
  setTimeout(() => {
    isAnimating.value = false;
  }, 0);
};
</script>

<style scoped>
.text-box-style {
  display: flex;
  flex-direction: column;
}

.horizontal-line {
  border-top: 1px solid #ccc;
  margin-top: 10px; /* Adjust the spacing between lines */
  padding-top: 10px; /* Adjust the spacing between lines */
}
</style>
