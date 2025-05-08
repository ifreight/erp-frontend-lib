<template>
  <div class="i-progress-bar">
    <div ref="progress-bar"></div>
  </div>
</template>

<script>
import { watch, useTemplateRef, onMounted, onBeforeUnmount, ref } from 'vue';

export default {
  props: {
    progress: {
      type: Number,
      validator(value) {
        return value >= 0 && value <= 100;
      },
    },
    color: String,
    timeoutValue: Number,
  },
  emits: ['finish'],
  setup(props, { emit }) {
    const bar = useTemplateRef('progress-bar');
    const barWidth = ref('0%');
    let resizeObserver;

    onMounted(() => {
      if (bar.value) {
        barWidth.value = bar.value.style.width;
        resizeObserver = new ResizeObserver(() => {
          barWidth.value = bar.value.style.width;
        });
        resizeObserver.observe(bar.value);
      }
      if (props.color) {
        bar.value.style.backgroundColor = props.color;
      }
      if (props.timeoutValue) {
        setTimeout(() => {
          bar.value.style.width = '100%';
        }, props.timeoutValue);
      }
      if (props.progress) {
        bar.value.style.width = `${props.progress}%`;
      }
    });

    onBeforeUnmount(() => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    });

    watch(
      () => props.progress,
      (val) => {
        bar.value.style.width = `${val}%`;
      },
    );

    watch(barWidth, (val) => {
      if (val == '100%') {
        emit('finish');
      }
    });

    return { barWidth };
  },
};
</script>

<style>
.i-progress-bar {
  min-height: 3px;
  width: 100%;

  div {
    min-height: 3px;
    height: 100%;
    width: 0%;
    border-radius: inherit;
    background-color: var(--brown-600);
    transition: width 1s ease-in-out;
  }
}
</style>
