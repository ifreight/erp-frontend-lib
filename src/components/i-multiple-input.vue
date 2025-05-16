<template>
  <div class="i-multiple-input">
    <div
      class="i-multiple-input-content"
      :class="multipleInputContentClasses"
    >
      <slot />
    </div>

    <div
      v-if="!!errorMessage"
      class="i-multiple-input-error"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'IMultipleInput',
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
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const multipleInputContentClasses = computed(() => {
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
      multipleInputContentClasses
    }
  }
}
</script>

<style>
@reference "@/assets/global.css";

.i-multiple-input {
  .i-multiple-input-content {
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

    .i-select {
      .i-input {
        .i-input-container {
          @apply tw:h-8 tw:rounded-lg;
        }
      }
    }
  }

  .i-multiple-input-error {
    @apply tw:pt-2 tw:text-xs tw:leading-3.5 tw:text-red-300;
  }
}
</style>