<template>
  <div
    class="i-sticky-bar"
    :style="{
      width: `calc(100% - ${leftOffset})`,
    }"
  >
    <div class="i-sticky-bar-content">
      <slot name="content" />
    </div>

    <slot name="options" />
  </div>
</template>

<script>
export default {
  name: 'IStickyBar',
  props: {
    leftOffset: {
      type: String,
      default: '200px',
    },
  },
};
</script>

<style>
@reference "@/assets/global.css";

.i-sticky-bar {
  @apply tw:fixed tw:bottom-8 tw:z-1 tw:flex tw:justify-between tw:items-center tw:p-7 tw:bg-gray-900/70 tw:right-0;
  transition: all 0.5s ease;

  .i-sticky-bar-content {
    @apply tw:text-xl tw:text-white tw:font-semibold;
  }
}
</style>
