<template>
  <div
    class="i-multiple-input"
    :class="multipleInputClasses"
  >
    <slot />
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'IDualInput',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    invalid: {
      type: Boolean,
      default: false
    },
    filled: {
      type: Boolean,
      default: false,
    }
  },
  setup(props) {
    const multipleInputClasses = computed(() => {
      const classes = ref([])

      if (props.filled) {
        classes.value.push('filled')
      }

      if (props.disabled) {
        classes.value.push('disabled')
      }

      if (props.invalid) {
        classes.value.push('invalid')
      }

      return classes.value
    })

    return {
      multipleInputClasses
    }
  }
}
</script>

<style>
@reference "@/assets/global.css";

.i-multiple-input {
  @apply tw:relative tw:flex tw:items-center tw:w-auto tw:h-12 tw:bg-white tw:border tw:border-gray-500 tw:rounded-lg tw:px-3 tw:py-2;

  &.disabled {
    @apply tw:bg-gray-300;
  }

  &:focus-within,
  &.filled {
    @apply tw:border-gray-900;
  }

  &.invalid,
  &.invalid.filled {
    @apply tw:border-red-300;
  }

  .i-button {
    @apply tw:text-xs tw:h-[41px];

    &.i-button-text {
      @apply tw:text-base;
    }
  }
}
</style>