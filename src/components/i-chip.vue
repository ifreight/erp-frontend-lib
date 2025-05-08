<template>
  <div class="i-chip-wrapper">
    <div
      class="i-chip"
      :class="badgeClasses"
    >
      <span
        class="status-dot tw:mr-2"
        :style="dotStyle"
      ></span>
      <span class="tw:text-xs">{{ text }}</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'IChip',
  props: {
    text: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'neutral',
      validator(value) {
        return ['error', 'success', 'info', 'neutral'].includes(value);
      },
    },
  },
  setup(props) {
    const statusColors = {
      error: {
        background: 'tw:bg-red-100',
        text: 'tw:text-red-600',
        dot: '#E2283E',
      },
      success: {
        background: 'tw:bg-green-100',
        text: 'tw:text-green-600',
        dot: '#31C18D',
      },
      info: {
        background: 'tw:bg-blue-100',
        text: 'tw:text-blue-600',
        dot: '#1890FF',
      },
      neutral: {
        background: 'tw:bg-gray-500',
        text: 'tw:text-gray-900',
        dot: '#2D2D2D',
      },
    };

    const badgeClasses = computed(() => {
      const colors = statusColors[props.status];
      return `${colors.background} ${colors.text}`;
    });

    const dotStyle = computed(() => {
      const color = statusColors[props.status]?.dot
      console.log('Computed dot color:', color);
      return {
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        backgroundColor: color,
      };
    });

    return {
      badgeClasses,
      dotStyle,
    };
  },
};
</script>

<style>
@reference "@/assets/global.css";

.i-chip {
  @apply tw:flex tw:items-center tw:w-fit tw:py-1 tw:px-2 tw:rounded-[54px];
}
</style>
