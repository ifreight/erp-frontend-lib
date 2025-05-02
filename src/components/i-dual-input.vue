<template>
  <div
    class="i-dual-input"
    :class="dualInputClasses"
  >
    <div :class="firstInputClass">
      <slot name="first-input" />
    </div>

    <div
      v-show="useDivider"
      class="i-dual-input-divider"
    >
      <span class="vl" />
      <div class="icon">
        <slot name="icon" />
      </div>
    </div>

    <div :class="secondInputClass">
      <slot name="second-input" />
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'IDualInput',
  props: {
    size: {
      type: String,
      default: 'base',
      validator(value) {
        return ['base', 'sm'].includes(value)
      }
    },
    firstInputClass: {
      type: String,
      default: ''
    },
    secondInputClass: {
      type: String,
      default: ''
    },
    useDivider: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const dualInputClasses = computed(() => {
      const classes = ref([])

      if (props.size === 'sm') {
        classes.value.push('sm')
      } else {
        classes.value.push('base')
      }

      return classes.value
    })

    return {
      dualInputClasses
    }
  }
}
</script>

<style>
@reference "@/assets/global.css";

.i-dual-input {
  @apply tw:relative tw:flex tw:items-center tw:w-auto tw:bg-white tw:border tw:border-gray-500 tw:rounded-lg tw:px-3 tw:py-2;

  &.base {
    @apply tw:h-16;
  }

  &.sm {
    @apply tw:h-12;
  }

  &.disabled {
    background-color: var(--gray-50);
  }

  &:focus-within,
  &.filled {
    border-color: var(--gray-900);
  }

  &.dark,
  &.dark.disabled {
    background-color: var(--gray-900);
    border-color: var(--white);
  }

  &.invalid,
  &.invalid.filled,
  &.invalid.dark {
    border-color: var(--red-400);
  }

  .i-dual-input-divider {
    @apply tw:relative;

    .vl {
      @apply tw:absolute tw:top-1/2 tw:left-1/2 tw:h-12 tw:border-l tw:border-gray-500 tw:transform tw:-translate-y-1/2 tw:-translate-x-1/2;
    }

    .icon {
      @apply tw:relative tw:z-[1];
    }
  }
}
</style>